'use strict'

const router = require('koa-router')();
const Role = require('../models').role;
router.prefix('/roles');

router.post('/add',async ( ctx,next ) => {
    let params = ctx.request.body;
    let re = await Role.create({rolename:params.rolename,englishname:params.englishname,is_active:params.is_active,pid:params.pid,sort:params.sort});
    if ( re.dataValues ) {
        ctx.response.body = {
            code: 200,
            msg: '操作成功',
            data: re.dataValues
        };
        
    } else {
        ctx.response.body = {
            code: 10002,
            msg: '操作失败',
            data: ''
        };
    }
    
});
router.get('/delete',async ( ctx,next ) => {
    let params = ctx.query.roleIds;
    let re = await Role.destroy({
        where: {
          id: params
        }
      });
    if ( re > 0 ) {
        ctx.response.body = {
            code: 200,
            msg: '操作成功',
            data: re
        };
    } else {
        ctx.response.body = {
            code: 10003,
            msg: '操作失败',
            data: re
        };
    }
});
router.post('/update',async ( ctx,next ) => {
    let params = ctx.request.body;
    let re = await Role.update({
        rolename:params.rolename,englishname:params.englishname,is_active:params.is_active,pid:params.pid,sort:params.sort
      }, {
        where: {
          id:  params.id
        }
      });
});
router.get('/list',async (ctx,next ) => {
    let roles = await Role.findAll({
        attributes: ['id','rolename','NIDS','englishname','is_active','pid','sort','createdAt','updatedAt']
    });
    ctx.response.body = roles;
});

module.exports = router
