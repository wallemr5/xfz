
function Auth() {
    var self = this
    self.maskWrapper = $('.mask-wrapper')
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



Auth.prototype.run = function () {
    var self = this
    self.listenShowHideEvent()
    self.switchWrapper()
    self.listenSigninEvent()
    self.listenSmsEvent()
};

$(function () {
    var auth = new Auth();
    auth.run();
})


