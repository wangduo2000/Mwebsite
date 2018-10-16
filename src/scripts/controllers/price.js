import priceTpl from '../views/priceandtime.html';
import priceareaTpl from '../views/pricearea.html';
import pricepriceTpl from '../views/price-price.html';
import priceareaD from '../models/price';

var priceY;
var priceN;
var priceNm;
var priceCityCode;
var priceProvinceCode;
var priceCityCode1;
var priceCity;
var priceTimer = null;
var priceList;
var PY;
var which;
let province = priceareaD.priceArea.province;
let city = priceareaD.priceArea.city;
const render = async () => {
  $('main').html(priceTpl);
  renderList('.price-province',province,priceareaTpl);
  renderList('.price-city',pCity(110000),priceareaTpl);
  let list = await priceareaD.loadCity(370100);
  renderList('.price-xian',list,priceareaTpl);
  $('footer').css('display','none');

  gettime();
  clicktab();
  priceScroll('.price-province','.price-city');
  priceScroll('.price-city','.price-xian');
  priceScroll('.price-xian');
}

const clicktab = () => {
  $('.price-area').on('tap',async function(e){
    let target = e.target;
    if(target.className == 'price-send' || target.className == 'price-get'){
      $('.price-address').css('display','block');
      if(target.className == 'price-send'){
        which = $('.price-send');
      }else{
        which = $('.price-get');
      }
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
    if(target.className == 'price-chaxun'){
      let wW = $(target).parent().prev();
      let obj = {};
      let time = wW.find('.price-time').eq(0).text();
      let weight = wW.prev().find('div').eq(1).find('input').eq(0).val();
      let get = wW.prev().prev().find('div').eq(1).text();
      let send = wW.prev().prev().prev().find('div').eq(1).text();
      obj.method = "priceandtimenew";
      obj.startPlace = `${send}`;
      obj.endPlace = `${get}`;
      obj.weight = `${weight}`;
      obj.startTime = `${time}`;
      obj.longitude = "undefined";
      obj.latitude = "";
      obj.token = "";
      obj.platform = "MWWW";
      let list = (await priceareaD.loadPrice(obj)).data;
      renderList('.price-g-company',list,pricepriceTpl);
      $('.price-company').css('display','block');
    }
  })
  $('.price-address').on('tap',function(e){
    let target = e.target;
    if(target.className == 'price-a-reset'){
      $('.price-address').css('display','none');
    }
    if(target.className == 'price-a-ok'){
      $('.price-address').css('display','none');
      //判断每个ul滚动
      let ulCname = '';
      let ulA = parseInt($('.price-province').scrollTop()/40);
      console.log($('.price-province').scrollTop())
      let ulACode = parseInt(province[ulA].code);
      let ulAname = province[ulA].name;
      let cityList = pCity(ulACode);
      let ulB = parseInt($('.price-city').scrollTop()/40);
      let ulBname = cityList[ulB].name;
      console.log($('.price-province').scrollTop(),priceY,ulA,ulACode,ulAname,ulB,cityList,ulBname)
      if($('.price-xian').parent().css('display') == 'block'){
        let ulC = parseInt($('.price-xian').scrollTop()/40);
        ulCname = '-'+priceList[ulC].name;
        
      }
      let str = ulAname+'-'+ulBname+ulCname;
      which.find('div').eq(1).text(str);
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

const priceScroll = (where1,where2) => {
  // let where = (where1+'-y').slice(1)+'';
  // let which = document.getElementsByClassName(where)[0];
  // let posScroll = new BScroll(which, {
  //   probeType: 2
    
  // });//$(where1)
  $(where1).on('scroll',function(){
    if(priceTimer){
      clearTimeout(priceTimer);
    }
    priceY = $(where1).scrollTop();//$(where1).scrollTop(),this.y
    priceN = parseInt(priceY/40);
    priceNm = priceY%40;
    if(where1 == '.price-province'){
      priceCityCode = parseInt(province[priceN].code);
      priceCityCode1 = parseInt(priceCityCode)+100;
    }
    
    console.log(priceN,priceNm,priceCityCode1)
    if(priceNm>=30){
      if(where1 == '.price-province'){
        priceCityCode=parseInt(province[priceN+1].code);
        console.log(priceCityCode)
        renderList(where2,pCity(priceCityCode),priceareaTpl);
      }

      if(where1 == '.price-city'){
        PY = parseInt($(where1).scrollTop()/40);
        priceProvinceCode = parseInt(province[PY].code);
        priceCity = pCity(priceProvinceCode);
        priceCityCode = parseInt(priceCity[priceN+1].code);
        priceTimer = setTimeout( async () => {
          priceList = await priceareaD.loadCity(priceCityCode);
        },300);
        renderList('.price-xian',priceList,priceareaTpl);
      }

    }else if(priceN == 0 && priceNm <= 15) {
      renderList(where2,pCity(priceCityCode),priceareaTpl);
    }

    if(where1 == '.price-province'){
      let div3 = $('.price-where').find('div').eq(2);
      if(priceN>=3){
        div3.css('display','block');
        priceCityCode1=parseInt(province[priceN+1].code)+100;
        
        priceTimer = setTimeout( async () => {
          priceList = await priceareaD.loadCity(priceCityCode1);
        },300)
        renderList('.price-xian',priceList,priceareaTpl);
      }else if(priceN<2 || (priceN == 2 && priceNm <=15) || priceN==3){
        div3.css('display','none');
      }
      
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

const renderList = async (where,list,which) => {
  let template = Handlebars.compile(which);
  let html = template({ list });
  $(where).html(html);
}

export default {
  render
}