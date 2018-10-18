const router = require('koa-router')();
const Wifi = require('../models').wifi;
const sequelize = require('../models').sequelize;
const appdb = require('../appdb')();
const uuid = require('node-uuid');
const moment = require('moment');
const time = moment().format('YYYY-MM-DD HH:mm:ss');

router.prefix('/business');

router.get('/getWifi', async(ctx, next) => {

});
router.get('/wifilist', async(ctx, next) => {

});
router.post('/wifiAdd', async(ctx, next) => {
    let paramlist = ctx.request.body.params;
    appdb.init();
    let con = appdb.connect();
    let re = await new Promise((resolve, reject) => {
        con.query(' select id from `users` where `tel`= ? ', [paramlist.tel], function(err, result) {
            if (err) {
                resolve({
                    code: 10004,
                    msg: '网络出错',
                    data: ''
                });
            } else {
                if (result.length > 0) {
                    con.query('INSERT INTO `user_wifi` (`user_id`,`ssid`,`password`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?)', [result[0].id, paramlist.wifiname, paramlist.wifipwd, time, time], function(err, result) {
                        if (err) {
                            resolve({
                                code: 10004,
                                msg: '网络出错',
                                data: ''
                            });
                        } else {
                            resolve({
                                code: 200,
                                msg: '操作成功',
                                data: ''
                            });
                        }
                    });
                } else {
                    resolve({
                        code: 10001,
                        msg: '用户不存在',
                        data: ''
                    })
                }
            }

        });

    });
    ctx.response.body = re;

});
router.get('/wifiUpdate', async(ctx, next) => {

});
router.get('/wifiDelete', async(ctx, next) => {

});
module.exports = router;