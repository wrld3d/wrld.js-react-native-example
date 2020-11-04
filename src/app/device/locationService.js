import * as Loc from "expo-location";

const getLatLngFromLocationData = (location) => {
    const { coords } = location;
    return { lat: coords.latitude, lng: coords.longitude };
}

class DeviceLocationService {

    async getCurrentLocationAsync() {
        const status = await Loc.getProviderStatusAsync();
        if (!status.locationServicesEnabled) {
            const message = "Location Services Disabled.";
            return new Promise((_resolve, reject) => { reject({ message }); });
        }

        const response = await Loc.requestPermissionsAsync();
        console.log("device location permission response");
        console.log(response);
        if (!response.granted) {
            const message = "Permission to access location was denied.";
            return new Promise((_resolve, reject) => { reject({ message }); });
        }

        const location = await Loc.getCurrentPositionAsync({});
        console.log("device location response");
        console.log(location);
        const latLng = getLatLngFromLocationData(location);
        return new Promise((resolve) => {
            resolve({
                latLng
            });
        });
    }
    
    async getLastKnownPositionAsync() {
        const location = await Loc.getLastKnownPositionAsync({});
        if (!location) {
            const message = "Last known position is not available.";
            return new Promise((_resolve, reject) => { reject({ message }); });
        }
        const latLng = getLatLngFromLocationData(location);
        return new Promise((resolve) => {
            resolve({
                latLng
            });
        });
    }
    
}

const deviceLocationService = new DeviceLocationService();
export default deviceLocationService;