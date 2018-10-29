const router = require('koa-router')();
const Wifi = require('../models').wifi;
const sequelize = require('../models').sequelize;
const con = require('../appdb2'); //服务器测试库
// const con = require('../appdb4');//服务器正式库
// const con = require('../appdb3')(); //本地
const moment = require('moment');
const time = moment().format('YYYY-MM-DD HH:mm:ss');
const crypto = require('crypto');


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
                                for (let index in result) {
                                    let connectnum = parseInt(result[index].ok_counter) + parseInt(result[index].fail_counter);
                                    if (connectnum > 0) {
                                        result[index].successRate = Math.round(parseFloat(result[index].ok_counter) / parseFloat(connectnum) * 10000) / 100.00 + "%";
                                    } else {
                                        result[index].successRate = '0%';
                                    }
                                }
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

/**
 * 客服管理  
 */

router.get('/getCustomer', async(ctx, next) => {
    let uid = ctx.query.id;
    let re = await new Promise((resolve, reject) => {
        con.query('select * from users where id=?', [uid], function(err, result) {
            if (err) {
                resolve({
                    code: 10004,
                    msg: '网络出错',
                    data: ''
                });
            } else {
                result[0].birthday = moment(result[0].birthday).format('YYYY-MM-DD');
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
router.get('/customerList', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query.key;
    if (key == '' || typeof(key) == 'undefined') {
        var re = await new Promise((resolve, reject) => {
            con.query('select count(id) as num from users where role=8', [], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].num > 0) {
                        let total = result[0].num;
                        con.query('select * from users where role=8 order by createdAt desc limit ?,?', [(parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    result[index].birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                }
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
            con.query('select * from users where tel=?', [key], function(err, result) {
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
                        total: 1
                    });
                }
            })
        })
    }

    ctx.response.body = re;
});
router.post('/customerAdd', async(ctx, next) => {
    let paramlist = ctx.request.body.params;
    let pwd = paramlist.tel + paramlist.password;
    pwd = crypto.createHash('MD5').update(pwd, 'utf-8').digest('hex');
    console.log(paramlist);
    let re = await new Promise((resolve, reject) => {
        con.query(' select id from `users` where `tel`= ? ', [paramlist.tel], function(err, result) {
            if (err) {
                resolve({
                    code: 10004,
                    msg: '网络出错',
                    data: ''
                });
            } else {
                if (result.length < 1) {
                    con.query('INSERT INTO `users` (`tel`,`name`,`gender`,`avatar`,`password`,`role`,`birthday`,`address`,`eyesight`,`service`,`auth`,`createdAt`,`updatedAt`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [paramlist.tel, paramlist.name, paramlist.gender, '', pwd, 8, paramlist.birthday, paramlist.address, paramlist.eyesight, 0, 0, time, time], function(err, result) {
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
                        code: 10007,
                        msg: '该手机号已注册',
                        data: ''
                    })
                }
            }

        });

    });
    ctx.response.body = re;

});
router.post('/customerUpdate', async(ctx, next) => {
    let paramlist = ctx.request.body.params;
    let re = await new Promise((resolve, reject) => {
        con.query("select id from users where id!=? and tel=?", [paramlist.id, paramlist.tel], function(err, result) {
            if (err) {
                resolve({
                    code: 10004,
                    msg: '网络出错',
                    data: ''
                });
            } else {
                if (result.length > 0) {
                    resolve({
                        code: 10007,
                        msg: '手机号已存在',
                        data: ''
                    });
                } else {
                    con.query('update users set name = ?,tel = ?,gender=?,birthday=?,address=?,eyesight=? where id = ?', [paramlist.name, paramlist.tel, paramlist.gender, paramlist.birthday, paramlist.address, paramlist.eyesight, paramlist.id], function(err, result) {
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
                }
            }
        })
    })
    ctx.response.body = re;

});
router.get('/customerDelete', async(ctx, next) => {
    let uid = ctx.query.id;
    let re = await new Promise((resolve, reject) => {
        con.query('delete from users where id=?', [uid], function(err, result) {
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
    });
    ctx.response.body = re;
});

router.post('/updateCustomerPwd', async(ctx, next) => {
    let id = ctx.request.body.id;
    let pwd = ctx.request.body.tel + ctx.request.body.password;
    pwd = crypto.createHash('MD5').update(pwd, 'utf-8').digest('hex');
    let re = await new Promise((resolve, reject) => {
        con.query('update users set password=? where id=?', [pwd, id], function(err, result) {
            if (err) {
                resolve({
                    code: 10003,
                    msg: '操作失败',
                    data: ''
                });
            } else {
                resolve({
                    code: 10008,
                    msg: '密码更新成功',
                    data: ''
                });
            }
        });
    });
    ctx.response.body = re;
});
module.exports = router;