/**
 * Created by Administrator on 2015/11/2.
 */
var Canvas = {};

Canvas.cxt = document.getElementById('canvasId').getContext('2d');

Canvas.Point = function(x, y){
    this.x = x;
    this.y = y;
};

/*擦除canvas上的所有图形*/
Canvas.clearCxt = function(){
    var me = this;
    var canvas = me.cxt.canvas;
    me.cxt.clearRect(0,0, canvas.offsetWidth, canvas.offsetHeight);
};

/*时钟*/
Canvas.Clock = function(){
    var me = Canvas,
        c = me.cxt,
        radius = 150, /*半径*/
        scale = 20, /*刻度长度*/
        minangle = (1/30)*Math.PI, /*一分钟的弧度*/
        hourangle = (1/6)*Math.PI, /*一小时的弧度*/
        hourHandLength = radius/2, /*时针长度*/
        minHandLength = radius/3*2, /*分针长度*/
        secHandLength = radius/10*9, /*秒针长度*/
        center = new me.Point(c.canvas.width/2, c.canvas.height/2); /*圆心*/

    /*绘制圆心（表盘中心）*/
    function drawCenter(){
        c.save();

        c.translate(center.x, center.y);

        c.fillStyle = 'black';
        c.beginPath();
        c.arc(0, 0, radius/20, 0, 2*Math.PI);
        c.closePath();
        c.fill();
        c.stroke();

        c.restore();
    };

    /*通过坐标变换绘制表盘*/
    function drawBackGround(){
        c.save();

        c.translate(center.x, center.y); /*平移变换*/
        /*绘制刻度*/
        function drawScale(){
            c.moveTo(radius - scale, 0);
            c.lineTo(radius, 0);
        };

        c.beginPath();
        c.arc(0, 0, radius, 0, 2*Math.PI, true);
        c.closePath();

        for (var i = 1; i <= 12; i++) {
            drawScale();
            c.rotate(hourangle); /*旋转变换*/
        };
        /*绘制时间(3,6,9,12)*/
        c.font = " bold 30px impack"
        c.fillText("3", 110, 10);
        c.fillText("6", -7, 120);
        c.fillText("9", -120, 10);
        c.fillText("12", -16, -100);
        c.stroke();

        c.restore();
    };

    /*绘制时针(h: 当前时（24小时制）)*/
    this.drawHourHand = function(h){

        h = h === 0? 24: h;

        c.save();
        c.translate(center.x, center.y);
        c.rotate(3/2*Math.PI);

        c.rotate(h*hourangle);

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(hourHandLength, 0);
        c.stroke();
        c.restore();
    };

    /*绘制分针（m: 当前分）*/
    this.drawMinHand = function(m){

        m = m === 0? 60: m;

        c.save();
        c.translate(center.x, center.y);
        c.rotate(3/2*Math.PI);

        c.rotate(m*minangle);

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(minHandLength, 0);
        c.stroke();
        c.restore();
    };

    /*绘制秒针（s：当前秒）*/
    this.drawSecHand = function(s){

        s = s === 0? 60: s;

        c.save();
        c.translate(center.x, center.y);
        c.rotate(3/2*Math.PI);

        c.rotate(s*minangle);

        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(secHandLength, 0);
        c.stroke();
        c.restore();
    };

    /*依据本机时间绘制时钟*/
    this.drawClock = function(){
        var me = this;

        function draw(){
            var date = new Date();

            Canvas.clearCxt();

            drawBackGround();
            drawCenter();
            me.drawHourHand(date.getHours() + date.getMinutes()/60);
            me.drawMinHand(date.getMinutes() + date.getSeconds()/60);
            me.drawSecHand(date.getSeconds());
        }
        draw();
        setInterval(draw, 1000);
    };
};

var main = function(){
    var clock = new Canvas.Clock();
    clock.drawClock();
};