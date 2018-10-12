const router = require('koa-router')();
const User = require('../models').user;
const UserRole = require('../models').user_role;
const sequelize = require('../models').sequelize;

router.prefix('/users');

router.get('/get',async (ctx,next ) => {
  let id = ctx.query.id;
  let user = await User.findAll({
    where: {
      id:id
    }
  });
  if ( user.length > 0 ) {
    ctx.response.body = user[0];
  }
});

//登录
router.post('/login', async (ctx, next) => {
  let username = ctx.request.body.params.username;
  let pwd = ctx.request.body.params.password;
  let user = await User.findAll({
    where: {
      username: username
    }
  });
  if ( user ) {
    if ( user[0].pwd == pwd ) {
      ctx.response.body = {
        code: 200,
        msg: '登录成功',
        data: user[0]
      };
    } else {
      ctx.response.body = {
        code: 10000,
        msg: '密码错误',
        data: ''
      };
    }
  } else {
    ctx.response.body = {
      code: 10001,
      msg: '用户不存在',
      data: ''
    };
  }
});

router.post("/add",async(ctx,next) => {
  let params = ctx.request.body;
  let re = await User.create({username:params.username,pwd:params.pwd,tel:params.tel,email:params.email,status:params.status});
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

router.get("/list",async(ctx,next) => {
  let usernum = await User.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'usernum']]
  });
  let page = ctx.query.pageNo;
  let pagenum = ctx.query.pageSize;
  let users = await User.findAll({
      offset: (parseInt(page)-1)*parseInt(pagenum),
      limit: parseInt(pagenum)
  });
  ctx.response.body = {records:users,total:usernum[0].dataValues.usernum};
});

router.get("/delete",async(ctx,next) => {
  let params = ctx.query.userIds;
  let re = await User.destroy({
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
    let re = await User.update({
      username:params.username,pwd:params.pwd,tel:params.tel,email:params.email,status:params.status
      }, {
        where: {
          id:  params.id
        }
      });
    ctx.response.body = {
      code: 200,
      msg: '更新成功',
      data: params
    }
});
router.get('/setRoles',async (ctx,next) => {
  var roleId = ctx.query.roleIds;
  var userId = ctx.query.userId;
  console.log(UserRole);
  var re = await UserRole.create({
    uid:userId,
    rid: roleId
  });
  ctx.response.body = {
    code: 200,
    msg: '设置成功',
    data: ''
  };
});

module.exports = router
