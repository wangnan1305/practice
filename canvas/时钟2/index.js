/**
 * Created by Administrator on 2015/11/2.
 */
var R= 4,
    iW=R/4,
    marginTop=0,
    marginLeft=0,
    gWidth=1078,
    gHeight=768;
var nowTime;
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
window.onload=function(){
    var drawing=document.querySelector("canvas");
    console.log(drawing)
    var context=drawing.getContext("2d");
    function reset(){
        gWidth=document.documentElement.clientWidth||document.body.clientHeight;
        gHeight=document.documentElement.clientHeight||document.body.clientWidth;
        R = Math.round(gWidth * 4 / 5 / 108)-iW;
        iW=R/4;
        marginTop=Math.round(gHeight /10);
        marginLeft=Math.round(gWidth /15);
        drawing.width=gWidth;
        drawing.height=gHeight;
    }
    reset();
    render(context,drawing);
    setInterval(function(){
        render(context,drawing);
        updata();
    },50);
    window.onresize=reset;
}

function getnowTime(){
    var date=new Date();
    var ret =date.getHours()*3600+date.getMinutes()*60+date.getSeconds();
    return ret;
}
nowTime=getnowTime();
function updata(){
    var nextTime=getnowTime();
    var nextHours=parseInt(nextTime/3600);
    var nextMinutes=parseInt((nextTime-nextHours*3600)/60);
    var nextSeconds=nextTime%60;

    var nowHours=parseInt(nowTime/3600);
    var nowMinutes=parseInt((nowTime-nowHours*3600)/60);
    var nowSeconds=nowTime%60;
    if(nowSeconds!=nextSeconds){
        if( parseInt(nowHours/10) != parseInt(nextHours/10) ){
            addBalls( marginLeft + 0 , marginTop , parseInt(nextHours/10) );
        }
        if( parseInt(nowHours%10) != parseInt(nextHours%10) ){
            addBalls( marginLeft + 15*(R+iW) , marginTop , parseInt(nextHours%10) );
        }

        if( parseInt(nowMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( marginLeft + 39*(R+iW) , marginTop , parseInt(nextMinutes/10) );
        }
        if( parseInt(nowMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( marginLeft + 54*(R+iW) , marginTop , parseInt(nextMinutes%10) );
        }

        if( parseInt(nowSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( marginLeft + 78*(R+iW) , marginTop , parseInt(nextSeconds/10) );
        }
        if( parseInt(nowSeconds%10) != parseInt(nextSeconds%10) ){

            addBalls( marginLeft + 93*(R+iW) , marginTop , parseInt(nextSeconds%10) );
        }
        nowTime=nextTime;
    }
    updataballs();
    //console.log(balls.length)
}
function updataballs() {
    //console.log(balls[2])
    for (var i = 0; i < balls.length; i++) {
        var a = 0;
        balls[i].pointX += balls[i].vx;
        balls[i].pointY += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].pointY >= gHeight - R) {
            balls[i].pointY = gHeight - R;

            balls[i].vy = -(balls[i].vy - 7 * (++a) * 2);
            if (Math.abs(balls[i].vy) <= 0) {
                balls[i].vy = 0;
            }
        }
    }
    var con=0;
    for(var i=0;i<balls.length;i++){
        if(balls[i].pointX+R>0 && balls[i].pointX-R<gWidth){
            balls[con++]=balls[i];
        }
    }
    while(balls.length>con){
        balls.pop();
    }
}
function addBalls(x,y,num){
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){

                var aball={
                    pointX:(x+(R+iW)*(j*2+1)),
                    pointY:(y+(R+iW)*(i*2+1)),
                    vx:-Math.pow(1,Math.ceil(Math.random()*1000))*4,
                    vy:-(Math.floor(Math.random()*5)+1),
                    g:1.5+Math.random(),
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aball);
                //console.log(balls[0])
            }
        }
    }
}
function render(context, drawing) {
    context.clearRect(0, 0, drawing.offsetWidth, drawing.offsetHeight);
    var hours = parseInt(nowTime / 3600),
        miuntes = parseInt((nowTime - hours * 3600) / 60),
        seconds = nowTime % 60;
    renderGight(marginLeft, marginTop, parseInt(hours / 10), context);
    renderGight(marginLeft + 15 * (R+iW), marginTop, parseInt(hours % 10), context);
    renderGight(marginLeft + 30 * (R+iW), marginTop, 10, context);
    renderGight(marginLeft + 39 * (R+iW), marginTop, parseInt(miuntes / 10), context);
    renderGight(marginLeft + 54 * (R+iW), marginTop, parseInt(miuntes % 10), context);
    renderGight(marginLeft + 69 * (R+iW), marginTop, 10, context);
    renderGight(marginLeft + 78 * (R+iW), marginTop, parseInt(seconds / 10), context);
    renderGight(marginLeft + 93 * (R+iW), marginTop, parseInt(seconds % 10), context);

    for (var i = 0; i < balls.length; i++) {
        context.fillStyle = balls[i].color;

        context.beginPath();
        context.arc(balls[i].pointX, balls[i].pointY, R, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }
}
function renderGight(x,y,num,context){
    context.fillStyle="rgb(0,102,153)";
    for (var i=0;i<digit[num].length;i++){
        for (var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                context.beginPath();
                context.arc(x+(R+iW)*(j*2+1),y+(R+iW)*(i*2+1),R,0,2*Math.PI,false);
                context.closePath();
                context.fill();
            }
        }
    }
}