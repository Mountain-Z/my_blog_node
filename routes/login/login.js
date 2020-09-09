const router = require('koa-router')()

router.get('/', (ctx) => {
  ctx.render('./login/login')
})

router.post('/dologin', (ctx) => {
  // console.log(ctx)
  // // console.log(ctx.url)
  // // console.log(ctx.path)
  // // console.log(ctx.query)
  // // console.log(ctx.request)
  // // console.log(ctx.request.query)
  // // console.log(ctx.request.query.username)

  // console.log('=============')
  // console.log(ctx.request.body)

  // let postdata = ''
  // ctx.req.addListener('data', (data) => {
  //   postdata += data
  // })

  // ctx.req.addListener('end', (res) => {
  //   // console.log(res)
  //   console.log(postdata)
  // })


  let adminInfo = ctx.request.body
  if (adminInfo.username == '123' && adminInfo.password == '123') {
    ctx.redirect('/home')
  } else {
    ctx.body = 'Wrong!'
  }
})

module.exports = router.routes()