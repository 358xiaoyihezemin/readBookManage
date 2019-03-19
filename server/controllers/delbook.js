
const { mysql } = require('../qcloud')
module.exports = async (ctx) => {
  const {id} = ctx.request.body
  if(id){
    const findRes = await mysql('books').where('id',id).del()
    console.log(findRes)
    ctx.state.data = findRes
  }else{
    ctx.state = {
      code:-1,
      data:{
        msg:'图书不存在'
      }
    }
  }
}

