import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor()
    {
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '1234',
            database : 'node_db'
        });

        this.conectarDB();
    }


    public static get instance()
    {
        return this._instance || ( this._instance = new this() );
    }



    private conectarDB()
    {
        this.cnn.connect((err: mysql.MysqlError) => {
            if(err)
            {
                console.log(err.message);
            }
            else
            {
                this.conectado = true;
                console.log('Base de datos online!!!');
            }
        });
    }


    public static ejecutarQuery( query:string, callback:any )
    {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            
            if ( err )
            {
                return callback( err );
            }
            else
            {
                if(results.length === 0)
                {
                    callback('El registro solicitado no existe');
                }
                else
                {
                    callback(null, results);
                }
            }
        }) ;
    }

    /*
        Previene la escapada de caracteres raros en la consultas where 
        y posible ataques de sql-inyection
    */
    public static escapeValues(value:any)
    {
        return this.instance.cnn.escape(value);
    }

}