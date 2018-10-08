const router = require('koa-router')();
const Role = require('../models').role;
router.prefix('/roles');

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

router.get('/list',async (ctx,next ) => {
    let roles = await Role.findAll({
        attributes: ['rolename', 'NIDS']
    });
    console.log(roles);
    ctx.response.body = roles;
});

module.exports = router
