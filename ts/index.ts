import express from "express";
import { Server } from "socket.io";
import http from "http";
// import { FM } from "Luck.mts"

const app = express();
const server = http.createServer(app);
const io = new Server(server); // , { path: process.cwd() + '/js/' }
const port = 3000
const master_pw = process.env['master_pw']

const lucks: Object = {}
const ladders = {}


console.log("IOPATH", io.path())
console.log("CWD", process.cwd())

app.use('/js', express.static('js'))


// app.get('/socket.io', (req: any, res: any) => {
//   res.sendFile(process.cwd() + "/socket.io.js");
// });

app.get('/index.css', (req: any, res: any) => {
  res.sendFile(process.cwd() + "/index.css");
});

app.get("/", (req: any, res: any) => {
  res.sendFile(process.cwd() + "/index.html");
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

io.on("connection", (socket) => {
  io.emit("spend", Object.values(lucks)[0])
  console.log('values', Object.values(lucks)[0])
  console.log('user connected ' + socket.handshake.address)
  socket.on('disconnect', () => {
    console.log('user dc ' + socket.handshake.address)
  })

  socket.on("spend", (fm) => {
    console.log("COIN", fm)
    io.emit("spend", fm)
  })
})

// import fs from "fs";
// fs.readdirSync('./').forEach(file => console.log(file))

console.log('index.ts eof') 
