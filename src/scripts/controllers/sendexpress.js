import sendexpressTpl from '../views/sendexpress.html'
import sendListTpl from '../views/send-list.html'
import sendModel from '../models/send'

const render = async () => {
  $('main').html(sendexpressTpl);
  let list =(await sendModel.list()).data;
  // let imgs =(await sendModel.list()).data.comlist;
  console.log(list);
  await renderList(list);
  $(document).ready(loading());
}

const renderList = async (list) => {
  let template = Handlebars.compile(sendListTpl)
  let html = template({ list })
  $('#ul').html(html)
}

let loading = ()=>{
  $('#loading').css("display","none");
}

export default {
  render
}