"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '1234',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
            }
            else {
                this.conectado = true;
                console.log('Base de datos online!!!');
            }
        });
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                return callback(err);
            }
            else {
                if (results.length === 0) {
                    callback('El registro solicitado no existe');
                }
                else {
                    callback(null, results);
                }
            }
        });
    }
    static escapeValues(value) {
        return this.instance.cnn.escape(value);
    }
}
exports.default = MySQL;
