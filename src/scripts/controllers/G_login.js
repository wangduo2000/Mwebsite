import login from '../views/G_login.html'
const render = () => {
  document.querySelector('.form-container').innerHTML = login
  clickUser()

}
const clickUser = () => {
  $('#type').on('tap', function () {
    let hashs = ['#login',"#resign"]
    location.hash = hashs[$(this).index()]
  })
}

export default {
  render
}

