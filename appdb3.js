var mysql = require('mysql');
var tunnel = require('tunnel-ssh');
var tunnelPort = '33334'; //can really be any free port used for tunneling
module.exports = function() {
    return new Object({
        /**
         * DB server configuration. Please note that due to the tunneling the server host
         * is localhost and the server port is the tunneling port. It is because the tunneling
         * creates a local port on localhost
         */
        dbServer: {
            host: '127.0.0.1',
            port: tunnelPort,
            user: 'root',
            password: 'WENhuai2158~!@',
            database: 're_dev'
        },
        /**
         * Default configuration for the SSH tunnel
         */
        tunnelConfig: {
            remoteHost: '127.0.0.1', // mysql server host
            remotePort: 3306, // mysql server port
            localHost: '127.0.0.1',
            localPort: tunnelPort, // a available local port
            verbose: true, // dump information to stdout
            disabled: false, //set this to true to disable tunnel (useful to keep architecture for local connections)
            keepAlive: true,
            sshConfig: { //ssh2 configuration (https://github.com/mscdex/ssh2)
                host: '47.100.110.99',
                port: 22,
                username: 'root',
                password: 'Wh2158908'
                    //privateKey: require('fs').readFileSync('<pathToKeyFile>'),
                    //passphrase: 'verySecretString' // option see ssh2 config
            }
        },

        /**
         * Initialise the mysql connection via the tunnel. Once it is created call back the caller
         *
         * @param callback
         */
        init: function(callback) {
            /* tunnel-ssh < 1.0.0 
            //
            // SSH tunnel creation
            // tunnel-ssh < 1.0.0
            var me = this;
            me.tunnel = new Tunnel(this.tunnelConfig);
            me.tunnel.connect(function (error) {
                console.log('Tunnel connected', error);
                //
                // Connect to the db
                //
                me.connection = me.connect(callback);

            });
            */

            /* tunnel-ssh 1.1.0 */
            //
            // SSH tunnel creation 
            //
            var me = this;

            // Convert original Config to new style config:
            var config = this.tunnelConfig;

            var newStyleConfig = {
                username: config.sshConfig.username,
                port: config.sshConfig.port,
                host: config.sshConfig.host,
                password: config.sshConfig.password,
                // SSH2 Forwarding... 
                dstPort: config.remotePort,
                dstHost: config.remoteHost,
                srcPort: config.localPort,
                srcHost: config.localHost,
                // Local server or something...
                localPort: config.localPort,
                localHost: config.localHost,
                // privateKey: config.privateKey
            }


            me.tunnel = tunnel(newStyleConfig, function(err, tunnel) {
                console.log('Tunnel connected', err);
                if (err) {
                    return callback(err);
                } else {
                    return callback(err, tunnel);
                }
            });
        },

        /**
         * Mysql connection error handling
         *
         * @param err
         */
        errorHandler: function(err) {

            var me = this;
            //
            // Check for lost connection and try to reconnect
            //
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log('MySQL connection lost. Reconnecting.');
                me.connection = me.connect();
            } else if (err.code === 'ECONNREFUSED') {
                //
                // If connection refused then keep trying to reconnect every 3 seconds
                //
                console.log('MySQL connection refused. Trying soon again. ' + err);
                setTimeout(function() {
                    me.connection = me.connect();
                }, 3000);
            }
        },

        /**
         * Connect to the mysql server with retry in every 3 seconds if connection fails by any reason
         *
         * @param callback
         * @returns {*} created mysql connection
         */
        connect: function(callback) {

            var me = this;
            //
            // Create the mysql connection object
            //
            var connection = mysql.createConnection(me.dbServer);
            connection.on('error', me.errorHandler);
            //
            // Try connecting
            //
            connection.connect(function(err) {
                if (err) throw err;
                console.log('Mysql connected as id ' + connection.threadId);
                if (callback) callback();
            });

            return connection;
        },
        query: function(sql, values, callback) {
            var me = this;
            //  me.tunnel.close();
            me.init(function(err, tnl) {
                console.log(tnl);
                if (err) {
                    callback(err);
                } else {
                    var connection = mysql.createConnection(me.dbServer);
                    connection.connect(function(err) {
                        if (err) {
                            callback(err);
                        } else {
                            connection.query(sql, values, function(err, rows) {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(err, rows);
                                }
                                connection.end();
                                tnl.close();
                            })
                        }

                    })

                }
            });
        }
    });

};