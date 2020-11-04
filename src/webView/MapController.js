import Message from "~/shared/messaging/Message";
import * as MapViewData from "~/shared/types/MapViewData";

const config = require("~/config.json");

class MapController {

    constructor() {
        this._mapId = null;
        this._webViewMessenger = null;
        this._wrldMap = null;
        this._indoorControl = null;

        this._mapUpdateInterval = null;
    }

    init(mapId, webViewMessenger) {
        this._mapId = mapId;
        this._webViewMessenger = webViewMessenger;
        this._webViewMessenger.on("map_init", ({ data }) => { this._loadMap(data); });
        this._webViewMessenger.on("map_setView", ({ data }) => { this._setView(data); });
    }

    _loadMap(options) {
        this._wrldMap = L.Wrld.map(this._mapId, config.wrld_api_key, {
            center: options.center,
            headingDegrees: options.headingDegrees,
            zoom: options.zoom,
            indoorsEnabled: config.indoors_enabled
        });

        if (config.indoors_enabled) {
            this._indoorControl = new WrldIndoorControl("wrld-indoor-control", this._wrldMap);
        }

        this._registerMapEvents();
    }

    _setView(data) {
        const center = data.center;
        let zoom = 16;
        if (!center || !("lat" in center) || !("lng" in center)) {
            window.alert("no valid center sent with map_setView message");
        }
        if ("zoom" in data) {
            zoom = data.zoom;
        }
        
        this._wrldMap.indoors.exit();
        this._wrldMap.setView(center, zoom);
    }

    _registerMapEvents() {
        this._wrldMap.on("initialstreamingcomplete", (e) => { this._postMapEvent(e.type); });
        this._wrldMap.on("movestart", () => { this._startIntervalMapUpdate(); });
        this._wrldMap.on("moveend", () => { this._endIntervalMapUpdate(); });
    }

    _postMapEvent(type) {
        const message = Message(type, MapViewData.fromWrldMap(this._wrldMap));
        this._webViewMessenger.postMessage(message);
    }

    _postMapUpdateEvent() {
        this._postMapEvent("mapviewupdate");
    }

    _startIntervalMapUpdate() {
        this._postMapUpdateEvent();
        this._mapUpdateInterval = setInterval(() => { this._postMapUpdateEvent(); }, 500);
    }

    _endIntervalMapUpdate() {
        clearInterval(this._mapUpdateInterval);
        this._postMapUpdateEvent();
    }
}

const mapController = new MapController;
export default mapController;
