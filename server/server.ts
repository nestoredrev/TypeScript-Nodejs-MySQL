import express = require('express');
import path    = require('path');

// npm install @types/express --save-dev

export default class Server {

    public app: express.Application;
    public port: number;

    constructor(puerto: number)
    {
        this.port = puerto;
        this.app = express();
    }

    static init(puerto: number)
    {
        return new Server( puerto );
    }

    private publicFolder()
    {
        /*
            npm i copyfiles --save-dev paquete necesario para la copia de archivos
            Para añadir la carpeta publica en dist hay que utilizar el comando
            npm run build definido en package.json
        */

        const publicPath = path.resolve(__dirname, '../public');
        this.app.use( express.static(publicPath) );
    }

    start(callback: any)
    {
        this.app.listen(this.port, callback);
        this.publicFolder();
    }



}