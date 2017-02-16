/**
 * Created by Administrator on 2015/9/22.
 */

var EventUtil={

    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler)
        }else{
            element["on"+type]=handler;
        }
    },

    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent(type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },

    getTarget:function(event){
        return event.target||event.srcElement;
    },

    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.cancelBubble=false;
        }
    },

    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.returnValue=false;
        }
    },
    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }
}

var getPosition={

    getX:function(event){
        event=EventUtil.getEvent(event);
        var pageX=event.pageX;
        if(pageX===undefined){
            pageX=event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        }
        return pageX;
    },

    getY:function(event){
        event=EventUtil.getEvent(event);
        var pageY=event.pageY;
        if(pageY===undefined){
            pageY=event.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        }
        return pageY;
    },

    getWheelDelta:function(event){
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera <9.5 ? -event.wheelDelta :event.wheelDelta);
        }else{
            return -event.datail*40;
        }
    }

}























