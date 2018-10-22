const mysql = require('mysql');

const pool = mysql.createPool({
    host: '172.19.229.101',
    port: '3306',
    user: 'root',
    password: 'WENhuai2158~!@',
    database: 're_dev'
});

let query = function(sql, values, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err)
            callback(err)
        } else {
            console.log('connected success');
            connection.query(sql, values, (err, rows) => {
                if (err) {
                    console.log(err)
                    callback(err)
                } else {
                    callback(err, rows)
                }
                connection.release()
            })
        }
    })

};

module.exports = {
    query
}