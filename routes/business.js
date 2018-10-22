const router = require('koa-router')();
const Wifi = require('../models').wifi;
const sequelize = require('../models').sequelize;
const con = require('../appdb2');
const moment = require('moment');
const time = moment().format('YYYY-MM-DD HH:mm:ss');

router.prefix('/business');

router.get('/getWifi', async(ctx, next) => {
    let uid = ctx.query.uid;
    let ssid = ctx.query.ssid;

    let re = await new Promise((resolve, reject) => {
        con.query('select user_wifi.`*`,users.tel from user_wifi inner join users on user_wifi.user_id = users.id where user_id=? and ssid=?', [uid, ssid], function(err, result) {
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
                    data: result[0]
                });
            }
        });
    });
    console.log(re);
    ctx.response.body = re;


});
router.get('/wifilist', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query.key;
    if (key == '' || typeof(key) == 'undefined') {
        var re = await new Promise((resolve, reject) => {
            con.query('select count(user_id) as num from user_wifi', [], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].num > 0) {
                        let total = result[0].num;
                        con.query('select user_wifi.`*`,users.tel from user_wifi inner join users on user_wifi.user_id = users.id order by createdAt desc limit ?,?', [(parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                resolve({
                                    code: 200,
                                    records: result,
                                    total: total
                                });
                            }
                        })
                    }
                }

            })

        })
    } else {
        var re = await new Promise((resolve, reject) => {
            con.query('select count(user_id) as num from user_wifi inner join users on user_wifi.user_id = users.id where tel=?', [key], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].num > 0) {
                        let total = result[0].num;
                        con.query('select user_wifi.`*`,users.tel from user_wifi inner join users on user_wifi.user_id = users.id where tel=? order by createdAt desc limit ?,?', [(parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                resolve({
                                    code: 200,
                                    records: result,
                                    total: total
                                });
                            }
                        })
                    }
                }

            })

        })
    }

    ctx.response.body = re;
});
router.post('/wifiAdd', async(ctx, next) => {
    let paramlist = ctx.request.body.params;
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
                    con.query('INSERT INTO `user_wifi` (`user_id`,`ssid`,`password`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?)', [result[0].id, paramlist.ssid, paramlist.password, time, time], function(err, result) {
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
router.post('/wifiUpdate', async(ctx, next) => {
    let paramlist = ctx.request.body.params;
    let ver = parseInt(paramlist.version) + 1;
    let re = await new Promise((resolve, reject) => {
        con.query('update user_wifi set password = ?,version = ? where user_id = ? and ssid = ? and version = ?', [paramlist.password, ver, paramlist.user_id, paramlist.ssid, paramlist.version], function(err, result) {
            console.log(err);
            if (err) {
                resolve({
                    code: 10005,
                    msg: '更新失败',
                    data: ''
                });
            } else {
                resolve({
                    code: 200,
                    msg: '更新成功',
                    data: ''
                });
            }
        });
    })
    ctx.response.body = re;

});
router.get('/wifiDelete', async(ctx, next) => {
    let uid = ctx.query.user_id;
    let ssid = ctx.query.ssid;
    let re = await new Promise((resolve, reject) => {
        con.query('delete from user_wifi where user_id=? and ssid=?', [uid, ssid], function(err, result) {
            if (err) {
                resolve({
                    code: 10003,
                    msg: '操作失败',
                    data: ''
                });
            } else {
                resolve({
                    code: 200,
                    msg: '删除成功',
                    data: ''
                });
            }
        });
    })
    ctx.response.body = re;
});
module.exports = router;