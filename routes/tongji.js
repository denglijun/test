const router = require('koa-router')();
const CountUser = require('../models').CountUser;
const CountFriend2blind = require('../models').CountFriend2blind;
const CountChatFailReason = require('../models').CountChatFailReason;
const CountCallanswerchat = require('../models').CountCallanswerchat;
const CountBlind2Friend = require('../models').CountBlind2Friend;
const CountAnswerFailReason = require('../models').CountAnswerFailReason;
const CountCallDetail = require('../models').CountCallDetail;
const CountChatDetail = require('../models').CountChatDetail;
const Sequelize = require('../models').Sequelize;


const moment = require("moment");

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
    if (typeof(key) != 'undefined') {
        key1 = moment(key).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
    }
    let total = await CountFriend2blind.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.like]: key1 + '%'

            }
        }
    });
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let users = await CountFriend2blind.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.like]: key1 + '%'
            }
        }
    });
    ctx.response.body = { records: users, total: total.length };
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
    if (typeof(key) != 'undefined' && key != '') {
        key1 = moment(key).add(8, 'h').utc().format('YYYY-MM-DD HH:mm:ss');
    } else {
        key1 = moment(Date.now()).format('YYYY-MM-DD');
    }

    let total = await CountBlind2Friend.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.like]: key1 + '%'
            }
        }
    });
    console.log(key1);
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let users = await CountBlind2Friend.findAll({
        where: {
            createdAt: {
                [Sequelize.Op.like]: key1 + '%'
            }
        }
    });
    ctx.response.body = { records: users, total: total.length };
});
router.get('/getCountAnswerFailReason', async(ctx, next) => {
    let total = await CountAnswerFailReason.findAll({
        attributes: ['id']
    });
    let page = ctx.query.pageNo;
    let pagenum = ctx.query.pageSize;
    let users = await CountAnswerFailReason.findAll({
        offset: (parseInt(page) - 1) * parseInt(pagenum),
        limit: parseInt(pagenum)
    });
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
            limit: parseInt(pagenum)
        });
        ctx.response.body = { records: users, total: total.length };
    } else {
        let total = await CountCallDetail.findAll({
            attributes: ['id']
        });
        let users = await CountCallDetail.findAll({
            offset: (parseInt(page) - 1) * parseInt(pagenum),
            limit: parseInt(pagenum)
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
            limit: parseInt(pagenum)
        });
        ctx.response.body = { records: users, total: total.length };
    } else {
        let total = await CountChatDetail.findAll({
            attributes: ['id']
        });
        let users = await CountChatDetail.findAll({
            offset: (parseInt(page) - 1) * parseInt(pagenum),
            limit: parseInt(pagenum)
        });
        ctx.response.body = { records: users, total: total.length };
    }
});
module.exports = router;