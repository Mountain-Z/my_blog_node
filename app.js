const koa = require('koa')
const Router = require('koa-router')
const path = require('path')
const render = require('koa-art-template')
const bodyParse = require('koa-bodyparser')

const app = new koa()
const router = new Router()
const login = require('./routes/login/login.js')
const home = require('./routes/home/home.js')
const label = require('./routes/label/label.js')
const category = require('./routes/category/category.js')
const userInfo = require('./routes/userInfo/userInfo.js')

app.use(bodyParse())

render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
})

router.use('/login', login)
router.use('/home', home)
router.use('/category', category)
router.use('/label', label)
router.use('/userInfo', userInfo)


router.get('/', (ctx) => {
  ctx.redirect('/login')
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)