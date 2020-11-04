
import ReactNativeMapController from "./ReactNativeMapController";
import ReactNativeMessenger from "./ReactNativeMessenger";
import WrldMap from "./WrldMap";

class MapModule {

    constructor() {
        this._reactNativeMessenger = new ReactNativeMessenger();
        this._reactNativeMapController = new ReactNativeMapController(this._reactNativeMessenger);
        this._wrldMap = new WrldMap(this._reactNativeMapController);
    }

    getReactNativeMessenger() {
        return this._reactNativeMessenger;
    }

    getWrldMap() {
        return this._wrldMap;
    }
}

const mapModule = new MapModule();

export const connectWebViewToMap = (webView) => {
    mapModule.getReactNativeMessenger().init(webView);
};

export const wrldMap = mapModule.getWrldMap();
