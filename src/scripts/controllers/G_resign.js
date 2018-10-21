import resign from '../views/G_resign.html'


const render = () => {
    $('.form-container').html(resign);
    
    clickM();
    clickT();
}

const clickT = () => {
    $("#submit").on('tap', function () {
        if (isNone()) {
            // 定义一个空数组
            let arr = [];
            if (localStorage.user) {
                arr = eval(localStorage.user);
                for (var e in arr) {
                    // 取出数据判断是否注册过
                    if ($('#username').val().trim() == arr[e].username) {
                        alert('该账号已被注册');
                        clear();
                        return;
                    }
                }
            }
            const user = {
                'username': $("#username").val(),
                'password': $("#password").val()
            };
            // 添加数据
            arr.push(user);
            localStorage.user = JSON.stringify(arr);
            alert('注册成功');
            //window.location.href = "login.html";
            clear();
        }
        function clear() {
            $('#username').val('');
            $("#password").val('');
            $("#password1").val('');

        }
        function isNone() {
            if ($('#username').val().trim() == "") {
                alert('用户名不能为空');
                return false;
            } else if ($('#password').val().trim() == "") {
                alert('密码不能为空');
                return false;
            } else if ($('#password').val().trim() != $('#password1').val().trim()) {
                alert('两次密码不一致，请检查！');
                return false;
            } else if ($('.vco').val() != $('.vcode').text()) {
                alert('请保证验证码输入正确!');
                return false;
            } 
            return true;
        }

        
    })
}

const clickM = ()=>{
    $('.vcode').on('tap',function(){
        function randomCode(n) {
            var str = "";
            for (var i = 0; i < n; i++) {
                var num = parseInt(48 + Math.random() * (122 - 48 + 1));
                while ((num >= 58 && num <= 64) || (num >= 91 && num <= 96)) {
                    num = parseInt(48 + Math.random() * (122 - 48 + 1));
                }
                str += String.fromCharCode(num);
            }
        
            return str;
        }
        
        function Yan(){
            this.yan = document.querySelector(".vco");
            this.yanzhengma = document.querySelector(".vcode");
           
        }
        Yan.prototype = {
            init:function(){
                this.shengcheng();
                this.yan1()
            },
            shengcheng(){
                this.yanzhengma.innerHTML = randomCode(4);
            },
            yan1:function(){
                var _this = this;
                this.yan.onblur = function (){
                    if (this.value) {
                        if (this.value != _this.yanzhengma.innerHTML) {
                            alert("验证码输入错误,请重新输入");
                            _this.yanzhengma.innerHTML = randomCode(4);
        
                        } else {
                            // alert("输入正确")
                        }
                    }
                }
                
            }
        }
        new Yan().init();


    })
}

export default {
    render
}


