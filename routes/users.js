const router = require('koa-router')();
const User = require('../models').user;

router.prefix('/users');

router.get('/getUser', function (ctx, next) {
  ctx.body = 'this is a users response!'
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



module.exports = router
