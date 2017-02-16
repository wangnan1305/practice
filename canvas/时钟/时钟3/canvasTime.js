/**
 * Created by Administrator on 2015/11/6.
 */
function canvasTime(){}

canvasTime.prototype={
    init:function(){
        var _this=this;
        this.clock();
        setInterval(_this.clock,1000);
    },
    clock:function(){
        var ctx=document.querySelector("#canvas").getContext("2d");

        ctx.save();
        ctx.clearRect(0,0,150,150);
        ctx.translate(75,75);
        ctx.scale(0.4,0.4);
        ctx.fillStyle="white";
        ctx.strokeStyle="black";
        ctx.lineWidth=8;
        ctx.lineCap="round";

        //获取当前时间
        var now=new Date();

        var nowSec=now.getSeconds(),
            nowMin=now.getMinutes(),
            nowHours=now.getHours()>=12?now.getHours()-12:now.getHours();
        //绘制秒针
        ctx.save();
        ctx.beginPath();
        ctx.rotate(nowSec*(Math.PI/30));
        ctx.lineWidth=5;
        ctx.strokeStyle="red";
        ctx.moveTo(0,25);
        ctx.lineTo(0,-110);
        ctx.stroke();
        ctx.restore();

        //绘制分针
        ctx.save();
        ctx.beginPath();
        ctx.rotate(nowMin*(Math.PI/30)+nowSec*(Math.PI)/1800);
        ctx.lineWidth=10;
        ctx.moveTo(0,22);
        ctx.lineTo(0,-100);
        ctx.stroke();
        ctx.restore();

        //绘制时针
        ctx.save();
        ctx.beginPath();
        ctx.rotate(nowHours*(Math.PI/6)+nowMin*(Math.PI/360)+nowSec*(Math.PI)/21600);
        ctx.lineWidth=14;
        ctx.moveTo(0,20);
        ctx.lineTo(0,-70);
        ctx.stroke();
        ctx.restore();

        //绘制分针刻度
        ctx.save();
        for(var i=0;i<60;i++){
            if(i!=5){
                ctx.beginPath();
                ctx.rotate(Math.PI/30);
                ctx.lineWidth=4;
                ctx.moveTo(117,0);
                ctx.lineTo(120,0);
                ctx.stroke();
            }
        }
        ctx.restore();

        //绘制小时刻度
        ctx.save();
        for(var i=0;i<12;i++){
            ctx.beginPath();
            ctx.rotate(Math.PI/6);
            ctx.moveTo(100,0);
            ctx.lineTo(120,0);
            ctx.stroke();
        }
        ctx.restore();

        //绘制外形时钟
        ctx.beginPath();
        ctx.strokeStyle="#325FA2";
        ctx.lineWidth=14;
        ctx.arc(0,0,142,0,2*Math.PI,true);
        ctx.stroke();
        ctx.restore();

    }
}
var main=function(){
    var t=new canvasTime();
    t.init();
}