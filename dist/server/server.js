"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
// npm install @types/express --save-dev
class Server {
    constructor(puerto) {
        this.port = puerto;
        this.app = express();
    }
    static init(puerto) {
        return new Server(puerto);
    }
    publicFolder() {
        /*
            npm i copyfiles --save-dev paquete necesario para la copia de archivos
            Para añadir la carpeta publica en dist hay que utilizar el comando
            npm run build definido en package.json
        */
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }
    start(callback) {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }
}
exports.default = Server;
