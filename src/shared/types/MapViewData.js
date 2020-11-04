
/* MapViewData {
    center: {
        lat: number
        lng: number
    };
    zoom: number
    headingDegrees: number
    tiltDegrees: number
    distanceToInterest: number
    interestAltitude: number
*/

const defaultZoom = 16;
const defaultHeadingDegrees = 0;
const defaultTiltDegrees = 0;

const  MapViewData = (center,
    zoom = defaultZoom,
    headingDegrees = defaultHeadingDegrees,
    tiltDegrees = defaultTiltDegrees,
    distanceToInterest = 0,
    interestAltitude = 0) => ({
    center,
    zoom,
    headingDegrees,
    tiltDegrees,
    distanceToInterest,
    interestAltitude
});

// wrldMap: L.Wrld.map
export const fromWrldMap = (wrldMap) => {
    const center = wrldMap.getCenter();
    const zoom = wrldMap.getZoom();
    const headingDegrees = wrldMap.getCameraHeadingDegrees();
    const tiltDegrees = wrldMap.getCameraTiltDegrees();
    const distanceToInterest = wrldMap.getCameraDistanceToInterest();
    const interestAltitude = wrldMap.getAltitudeAtLatLng(center);
    return MapViewData(center, zoom, headingDegrees, tiltDegrees, distanceToInterest, interestAltitude);
}

export default MapViewData;
