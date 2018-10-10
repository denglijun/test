const mysql = require('mysql')

const pool = mysql.createPool({
  host     :  'localhost',
  user     :  'root',
  password :  '123456',
  database :  'whsystem'
});

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        console.log( err )
        resolve( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            console.log( err )
            reject( err )
          } else {
            resolve(err,rows)
          }
          connection.release()
        })
      }
    })
  })
}


module.exports = {
  query
}