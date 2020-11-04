import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

const WrldButton = ({ style, textStyle, title, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    const calculatedStyles = styles(isPressed, style, textStyle);

    return (
        <TouchableHighlight
            activeOpacity={1}
            style={calculatedStyles.container}
            onPressIn={() => { setIsPressed(true); }}
            onPressOut={() => { setIsPressed(false); }}
            onPress={() => { if (onPress) onPress(); }}>
            <View
                style={calculatedStyles.button}>
                <Text
                    style={calculatedStyles.text}>
                    {title}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = (pressed, style = {}, textStyle= {}) => {

    return StyleSheet.create({
        container: {
            borderRadius: 0,
            borderWidth: 0,
            width: "100%",
            height: 40,
            ...style
        },
        button: {
            backgroundColor: pressed ? "#1756a9" : "#fff",
            borderColor: "#1756a9",
            borderRadius: 0,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%"
        },
        text: {
            fontSize: 20,
            margin: 5,
            color: pressed ? "#fff" : "#1756a9",
            textAlign: "center",
            ...textStyle
        }
    });
};

export default WrldButton;