/**
 * Created by Administrator on 2016/2/22.
 */
/*观察者模式1.0*/

/*var saleOffice={};   //定义售楼处

 saleOffice.clientList=[];   //定义缓存列表

 saleOffice.listen=function(fn){       //增加订阅者
 this.clientList.push(fn);    //订阅的消息添加进缓存列表
 };

 saleOffice.trigger=function(){
 for(var i=0,fn;fn=this.clientList[i++];){
 fn.apply(this,arguments)
 }
 };

 saleOffice.listen(function(price,squareMeter){  //小明订阅消息
 console.log('价格='+price);
 console.log('大小='+squareMeter);
 });

 saleOffice.listen(function(price,squareMeter){  //小红订阅消息
 console.log('价格='+price);
 console.log('大小='+squareMeter);
 });

 saleOffice.trigger(2000000,88);*/
/*1.0结束*/



/*观察者模式2.0，用户可以订阅自己感兴趣的东西*/

var saleOffice={};

saleOffice.clientList=[];

saleOffice.listen=function(key,fn){
    if(!this.clientList[key]){
        this.clientList[key]=[];
    };
    this.clientList[key].push(fn);
}


/*shift() 方法用于把数组的第一个元素从其中删除,并返回第一个元素的值。*/


/*saleOffice.trigger=function(){
 var key=Array.prototype.shift.call(arguments),    //取出消息类型
 fns=this.clientList[key];                          //取出该消息对应的函数类型集合

 if(!fns || fns.length===0){    //如果没有订阅消息则返回
 return false;
 };

 for(var i=0 , fn; fn = fns[i++];){
 fn.apply(this,arguments)
 }
 }

 saleOffice.listen('squareMeter88',function(price){
 console.log('价格='+price);
 });

 saleOffice.listen('squareMeter100',function(price){
 console.log('价格='+price);
 });

 saleOffice.trigger('squareMeter88',20000000);
 //saleOffice.trigger('squareMeter100',30000000);*/

/*2.0结束*/


/*观察者模式的通用实现--所有对象都具有观察者的功能*/

var event={
    clientList:[],

    listen:function(key,fn){
        if(!this.clientList[key]){
            this.clientList[key]=[];
        };
        this.clientList[key].push(fn);
    },

    trigger:function(){
        var key=Array.prototype.shift.call(arguments),
            fns=this.clientList[key];
        /*console.log(fns);
         console.log(fns.length);
         console.log(fns[1]);*/
        if(!fns || fns.length===0){
            return false;
        };

        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    },

    remove:function(key,fn){         //取消订阅事件
        var fns=this.clientList[key];
        if(!fns){              //如果key对应的消息没有订阅则直接返回
            return false;
        };
        if(!fn){               //如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns && (fns.length=0);
        }else{
            for(var l=fns.length-1;l>=0;l--){
                var _fn=fns[l];
                if(_fn===fn){
                    fns.splice(l,1);      //删除订阅者的回调函数。splice函数会改变原数组
                }
            }
        }
    }
}

var installEvent=function(obj){
    for(var i in event){
        obj[i]=event[i];
    }
};

var saleOffice={};

installEvent(saleOffice);

/*saleOffice.listen('88',function(price){
 console.log('88平米的价格'+price);
 });
 saleOffice.listen('88',function(price){
 console.log('88平米的价格'+price);
 });saleOffice.listen('88',function(price){
 console.log('88平米的价格'+price);
 });
 saleOffice.listen('100',function(price){
 console.log('100平米的价格'+price);
 });*/

saleOffice.listen('88',fn1=function(price){
    console.log('88平米价格'+price);
});

saleOffice.listen('88',fn2=function(price){
    console.log('88平米价格'+price);
});

saleOffice.remove('88',fn1);

saleOffice.trigger('88',200);

/*saleOffice.trigger('88',200)*/

/*通用实现结束*/


/*观察者模式3.0，全局的观察者模式*/

var Event=(function(){
    var clientList=[],
        listen,
        trigger,
        remove;

    listen=function(key,fn){
        if(!clientList[key]){
            clientList[key]=[];
        };

        clientList[key].push(fn);
    };

    trigger=function(){
        var key=Array.prototype.shift.call(arguments),
            fns=clientList[key];

        if(!fns || fns.length===0){
            return false;
        };

        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        };
    };

    remove=function(key,fn){
        var fns=clientList[key];
        if(!fns){
            return false;
        };

        if(!fn){
            fns && (fns.length=0);
        }else{
            for(var l=fns.length-1;l>=0;l--){
                var _fn=fns[l];
                if(_fn===fn){
                    fns.splice(l,1);
                }
            }
        }
    };

    return {
        listen:listen,
        trigger:trigger,
        remove:remove
    }
})();


Event.listen('88',function(price){  //小红订阅的消息
    console.log('88平米'+price);
});

Event.trigger('88',200);   //售楼处发的消息

/*3.0完毕*/



