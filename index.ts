import Server from './server/server';
import router from './server/router/router';
import MySQL from './server/mysql/mysql';

const server = Server.init( 3000 );
server.app.use( router );

const mysql = new MySQL();


server.start( () => {
    console.log('Aplicacion corriendo en el puerto 3000');
} );