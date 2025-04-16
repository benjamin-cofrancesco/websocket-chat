const socket = new WebSocket("ws://localhost:3333");

window.ChatSocket = socket;
socket.onopen = (event) => console.log("WebSocket is connected!");
socket.onmessage = (msg) => console.log(msg);
socket.onerror = (error) => console.log("websocket error", error);
socket.onclose = (event) => console.log(event);
