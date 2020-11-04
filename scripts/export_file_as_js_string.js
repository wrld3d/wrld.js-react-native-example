
const exitWithErrorMessage = (message) => {
    const writeToStderr = (str) => {
        if (typeof str === "string") {
            process.stderr.write("ERR! " + str + "\n");
        }
    }
    if (Array.isArray(message)) {
        message.forEach(line => {
            writeToStderr(line);
        });
    }
    else {
        writeToStderr(message);
    }
    process.exit(1);
};

let args = {};
const requiredArgs = ["input", "output"];

process.argv.slice(2).forEach(arg => {
    var [ key, value ] = arg.split("=");
    args[key] = value || true;
});

requiredArgs.forEach(requiredArg => {
    if (Object.keys(args).indexOf(requiredArg) === -1) {
        const errorMessage = [];
        errorMessage.push("Script requires the following args");
        requiredArgs.forEach(arg => {
            errorMessage.push(arg);
        });
        exitWithErrorMessage(errorMessage);
    }
});

const fs = require("fs");
const bundle = fs.readFileSync(args.input, "utf8");
const escaped = JSON.stringify(bundle);
const js = `export default ${escaped}`;
fs.writeFileSync(args.output, js);
