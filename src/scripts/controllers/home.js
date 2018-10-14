import homeTpl from '../views/home.html'

const render = () => {
  document.querySelector('#root').innerHTML = homeTpl
  changeTab()
}

const changeTab = () => {
  $('footer li').on('tap', function () {
    let hashs = ['#inquire', '#sendexpress', '#more', '#profile']
    location.hash = hashs[$(this).index()]
    $(this).addClass('active').siblings().removeClass('active')
  })
}

export default {
  render
}