
;(function($){
    var scrollPages= function (settings) {
        var _this=this;
        //默认参数
        this.settings={
            direction:"vertical",     //"horizontal"
            loop:false,          //是否循环（无缝切换）
            pagination:true      //是否分页
        };
        $.extend(this.settings,settings||{});

        this.index=0;
        this.container=$("#container");
        this.selctions=this.container.find("div.selction");
        if(this.settings.pagination){
            this.initListDOM();
        }
        this.length=this.selctions.length;
        this.list=$(".list_btn");
        this.listLis=$(".list_btn ul li");
        this.init();
    };
    //每屏事件
    var pageEvent=[
        {
            inAn:function(){
                var selction0=$("#selction0 .intro p");
                selction0.css({
                    transform:"translateX(0)",
                    opacity:1,
                    transition:"0.8s"
                })
            },
            outAn:function(){
                var selction0=$("#selction0 .intro p");
                selction0.css({
                    transform:"translateX(-100%)",
                    opacity:0,
                    transition:""
                })
            }
        },
        {
            inAn:function(){
                var selction1=$("#selction1 .intro p");
                selction1.css({
                    transform:"translateX(0)",
                    opacity:1,
                    transition:"0.8s"
                })
            },
            outAn:function(){
                var selction1=$("#selction1 .intro p");
                selction1.css({
                    transform:"translateX(100%)",
                    opacity:0,
                    transition:""
                })
            }
        },
        {
            inAn:function(){
                var selction2=$("#selction2 .intro p");
                selction2.css({
                    transform:"translateX(0)",
                    opacity:1,
                    transition:"0.8s"
                })
            },
            outAn:function(){
                var selction2=$("#selction2 .intro p");
                selction2.css({
                    transform:"translateX(100%)",
                    opacity:0,
                    transition:""
                })
            }
        },
        {
            inAn:function(){
                var selction3=$("#selction3 .intro p");
                selction3.css({
                    transform:"translateX(0)",
                    opacity:1,
                    transition:"0.8s"
                })
            },
            outAn:function(){
                var selction3=$("#selction3 .intro p");
                selction3.css({
                    transform:"translateX(-100%)",
                    opacity:0,
                    transition:""
                })
            }
        }
    ]
    scrollPages.prototype={
        //初始化
        init:function(){
            if(this.settings.pagination){
                this.initList();
            }else{
                this.list.hide()
            }
            for(var i=0;i<pageEvent.length;i++){
                pageEvent[i].outAn();
            }
            pageEvent[this.index].inAn();
            //防止自定义参数写错
            if(this.settings.direction!="vertical" && this.settings.direction!="horizontal") {
                alert("您输入的参数错误已取默认参数")
                this.settings.direction = "vertical";
            }
            this.listLis.eq(0).addClass("active");
            if(this.settings.direction==="horizontal"){
                this.initLayout();
            }

            this.listClock();
            this.mousewheelHandler();
            this.keyDown();
        },
        //初始化分页DOM结构
        initListDOM: function () {
            var pageHtml = '<div class="list_btn clear"><ul class="ul"><li></li>';
            for (var i = 0; i < this.selctions.length - 1; i++) {
                pageHtml += '<li></li>';
            };
            pageHtml+='</ul></div>';
            $('body').append(pageHtml);
        },
        //初始化分页DOM样式
        initList:function(){
            if(this.settings.direction==="horizontal"){
                //列表分页横向布局
                this.list.addClass("list_left").removeClass("list_btn");
                this.listLis.addClass("li_left").removeClass("li")
            }else if(this.settings.direction==="vertical"){
                this.list.addClass("list_btn").removeClass("list_left");
                this.listLis.addClass("li")
            }
        },
        //横向布局
        initLayout:function(){
            //内容重新布局
            var width=this.length*100+"%",
                cellWidth=(100/this.length).toFixed(2)+"%";
            this.container.css({
                width:width,
                height:100+"%"
            });
            this.selctions.css({
                width:cellWidth,
                height:100+"%",
                float:"left"
            })
        },
        //右侧列表按钮点击
        listClock:function(){
            var _this=this;
            this.listLis.on("click",function(){
                var i=$(this).index();
                _this.animateslider(i);
                _this.index=i;
                for(var i=0;i<_this.selctions.length;i++){
                    pageEvent[i].outAn();
                }
                pageEvent[_this.index].inAn();
            });
        },

        //滑动效果
        animateslider:function(i){
            var _this=this;
            //var color=['#595F9F','#00C26B','#14D1CA','#F7B71F'];
            this.height=$(document).height() < $('body').height() ? $(document).height() : $('body').height(),
            this.width=$(document).width() < $('body').width() ? $(document).width() : $('body').width();
            if(this.height<643){
                this.height=643;
            }
            this.listLis.eq(i).addClass("active").siblings().removeClass("active");
            if(this.settings.direction==="vertical") {
                this.container.animate({
                    top: -(i * _this.height)
                });
            }else if(this.settings.direction==="horizontal"){
                this.container.animate({
                    left: -(i * _this.width)
                })
            }
        },
        //重写滚动事件
        mousewheelHandler:function(){
            var _this = this,
                timer = null;

            $("body").on("mousewheel DOMMouseScroll", function (e) {
                //阻止事件冒泡
                EventHandler.stopPropagation(e);

                var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                clearTimeout(timer)
                timer=setTimeout(function(){
                    if (delta > 0) {
                        _this.mouseSectionup();
                    } else {
                        _this.mouseSectiondown();
                    }
                },500)
            })
        },
        //鼠标滚轮向上滑动事件
        mouseSectionup:function(){
            var _this = this;
            _this.index--;
            if (_this.index <= 0) {
                _this.index = 0;
            }
            _this.animateslider(_this.index);
            if(pageEvent[_this.index+1]){
                pageEvent[_this.index+1].outAn();
            }
            pageEvent[_this.index].inAn();

        },

        //鼠标向下滑动事件
        mouseSectiondown:function(){
            var _this = this;
            _this.index++;
            if (_this.index >= _this.length - 1) {
                _this.index = _this.length - 1
            }

            _this.animateslider(_this.index);

            if(pageEvent[_this.index-1]){
                pageEvent[_this.index-1].outAn();
            }
            pageEvent[_this.index].inAn();
        },
        //键盘事件
        keyDown:function(){
            var _this=this,
                clearKey=null;
            $(window).keydown(function(e){
                clearTimeout(clearKey);
                clearKey=setTimeout(function(){
                    var keyCode= e.keyCode;
                    if(keyCode == 37||keyCode == 38){
                        _this.mouseSectionup();
                    }else if(keyCode == 39||keyCode == 40){
                        _this.mouseSectiondown();
                    }
                },300)
            })
        }
    }
    window["scrollPages"]=scrollPages;
})(jQuery);
//事件监听处理
var EventHandler = {
    addHandler: function (ele, type, handler) {               //添加处理程序// DOM2级事件处理
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele.attachEvent("on" + type, handler);
        } else {
            // DOM0级事件处理
            ele["on" + type] = handler;
        }
    },
    removeHandler: function (ele, type, handler) {            //删除处理程序
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false);
        } else if (ele.detachEvent) {
            ele.detachEvent("on" + type, handler);
        } else {
            ele["on" + type] = null;
        }
    },

    getEvent: function (event) {                           //获取事件对象
        return event ? event : window.event;
    },
    getTarget: function (event) {                          //获取事件目标
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {                     //阻止事件默认行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function (event) {                   //阻止事件流
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    getRelatedTarget: function (event) {                  //在mouseover和mouseout中获取相关元素
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {                     //IE8及以下版本不支持relatedTarget属性
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },

    getWheelDelta: function (event) {                    //获取鼠标滚轮数据
        console.log(event.type)
        if (event.wheelDelta) {
            /*return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);*/
            return event.wheelDelta;
        } else {
            console.log(event.detail)
            return -event.detail * 40;               //针对FireFox
        }

    },

    getCharCode: function (event) {                      //获取字符编码
        if (event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
};