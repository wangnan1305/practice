var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var cache = {};

//文件不存在时，发送404错误
function send404(response){
	response.writeHead(404,{'Content-type':'text/plain'});
	response.write('Error 404:not found');
	response.end();
}

//提供文件数据
function sendFile(response, filePath ,fileContents){
	response.writeHead(200,{'Content-type': mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

//缓存文件
function serveStatic(response, cache ,absPath) {
	if(cache[absPath]){  //判断是否在缓存中
		sendFile(response, absPath ,cache[absPath]);  //从内存中返回文件
	}else {
		fs.exists(absPath, function(exists) {   // 检查文件是否存在
			if(exists){
				fs.readFile(absPath, function(err, data){
					if(err){
						send404(response);
					}else{
						cache[absPath] = data;  //把数据存入缓存
						sendFile(response, absPath, data);
					}
				});
			}else{
				send404(response);   //找不到文件发出HTTP404响应
			}
		});
	}
}

//创建http服务器
var server = http.createServer(function(request, response){
	var filePath = false;

	if(request.url == '/'){
		filePath = 'public/index.html';   //返回默认的html文件
	}else {
		filePath = 'public' + request.url;  //转换为相对路径
	}

	var absPath = './' + filePath;
	serveStatic(response , cache ,absPath);
});

//启动服务器
server.listen(3000, function() {
	console.log("server listening 3000");
});

//设置socket.io服务器
var chatServer = require('./lib/chat_server');
chatServer.listen(server);