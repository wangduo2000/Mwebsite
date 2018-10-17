import resign from '../views/G_resign.html'
const render = () => {
  document.querySelector('.form-container').innerHTML = resign
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
