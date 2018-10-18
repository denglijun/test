const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')


const index = require('./routes/index')
const users = require('./routes/users')
const roles = require('./routes/roles')
const tongji = require('./routes/tongji')
const business = require('./routes/business')

const cors = require('koa2-cors'); //解决跨域


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views/dist', {
//   extension: 'html'
// }))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(roles.routes(), roles.allowedMethods())
app.use(tongji.routes(), tongji.allowedMethods())
app.use(business.routes(), business.allowedMethods())


//配置跨域
// app.use(cors({
//   origin: function (ctx) {
//     if (ctx.url === '/cors') {
//         return "*"; // 允许来自所有域名请求
//     }
//     return 'http://localhost:9000';
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 1728000,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE','OPTIONS'], //设置允许的HTTP请求类型
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept','authSid','authUid'],
// }));

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app