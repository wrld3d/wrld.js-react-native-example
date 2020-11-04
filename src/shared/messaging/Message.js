
const Message = (type, data = {}) => {
    return { type, data };
}

export function parse(stringified) {
    try {
        const parsed = JSON.parse(stringified);
        const type = typeof parsed.type === "string" ? parsed.type : "";
        const data = typeof parsed.data === "object" ? parsed.data : {};
        const message = Message(type, data);
        return message;
    }
    catch (e) {
        alert(e);
        return null;
    }
}

export default Message;
