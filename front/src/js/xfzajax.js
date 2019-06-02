/**
 * Created by hynev on 2018/5/15.
 */

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    console.log(cookieValue)
    return cookieValue;
}

var xfzajax = {
    'get': function (args) {
        args['method'] = 'get';
        this.ajax(args);
    },
    'post': function (args) {
        args['method'] = 'post';
        this._ajaxSetup();
        this.ajax(args);
    },
    'ajax': function (args) {
        var success=args['success']
        args['success']=function (result) {
                console.log(result)
                if(result.code == 200){
                    success(result)
                }else {
                    var messageobj = result.message
                    if (typeof messageobj == "string" || messageobj.constructor == String){
                        window.messageBox.show(messageobj)
                        success(result)

                    }else{
                        for(key in messageobj){
                            console.log("helloworld")
                            var messages = messageobj[key]
                            var messagedict = messages[0]
                            var message = messagedict['message']
                            window.messageBox.show(message)
                            success(result)

                        }
                    }

                }
            },
        args['failed']=function (result) {
                console.log(result)
            }
        $.ajax(args);
    },
    '_ajaxSetup': function () {
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (!/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        });
    }
};
