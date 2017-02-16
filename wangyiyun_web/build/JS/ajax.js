/**
 * Created by Administrator on 2016/3/1.
 */


function ajax(method, url, data, success) {

    if (method == 'get' && data) {
        url += '?' + data;
    }

    // IE8 & 9 only Cross domain JSON GET request
    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

        var xdr = new XDomainRequest(); // Use Microsoft XDR
        xdr.open(method, url);
        xdr.send(null);
        xdr.onload = function () {
            success&&success(xdr.responseText);
        };
        xdr.onerror=function(){
            alert('出错了'+xdr.status);
        }

    }else {
        var xhr = null;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }


        xhr.open(method, url, true);

        if (method == 'get') {
            xhr.send(null);
        } else {
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success && success(xhr.responseText);
                } else {
                    alert('出错了,Err：' + xhr.status);
                }
            }
        }
    }
}
