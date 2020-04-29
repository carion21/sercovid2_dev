const mysql = require('mysql')
const dev = {
    //connection: dev_connection,
    'host': 'localhost',
    'user': 'carion',
    'password': 'root',
    'database': 'sercovid19',
    'socketPath': '/var/run/mysqld/mysqld.sock',
    'port': 3306
}

const prod = {
    //connection: prod_connection,
    'host': 'z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    'user': 'ypd1nrz2m0rzxtg1',
    'password': 'eprjhhdvnk17eaoq',
    'database': 'nk6usufo58o1j4g6',
    'port': 3306
}

const env = prod

const HOST = env.host
const USER = env.user
const PASS = env.password
const DATA = env.database
const PORT = env.port
const SOCKET = env.socketPath

// config base de données en local

const dev_connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASS,
    database: DATA,
    port: PORT,
    socketPath: SOCKET
})

dev_connection.connect((err) => {
    if (err) {
        //connection.end()
        throw err
    }
    console.log("Base de donnée Connectée avec l'id : " + dev_connection.threadId)
    //console.log(connection)
    //connection.end()
})
var test = 'SHOW TABLES'

dev_connection.query(test, function (error, results, fields) {
    if (error) {
        console.error('error connecting: ' + error.stack)
    }
    console.log('Le contenu est: ', results)
});

//connection.end();

module.exports = dev_connection