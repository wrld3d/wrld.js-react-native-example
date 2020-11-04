import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { connectWebViewToMap } from "~/app/map/WrldMap";

import htmlString from "./inline_source/webViewHtml.js";

const WrldMap = () => {
    return (
        <WebView
            ref={(ref) => { connectWebViewToMap(ref); }}
            originWhitelist={["*"]}
            style={styles.container}
            onMessage={() => { /* dummy */ }}
            source={{
                baseUrl: "https://wrld3d.com",
                html: htmlString
            }}
            javaScriptEnabled={true}
            onError={console.error.bind(console, "error")}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default WrldMap;
