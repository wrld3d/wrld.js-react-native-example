<a href="https://www.wrld3d.com/">
    <img src="https://cdn2.wrld3d.com/wp-content/uploads/2017/04/WRLD_Blue.png" align="right" height="80px" />
</a>

# wrld.js in React Native

**Note**: [wrld.js](https://github.com/wrld3d/wrld.js) does not officially support [React Native](https://reactnative.dev/). Make use of this example at your own risk.

This is an example of how [wrld.js](https://github.com/wrld3d/wrld.js) could be used in a [React Native](https://reactnative.dev/) app using [Expo](https://docs.expo.io/).

### Requirements
*   [Node.js](https://nodejs.org/en/) (v12.8.2 tested)
*   npm (installed with Node.js)
*   [Expo CLI](https://docs.expo.io/workflow/expo-cli/) installed globally (v3.28.4 tested)
    ```sh
    npm i -g expo-cli
    ```
*   If using a physical device:
    -   [Expo Development Client](https://expo.io/tools#client) for Android or iOS installed on your device.
*   If using an Android emulator or iOS simulator
    -   See [here](https://docs.expo.io/workflow/android-studio-emulator/) for Android emulators
    -   See [here](https://docs.expo.io/workflow/ios-simulator/) for iOS simulators
*   A [WRLD API key](https://accounts.wrld3d.com/#/tab-keys) which can be obtained by signing up for a free account at [wrld3d.com](https://wrld3d.com)

The example works by inserting a `Wrld` map into a [WebView](https://www.npmjs.com/package/react-native-webview). See [here](https://github.com/react-native-webview/react-native-webview/blob/74872a1f02c43e425f19739b1b25f5fbe614ba1f/docs/Guide.md#communicating-between-js-and-native) for information on how to communicate between a `WebView` and `React Native`.

## Getting started
### Installation
In the repo root, run:
```sh
npm install
```

### Building the example

1. Insert your [WRLD API key](https://accounts.wrld3d.com/#/tab-keys) [here](/src/config.json)

1. Compile the WebView source code into inline html.
    ```sh
    npm run build:webview
    ```
    You will need to rerun this command whenever you make any changes inside [src/webView](/src/webView) or [src/shared](src/shared)

1. Run the following command:

    ```sh
    npm run start
    ```

    This will start a local server running the app and you will be presented with a QR code. Use this QR code to open the app in the [Expo Development Client](https://expo.io/tools#client) on your device.

    If using an emulator, Open your emulator and follow the instructions in the terminal.

<img src="./images/AndroidPortrait.png" width="212px"/>
<img src="./images/AndroidLandscape.png" width="445px"/>

## Limitations
*   WebGL does not work on all mobile devices.
*   [wrld.js](https://github.com/wrld3d/wrld.js) is not optimized for mobile. See the [Android](https://www.wrld3d.com/android/latest/docs/examples/) and [iOS](https://www.wrld3d.com/ios/latest/docs/examples/) SDKs for full mobile support.
