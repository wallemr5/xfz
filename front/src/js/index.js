function Banner() {
    this.bannerGroup = $("#banner-group");
    this.listenBannerHover()
    this.bannerUl= $("#banner-ul");
    this.rightArrow = $(".right-arrow")
    this.leftArrow = $(".left-arrow")
    this.liList = this.bannerUl.children("li")
    this.liCount = this.liList.length
    this.pageControl = $(".page-control")
}

Banner.prototype.initbannerul = function(){
    var self = this
    self.bannerUl.css({"width":798*self.liCount})
}

Banner.prototype.initPageControl = function (){
    var self = this
    for (var i=0;i < self.liCount;i++){
        var circle = $("<li></li>")
        self.pageControl.append(circle);
        if (i ===0){
            circle.addClass("active");
        }
    }
    self.pageControl.css({"width": self.liCount*10+8*2+16*self.liCount})
}

Banner.prototype.listenPageControl = function(){
    var  self = this
    self.pageControl.children("li").each(function (index,obj) {
        $(obj).click(function () {
            self.index=index
            self.animate()
            $(obj).addClass("active").siblings().removeClass("active")
        })
    })
}


Banner.prototype.toggleArrow = function (isShow){
        var self = this
        if (isShow){
            self.leftArrow.show()
            self.rightArrow.show()
        }
        else{
            self.rightArrow.hide()
            self.leftArrow.hide()
        }
}
Banner.prototype.animate = function(){
    this.bannerUl.animate({"left":-798*this.index});
    this.pageControl.children("li").eq(this.index).addClass("active").siblings().removeClass("active")

}

Banner.prototype.arrowClick = function () {
    var self = this
    this.rightArrow.click(function () {
            console.log(self.index)
            if (self.index === (self.liCount -1)){
                self.index=0
            }
            else {
                self.index++
            }
            self.animate()
        }
        )
    this.leftArrow.click(function () {
        if (self.index === 0){
            self.index = self.liCount -1
        }
        else{
            self.index--
        }
        self.animate()
    })
}


Banner.prototype.listenBannerHover = function () {
    var self = this
    this.bannerGroup.hover(
        function () {
            clearInterval(self.timer)
            self.toggleArrow(true)
        },
        function () {
            self.loop()
            self.toggleArrow(false)
        }
    )
}


Banner.prototype.loop = function () {
    var self = this
   self.index=1
   self.timer=setInterval(function () {
       if (self.index == self.liCount){
           self.index=0
       }
       self.animate()
       self.index++
   },2000)
}


Banner.prototype.run = function () {
    this.loop()
    this.initPageControl()
    this.initbannerul()
    this.listenPageControl()
}

function Index(){
    var self = this;
    self.page = 2;
    self.category_id = 0;
    self.loadBtn = $("#load-more-btn");
    template.defaults.imports.timeSince = function (defaultValue) {
        var date = new Date(defaultValue)
        var dates = date.getTime()
        var nowts = (new Date()).getTime()
        var timestamp = (nowts - dates)/1000
            if (timestamp < 60){
                return '刚刚' }
    else if (timestamp >= 60 && timestamp < 60*60) {
                minutes = parseInt(timestamp / 60)
                return minutes +'分钟前'
            }
    else if ( timestamp >= 60*60 && timestamp < 60*60*24 ) {
                hours = parseInt(timestamp / 60 / 60)
                return  hours + "小时前"
            }
    else if (timestamp >= 60*60*24 && timestamp < 60*60*24*30) {
                days = parseInt(timestamp / 60 / 60 / 24)
                return days + '天前'
            }
    else {
                var year = date.getFullYear();
                var month = date.getMonth()
                var day = date.getDay()
                var hour = date.getHours()
                return year+month+day+hour
            }
    }
}

Index.prototype.listenLoadmoreBtn = function() {
    var self = this;
    self.loadBtn.click(function () {
        xfzajax.get({
            'url':'/news/list/',
            data:{
                'p':self.page
            },
            success:function (result) {
                if (result['code'] === 200) {
                     var newses = result['data'];
                    if(newses.length > 0){
                        var tpl = template("news-item",{"newses":newses});
                        var ul = $(".list-inner-group");
                        ul.append(tpl);
                        self.page += 1;
                    }else{
                        self.loadBtn.hide();
                    }
                }
            }
        })
    })
}
Index.prototype.listenCategorySwitchEvent = function () {
    var self = this;
    var tabGroup = $(".list-tab");
    tabGroup.children().click(function () {
        // this：代表当前选中的这个li标签
        var li = $(this);
        var category_id = li.attr("data-category");
        xfzajax.get({
            'url': '/news/list/',
            'data': {
                'category_id': category_id,
                'p': 1
            },
            'success': function (result) {
                if(result['code'] === 200){
                    var newses = result['data'];
                    var tpl = template("news-item",{"newses":newses});
                    // empty：可以将这个标签下的所有子元素都删掉
                    var newsListGroup = $(".list-inner-group");
                    newsListGroup.empty();
                    newsListGroup.append(tpl);
                    self.page = 2;
                    self.category_id = category_id;
                    li.addClass('active').siblings().removeClass('active');
                    self.loadBtn.show();
                }
            }
        });
    });
};


Index.prototype.run = function() {
    var self = this;
    self.listenLoadmoreBtn();
    self.listenCategorySwitchEvent()
}

$(function () {
    var banner = new Banner()
    banner.arrowClick()
    banner.run()
    var index = new  Index()
    index.run()
})