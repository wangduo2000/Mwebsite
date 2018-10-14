import priceTpl from '../views/priceandtime.html';
import priceareaTpl from '../views/pricearea.html';
import priceareaD from '../models/price';

let province = priceareaD.priceArea.province;
let city = priceareaD.priceArea.city;
const render = async () => {
  $('main').html(priceTpl);
  renderList('.price-province',province);
  renderList('.price-city',pCity(110000));
  let list = await priceareaD.loadCity(370100);
  renderList('.price-xian',list);
  $('footer').css('display','none');
  $('.price-address').css('display','none');

  gettime();
  clicktab();
  priceScroll('.price-province','.price-city');
}

const clicktab = () => {
  $('.price-area').on('tap',function(e){
    let target = e.target;
console.log(target)
    if(target.className == 'price-send' || target.className == 'price-get'){
      $('.price-address').css('display','block');
    }
    if(target.className == 'inq-priceandtime'){
      location.href = '/price.html';
      console.log(1)
    }
    if(target.id == 'price-g-add'){
      let div = $(target).parent().prev().find('input')[0];
      let val = $(div).val();
      $(div).val(++val);
    }
    if(target.id == 'price-g-reduce'){
      let div = $(target).parent().prev().find('input')[0];
      let val = $(div).val();
      if(val<=0.5){
        val = 0.5;
      }else {
        --val;
      }
      $(div).val(val);
    }
  })
  $('.price-address').on('tap',function(e){
    let target = e.target;
    console.log(target);
    if(target.className == 'price-a-reset'){
      $('.price-address').css('display','none');
    }
    if(target.className == 'price-a-ok'){
      $('.price-address').css('display','none');
    
    }
  })
  $('.price-home li').on('tap',function(){
    let hashs = ['#inquire', '#sendexpress', '#more', '#profile'];
    location.href = '/index.html'+hashs[$(this).index()];
  })
  $('.price-home').on('tap',function(){
    $('.price-home').css('display','none');
  })
  $('.price-tit').on('tap',function(e){
    let target = e.target;
    if(target.id == 'price-menu'){
      $('.price-home').css('display','block');
    }
    if(target.id == 'price-back'){
      location.href = '/index.html';
    }
  })
}

var priceY;
var priceN;
var priceNm;
var priceCityCode;
var priceCityCode1;
var priceTimer = null;
var priceList;
const priceScroll = (where1,where2) => {
  $(where1).on('scroll',function(){
    if(priceTimer){
      clearTimeout(priceTimer);
    }
    priceY = $(where1).scrollTop();
    priceN = parseInt(priceY/40);
    priceNm = priceY%40;
    priceCityCode = parseInt(province[priceN].code);
    priceCityCode1 = parseInt(priceCityCode)+100;
    console.log(priceN,priceNm,priceCityCode1)
    if(priceNm>=30){
      priceCityCode=parseInt(province[priceN+1].code);;
      renderList(where2,pCity(priceCityCode));

    }else if(priceN == 0 && priceNm <= 15) {
      renderList(where2,pCity(priceCityCode));
    }

    let div3 = $('.price-where').find('div').eq(2);
    if(priceN>=3){
      div3.css('display','block');
      priceCityCode1=parseInt(province[priceN+1].code)+100;
      
      priceTimer = setTimeout( async () => {
        priceList = await priceareaD.loadCity(priceCityCode1);
      },300)
      renderList('.price-xian',priceList);
    }else if(priceN<3){
      div3.css('display','none');
    }

  })
}

const gettime = () => {
  let d = new Date();
  let str = d.getFullYear()+'-'+ dzero((d.getMonth()+1))+'-'+dzero(d.getDate())+" "+dzero(d.getHours())+":"+dzero(d.getMinutes());
  
  function dzero(n){
    if(n<10){
      return "0"+n;
    }
    return n;
  }
  $('.price-time').text(str);
}

const pCity = (code) => {
  let arr = [];
  city.forEach(function(value,index,array){
    if(parseInt(value.code/10000) == parseInt(code/10000)){
      let obj = {};
      obj.name = value.name;
      obj.code = value.code;
      arr.push(obj);
    }
  })
  return arr;
}

const renderList = async (where,list) => {
  let template = Handlebars.compile(priceareaTpl);
  let html = template({ list });
  $(where).html(html);
}

export default {
  render
}