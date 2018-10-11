'use strict'

const db = require('./models');

db.sequelize.sync({alter:true}).then(function () {
    console.log('update db successful');
});
