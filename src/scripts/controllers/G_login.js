import login from '../views/G_login.html'

const render = () => {
  $('.form-container').html(login)
  clickUser()
  clickL()

}
const clickUser = () => {
  $('#type a').on('tap', function () {
    let hashs = ['#login',"#resign"]
    location.hash = hashs[$(this).index()]
    console.log(hashs[$(this).index()])
    $(this).addClass('active').siblings().removeClass('active')

  })
}


const clickL = ()=>{
    $('#login').on('tap',function(){
       
        if (isNone()) {
            if (localStorage.user) {
                // 从localStorage取出键为user的数据模型
                var arr = eval(localStorage.user);
                let k = 0;
                // 循环取出，可用其他方法代理，数据量多的情况下，不建议使用for循环
                for (var e in arr) {
                    // 判断用户名，密码是否和localStorage中的数据一致，兼容性写法必须添加trim(),不需要兼容可以不写
                    if ($('#username').val().trim() == arr[e].username) {
                        if ($('#password').val().trim() == arr[e].password) {
                            alert('登录成功');
                            // 成功后清除用户名和密码
                            clear();
                            k = 0;
                            // 成功之后对整个登录页面ID为web的部分重新换为成功的标识（也可以选择跳转到成功页面）
                            //$("#web").html("<span style='color: blue;'>登录成功【success】</span>");
                            window.location.href = "index.html";
                            return;
                        } else {
                            alert('密码错误');
                            // 失败后清除用户名和密码
                            clear();
                            k = 0;
                            return;
                        }
                    } else {
                        k = 1;
                    }
                }
                if (k == 1) {
                    alert('用户名不存在');
                    clear();
                }
            } else {
                alert('用户名不存在，请注册！');
                clear();
            }
        
    }
    
    /**
     * 清空数据
     * 等同于
     * document.getElementById("loginName").value="";
     * document.getElementById("loginPsd").value="";
     */
    function clear() {
        $('#username').val('');
        $("#password").val('');
    }
    
    /**
     * 登录的验证方法
     * 是否为空的判断
     */
    function isNone() {
        if ($('#username').val().trim() == "") {
            alert('用户名不能为空');
            return false;
        } else if ($('#password').val().trim() == "") {
            alert('密码不能为空');
            return false;
        }
        return true;
    }
    })
}
export default {
  render
}

