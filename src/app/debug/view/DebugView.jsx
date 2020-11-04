import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { wrldMap } from "~/app/map/WrldMap";

const DebugView = () => {
    const [mapView, setMapView] = useState(wrldMap.getMapView());

    useEffect(() => {
        wrldMap.registerMapViewUpdateEvent(onMapViewUpdate);
        return () => {
            wrldMap.unregisterMapViewUpdateEvent(onMapViewUpdate);
        };
    }, []);

    const onMapViewUpdate = ({ data }) => {
        setMapView(data);
    };

    const getCenterText = () => {
        if ("center" in mapView && "lat" in mapView.center && "lng" in mapView.center) {
            return mapView.center.lat.toFixed(6) + ", " + mapView.center.lng.toFixed(6);
        }
        return "N/A";
    };

    const getZoomText = () => {
        if ("zoom" in mapView) {
            return mapView.zoom.toFixed(2);
        }
        return "N/A";
    };

    const getHeadingText = () => {
        if ("headingDegrees" in mapView) {
            return mapView.headingDegrees.toFixed(2);
        }
        return "N/A";
    };

    const getTiltText = () => {
        if ("tiltDegrees" in mapView) {
            return mapView.tiltDegrees.toFixed(2);
        }
        return "N/A";
    };

    const getDistText = () => {
        if ("distanceToInterest" in mapView) {
            return mapView.distanceToInterest.toFixed(2);
        }
        return "N/A";
    };

    const getAltText = () => {
        if ("interestAltitude" in mapView) {
            return mapView.interestAltitude.toFixed(2);
        }
        return "N/A";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{"Center: " + getCenterText()}</Text>
            <Text style={styles.text}>{"Zoom: " + getZoomText()}</Text>
            <Text style={styles.text}>{"Heading: " + getHeadingText()}</Text>
            <Text style={styles.text}>{"Tilt: " + getTiltText()}</Text>
            <Text style={styles.text}>{"Distance to interest: " + getDistText()}</Text>
            <Text style={styles.text}>{"Interest altitude: " + getAltText()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginTop: 24,
        marginLeft: 8,
        padding: 4,
        position: "absolute"
    },
    text: {
        color: "#fff"
    }
});

export default DebugView;
