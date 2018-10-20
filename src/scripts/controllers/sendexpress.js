import sendexpressTpl from '../views/sendexpress.html'
import sendListTpl from '../views/send-list.html'
import sendModel from '../models/send'

const render = async () => {
  $('main').html(sendexpressTpl);
  let list = (await sendModel.list()).data;
  console.log(list);
  await renderList(list);
  $(document).ready(loading());
  changeTab();
}

const renderList = async (list) => {
  let template = Handlebars.compile(sendListTpl)
  let html = template({ list })
  $('#ul').html(html)
}

let loading = () => {
  $('#loading').css("display", "none");
}

const changeTab = () => {
  $('#ul li').on('tap', function () {


    console.log(location.href)
    location.href = location.href.split("#")[0] + "?id=" + $(this).index() + '#detail';
    // location.hash = '#detail'
  })
}

export default {
  render
}