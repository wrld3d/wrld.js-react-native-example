
export default class EventEmitter {
 
    constructor() {
        this._events = {};
    }

    on(type, callback) {
        let listeners = this._events[type];
        if (!listeners) {
            listeners = [];
            this._events[type] = listeners;
        }
        for (let i = 0; i < listeners.length; ++i) {
            if (listeners[i] === callback) return;
        }
        listeners.push(callback);
    }

    off(type, callback) {
        const listeners = this._events[type];
        if (!listeners) return;
        for (let i = listeners.length; i >= 0; --i) {
            if (listeners[i] === callback) {
                listeners.splice(i, 1);
                return;
            }
        }
    }

    _emit(type, data) {
        const listeners = this._events[type];
        if (!listeners) return;
        listeners.forEach((callback) => {
            callback({
                type: type,
                target: this,
                data: data
            });
        });
    }
}
