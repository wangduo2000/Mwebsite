import login from '../views/G_login.html'
const render = () => {
  document.querySelector('.form-container').innerHTML = login
  clickUser1()

}
const clickUser1 = () => {
  $('#type a').on('tap', function () {
    let hashs = ['#login',"#resign"]
    location.hash = hashs[$(this).index()]
    console.log(hashs[$(this).index()])

  })
}

export default {
  render
}

