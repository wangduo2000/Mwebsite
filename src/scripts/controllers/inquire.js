import inquireTpl from '../views/inquire.html'

const render = () => {
  $('main').html(inquireTpl);
  $('.inq-wechart').css('display','none');

  clicktab();
}

const clicktab = () => {
  $('.inq-four li').on('tap',function(e){
    let target = e.target;
console.log(target)
    if(target.className == 'inq-sendexpress'){
      location.hash = '#sendexpress';
    }
    if(target.className == 'inq-priceandtime'){
      location.href = '/price.html';
      console.log(1)
    }
  })

  //微信二维码出现
  $('.inq-onwechart').on('tap',function(){
    $('.inq-wechart').css('display','flex');
  })

  //微信二维码消失
  $('.inq-wechart').on('tap',function(){
    $(this).css('display','none');
  })
}

export default {
  render
}