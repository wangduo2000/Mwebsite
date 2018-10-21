import profileTpl from '../views/profile.html'

const render = () => {
  $('main').html(profileTpl)
  profile_click();
}

const profile_click = () =>{
  $('.profile_mine').on('click',function(e){
    location.href = '/G_user.html'
  })
}

export default {
  render
}