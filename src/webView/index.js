
const config = require("~/config.json");

const link = document.createElement("link");
link.href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.1/leaflet.css";
link.rel="stylesheet";
document.getElementsByTagName("head")[0].appendChild(link);

const wrldSrc = document.createElement("script");
wrldSrc.src = "https://cdn-webgl.wrld3d.com/wrldjs/api/"+config.wrld_sdk_version+"/wrld.js";
document.getElementsByTagName("head")[0].appendChild(wrldSrc);

const mapId = "wrld-map";
const mapDiv = document.createElement("div");
mapDiv.id = mapId;
mapDiv.style.position = "absolute";
mapDiv.style.top = "0";
mapDiv.style.bottom = "0";
mapDiv.style.left = "0";
mapDiv.style.right = "0";
mapDiv.style.background = "#000";
document.body.appendChild(mapDiv);

if (config.indoors_enabled) {
    const link = document.createElement("link");
    link.href="https://cdn-webgl.wrld3d.com/wrldjs/addons/resources/"+config.wrld_indoor_control_version+"/css/wrld.css";
    link.rel="stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

    const jquerySrc = document.createElement("script");
    jquerySrc.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    document.getElementsByTagName("head")[0].appendChild(jquerySrc);

    const jqueryUiSrc = document.createElement("script");
    jqueryUiSrc.src = "https://code.jquery.com/ui/1.12.0/jquery-ui.min.js";
    document.getElementsByTagName("head")[0].appendChild(jqueryUiSrc);

    const wrldIndoorControlSrc = document.createElement("script");
    wrldIndoorControlSrc.src = "https://cdn-webgl.wrld3d.com/wrldjs/addons/indoor_control/"+config.wrld_indoor_control_version+"/indoor_control.js";
    document.getElementsByTagName("head")[0].appendChild(wrldIndoorControlSrc);

    const indoorControlContainer = document.createElement("div");
    indoorControlContainer.id = "wrld-indoor-control";
    indoorControlContainer.style.position = "absolute";
    indoorControlContainer.style.top = "30px";
    indoorControlContainer.style.bottom = "30px";
    indoorControlContainer.style.right = "10px";
    mapDiv.appendChild(indoorControlContainer);
}

import WebViewMessenger from "./WebViewMessenger";
import mapController from "./MapController";

const messenger = new WebViewMessenger();
mapController.init(mapId, messenger);

window.onload = () => {
    setTimeout(() => {
        messenger.init();
    }, 1000);
};
