import EventEmitter from "~/shared/EventEmitter";

export default class WrldMap {

    constructor(reactNativeMapController) {
        this._mapViewData = {};
        this._reactNativeMapController = reactNativeMapController;
        this._internalEventEmitter = new EventEmitter;
    }

    _registerEvents() {
        this._reactNativeMapController.registerEvent("initialstreamingcomplete", ({ data }) => { this._onMapViewUpdate(data); });
        this._reactNativeMapController.registerEvent("mapviewupdate", ({ data }) => { this._onMapViewUpdate(data); });
    }

    _onMapViewUpdate(mapViewData) {
        this._mapViewData = mapViewData;
        this._internalEventEmitter._emit("internal_mapviewupdate", mapViewData);
    }

    init(latLng) {
        this._reactNativeMapController.init(latLng);
        this._registerEvents();
    }

    registerMapViewUpdateEvent(callback) {
        this._internalEventEmitter.on("internal_mapviewupdate", callback);
    }

    unregisterMapViewUpdateEvent(callback) {
        this._internalEventEmitter.off("internal_mapviewupdate", callback);
    }

    registerEvent(type, callback) {
        this._reactNativeMapController.registerEvent(type, callback);
    }

    unregisterEvent(type, callback) {
        this._reactNativeMapController.unregisterEvent(type, callback);
    }

    setView(latLng) {
        this._reactNativeMapController.sendMessage("map_setView", { center: latLng })
    }

    getMapView() {
        return this._mapViewData;
    }
}
