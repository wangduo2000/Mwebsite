import moreTpl from '../views/more.html'

const render = () => {
  $('main').html(moreTpl)
}

export default {
  render
}

// $(function () { 
//   $(".div_md a").click(function () { 
//     $("html, body").animate({ 
//       scrollTop: $($(this).attr("href")).offset().top - 100 + "px" 
//     }, 1500);
//      return false; 
//     });
// //滚动条滚动到指定位置触发下面事件
// var getDiv_md = $(".div_md");
// var offSet = getDiv_md.offset().top;
// $(window).scroll(function(){
//   if ($(window).scrollTop() > offSet){
//     $(".div_md").css({
//       "position":"fixed",
//       "left":"10px",
//       "top":"10px",
//       "z-index":"2"
//     });
//   }else{
//     $(".div_md").css({
//       "position":"",
//       "left":"0px",
//       "top":"",
//       "z-index":""
//     });
//   }})});