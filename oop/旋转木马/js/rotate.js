/**
 * Created by Administrator on 2015/10/10.
 */
;(function($){
    var Carousel=function(poster){
        var _this=this;

        this.poster=poster;
        this.posterItemMain=poster.find("ul.poster-list");
        this.nextBtn=poster.find("div.poster-next-btn");
        this.prevBtn=poster.find("div.poster-prev-btn");
        this.posterFristItem=this.posterItemMain.find("li").eq(0);
        this.posterImgs=poster.find("li.poster-item");
        this.posterLastItem=this.posterImgs.last();
        this.turnBool=true;
        this.timer=null;


        this.settings={
            width:50,
            height:50,
            posterWidth:640,
            posterHeight:270,
            vertical:"middle",
            scale:0.9,
            speed:500,
            autoPlay:false,
            delay:5000
        };
        $.extend(this.settings,this.getSetting());
        //console.log(this.settings)
        this.setSettingValue();
        this.setPosterPos();
        this.setVerAlign();
        this.nextBtn.click(function(){
            if(_this.turnBool) {
                _this.turnBool=false;
                _this.carouseRotate("left");
            }
        });
        this.prevBtn.click(function(){
            if(_this.turnBool) {
                _this.turnBool=false;
                _this.carouseRotate("right");
            }
        });
        //是否开启自动播放
        if(this.settings.autoPlay){
            this.timer=window.setInterval(function(){
                _this.nextBtn.click();
            },this.settings.delay);


            this.poster.mouseover(function(){
                window.clearInterval(_this.timer);
            });
            this.poster.mouseout(function(){
                _this.timer=window.setInterval(function(){
                    _this.nextBtn.click();
                },_this.settings.delay);
            });
        }else{
           this.timer=null;
        }
    };
    Carousel.prototype={
        //旋转操作函数
        carouseRotate:function(dir){
            var _this=this;
            var zIndexArr=[];
            if(dir==="left"){
                this.posterImgs.each(function(){
                    var self=$(this),
                        prev=self.prev().get(0)?self.prev():_this.posterLastItem,//prev=self.get(0)  //console.log(prev)
                        width=prev.width(),
                        height=prev.height(),
                        left=prev.css("left"),
                        opacity=prev.css("opacity"),
                        zIndex=prev.css("zIndex"),
                        top=prev.css("top");
                    zIndexArr.push(zIndex);
                    self.animate({
                        //zIndex:zIndex,
                        width:width,
                        height:height,
                        left:left,
                        opacity:opacity,
                        top:top
                    },_this.settings.speed,function(){
                        _this.turnBool=true;
                    })
                });
                this.posterImgs.each(function(i){
                    var self=$(this);
                    self.css("zIndex",zIndexArr[i])
                })
            }else if(dir==="right"){
                this.posterImgs.each(function(){
                    var self=$(this),
                        next=self.next().get(0)?self.next():_this.posterFristItem,//prev=self.get(0)  console.log(prev)
                        width=next.width(),
                        height=next.height(),
                        left=next.css("left"),
                        opacity=next.css("opacity"),
                        zIndex=next.css("zIndex"),
                        top=next.css("top");
                    zIndexArr.push(zIndex);

                    self.animate({
                        zIndex:zIndex,
                        width:width,
                        height:height,
                        left:left,
                        opacity:opacity,
                        top:top
                    },_this.settings.speed,function(){
                        _this.turnBool=true;
                    })
                });
                this.posterImgs.each(function(i){
                    var self=$(this);
                    self.css("zIndex",zIndexArr[i])
                })
            };

        },
        //设置排列方式
        setVerAlign:function(height){
            var mode=this.settings.vertical;
            if(mode==="middle"){
                return (this.settings.posterHeight-height)/2;
            }else if(mode==="down"){
                return this.settings.posterHeight-height;
            }else if(mode==="up"){
                return 0;
            }else{
                return (this.settings.posterHeight-height)/2;
            }
        },
        //设置剩余帧的位置关系
        setPosterPos:function(){
            var _this=this;
            var sliceItems=this.posterImgs.slice(1),
                rightItems=sliceItems.slice(0,sliceItems.length/2),
                leftItems=sliceItems.slice(sliceItems.length/2,sliceItems.length),
                level=Math.floor(sliceItems.length/2);

            //设置右边帧的位置关系和宽度top等
            var rw=this.settings.posterWidth,
                rh=this.settings.posterHeight,
                gap=(this.settings.width-this.settings.posterWidth)/2/level,
                l=(this.settings.width-this.settings.posterWidth)/2;

            rightItems.each(function(i){
                level--;
                rw=rw*_this.settings.scale;
                rh=rh*_this.settings.scale;

                $(this).css({
                    zIndex:level,
                    width:rw,
                    height:rh,
                    left:l+_this.settings.posterWidth+gap*(i+1)-rw,
                    top:_this.setVerAlign(rh),//(_this.settings.posterHeight-rh)/2,
                    opacity:1/(++i)
                })
            });
            //设值左边帧的位置关系和宽度top等
            var lw=rightItems.last().width(),
                lh=rightItems.last().height(),
                oL=Math.floor(sliceItems.length/2);

            leftItems.each(function(i){

                $(this).css({
                    zIndex:level++,
                    width:lw,
                    height:lh,
                    left:gap*i,
                    top:_this.setVerAlign(lh), //(_this.settings.posterHeight-lh)/2,
                    opacity:1/oL
                });
                oL--;
                lw=lw/_this.settings.scale;
                lh=lh/_this.settings.scale;

            })
        },
        //设置配置参数值去控制基本的宽度高度
        setSettingValue:function(){
            this.poster.css({
                width:this.settings.width,
                height:this.settings.height
            });
            this.posterItemMain.css({
                width:this.settings.width,
                height:this.settings.height
            });
            var btnW=(this.settings.width-this.settings.posterWidth)/ 2;
            //console.log(btnW)
            this.nextBtn.css({
                width:btnW,
                height:this.settings.height,
                zIndex:Math.ceil((this.posterImgs.length)/2)
            });
            this.prevBtn.css({
                width:btnW,
                height:this.settings.height,
                zIndex:Math.ceil((this.posterImgs.length)/2)
            });
            this.posterFristItem.css({
                width:this.settings.posterWidth,
                height:this.settings.posterHeight,
                left:btnW,
                zIndex:Math.floor((this.posterImgs.length)/2)
            })
        },

        //获取人工配置参数
        getSetting:function(){
            var setting = this.poster.attr("data-setting");
            if (setting && setting != "") {
                return $.parseJSON(setting);
            } else {
                return {};
            }
        }
    };
    Carousel.init=function(posters){
        var _this=this;
        posters.each(function(i,element){
            new _this($(this));  //this可换换成element
        });
    }
window["Carousel"]=Carousel;
})(jQuery);