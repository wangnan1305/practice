
(function(){
    var canvas=document.querySelector("#canvas");
    canvas.width=500;
    canvas.height=500;
    var aBtn=document.querySelectorAll("button");
    var cxt=canvas.getContext("2d");
    var oCode=document.querySelector("#code");
    var point=[
        {x:100,y:250},  //起点
        {x:400,y:250},   //终点
        {x:250,y:100},   //控制点1
        {x:300,y:100}    //控制点2
    ]
    init();
    //初始化位置
    function init(){
        aBtn[0].style.left=point[0].x+'px';    //起点
        aBtn[0].style.top=point[0].y+'px';
        aBtn[1].style.left=point[1].x+'px';  //终点
        aBtn[1].style.top=point[1].y+'px';
        aBtn[2].style.left=point[2].x+'px';   //控制点1
        aBtn[2].style.top=point[2].y+'px';
        aBtn[3].style.left=point[3].x+'px';   //控制点2
        aBtn[3].style.top=point[3].y+'px';
        drag();
    }
    //拖拽小球事件
    function drag(){
        var diffX= 0,diffY=0;
        for(var i=0;i<aBtn.length;i++) {
            aBtn[i].onmousedown = function (event) {
                var _this=this;
                event = event ? event : window.event;// 兼容
                diffX = event.clientX - this.offsetLeft;
                diffY = event.clientY - this.offsetTop;

                document.onmousemove = function (event) {
                    event = event ? event : window.event;
                    if(event.clientX-diffX>canvas.width-10){
                        _this.style.left=canvas.width-10+'px';
                    }else if(event.clientX-diffX<10){
                        _this.style.left=10+'px';
                    }else {
                        _this.style.left = event.clientX - diffX + 'px';

                    }
                    if(event.clientY-diffY>canvas.height-10){
                        _this.style.top=canvas.height-10+'px';
                    }else if(event.clientY-diffY<10){
                        _this.style.top=10+'px';
                    }else{
                        _this.style.top = event.clientY - diffY + 'px';
                    }

                    //保存三个小球变化后的值并执行drawBSE函数
                    if(_this.id=="btn1"){
                        point[0].x=parseInt(_this.style.left);
                        point[0].y=parseInt(_this.style.top);

                    }else if(_this.id=="btn2"){
                        point[1].x=parseInt(_this.style.left);
                        point[1].y=parseInt(_this.style.top);

                    }else if(_this.id=="btn3"){
                        point[2].x=parseInt(_this.style.left);
                        point[2].y=parseInt(_this.style.top);
                    }else if(_this.id=="btn4"){
                        point[3].x=parseInt(_this.style.left);
                        point[3].y=parseInt(_this.style.top);
                    }
                    drawBSE(cxt);
                    showcode();
                }
                document.onmouseup=function(){
                    document.onmousemove=null;
                    _this.onmouseup=null;
                }
                return false;
            }
        }
        drawBSE(cxt);
        showcode();
    }
    //绘制贝塞尔三次曲线
    function drawBSE(cxt){
        cxt.clearRect(0,0,canvas.width,canvas.height)
        //console.log('p[0].x:'+point[0].x+' p[0].y:'+point[0].y+' p[1].x:'+point[1].x+' p[1].y:'+point[1].y+' p[2].x:'+point[2].x+' p[2].y:'+point[2].y)
        cxt.save();
        cxt.strokeStyle="#606060";
        cxt.lineCap="round";
        cxt.lineWidth=3;
        cxt.beginPath();
        cxt.moveTo(point[2].x,point[2].y);
        cxt.lineTo(point[0].x,point[0].y);
        cxt.moveTo(point[3].x,point[3].y);
        cxt.lineTo(point[1].x,point[1].y);
        cxt.stroke();


        cxt.lineWidth=5;
        cxt.strokeStyle="rgba(0,0,0,0.9)";
        cxt.beginPath();
        cxt.moveTo( point[0].x,point[0].y );
        cxt.bezierCurveTo(point[2].x,point[2].y,point[3].x,point[3].y,point[1].x,point[1].y );
        cxt.stroke();
        cxt.restore();
    }
    //显示代码
    function showcode(){
        oCode.innerHTML="canvas = document.getElementById(\"canvas\");\n"+
            "cxt = canvas.getContext(\"2d\");\n"+
            "cxt.lineWidth =5;\n"+
            "cxt.strokeStyle=\"rgba(0,0,0,0.9)\";\n"+
            "cxt.beginPath();\n"+
            "cxt.moveTo("+point[0].x+","+point[0].y+");\n"+
            "cxt.bezeirCurveTo("+point[2].x+","+point[2].y+","+point[3].x+","+point[3].y+","+point[1].x+","+point[1].y+");\n"+
            "cxt.stroke();"
    }
})()



