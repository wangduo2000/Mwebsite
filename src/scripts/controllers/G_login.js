import login from '../views/G_login.html'

const render = () => {
  $('.form-container').html(login)
  clickUser()

}
const clickUser = () => {
  $('#type a').on('tap', function () {
    let hashs = ['#login',"#resign"]
    location.hash = hashs[$(this).index()]
    console.log(hashs[$(this).index()])
    $(this).addClass('active').siblings().removeClass('active')

  })
}

export default {
  render
}

