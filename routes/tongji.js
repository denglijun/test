const router = require('koa-router')();
const CountUser = require('../models').CountUser;
const CountFriend2blind = require('../models').CountFriend2blind;
const CountChatFailReason = require('../models').CountChatFailReason;
const CountCallanswerchat = require('../models').CountCallanswerchat;
const CountBlind2Friend = require('../models').CountBlind2Friend;
const CountAnswerFailReason = require('../models').CountAnswerFailReason;
const CountCallDetail = require('../models').CountCallDetail;
const CountChatDetail = require('../models').CountChatDetail;
const Sequelize = require('../models').sequelize;
const xlsx = require('node-xlsx');
const send = require('koa-send');

const fs = require('fs');


const moment = require("moment");
const con = require('../appdb')();


router.prefix('/tongji');

router.get('/getCountUser', async(ctx, next) => {
    let total = await CountUser.findAll({
        attributes: ['id']
    });
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let users = await CountUser.findAll({
        offset: (parseInt(page) - 1) * parseInt(pagenum),
        limit: parseInt(pagenum)
    });
    ctx.response.body = { records: users, total: total.length };
});
router.get('/getCountFriend2blind', async(ctx, next) => {
    let key = ctx.query.key;
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined' && key != '') {
        key1 = moment(key).add(8, 'h').utc().format('YYYY-MM-DD');
        key2 = moment(key1).add('1', 'd');
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
        key2 = moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
    }
    let total = await CountFriend2blind.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.gt]: key1,
                [Sequelize.Op.lt]: key2
            }
        }
    });
    ctx.response.body = { records: total, total: total.length };
});
router.get('/getCountChatFailReason', async(ctx, next) => {
    let total = await CountChatFailReason.findAll({
        attributes: ['id']
    });
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let users = await CountChatFailReason.findAll({
        offset: (parseInt(page) - 1) * parseInt(pagenum),
        limit: parseInt(pagenum)
    });
    ctx.response.body = { records: users, total: total.length };
});
router.get('/getCountCallanswerchat', async(ctx, next) => {
    let total = await CountCallanswerchat.findAll({
        attributes: ['id']
    });
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let users = await CountCallanswerchat.findAll({
        offset: (parseInt(page) - 1) * parseInt(pagenum),
        limit: parseInt(pagenum)
    });
    ctx.response.body = { records: users, total: total.length };
});
router.get('/getCountBlind2Friend', async(ctx, next) => {
    let key = ctx.query.key;
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined' && key != '') {
        key1 = moment(key).add(8, 'h').utc().format('YYYY-MM-DD');
        key2 = moment(key1).add('1', 'd');
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
        key2 = moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
    }
    key1 = key1.toString();
    let total = await CountBlind2Friend.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.gt]: key1,
                [Sequelize.Op.lt]: key2
            }
        }
    });
    ctx.response.body = { records: total, total: total.length };
});
router.get('/getCountAnswerFailReason', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query['key[]'];
    let result = [];
    let failnumsum = 0;
    if (typeof(key) != 'undefined') {
        key1 = key[0];
        key2 = key[1];
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
        key2 = moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
    }
    let total = await CountAnswerFailReason.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.gt]: key1,
                [Sequelize.Op.lt]: key2
            }
        }
    });
    let users = await CountAnswerFailReason.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.gt]: key1,
                [Sequelize.Op.lt]: key2
            }
        },
        offset: (parseInt(page) - 1) * parseInt(pagenum),
        limit: parseInt(pagenum),
        order: [
            ['failnum', 'DESC']
        ]
    });
    if (total.length > 0) {
        for (let i in total) {
            failnumsum += parseInt(total[i].failnum);
        }
        for (let k in users) {
            users[k].dataValues.proportion = Math.round(parseFloat(users[k].failnum) / parseFloat(failnumsum) * 10000) / 100.00 + "%";
        }
    }
    console.log(users);
    ctx.response.body = { records: users, total: total.length };
});
router.get('/calldetail', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query['key[]'];
    console.log(key);
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        let total = await CountCallDetail.findAll({
            where: {
                callAt: {
                    [Sequelize.Op.between]: [key1, key2]
                }
            }
        });

        let users = await CountCallDetail.findAll({
            where: {
                callAt: {
                    [Sequelize.Op.between]: [key1, key2]
                }
            },
            offset: (parseInt(page) - 1) * parseInt(pagenum),
            limit: parseInt(pagenum),
            order: [
                ['callAt', 'DESC']
            ]
        });
        ctx.response.body = { records: users, total: total.length };
    } else {
        let total = await CountCallDetail.findAll({
            attributes: ['id']
        });
        let users = await CountCallDetail.findAll({
            offset: (parseInt(page) - 1) * parseInt(pagenum),
            limit: parseInt(pagenum),
            order: [
                ['callAt', 'DESC']
            ]
        });
        ctx.response.body = { records: users, total: total.length };
    }
});

router.get('/chatdetail', async(ctx, next) => {
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let key = ctx.query['key[]'];
    console.log(key);
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        let total = await CountChatDetail.findAll({
            where: {
                callAt: {
                    [Sequelize.Op.between]: [key1, key2]
                }
            }
        });

        let users = await CountChatDetail.findAll({
            where: {
                callAt: {
                    [Sequelize.Op.between]: [key1, key2]
                }
            },
            offset: (parseInt(page) - 1) * parseInt(pagenum),
            limit: parseInt(pagenum),
            order: [
                ['callAt', 'DESC']
            ]
        });
        ctx.response.body = { records: users, total: total.length };
    } else {
        let total = await CountChatDetail.findAll({
            attributes: ['id']
        });
        let users = await CountChatDetail.findAll({
            offset: (parseInt(page) - 1) * parseInt(pagenum),
            limit: parseInt(pagenum),
            order: [
                ['callAt', 'DESC']
            ]
        });
        ctx.response.body = { records: users, total: total.length };
    }
});

router.get('/answerFailDetail', async(ctx, next) => {
    let page = parseInt(ctx.query.pageNo);
    let pagenum = parseInt(ctx.query.pageSize);
    let key = ctx.query['key[]'];
    let key1 = '';
    let key2 = '';
    let ids = [];
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
    } else {
        key1 = moment(Date.now() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
        key2 = moment(Date.now()).format('YYYY-MM-DD');
    }
    let chat_ids = await CountChatDetail.findAll({
        attributes: ['chat_id'],
        where: {
            callAt: {
                [Sequelize.Op.between]: [key1, key2]
            }
        }
    });
    for (let k in chat_ids) {
        ids.push(chat_ids[k].dataValues.chat_id);
    }
    let total = await CountCallDetail.findAll({
        where: {
            callAt: {
                [Sequelize.Op.between]: [key1, key2]
            },
            chat_id: {
                [Sequelize.Op.notIn]: ids
            }
        }
    });
    let result = await CountCallDetail.findAll({
        where: {
            callAt: {
                [Sequelize.Op.between]: [key1, key2]
            },
            chat_id: {
                [Sequelize.Op.notIn]: ids
            }
        },
        offset: (parseInt(page) - 1) * parseInt(pagenum),
        limit: parseInt(pagenum),
        order: [
            ['callAt', 'DESC']
        ]
    });
    ctx.response.body = { records: result, total: total.length };


});
router.get('/chatdetailexcel', async(ctx, next) => {
    let key = ctx.query['searchKey[]'];
    console.log(key);
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');

        let result = await CountChatDetail.findAll({
            where: {
                callAt: {
                    [Sequelize.Op.between]: [key1, key2]
                }
            },
            order: [
                ['callAt', 'DESC']
            ]
        });
        let datas = [
            ['接通id', '呼叫者电话', '呼叫者姓名', '被呼叫者电话', '挂断原因', '呼叫时间', '挂断时间', '通话时长', '亲友端APP版本号', '盲人端APP版本号', '呼叫日期']
        ];
        for (let index in result) {
            let data = [result[index].chat_id, result[index].caller_tel, result[index].caller_name, result[index].callee_tel, result[index].hangup_reason, result[index].call_time, result[index].hangup_time, result[index].duration, result[index].ua, result[index].ub, result[index].callAt]
            datas.push(data);
        }

        let buffer = xlsx.build([{
            name: 'sheet1',
            data: datas
        }]);

        fs.writeFileSync('public/uploads/chatdetail.xlsx', buffer, { 'flag': 'w' }); //生成excel
        ctx.response.body = {
            code: 200,
            data: 'uploads/chatdetail.xlsx'
        };
    } else {
        let result = await CountChatDetail.findAll({
            attributes: ['id', 'chat_id', 'caller_tel', 'caller_name', 'callee_tel', 'hangup_reason', 'call_time', 'hangup_time', 'duration', 'ua', 'ub', 'callAt'],
            order: [
                ['callAt', 'DESC']
            ]
        });
        let datas = [
            ['接通id', '呼叫者电话', '呼叫者姓名', '被呼叫者电话', '挂断原因', '呼叫时间', '挂断时间', '通话时长', '亲友端APP版本号', '盲人端APP版本号', '呼叫日期']
        ];
        for (let index in result) {
            let data = [result[index].chat_id, result[index].caller_tel, result[index].caller_name, result[index].callee_tel, result[index].hangup_reason, result[index].call_time, result[index].hangup_time, result[index].duration, result[index].ua, result[index].ub, result[index].callAt]
            datas.push(data);
        }

        let buffer = xlsx.build([{
            name: 'sheet1',
            data: datas
        }]);

        fs.writeFileSync('public/uploads/chatdetail.xlsx', buffer, { 'flag': 'w' }); //生成excel
        // ctx.attachment('public/uploads/test1.xlsx');
        // let test = await send(ctx, 'public/uploads/test1.xlsx');
        // console.log(test);
        ctx.response.body = {
            code: 200,
            data: 'uploads/chatdetail.xlsx'
        };
    }
});

router.get('/calldetailexcel', async(ctx, next) => {
    let key = ctx.query['searchKey[]'];
    let dd = moment(Date.now()).format('YYYYMMDD');
    console.log(key);
    let key1 = '';
    let key2 = '';
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        let result = await CountCallDetail.findAll({
            where: {
                callAt: {
                    [Sequelize.Op.between]: [key1, key2]
                }
            },
            order: [
                ['callAt', 'DESC']
            ]
        });
        let datas = [
            ['呼叫者电话', '呼叫者姓名', '被呼叫者电话', '挂断原因', '呼叫时间']
        ];
        for (let index in result) {
            let data = [result[index].caller_tel, result[index].caller_name, result[index].callee_tel, result[index].hangup_reason, result[index].callAt];
            datas.push(data);
        }

        let buffer = xlsx.build([{
            name: 'sheet1',
            data: datas
        }]);

        fs.writeFileSync('public/uploads/calldetail' + dd + '.xlsx', buffer, { 'flag': 'w' }); //生成excel
        ctx.response.body = {
            code: 200,
            data: 'uploads/calldetail' + dd + '.xlsx'
        };

    } else {
        let result = await CountCallDetail.findAll({
            order: [
                ['callAt', 'DESC']
            ]
        });
        let datas = [
            ['呼叫者电话', '呼叫者姓名', '被呼叫者电话', '挂断原因', '呼叫时间']
        ];
        for (let index in result) {
            let data = [result[index].caller_tel, result[index].caller_name, result[index].callee_tel, result[index].hangup_reason, result[index].callAt];
            datas.push(data);
        }

        let buffer = xlsx.build([{
            name: 'sheet1',
            data: datas
        }]);

        fs.writeFileSync('public/uploads/calldetail' + dd + '.xlsx', buffer, { 'flag': 'w' }); //生成excel
        ctx.response.body = {
            code: 200,
            data: 'uploads/calldetail' + dd + '.xlsx'
        };
    }
});

router.get('/getCountAnswerFailReasonExcel', async(ctx, next) => {
    let key = ctx.query['searchKey[]'];
    let dd = moment(Date.now()).format('YYYYMMDD');
    let failnumsum = 0;
    if (typeof(key) != 'undefined') {
        key1 = key[0];
        key2 = key[1];
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
        key2 = moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
    }
    let result = await CountAnswerFailReason.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.gt]: key1,
                [Sequelize.Op.lt]: key2
            }
        },
        order: [
            ['failnum', 'DESC']
        ]
    });
    let datas = [
        ['数量', '比例', '原因', '统计时间']
    ];
    if (result.length > 0) {
        for (let i in result) {
            failnumsum += parseInt(result[i].failnum);
        }
        for (let index in result) {
            let proportion = Math.round(parseFloat(result[index].failnum) / parseFloat(failnumsum) * 10000) / 100.00 + "%";
            let data = [result[index].failnum, proportion, result[index].reason, result[index].createdAt];
            datas.push(data);
        }
    }

    let buffer = xlsx.build([{
        name: 'sheet1',
        data: datas
    }]);

    fs.writeFileSync('public/uploads/answerfailreason' + dd + '.xlsx', buffer, { 'flag': 'w' }); //生成excel
    ctx.response.body = {
        code: 200,
        data: 'uploads/answerfailreason' + dd + '.xlsx'
    };

});
router.get('/getCountAnswerFailDetailExcel', async(ctx, next) => {
    let key = ctx.query['key[]'];
    let dd = moment(Date.now()).format('YYYYMMDD');
    let key1 = '';
    let key2 = '';
    let ids = [];
    if (typeof(key) != 'undefined') {
        key1 = moment(key[0]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
        key2 = moment(key[1]).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
    } else {
        key1 = moment(Date.now() - 24 * 60 * 60 * 1000).format('YYYY-MM-DD');
        key2 = moment(Date.now()).format('YYYY-MM-DD');
    }
    let chat_ids = await CountChatDetail.findAll({
        attributes: ['chat_id'],
        where: {
            callAt: {
                [Sequelize.Op.between]: [key1, key2]
            }
        }
    });
    for (let k in chat_ids) {
        ids.push(chat_ids[k].dataValues.chat_id);
    }
    let result = await CountCallDetail.findAll({
        where: {
            callAt: {
                [Sequelize.Op.between]: [key1, key2]
            },
            chat_id: {
                [Sequelize.Op.notIn]: ids
            }
        },
        order: [
            ['callAt', 'DESC']
        ]
    });
    let datas = [
        ['呼叫者电话', '呼叫者姓名', '被呼叫者电话', '挂断原因', '呼叫时间']
    ];
    for (let index in result) {
        let data = [result[index].caller_tel, result[index].caller_name, result[index].callee_tel, result[index].hangup_reason, result[index].callAt];
        datas.push(data);
    }

    let buffer = xlsx.build([{
        name: 'sheet1',
        data: datas
    }]);

    fs.writeFileSync('public/uploads/answerfaildetail' + dd + '.xlsx', buffer, { 'flag': 'w' }); //生成excel
    ctx.response.body = {
        code: 200,
        data: 'uploads/answerfaildetail' + dd + '.xlsx'
    };

});

router.get('/customer', async(ctx, next) => {
    let result = await new Promise((resolve, reject) => {
        con.query('select * from users where role=8', [], function(err, re) {
            console.log(err);
            console.log(re);
            resolve(re);
        });
    });
    let datas = [
        ['用户id', '电话', '姓名', '性别', '角色', '生日', '地址', '视力']
    ];
    for (let index in result) {
        let data = [result[index].id, result[index].tel, result[index].name, result[index].gender, result[index].role, result[index].birthday, result[index].address, result[index].eyesight];
        datas.push(data);
    }

    let buffer = xlsx.build([{
        name: 'sheet1',
        data: datas
    }]);

    fs.writeFileSync('public/uploads/customer.xlsx', buffer, { 'flag': 'w' }); //生成excel
    ctx.response.body = {
        code: 200,
        data: 'uploads/customer.xlsx'
    };

});

module.exports = router;