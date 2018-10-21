import detailTpl from '../views/senddetail.html'
import sendModel from '../models/send'

const render = async () => {
  document.querySelector('main').innerHTML = detailTpl;
  let id = location.href.split('#')[0].slice(-1);
  let list = (await sendModel.list()).data[id];
  console.log("id:" + id);
  console.log(list);
  // await renderList(list);
  // console.log("list:" + list)
  let template = Handlebars.compile(detailTpl)
  let html = template(list)
  $('main').html(html);
  $(document).ready(loading());
  clickEvent();
}

let loading = () => {
  $('#loading').css("display", "none");
}

let clickEvent = () => {
  $('.detail-tit').on('tap', function (e) {
    let target = e.target;
    if (target.id == 'detail-menu') {
      $('.detail-home').css('display', 'block');
    }
    if (target.id == 'detail-back') {
      location.href = '#sendexpress';
    }
  })
}


export default {
  render
}