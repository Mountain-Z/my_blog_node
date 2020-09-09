const router = require('koa-router')()
const db = require('../../module/db.js')
const editArticle = require('../home/editArticle')


router.get('/', async (ctx) => {

  list = await db.find('blogItems', {})
  await ctx.render('home/home', {
    list
  })

})

router.get('/delete', async (ctx) => {
  console.log(ctx.query)
  let blogsId = parseInt(ctx.query.blogsId)
  console.log(blogsId)

  let result = await db.delete('blogItems', {
    'blogsId': blogsId
  })

  if (result.result.ok) {
    console.log('成功')
    ctx.redirect('/home')
  }
  ctx.body = 'Wrong!'
})

router.get('/articleDetail', async (ctx) => {
  ctx.set('Access-Control-Allow-Origin', "*");

  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,PUT,POST,DELETE,PATCH')
  ctx.body = await db.find('blogItems', {})

})

router.use('/editArticle', editArticle)

module.exports = router.routes()