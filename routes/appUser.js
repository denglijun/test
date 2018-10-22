const router = require('koa-router')();
const sequelize = require('../models').sequelize;
const con = require('../appdb2');
// const con = require('../appdb')();

const moment = require('moment');
const common = require('../lib/common.js');
const time = moment().format('YYYY-MM-DD HH:mm:ss');

router.prefix('/appUser');
/**
 * APP端盲人用户信息
 */

router.get('/appBlindInfo', async(ctx, next) => {
    console.log(111);
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query.key;
    if (key == '' || typeof(key) == 'undefined') {
        let re = await new Promise((resolve, reject) => {
            con.query('select count(id) as blindnum  from users where role=1', [], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].blindnum > 0) {
                        let total = result[0].blindnum;
                        con.query('select users.*,angelnum,money_left,totalmoney from users left join blind_account on users.id = blind_account.user_id left join (select count(*) as angelnum,blindId from `blind2family-through` group by blindId) as t on users.id = t.blindId left join (select sum(pay_money) as totalmoney,receiver_id from charge_order group by `receiver_id`) as p on users.id = p.receiver_id where users.role=1 limit ?,?', [(parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    result[index].money_use = parseFloat(result[index].totalmoney) - parseFloat(result[index].money_left);
                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        toal: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        });
                    }
                }

            })
        });
        ctx.response.body = re;
    } else {
        let re = await new Promise((resolve, reject) => {
            con.query('select count(id) as blindnum  from users where role=1 and tel=?', [key], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].blindnum > 0) {
                        let total = result[0].blindnum;
                        con.query('select users.*,angelnum,money_left,totalmoney from users left join blind_account on users.id = blind_account.user_id left join (select count(*) as angelnum,blindId from `blind2family-through` group by blindId) as t on users.id = t.blindId left join (select sum(pay_money) as totalmoney,receiver_id from charge_order group by `receiver_id`) as p on users.id = p.receiver_id where users.role=1 and tel=? limit ?,?', [key, (parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    result[index].money_use = parseFloat(result[index].totalmoney) - parseFloat(result[index].money_left);
                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        toal: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        });
                    }
                }

            })
        });
        ctx.response.body = re;
    }


});


/**
 * APP端亲友用户信息
 */

router.get('/appAngelInfo', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query.key;
    if (key == '' || typeof(key) == 'undefined') {
        let re = await new Promise((resolve, reject) => {
            con.query('select count(id) as angelnum  from users where role=2', [], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].angelnum > 0) {
                        let total = result[0].angelnum;
                        con.query('select users.*,balance,profit_total,blindnum from users left join angel_account on users.id = angel_account.user_id left join (select count(*) as blindnum,angelId from `blind2family-through` group by angelId) as p on users.id = p.angelId  where users.role=2 limit ?,?', [(parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    result[index].money_use = parseFloat(result[index].profit_total) - parseFloat(result[index].money_left);
                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        toal: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        })
                    }
                }

            })
        });
        ctx.response.body = re;
    } else {
        let re = await new Promise((resolve, reject) => {
            con.query('select count(id) as angelnum  from users where role=2 and tel=?', [key], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].angelnum > 0) {
                        let total = result[0].angelnum;
                        con.query('select users.*,balance,profit_total,blindnum from users left join angel_account on users.id = angel_account.user_id left join (select count(*) as blindnum,angelId from `blind2family-through` group by angelId) as p on users.id = p.angelId  where users.role=2 and tel=? limit ?,?', [key, (parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    result[index].money_use = parseFloat(result[index].profit_total) - parseFloat(result[index].money_left);
                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        toal: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        })
                    }
                }

            })
        });
        ctx.response.body = re;
    }

});

/**
 * APP端用户呼叫明细
 */

router.get('/userCallDetail', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query['key[]'];
    let tel = ctx.query.tel;
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
        key2 = moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
        key1 = key1 + ' 00:00:00';
        key2 = key2 + ' 00:00:00';

    }
    if (tel == '') {
        let re = await new Promise((resolve, reject) => {
            con.query("select count(id) as callnum from call_orders where date_add(call_orders.createdAt, interval '08:00:00' hour_second) > ? and date_add(call_orders.createdAt, interval '08:00:00' hour_second) < ?", [key1, key2], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].callnum > 0) {
                        let total = result[0].callnum;
                        con.query("select call_orders.*,answered_calls.chat_id as aid,answered_calls.answer_time,chat_orders.chat_id as cid,chat_orders.ua,chat_orders.ub,chat_orders.start_time as chat_start_time,chat_orders.end_time as chat_end_time,chat_orders.duration as chat_duration,chat_orders.duration2,users.name,users.address,users.birthday,users.gender,users.tel,users.eyesight from call_orders left join users on call_orders.user_id=users.id left join answered_calls on call_orders.chat_id=answered_calls.chat_id left join chat_orders on call_orders.chat_id=chat_orders.chat_id where date_add(call_orders.createdAt, interval '08:00:00' hour_second) > ? and date_add(call_orders.createdAt, interval '08:00:00' hour_second) < ? order by call_orders.createdAt desc limit ?,?", [key1, key2, (parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                console.log(err);
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    if (result[index].aid != null && result[index].cid != null) {
                                        result[index].status = '已接通';
                                        result[index].hanguptime = moment(result[index].chat_end_time).format('HH:mm:ss');
                                    }
                                    if (result[index].aid != null && result[index].cid == null) {
                                        result[index].status = '已接听';
                                        result[index].hanguptime = moment(result[index].answer_time).format('HH:mm:ss');
                                    }
                                    if (result[index].aid == null) {
                                        result[index].status = '未接听';
                                    }
                                    result[index].calldate = moment(result[index].call_time).format('YYYY-MM-DD');
                                    result[index].calltime = moment(result[index].call_time).format('HH:mm:ss');
                                    result[index].hanguptime = moment(result[index].hangup_time).format('HH:mm:ss');
                                    if (parseInt(result[index].chat_duration > 0)) {
                                        result[index].chat_duration = common.sec_to_time(result[index].chat_duration);
                                    } else {
                                        result[index].chat_duration = "00:00:00";
                                    }

                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        toal: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        })
                    }
                }

            })
        });
        ctx.response.body = re;
    } else {
        let re = await new Promise((resolve, reject) => {
            con.query("select count(id) as callnum from call_orders where date_add(call_orders.createdAt, interval '08:00:00' hour_second) > ? and date_add(call_orders.createdAt, interval '08:00:00' hour_second) < ? and tel = ?", [key1, key2, tel], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result[0].callnum > 0) {
                        let total = result[0].callnum;
                        con.query("select call_orders.*,answered_calls.chat_id as aid,answered_calls.answer_time,chat_orders.chat_id as cid,chat_orders.ua,chat_orders.ub,chat_orders.start_time as chat_start_time,chat_orders.end_time as chat_end_time,chat_orders.duration as chat_duration,chat_orders.duration2,users.name,users.address,users.birthday,users.gender,users.tel,users.eyesight from call_orders left join users on call_orders.user_id=users.id left join answered_calls on call_orders.chat_id=answered_calls.chat_id left join chat_orders on call_orders.chat_id=chat_orders.chat_id where date_add(call_orders.createdAt, interval '08:00:00' hour_second) > ? and date_add(call_orders.createdAt, interval '08:00:00' hour_second) < ? and tel=? order by call_orders.createdAt desc limit ?,?", [key1, key2, tel, (parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                console.log(err);
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    if (result[index].aid != null && result[index].cid != null) {
                                        result[index].status = '已接通';
                                        result[index].hanguptime = moment(result[index].chat_end_time).format('HH:mm:ss');
                                    }
                                    if (result[index].aid != null && result[index].cid == null) {
                                        result[index].status = '已接听';
                                        result[index].hanguptime = moment(result[index].answer_time).format('HH:mm:ss');
                                    }
                                    if (result[index].aid == null) {
                                        result[index].status = '未接听';
                                    }
                                    result[index].calldate = moment(result[index].call_time).format('YYYY-MM-DD');
                                    result[index].calltime = moment(result[index].call_time).format('HH:mm:ss');
                                    result[index].hanguptime = moment(result[index].hangup_time).format('HH:mm:ss');
                                    if (parseInt(result[index].chat_duration > 0)) {
                                        result[index].chat_duration = common.sec_to_time(result[index].chat_duration);
                                    } else {
                                        result[index].chat_duration = "00:00:00";
                                    }

                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        toal: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        })
                    }
                }

            })
        });
        ctx.response.body = re;
    }

});

/**
 * APP端用户呼叫汇总
 */

router.get('/userCalls', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query.key;
    if (key == '') {
        let re = await new Promise((resolve, reject) => {
            con.query('select user_id,count(id) as callnum from call_orders group by user_id;', [], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result.length > 0) {
                        let total = result.length;
                        con.query('select user_id,a.callnum,b.answernum,c.chatnum,users.* from (select user_id,count(id) as callnum from call_orders group by user_id) as a left join (select caller_id,count(chat_id) as answernum from answered_calls group by caller_id) as b on a.user_id=b.caller_id left join (select caller_uid,count(chat_id) as chatnum from chat_orders group by caller_uid) as c on a.user_id = c.caller_uid left join users on a.user_id=users.id limit ?,?', [(parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    if (result[index].chatnum != null) {
                                        result[index].unchatnum = parseInt(result[index].callnum) - parseInt(result[index].chatnum);
                                    } else {
                                        result[index].unchatnum = parseInt(result[index].callnum);
                                    }
                                    if (parseInt(result[index].callnum) > 0) {
                                        if (result[index].chatnum != null) {
                                            result[index].chatSuccessRate = Math.round(parseFloat(result[index].chatnum) / parseFloat(result[index].callnum) * 10000) / 100.00 + "%";
                                        } else {
                                            result[index].chatSuccessRate = "0%";
                                        }
                                        if (result[index].answernum != null) {
                                            result[index].answerSuccessRate = Math.round(parseFloat(result[index].answernum) / parseFloat(result[index].callnum) * 10000) / 100.00 + "%";
                                        } else {
                                            result[index].chatSuccessRate = "0%";
                                        }
                                        if (result[index].unchatnum != 0 || result[index].unchatnum != null) {
                                            result[index].unchatSuccessRate = Math.round(parseFloat(result[index].unchatnum) / parseFloat(result[index].callnum) * 10000) / 100.00 + "%";
                                        } else {
                                            result[index].unchatSuccessRate = "0%";
                                        }
                                    }
                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        total: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        })
                    }
                }

            })
        });
        ctx.response.body = re;
    } else {
        let re = await new Promise((resolve, reject) => {
            con.query('select user_id,count(call_orders.id) as callnum from call_orders left join users on call_orders.user_id=users.id where tel = ? group by user_id', [key], function(err, result) {
                if (err) {
                    resolve({
                        code: 10004,
                        msg: '网络出错',
                        data: ''
                    });
                } else {
                    if (result.length > 0) {
                        let total = result.length;
                        con.query('select user_id,a.callnum,b.answernum,c.chatnum,users.* from (select user_id,count(id) as callnum from call_orders group by user_id) as a left join (select caller_id,count(chat_id) as answernum from answered_calls group by caller_id) as b on a.user_id=b.caller_id left join (select caller_uid,count(chat_id) as chatnum from chat_orders group by caller_uid) as c on a.user_id = c.caller_uid left join users on a.user_id=users.id where users.tel=? limit ?,?', [key, (parseInt(page) - 1) * parseInt(pagenum), parseInt(pagenum)], function(err, result) {
                            if (err) {
                                resolve({
                                    code: 10004,
                                    msg: '网络出错',
                                    data: ''
                                });
                            } else {
                                for (let index in result) {
                                    let birthday = moment(result[index].birthday).format('YYYY-MM-DD');
                                    result[index].age = common.getAge(birthday);
                                    if (result[index].chatnum != null) {
                                        result[index].unchatnum = parseInt(result[index].callnum) - parseInt(result[index].chatnum);
                                    } else {
                                        result[index].unchatnum = parseInt(result[index].callnum);
                                    }
                                    if (parseInt(result[index].callnum) > 0) {
                                        if (result[index].chatnum != null) {
                                            result[index].chatSuccessRate = Math.round(parseFloat(result[index].chatnum) / parseFloat(result[index].callnum) * 10000) / 100.00 + "%";
                                        } else {
                                            result[index].chatSuccessRate = "0%";
                                        }
                                        if (result[index].answernum != null) {
                                            result[index].answerSuccessRate = Math.round(parseFloat(result[index].answernum) / parseFloat(result[index].callnum) * 10000) / 100.00 + "%";
                                        } else {
                                            result[index].chatSuccessRate = "0%";
                                        }
                                        if (result[index].unchatnum != 0 || result[index].unchatnum != null) {
                                            result[index].unchatSuccessRate = Math.round(parseFloat(result[index].unchatnum) / parseFloat(result[index].callnum) * 10000) / 100.00 + "%";
                                        } else {
                                            result[index].unchatSuccessRate = "0%";
                                        }
                                    }
                                }
                                resolve({
                                    code: 200,
                                    msg: '操作成功',
                                    data: {
                                        records: result,
                                        total: total
                                    }
                                });
                            }
                        });
                    } else {
                        resolve({
                            code: 10006,
                            msg: '暂无数据',
                            data: ''
                        })
                    }
                }

            })
        });
        ctx.response.body = re;
    }

});

module.exports = router;