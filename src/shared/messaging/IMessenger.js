import EventEmitter from "~/shared/EventEmitter";

export default class IMessenger extends EventEmitter {

    constructor() {
        super();
        this._connected = false;
    }

    init()  {
        throw new Error("Abstract method!");
    }

    postMessage(message) {
        this._postMessage(JSON.stringify(message));
    }

    isConnected() {
        return this._connected;
    }

    _postMessage() {
        throw new Error("Abstract method!");
    }

    _onMessage() {
        throw new Error("Abstract method!");
    }

    _setConnected() {
        this._connected = true;
    }
}
