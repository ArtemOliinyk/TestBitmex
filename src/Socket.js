export const getConnectedSocket = (arg) => {
    let socket = new WebSocket(`wss://www.bitmex.com/realtime?subscribe=${arg}`);
    socket.onopen = () => {
        console.log("Socket connected");
    };
    socket.onerror = (error) => {
        console.error("Socket has error", error);
    };
    socket.onclose = () => {
        console.warn("Socket has closed");
    };
    return socket;
};