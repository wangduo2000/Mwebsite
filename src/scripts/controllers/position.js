import positionTpl from '../views/position.html';
import positionModel from '../models/position'

const render = async () => {
  let result = await positionModel.list();
  let list = result.content.data.page.result;
  let template = Handlebars.compile(positionTpl);
  let html = template({list});
  $('main').html(html);
  // $.ajax({
  //   url: 'http://localhost:2333/api/listmore.json?pageNo=2&pageSize=15',
  //   success: (result) => {
  //     console.log(result)
  //     return result
  //   }
  // })
  // console.log(positionTpl)
  // $('main').html(positionTpl);
}

export default {
  render
}