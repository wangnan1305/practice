/**
 * Created by Administrator on 2015/10/26.
 */
;(function($){
    var rotatePlay=function(poster){
        var _this=this;
        this.poster=poster;
        this.oCon=poster.find(".container");
        this.oUl=poster.find(".container .con_ul");
        this.oUl.find("li").first().clone(true).appendTo(this.oUl);
        this.oUl.find("li").eq(4).clone(true).prependTo(this.oUl);
        this.aUlLi=poster.find(".container .con_ul li");
        this.aImg=poster.find(".container .con_ul li img");
        this.btnLeft=poster.find(".container .con_left");
        this.btnRight=poster.find(".container .con_right");
        this.width=poster.find(".container .con_ul li")[0].offsetWidth;
        this.btns=poster.find(".container .btns");
        this.oBg=this.btns.find(".bg");
        this.oDesc=this.btns.find(".desc");
        this.aLi=this.btns.find(".btn_ul li");
        this.iNow=1;
        this.iNow2=0;
        this.timer=null;
        this.settings={
            autoplay:true,
            direction:'left'
        };
        $.extend(this.settings,this.getSettings());
        for(var i=0;i<this.aLi.length;i++){
            this.aLi[i].index=i;
            _this.oDesc.text(_this.aImg[1].alt);
            this.aLi[i].onclick=function(){
                for(var j=0;j<_this.aLi.length;j++){
                    _this.aLi[j].className='';
                };
                this.className='active';
                _this.oDesc.text(_this.aImg[this.index+1].alt);
                _this.oUl.animate({
                    left:-(this.index+1)*_this.width
                });
                _this.iNow=this.index;
                console.log(_this.iNow)
            }
        }

        this.btnLeft.click(function(){
            _this.turnLeft();
        });
        this.btnRight.click(function(){
            _this.turnRight();
        });
        this.autoPlay(this.settings.autoplay,this.settings.direction);


    };
    rotatePlay.prototype={
        autoPlay: function (bool,dire) {
            var _this = this;
            if(bool) {
                if (dire == 'left') {
                    this.timer = setInterval(function () {
                        _this.turnLeft();
                    }, 2000)

                    this.oCon.mouseout(function () {
                        _this.timer = setInterval(function () {
                            _this.turnLeft();
                        }, 2000)
                    });
                } else {
                    this.timer = setInterval(function () {
                        _this.turnRight();
                    }, 2000)

                    this.oCon.mouseout(function () {
                        _this.timer = setInterval(function () {
                            _this.turnRight();
                        }, 2000)
                    });
                }
                this.oCon.mouseover(function () {
                    clearInterval(_this.timer);
                });
            }
        },
        turnLeft:function(){
            var _this=this;


            if(this.iNow==0){
                /*this.iNow=5*/
                this.oUl.animate({
                    left:-(--_this.iNow)*_this.width
                });
            };
            this.oUl.animate({
                left:-(--_this.iNow)*_this.width
            });
            for(var i=0;i<this.aLi.length;i++){
                this.aLi[i].className='';
            }
            _this.oDesc.text(_this.aImg[this.iNow+1].alt);
            this.aLi[this.iNow].className='active';
        },
        turnRight:function(){
            var _this=this;

            this.oUl.animate({
                left:-(++_this.iNow)*_this.width
            },function(){
                if(_this.iNow===6){

                    _this.oUl.animate({
                        left:-1*_this.width
                    });
                    _this.iNow=1;
                }
            });

            for(var i=0;i<this.aLi.length;i++){
                this.aLi[i].className='';
            }
            _this.oDesc.text(_this.aImg[this.iNow].alt);
            console.log(_this.iNow)
            this.aLi[this.iNow-1].className='active';
        },
        getSettings:function(){
            var setting=this.poster.attr("data-setting");
            if(setting && setting!=''){
                return $.parseJSON(setting);
            }else{
                return {};
            };
        }
    };
    rotatePlay.init=function(posters){
        var _this=this;
        posters.each(function(i,e){
            new _this($(this));
        })
    };
    window["rotatePlay"]=rotatePlay;
})(jQuery)