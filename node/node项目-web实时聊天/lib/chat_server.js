//初始化socket.io
var socketio = require('socket.io');

var io;

var guestNumber = 1;

var nickNames = {};

var namesUsed =[];

var currentRoom = {};

//定义聊天服务器函数listen
//连接处理逻辑
exports.listen = function(server){
	io = socketio.listen(server);  //启动io服务器

	io.set('log,level',1);

	io.sockets.on('connection',function(socket){  //定义每个用户连接处的处理逻辑
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);

		joinRoom(socket, 'Lobby');         //将用户加入到聊天室

		handleMessageBroadcasting(socket, nickNames);

		handleNameChangeAttempts(socket, nickNames, namesUsed);

		handRoomJoining(socket);

		socket.on('rooms',function(){
			socket.emit('rooms',io.sockets.manager.rooms);
		});

		handleClientDisconnection(socket, nickNames, namesUsed);
	});
};

//分配昵称assignGuestName函数
function assignGuestName(socket, guestNumber, nickNames, namesUsed){
	var name = 'Guest' + guestNumber;   //生成昵称
	nickNames[socket.id] = name;        //关联id
	socket.emit('nameResult',{   
		name:name,                      //返回昵称
		success:true
	});
	namesUsed.push(name);               
	return guestNumber + 1;  //计数器
}

//进入聊天室
function joinRoom(socket, room){
	socket.join(room);   //进入房间
	currentRoom[socket.id] = room;  //记录当前用户的房间
	socket.emit('joinResult',{
		room:room
	});

	socket.broadcast.to(room).emit('message',{
		text: nickNames[socket.id] + '加入了聊天室' + room + '.'
	});

	var usersInRoom = io.sockets.clients(room);
	if(usersInRoom.length > 1){
		var usersInRoomSummary = '现在在房间中' + room + ':';
		for(var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id){
				if(index > 0){
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}
		usersInRoomSummary += '.';
		socket.emit('message',{
			text:usersInRoomSummary
		});
	}
}

//处理昵称变更请求
//不能以‘Guest’开头或者已经存在的昵称
function handleNameChangeAttempts(socket, nickNames, namesUsed){
	socket.on('nameAttempt',function(name){
		if(name.indexOf('Guest') === 0){
			socket.emit('nameResult',{
				success:false,
				message:'昵称不能以Guest开头'
			});
		}else {
			if(namesUsed.indexOf(name) === -1){  //未注册
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];  //删除之前用的昵称
				socket.emit('nameResult',{
					name: name,
					success: true
				});
				socket.broadcast.to(currentRoom[socket.id]).emit('message',{
					text:previousName + '已经改为：' + name + '.'
				});
			}else{
				socket.emit('nameResult',{
					success:false,
					message:'名字已经被使用'
				});
			}
		}
	});
}

//发送聊天消息
function handleMessageBroadcasting(socket) {
	socket.on('message',function(message){
		socket.broadcast.to(message.room).emit('message',{
			text: nickNames[socket.id] + ': ' + message.text
		});
	});
}

//创建房间
function handRoomJoining(socket){
	socket.on('join',function(room){
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	})
}

//用户断开连接

function handleClientDisconnection(socket){
	socket.on('disconnect',function(){
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}