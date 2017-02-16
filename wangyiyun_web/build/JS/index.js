/**
 * Created by Administrator on 2016/2/24.
 */
var Event = {
    // 页面加载完成后
    readyEvent: function (fn) {
        if (fn == null) {
            fn = document;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = fn;
        } else {
            window.onload = function () {
                oldonload();
                fn();
            };
        }
    },
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 参数： 操作的元素,事件名称 ,事件处理程序
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            //事件类型、需要执行的函数、是否捕捉
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, function () {
                handler.call(element);
            });
        } else {
            element['on' + type] = handler;
        }
    },
    // 移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
    stopPropagation: function (ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        } else {
            ev.cancelBubble = true;
        }
    },
    // 取消事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    // 获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    }
};

(function(){

    function $(name){
        return document.getElementById(name);
    };

    function getStyle(obj, name) {
        return obj.currentStyle ? obj.currentStyle[name] : window.getComputedStyle(obj)[name];
    }

    function create(ele){
        return document.createElement(ele);
    }

    function startMove(obj, json, fn) {
        clearInterval(obj.timer);
        var iCur = 0;
        var speed = 0;
        obj.timer = setInterval(function () {
            var bool = true;
            for (var attr in json) {
                var end = json[attr];
                if (attr == 'opacity') {
                    iCur = Math.round(getStyle(obj, 'opacity') * 100);
                } else {
                    iCur = parseInt(getStyle(obj, attr));
                }
                ;
                speed = (end - iCur) / 4;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (iCur != end) {
                    bool = false;
                    if (attr == 'opacity') {
                        obj.style.opacity = (iCur + speed) / 100;
                        obj.style.filter = 'alpha(opacity=' + (iCur + speed) + ')';
                    } else {
                        obj.style[attr] = iCur + speed + 'px';
                    }
                }
            }
            if (bool) {
                clearInterval(obj.timer);
                fn && fn.call(obj);
            }
        }, 30)
    };

    function getIndexClass(collection,className){
        for(var i=0;i<collection.length;i++){
            if(collection[i].className===className){
                return i;
            }
        }
    }
    /*设置cookie，不再弹出顶部通知条*/
    function noAttention(){
        var closeBtn=$("no-attention"),topnav=document.querySelector(".top-head");
        if(getcookie("close")){
            topnav.style.display="none";
        }else{
            closeBtn.onclick=function(){
                topnav.style.display="none";
                setcookie("close",true,365);
            }
        };
    }
    noAttention();

    var oLogin=$("login"),name = $("name"),psd = $("psd"),submit = $("submit"),
        oLoginPopup=document.querySelector(".h-attention .h-popup"),
        oLoginPopupClose=document.querySelector(".h-attention .h-popup .login-close"),
        oAttClose=document.querySelector(".h-attention .close-att");

    oAttClose.style.display="none";  //取消按钮初始不显示

    Event.addEvent(oLoginPopupClose,"click",function(){  //关闭登陆弹窗按钮
        oLoginPopup.style.display="none";
    });

    Event.addEvent(oLogin,"click",function(){  //点击关注 弹窗
        
        if(!getcookie("loginSuc")) {
            oLoginPopup.style.display = "block";
        }else{
            oLogin.value="已关注";
            oLogin.className="active";
            oAttClose.style.display="block";
        }
    });

    Event.addEvent(oAttClose,"click",function(){ //取消关注
        oAttClose.style.display="none";
        oLogin.className="btn";
        oLogin.value="关注";
    });
    /*登陆*/
    function login(){
        var nameMd5=MD5(name.value),
            psdMD5=MD5(psd.value);
        ajax('get','http://study.163.com/webDev/login.htm','userName='+nameMd5+'&password='+psdMD5,function(data){
            if(data == 1){
                oLoginPopup.style.display="none";
                setcookie("loginSuc",true,365);
                ajax('get','http://study.163.com/webDev/attention.htm?','',function(number){
                    if(number == 1){
                        setcookie("followSuc",true,365);
                        console.log('asfd')
                        oLogin.value="已关注";
                        oLogin.className="active";
                        oAttClose.style.display="block";
                    }
                })
            }else{
                alert('账户密码错误！')
            }
        })
    }
    Event.addEvent(submit,"click",login)
    /*兼容IE8,9*/
    var isIE8=/MSIE 8.0/gi.test(window.navigator.userAgent)
        ,isIE9=/MSIE 9.0/gi.test(window.navigator.userAgent);
    if(isIE8 || isIE9){

        var label=document.querySelectorAll("label");
        Event.addEvent(name,"focus",function(){
            label[0].style.display="none";
        });
        Event.addEvent(name,"blur",function(){
            if(!name.value) {
                label[0].style.display = "block";
            }
        });
        Event.addEvent(psd,"focus",function(){
            label[1].style.display="none";
        });
        Event.addEvent(psd,"blur",function(){
            if(!psd.value) {
                label[1].style.display = "block";
            }
        });
    }

    /*轮播*/
    var oSlide=$("slide"),
        aIs=oSlide.getElementsByTagName("i"),
        getHref=document.querySelector("#slide .imgs a"),
        getImg=getHref.querySelector("img");

    var href=['http://open.163.com/','http://study.163.com/','http://www.icourse163.org/'],
        src=['image/banner1.jpg','image/banner2.jpg','image/banner3.jpg'];

    var getIndex=function(){
        for(var i=0;i<href.length;i++){
            if(href[i]===getHref.getAttribute("href")){
                return i;
            }
        }
    };
    var index=getIndex();
    var slide=function(){

        if(index===href.length-1){
            index=0;
        }else{
            index++;
        }

        getHref.setAttribute("href",href[index]);
        getImg.setAttribute("src",src[index]);

        getImg.style.opacity = 0;
        getImg.style.transition = '';

        for(var j=0;j<aIs.length;j++){
            aIs[j].className="";
        }

        aIs[index].className="active";

        setTimeout( function  () {
            getImg.style.transition = '0.5s';
            getImg.style.opacity = 1;
        },30);
    }

    var timer=setInterval(slide,5000);

    Event.addEvent(oSlide,"mouseover",function(){
        if(timer){
            clearInterval(timer);
        }
    });

    Event.addEvent(oSlide,"mouseout",function(){
        timer=setInterval(slide,5000);
    });

    for(var i=0;i<aIs.length;i++){
        aIs[i].onclick=function() {
            slide();
        }
    }
    /*tab切换*/
    var oTab=$("s-tab"),
        aDiv=oTab.getElementsByTagName("div");

    var tab_pro=document.querySelector(".s-content .s-produce"),
        tab_lan=document.querySelector(".s-content .s-language");

    var t=0;
    tab_pro.style.display="block";
    tab_lan.style.display="none";

    for(var i=0;i<aDiv.length;i++){
        aDiv[i].index=i;
        Event.addEvent(aDiv[i],"click",function(){
            if((tab_pro.childNodes.length!==0) && (tab_lan.childNodes.length!==0)){
                /*产品设计与编程语言的数据都已经异步加载进来，不用执行getData，减少不必要的数据请求*/
                if(this.index===1){
                    tab_pro.style.display="none";
                    tab_lan.style.display="block";
                }else{
                    tab_lan.style.display="none";
                    tab_pro.style.display="block";
                }
            }else{
                /*数据未全部加载的情况*/
                if(this.index===0){
                    tab_pro.style.display="block";
                }else{
                    tab_pro.style.display="none";
                    tab_lan.style.display="block";
                }
                this.index===1 ? getData(20,tab_lan) :getData(10,tab_pro);
            }

            for(var i=0;i<aDiv.length;i++){
                aDiv[i].className="btn";
            }

            this.className="btn active";

            tab_pro.style.display==="block" ? t=0 : t=1;
        })
    };


    /*ajax获取服务器数据*/
    function getData(num,ele,now){
        now ? now =now : now = 1;
        if(!ele){
            return;
        }
        ajax('get','http://study.163.com/webDev/couresByCategory.htm','pageNo='+now+'&psize=20&type='+num,function(date){
            var jsonDate=JSON.parse(date);
            for(var i=0;i<jsonDate.list.length;i++){
                var sTeam=create("div"),
                    oImg1=create("img"),
                    oP1=create("p"),
                    oDiv1=create("div"),
                    oSpan1=create("span"),
                    oStrong=create("strong"),
                    oA=create("a");
                ele.appendChild(sTeam);
                if(jsonDate.list[i].price==0){
                    oStrong.innerHTML="免费";
                }else{
                    oStrong.innerHTML='￥'+jsonDate.list[i].price;
                }
                sTeam.className="s-team";
                oImg1.src=jsonDate.list[i].middlePhotoUrl;
                oP1.className="coursename f-hidden";
                oP1.innerHTML=jsonDate.list[i].name;
                oDiv1.className="provider";
                oDiv1.innerHTML=jsonDate.list[i].provider;
                oSpan1.innerHTML=jsonDate.list[i].learnerCount;

                sTeam.appendChild(oImg1);
                sTeam.appendChild(oP1);
                sTeam.appendChild(oDiv1);
                sTeam.appendChild(oSpan1);
                sTeam.appendChild(oStrong);
                sTeam.appendChild(oA);

                /*创建弹出层*/
                var oImg2=create("img"),
                    oH3=create("h3"),
                    oSpan2=create("span"),
                    oP2=create("p"),
                    oP3=create("p");
                oImg2.src=jsonDate.list[i].middlePhotoUrl;
                oH3.innerHTML=jsonDate.list[i].name;
                oSpan2.innerHTML=jsonDate.list[i].learnerCount;
                oP2.className="categoryname";
                oP2.innerHTML="发布者："+jsonDate.list[i].provider+'<br>'+"分类："+jsonDate.list[i].categoryName ;
                oP3.className="description";
                oP3.innerHTML=jsonDate.list[i].description;

                oA.appendChild(oImg2);
                oA.appendChild(oH3);
                oA.appendChild(oSpan2);
                oA.appendChild(oP2);
                oA.appendChild(oP3);
            }
        })
    }
    getData(10,tab_pro,1);

    /*分页*/
    var page=$("pages"),
        oPrev=document.querySelector(".s-page .prev"),
        oNext=document.querySelector(".s-page .next");
    var nowPage;

    function tabData(num){
        if(t===0){
            tab_pro.innerHTML="";
            getData(10,tab_pro,num+1);
        }else{
            tab_lan.innerHTML="";
            getData(20,tab_lan,num+1);
        }
    }
    function getPage(num,obj){
        ajax('get','http://study.163.com/webDev/couresByCategory.htm','pageNo=1&psize=20&type='+num,function(date){
            var jsonDate=JSON.parse(date),
                len=jsonDate.totalPage;
            for(var i=1;i<=9;i++){
                var aPage=create("a");
                aPage.href="javascript:;";
                aPage.innerHTML=i;
                page.appendChild(aPage);
            };

            var pages=page.getElementsByTagName("a");
            pages[0].className="active";


            for(var i=0;i<pages.length;i++){
                pages[i].onclick=function(num){
                    return function(){
                        for(var i=0;i<pages.length;i++){
                            pages[i].className="";
                        }
                        this.className="active";
                        tabData(num);
                    }
                }(i)
            };

            /*prev,next两个按钮事件*/
            Event.addEvent(oPrev,"click",function(){
                nowPage=getIndexClass(pages,"active");
                for(var i=0;i<pages.length;i++){
                    pages[i].className="";
                }
                if(nowPage===0){
                    pages[nowPage].className="active";
                    return;
                }else{
                    pages[nowPage-1].className="active";
                    tabData(nowPage-1);
                }

            });

            Event.addEvent(oNext,"click",function(){
                nowPage=getIndexClass(pages,"active");
                for(var i=0;i<pages.length;i++){
                    pages[i].className="";
                }
                if(nowPage===8){
                    pages[nowPage].className="active";
                    return;
                }else{
                    pages[nowPage+1].className="active";
                    tabData(nowPage+1);
                }
            });
        })
    }
    getPage(10,page);

    /*获取右侧视频数据*/
    function getHotData(ele){
        ajax('get','http://study.163.com/webDev/hotcouresByCategory.htm?','',function(data){
            var jsonDate1=JSON.parse(data);

            for(var i=0;i<jsonDate1.length;i++){
                var oA=create("a"),
                    aImg3=create("img"),
                    oP=create("p"),
                    oSpan3=create("sapn");

                package.className="package";
                aImg3.src=jsonDate1[i].smallPhotoUrl;
                oP.innerHTML=jsonDate1[i].name;
                oSpan3.className="learn-count";
                oSpan3.innerHTML=jsonDate1[i].learnerCount;

                oA.appendChild(aImg3);
                oA.appendChild(oP);
                oA.appendChild(oSpan3);

                ele.appendChild(oA);
            }
        })
    };

    getHotData($("package"));

    /*滚动*/
    function sildeHot(){
        var scrollHot=$("package"),
            everyHot=$("package").getElementsByTagName("a")[0],
            top=parseInt(getStyle(scrollHot,'top')),
            height=everyHot.offsetHeight+40,//40是margin的高度
            speed=height/10;
        if(Math.abs(top)<1800) {
            startMove(scrollHot, {
                top: top - 90
            });
        }else{
            scrollHot.style.top=902+'px';
            startMove(scrollHot, {
                top: 0
            });
        }
    };

    setInterval(sildeHot,5000);
    /*视频播放*/
    var oPlay=$("play"),oClose=$("close"),video=$("video");
    var oMask=document.querySelector(".video .mask"),
        oPopup=document.querySelector(".video .popup");

    Event.addEvent(oPlay,'click',function(){
        oMask.style.display="block";
        oPopup.style.display="block";
    })

    Event.addEvent(oClose,'click',function(){
        oMask.style.display="none";
        oPopup.style.display="none";
        video.pause();
    });
})();