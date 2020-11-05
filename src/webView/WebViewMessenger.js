import IMessenger from "~/shared/messaging/IMessenger";

import Message from "~/shared/messaging/Message";

export default class WebViewMessenger extends IMessenger {

    constructor() {
        super();
    }

    init() {
        window.addEventListener("message", this._onMessage.bind(this));
        this._establishConnection();
    }

    _postMessage(data) {
        window.ReactNativeWebView.postMessage(data);
    }

    _onMessage(event) {
        const message = Message(event.data.type, event.data.data);
        this._emit(message.type, message.data);
    }

    _establishConnection() {
        this.postMessage(Message("connected"));
        this._setConnected();
    }
}
