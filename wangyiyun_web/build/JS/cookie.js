/**
 * Created by Administrator on 2016/3/13.
 */
//设置cookie
function setcookie(name,key,day) {
    var time=new Date();
    time.setTime(time.getTime()+day*24*60*60*1000);
    document.cookie=name+"="+key+((day == null) ? '' : ";expires=" +time.toGMTString());
}

//获取cookie
function getcookie(name) {
    if(document.cookie.length>0){
        var start=document.cookie.indexOf(name+'=');
        if(start!=-1){  //如果存在
            start = name.length+1;
            return document.cookie.substring(start);
        }
    }
    return "";
}

//删除cookie

function clearcookie(name){
    if(document.cookie.length>0){
        var start=document.cookie.indexOf(name+'=');
        if(start!=-1){
            setcookie(name,"",-1);
        }
    }
}
/*

function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return (document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}*/
