const router = require('koa-router')()

router.get('/', async (ctx) => {
  await ctx.render('userInfo/userInfo')
})


module.exports = router.routes()