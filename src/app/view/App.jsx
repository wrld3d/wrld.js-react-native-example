import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Orientation, getOrientationAsync, addOrientationChangeListener, removeOrientationChangeListeners } from "expo-screen-orientation";

import deviceLocationService from "~/app/device/locationService";
import { wrldMap } from "~/app/map/WrldMap";

import WrldMap from "~/app/map/view/WrldMap";
import WrldButton from "~/app/components/WrldButton";
import DebugView from "~/app/debug/view/DebugView";

const App = () => {
    const [showDebugView, setShowDebugView] = useState(false);
    const [isPortraitMode, setIsPortraitMode] = useState(async () => {
        const orientation = await getOrientationAsync();
        return orientation === Orientation.PORTRAIT_UP || orientation === Orientation.PORTRAIT_DOWN;
    });

    useEffect(() => {
        addOrientationChangeListener((event) => {
            const { orientation } = event.orientationInfo;
            setIsPortraitMode(orientation === Orientation.PORTRAIT_UP || orientation === Orientation.PORTRAIT_DOWN);
        });

        deviceLocationService.getCurrentLocationAsync()
        .then(({ latLng }) => {
            wrldMap.init(latLng);
        })
        .catch(() => {
            wrldMap.init();
        })

        return () => {
            removeOrientationChangeListeners();
        };
    }, []);

    const goToDeviceLocation = () => {
        deviceLocationService.getLastKnownPositionAsync()
        .then(({ latLng }) => {
            wrldMap.setView(latLng);
        })
        .catch(() => {
            Alert.alert("No location services available")
        });
    };

    const goToDundee = () => {
        const latLng = { lat: 56.458598, lng: -2.969868 };
        wrldMap.setView(latLng);
    };

    const goToSanFrancisco = () => {
        const latLng = { lat: 37.791592, lng: -122.39937 };
        wrldMap.setView(latLng);
    };

    return (
        <View style={styles.container(isPortraitMode)}>
            <WrldMap/>
            <View style={styles.buttonsContainer}>
                <WrldButton
                    onPress={goToDeviceLocation}
                    title={"Current Location"}
                    style={{ marginBottom: 8 }}/>
                <WrldButton
                    onPress={goToDundee}
                    title={"Dundee"}
                    style={{ marginBottom: 8 }}/>
                <WrldButton
                    onPress={goToSanFrancisco}
                    title={"San Francisco"}
                    style={{ marginBottom: 16 }}/>
                <WrldButton
                    onPress={() => { setShowDebugView(!showDebugView) }}
                    title={(showDebugView ? "Hide" : "Show") + " Debug"}/>
            </View>
            {showDebugView ? <DebugView/> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: (isPortraitMode) => ({
        flex: 1,
        flexDirection: isPortraitMode ? "column" : "row",
        backgroundColor: "#f7f7f7"
    }),
    buttonsContainer: {
        padding: 8
    }
});

export default App;
