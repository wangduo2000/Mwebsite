import detailTpl from '../views/senddetail.html'
import sendModel from '../models/send'
import commentModel from '../models/comment'
import commentList from '../views/comments-list.html'

const render = async () => {
  document.querySelector('main').innerHTML = detailTpl;
  document.querySelector('.comment-list').innerHTML = commentList;

  let id = location.href.split('#')[0].slice(-1);
  let list = (await sendModel.list()).data[id];
  let comments = (await commentModel.comments()).data;


  console.log(comments);

  //自定义helper
  Handlebars.registerHelper("if_star", function (v1, options) {
    if (v1 == 1) {
      return options.fn(this); //固定写法，满足if执行{{if}}部分
    } else {
      return options.inverse(this); // 不满足条件执行{{else}}部分
    }
  });

  //详情页
  let template = Handlebars.compile(detailTpl)
  let html = template(list)
  $('main').html(html);

  //评论
  let template2 = Handlebars.compile(commentList)
  let html2 = template2({ comments })
  $(".comment-list").html(html2)

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
      location.href = 'http://localhost:8080/#sendexpress';
    }
  })

  $(".goto").on("tap", function () {
    $(".comments").css("display", "block");
  })
  $('.comments').on("tap", function () {
    $(".comments").css("display", "none");
  })

  $("footer>ul>li:nth-child(2)").addClass("active").siblings().removeClass("active");
}


export default {
  render
}