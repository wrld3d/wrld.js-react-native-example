#!/bin/bash
readonly script_name=${0##*/}

trap_failure () {
  echo "Failed at $script_name : $1"
  exit 1
}
trap 'trap_failure  $LINENO' ERR
set -eu

echo "Cleaning build directory"
rm -rf build
mkdir build

webpackEntry="webView/index.js"
webpackOutputName="webView.bundle.js"
webpackInlineHtml="webView.html"

echo "Compiling source to inline html..."
webpack -d --config webpack.config.js --env.entry=$webpackEntry --env.outputName=$webpackOutputName --env.inlineHtml=$webpackInlineHtml

outputFileName="webViewHtml.js"

echo ""
echo "Exporting html file as a js string"
echo "    export_file_as_js_string.js input=./build/$webpackInlineHtml output=./build/$outputFileName"

node ./scripts/export_file_as_js_string.js input=./build/$webpackInlineHtml output=./build/$outputFileName

echo "Moving $outputFileName from build directory to src/app/map/view/inline_source dir"
mkdir -p ./src/app/map/view/inline_source
mv ./build/$outputFileName ./src/app/map/view/inline_source/$outputFileName
