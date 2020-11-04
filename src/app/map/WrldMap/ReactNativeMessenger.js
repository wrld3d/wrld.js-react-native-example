import IMessenger from "~/shared/messaging/IMessenger";

import * as Message from "~/shared/messaging/Message";

export default class ReactNativeMessenger extends IMessenger {

    constructor() {
        super();
        this._webView = null;
        this._initialised = false;
    }

    init(webView) {
        if (this._initialised) return;
        this._webView = webView;
        this._webView.onMessage = this._onMessage.bind(this);
        this._initialised = true;
    }

    _postMessage(data) {
        if (this._webView === null) return;
        
        const script = `
            (function() {
                window.dispatchEvent(new MessageEvent('message', {data: ${data}}));
            })()
        `;
        this._webView.injectJavaScript(script);
    }

    _onMessage(event) {
        const message = this._translateMessage(event);
        console.log("message received from webview");
        console.log(message);
        if (message.type === "connected") {
            this._setConnected();
        }
        this._emit(message.type, message.data);
    }

    _translateMessage(event) {
        if (event.nativeEvent) {
            return Message.parse(event.nativeEvent.data);
        }
        return Message("");
    }
}
