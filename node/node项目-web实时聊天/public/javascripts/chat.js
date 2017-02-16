var Chat = function(socket){
	this.socket = socket;
}
//发送消息
Chat.prototype.sendMessage = function(room, text){
	var message = {
		room:room,
		text:text
	};
	this.socket.emit('message',message);
};

//变更房间
Chat.prototype.changeRoom = function(room){
	this.socket.emit('join',{
		newRoom: room
	});
};

//处理聊天命令
Chat.prototype.processCommand = function(command){
	var words = command.split(' ');
	var command = words[0]                        //用户第一个会以'/'开头表示聊天命令
					.substring(1,words[0].length)
					.toLowerCase();
	var message = false;

	switch(command){

		case 'join':
			words.shift();//获取数组第一个元素并且数组第一个元素被删
			var room = words.join(' ');
			this.changeRoom(room);
			break;
		case 'nick':
			words.shift();
			var room = words.join(' ');
			this.socket.emit('nameAttempt',name);
			break;
		default:
			message = '未定义的命令';
			break;
	}
	return message;
};


