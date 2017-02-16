/**
 * Created by Administrator on 2015/9/16.
 */
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

}
function getStyle(obj, name) {
    return obj.currentStyle ? obj.currentStyle[name] : window.getComputedStyle(obj)[name];
}