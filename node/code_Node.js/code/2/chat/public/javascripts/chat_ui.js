function divEscapedContentElement(message) {
  return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
  return $('<div></div>').html('<i>' + message + '</i>');
}

function processUserInput(chatApp, socket) {
  var message = $('#send-message').val();
  var systemMessage;

  if (message.charAt(0) == '/') {
    systemMessage = chatApp.processCommand(message);
    if (systemMessage) {
      $('#messages').append(divSystemContentElement(systemMessage));
    }
  } else {
    chatApp.sendMessage($('#room').text(), message);
    $('#messages').append(divEscapedContentElement(message));
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }

  $('#send-message').val('');
}

var socket = io.connect();

$(document).ready(function() {
  var chatApp = new Chat(socket);

  socket.on('nameResult', function(result) {
    var message;

    if (result.success) {
      message = 'You are now known as ' + result.name + '.';
    } else {
      message = result.message;
    }
    $('#messages').append(divSystemContentElement(message));
  });

  socket.on('joinResult', function(result) {
    $('#room').text(result.room);
    $('#messages').append(divSystemContentElement('Room changed.'));
  });

  socket.on('message', function (message) {
    var newElement = $('<div></div>').text(message.text);
    $('#messages').append(newElement);
  });

  socket.on('rooms', function (rooms) {
    $('#room-list').empty();

    for(var room in rooms) {
      room = room.substring(1, room.length);
      if (room != '') {
        $('#room-list').append(divEscapedContentElement(room));
      }
    }

    $('#room-list div').click(function() {
      chatApp.processCommand('/join ' + $(this).text());
      $('#send-message').focus();
    });
  });

  setInterval(function() {
    socket.emit('rooms');
  }, 1000);

  $('#send-message').focus();

  $('#send-form').submit(function() {
    processUserInput(chatApp, socket);
    return false;
  });
});
//显示可疑的文本（防止XSS攻击）
function divEscapedContentElement(message){
	return $('<div></div>').text(message);
};

//信用的文本数据
function divSystemContentElement(message){
	return $('<div></div>').html('<i>' + message + '</i>');
};

//处理原始用户输入
function processUserInput (chatApp, socket) {
	var message = $("#send-message").val();
	var systemMessage;
	if(message.charAt(0) == '/'){
		systemMessage = chatApp.processCommand(message);
		if (systemMessage){
			$("#messages").append(divSystemContentElement(systemMessage));
		}
	}else{
		chatApp.sendMessage($("#room").text(), message);
		$("#message").append(divEscapedContentElement(message));
		$("#message").scrollTop($("#message").prop('scrollHeight'));
	}
	$("#send-message").val('');
}

//socket.io事件初始化
var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);

	socket.on('nameResult', function (result) {   //显示改昵称的结果
		var message;

		if(result.success) {
			message = '你的昵称现在为：' + result.name + '.';
		}else{
			message = result.message;
		}
		$("#messages").append(divSystemContentElement( message ));
	});

	socket.on('joinResult', function (result){   //显示房间的结果
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('房间改变'));
	});

	socket.on('message', function (message){  // 显示接收到的消息
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	socket.on('rooms', function (rooms){       
		$('#rooom-list').empty();

		for(var room in rooms){      //显示可用房间列表
			room = room.substring(1, room.length);
			if(room !=''){
				$('#rooom-list').append(divEscapedContentElement(room));
			}
		}

		$('#rooom-list div').click(function(){   //点击房间可以换到那个房间中
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});

	setInterval(function() {        //定时请求可用房间列表
		socket.emit('rooms');
	},1000);

	$('#send-message').focus();

	$('#send-form').submit(function(){
		processUserInput(chatApp, socket);
		return false;
	});
});