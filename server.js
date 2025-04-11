import { createServer } from "http";
import crypto from "crypto";

const PORT = 3333;
const WEBSOCKET_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("yo");
}).listen(PORT);

const handleSocketUpgrade = (req, socket, head) => {
  const { "sec-websocket-key": webClientSocketKey } = req.headers;

  const headers = handleSocketHandshake(webClientSocketKey);

  socket.write(headers);
};

const handleSocketHandshake = (id) => {
  const acceptKey = generateSocketAccept(id);
  const headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${acceptKey}`,
    "",
  ]
    .map((line) => line.concat("\r\n"))
    .join("");

  return headers;
};

const generateSocketAccept = (id) => {
  const sha1 = crypto.createHash("sha1");
  sha1.update(id + WEBSOCKET_KEY);
  return sha1.digest("base64");
};

server.on("upgrade", handleSocketUpgrade);
const errors = ["uncaughtException", "unhandledRejection"];

for (const error of errors) {
  process.on(error, (err) => {
    // TODO: handle errors
  });
}
