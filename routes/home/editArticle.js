const db = require('../../module/db')

const router = require('koa-router')()


router.get('/', (ctx) => {
  ctx.render('./home/editArticle')
})

router.post('/doarticle', (ctx) => {
  const date = new Date()
  const article = ctx.request.body

  console.log(article)

  db.insert('blogItems', {
    blogsId: date.getTime(),
    createDate: date.toLocaleString(),
    title: article.title,
    content: article.content,
    category: article.category,
    label: article.label,
    discription: article.discription,
    author: article.author
  })
  ctx.redirect('/home')

  ctx.body = date.toLocaleString()
})

module.exports = router.routes()