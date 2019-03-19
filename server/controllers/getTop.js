const { mysql } = require('../qcloud')
module.exports = async (ctx) => {
  const findRes = await mysql('books').select('id','title','image','count').orderBy('count','desc').limit(9)
  ctx.state.data = {
    list:findRes
  }
}
