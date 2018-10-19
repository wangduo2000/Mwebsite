import profileTpl from "../views/profile.html";

const render = () => {
<<<<<<< HEAD
  $("main").html(profileTpl);
};
=======
  $('main').html(profileTpl)
  profile_click();
}

const profile_click = () =>{
  $('.profile_mine').on('click',function(e){
    location.href = '/G_user.html'
  })
}
>>>>>>> master

export default {
  render
};
