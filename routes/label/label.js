const router = require('koa-router')()

router.get('/', async (ctx) => {
  await ctx.render('label/label')
})


module.exports = router.routes()