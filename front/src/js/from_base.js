function FrontBase() {

}

FrontBase.prototype.listenAuthBoxHover = function () {
    var authBox = $('.auth-box');
    var userMoreBox= $('.user-more-box')
    authBox.hover(function () {
        userMoreBox.show()
    },function () {
        userMoreBox.hide()
    })
}
FrontBase.prototype.run = function () {
    self = this
    self.listenAuthBoxHover()
}

$(function () {
    var frontbase = new FrontBase();
    frontbase.run()
})


function Auth() {
    var self = this
    self.maskWrapper = $('.mask-wrapper')
    self.smsCapacha = $('.sms-captcha-btn');
};
Auth.prototype.showEvent = function(){
    var  self = this
    self.maskWrapper.show()
}
Auth.prototype.hideEvent = function(){
    var self = this
    self.maskWrapper.hide()
}
Auth.prototype.switchWrapper = function () {
    $(".switch").click(function () {
        var scrollWrapper = $(".scroll-wrapper");
        var currentLeft = scrollWrapper.css("left");
        currentLeft = parseInt(currentLeft);
        if(currentLeft < 0){
            scrollWrapper.animate({"left":'0'});
        }else{
            scrollWrapper.animate({"left":"-400px"});
        }
    });
}



Auth.prototype.listenShowHideEvent = function () {
    var self = this
    console.log("hello");
    var siginBtn = $('.sigin-in');
    var sigupBtn = $('.sigin-up');
    var closeBtn = $('.close-btn');
    var scrollWrapper = $('.scroll-wrapper')

    siginBtn.click(function () {
        self.showEvent()
        scrollWrapper.css({"left":0})
    })
    sigupBtn.click(function () {
        self.showEvent()
        scrollWrapper.css({"left":-400})
    })
    closeBtn.click(function () {
        self.hideEvent()

    })
}

Auth.prototype.listenSigninEvent = function (){
    var self = this
    var signinGroup = $('.signin-group')
    var telephoneInput = signinGroup.find("input[name='telephone']");
    var passwordInput = signinGroup.find("input[name='password']");
    var rememberInput = signinGroup.find("input[name='remember']");
    var submitBtn = signinGroup.find(".submit-btn");
    submitBtn.click(function () {
        var telephone = telephoneInput.val()
        var password = passwordInput.val()
        var remember = rememberInput.prop("checked")?1:0
        xfzajax.post({url:'/auth/login/',data:{
            'telephone':telephone,
             'password':password,
             'remember':remember,
            },
            'success':function (result) {
                if(result.code == 200){
                    console.log(result)
                    self.hideEvent()
                    window.location.reload()
                }else {
                    var messageobj = result.message
                    if (typeof messageobj == "string" || messageobj.constructor == String){
                        window.messageBox.show(messageobj)

                    }else{
                        for(key in messageobj){
                            var messages = messageobj[key]
                            var messagedict = messages[0]
                            var message = messagedict['message']
                            window.messageBox.show(message)
                        }
                    }

                }
            },
            'failed':function (result) {
                console.log(result)
            }
        }
        )
    })

}

Auth.prototype.listenImgCapacha = function (){
        imgCapacha = $('.img-captcha');
        imgCapacha.click(function () {
            imgCapacha.attr('src','/auth/img_captcha'+'?random='+Math.random())
        })
}

Auth.prototype.smsSuccessEvent = function(){
             self = this
             messageBox.showInfo("验证码已发送")
             self.smsCapacha.addClass('disabled')
             var count = 5
             self.smsCapacha.unbind('click')
             var timer = setInterval(function () {
                 self.smsCapacha.text(count+'s');
                 count--;
                 if (count <=0){
                     clearInterval(timer);
                     self.smsCapacha.text('发送验证码');
                      self.smsCapacha.removeClass('disabled');
                      self.listenSmsEvent()
                 }
             },1000)
}

Auth.prototype.listenSmsEvent = function () {
    self = this
    var sigupGroup = $('.signup-group')
    var telephoneInput = sigupGroup.find('input[name="telephone"]')
    console.log(telephoneInput)
    self.smsCapacha.click(function () {
        console.log('sms')
        var telephone = telephoneInput.val()
        console.log(telephoneInput)
        console.log(telephone)
        if (telephone){
            xfzajax.get({
                'url':'/auth/send_message/',
                'data':{
                    'telephone':telephone
                },
                'success':function (result) {
                    console.log(result)
                    if ( result['code'] === 200 ) {
                        self.smsSuccessEvent()
                    }

                },

            })

        }else {
            messageBox.showError("请输入手机号码")
        }

    })
}

Auth.prototype.listenRegister = function(){
    var sinupGroup = $('.signup-group')
    var telephoneInput = sinupGroup.find("input[name='telephone']")
    var usernameInput = sinupGroup.find("input[name='username']")
    var imgcaptchaInput = sinupGroup.find("input[name='img_captcha']")
    var password1Input = sinupGroup.find("input[name='password1']")
    var password2Input = sinupGroup.find("input[name='password2']")
    var smscaptchaInput = sinupGroup.find("input[name='sms_captcha']")
    var submitBtn = sinupGroup.find('.submit-btn')
    submitBtn.click(function () {
        var telephone = telephoneInput.val()
        var password1 = password1Input.val()
        var password2 = password2Input.val()
        var username = usernameInput.val()
        var imgchaptha = imgcaptchaInput.val()
        var smschaptha = smscaptchaInput.val()

        xfzajax.post({url:'/auth/register/',data:{
            'telephone':telephone,
             'password1':password1,
             'password2':password2,
              'username':username,
              'img_captcha': imgchaptha,
              'sms_captcha' : smschaptha
            },
            'success':function () {
                    console.log(result)
                    self.hideEvent()
                    window.location.reload()

            }
        }
        )
    })
}


Auth.prototype.run = function () {
    var self = this
    self.listenShowHideEvent()
    self.switchWrapper()
    self.listenSigninEvent()
    self.listenImgCapacha()
    self.listenSmsEvent()
    self.listenRegister()
};

$(function () {
    var auth = new Auth();
    auth.run();
})





$(function () {
    if(window.template){
        template.defaults.imports.timeSince = function (dateValue) {
            var date = new Date(dateValue);
            var datets = date.getTime(); // 得到的是毫秒的
            var nowts = (new Date()).getTime(); //得到的是当前时间的时间戳
            var timestamp = (nowts - datets)/1000; // 除以1000，得到的是秒
            if(timestamp < 60) {
                return '刚刚';
            }
            else if(timestamp >= 60 && timestamp < 60*60) {
                minutes = parseInt(timestamp / 60);
                return minutes+'分钟前';
            }
            else if(timestamp >= 60*60 && timestamp < 60*60*24) {
                hours = parseInt(timestamp / 60 / 60);
                return hours+'小时前';
            }
            else if(timestamp >= 60*60*24 && timestamp < 60*60*24*30) {
                days = parseInt(timestamp / 60 / 60 / 24);
                return days + '天前';
            }else{
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDay();
                var hour = date.getHours();
                var minute = date.getMinutes();
                return year+'/'+month+'/'+day+" "+hour+":"+minute;
            }
        }
    }
});



