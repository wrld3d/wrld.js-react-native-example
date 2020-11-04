import Message from "~/shared/messaging/Message";
import MapViewData from "~/shared/types/MapViewData";

const defaultStartLatLng = {
    lat: 37.785487,
    lng: -122.401510
};

export default class ReactNativeMapController {

    constructor(reactNativeMessenger) {
        this._startLocation = null;
        this._initialized = false;
        this._reactNativeMessenger = reactNativeMessenger;
        this._reactNativeMessenger.on("connected", () => { this._onWebViewReady(); });
    }

    _onWebViewReady() {
        this._initMap();
    }

    _initMap() {
        if (this._initialized || !this._reactNativeMessenger.isConnected() || this._startLocation === null) return;
        const initialMapView = MapViewData(this._startLocation);
        this._reactNativeMessenger.postMessage(Message("map_init", initialMapView));
        this._initialized = true;
    }
    
    init(latLng = defaultStartLatLng) {
        if (!this._initialized) {
            this._startLocation = latLng;
            this._initMap();
        }
    }

    registerEvent(type, callback) {
        this._reactNativeMessenger.on(type, callback);
    }

    unregisterEvent(type, callback) {
        this._reactNativeMessenger.off(type, callback);
    }

    sendMessage(type, data) {
        this._reactNativeMessenger.postMessage(Message(type, data));
    }
}
