"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(["我是", ",我的工作是", ""], ["我是", ",我的工作是", ""]);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var x = 1;
var y = 2;

var _ref = [y, x];
x = _ref[0];
y = _ref[1];


console.log(x);
console.log(y);

function demo() {
	return { "name": "张三", "age": 55 };
}

var _demo = demo();

var name = _demo.name;
var age = _demo.age;


console.log(name);

console.log(age);

//函数参数的默认值
function demo2(a) {
	var name;
	if (a === undefined) {
		name = "zhangsan";
	} else {
		name = a;
	}
	console.log(name);
}

function demo3(_ref2) {
	var _ref2$name = _ref2.name;
	var name = _ref2$name === undefined ? "zhangsan" : _ref2$name;

	console.log(name);
}

//字符串的扩展
var name2 = '王楠';
var work2 = "font-end developer";

var str = "he is" + name2 + "他的工作是" + work2; //传统做法

console.log(str);

var str2 = "我是" + name2 + ",我的工作是" + work2;
console.log(str2);

var a = 1;
var b = 2;
console.log("结果是" + (a + b));

function fn_test() {
	return 'es6learn';
}
console.log("打印出来的是" + fn_test());

function tagFn(arr, v1, v2) {
	console.log(arr);
	console.log(v1);
	console.log(v2);
}
tagFn(_templateObject, name2, work2);
/*标签模板常用来过滤用户的非法输入和多语言转换*/
var n = "dll";
var n2 = n.repeat(3);
console.log(n2);
console.log(n.includes('d', 1)); //false
console.log(n.startsWith('l', 1)); //true
console.log(n.endsWith('l', 2)); //true  只针对前两个字符

console.log(n.startsWith('l', 1));

var num = 3.2;
console.log(Number.isInteger(num)); //false 判断是否是整数
console.log(Math.trunc(num)); //去除一个数的小树部分

console.log(Array.of(1, 2, 3, 4, 5));

//Array.from()  //1.可以将类数组转换为数组 2.可以将字符串转换为数组
console.log(Array.from("hello"));

var arr = [1, 2, 3, 4, 5, 6];
//find()函数找出数组中符合条件的第一个元素
var target = arr.find(function (value) {
	return value > 2; //value > 7返回undefined
});
console.log(target);

//findIndex()返回符合条件的第一个数组成员的位置
var target2 = arr.findIndex(function (value) {
	return value > 4;
});

console.log(target2);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	for (var _iterator = ['a', 'b', 'c'].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var _step$value = _slicedToArray(_step.value, 2);

		var i1 = _step$value[0];
		var i2 = _step$value[1];
		//对数组进行遍历
		console.log(i1, i2);
		//打印出键值和对应的值
		// 0 "a"
		// 1 "b"
		// 2 "c"
	}
} catch (err) {
	_didIteratorError = true;
	_iteratorError = err;
} finally {
	try {
		if (!_iteratorNormalCompletion && _iterator.return) {
			_iterator.return();
		}
	} finally {
		if (_didIteratorError) {
			throw _iteratorError;
		}
	}
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
	for (var _iterator2 = ['a', 'b', 'c'].keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
		var index = _step2.value;
		//对数组进行遍历
		console.log(index);
		//打印出索引键
		// 0 
		// 1 
		// 2
	}

	// for (let elem of ['a', 'b'].values()) { //这个方法有点问题编译不通过
	//   console.log(elem);
	// }

	// //数组推导
	// var test15= [1,2,3,4];
	// var newtest = [for(i of test15) i*2];
	// console.log(newtest);


	//对象新写法
} catch (err) {
	_didIteratorError2 = true;
	_iteratorError2 = err;
} finally {
	try {
		if (!_iteratorNormalCompletion2 && _iterator2.return) {
			_iterator2.return();
		}
	} finally {
		if (_didIteratorError2) {
			throw _iteratorError2;
		}
	}
}

var objname = "zhangsan";
var objage = 18;
var person = _defineProperty({ objage: objage, objname: objname,
	say: function say() {
		alert("sadsa");
	}
}, objage + objname, "张三18了");

console.log(person);

//Object扩展
//Object.is(arg1,arg2)  //判断是否全等===

//Object.assign(target,origin1,origin2) //合并这三个对象
function Dog(name) {
	this.name = name;
}
Dog.prototype = {
	type: "动物",
	say: function say() {
		console.log(this.type + "的名字叫" + this.name);
	}
};
var dog = new Dog("dll");
dog.say();

function log(x) {
	var y = arguments.length <= 1 || arguments[1] === undefined ? 'world' : arguments[1];

	console.log(x, y);
}
log('hello');
log('hello', '');

var f = function f() {
	console.log(undefined.x);
};
var obj = {
	x: "1000",
	show: function show() {
		var _this = this;

		setTimeout(function () {
			console.log(_this.x);
		}, 10);
	}
};
obj.show();

var testjiantou = function testjiantou(x) {
	x = x + 2;x = x * x * x;return x;
};

var array = [1, 2, 3].map(function (x) {
	return testjiantou(x);
});

console.log(array);

var sm = Symbol("newType");
console.log(typeof sm === "undefined" ? "undefined" : _typeof(sm));
console.log(sm);

var COLOR_RED = Symbol('red');
var COLOR_GREEN = Symbol('green');

function getComplement(color) {
	switch (color) {
		case COLOR_RED:
			return COLOR_GREEN;
		case COLOR_GREEN:
			return COLOR_RED;
		default:
			throw new Error('Undefined color');
	}
}

console.log(getComplement(COLOR_RED));

function timeout(ms) {
	return new Promise(function (resolve, reject) {
		setTimeout(resolve, ms, 'done');
	});
}

timeout(3000).then(function (value) {
	console.log(value);
});

var promise = new Promise(function (resolve, reject) {
	console.log('Promise  ' + new Date().getTime());
	resolve();
});

promise.then(function () {
	console.log('Resolved  ' + new Date().getTime());
});

console.log('Hi ' + new Date().getTime());

function loadImageAsync(url) {

	return new Promise(function (resolve, reject) {

		var image = new Image();
		var timeoutTimer;

		//开始加载超时监控，超时后进行reject操作
		function beginTimeoutWatcher() {
			timeoutTimer = setTimeout(function () {
				reject('timeout');
			}, 10000);
		}

		//结束加载超时监控
		function endTimeoutWatcher() {
			if (!timeoutTimer) {
				return;
			}

			clearTimeout(timeoutTimer);
		}

		image.onload = function () {
			resolve(image);
		};

		image.onerror = function () {
			reject(new Error('Could not load image at' + url));
		};
		image.src = "loading.gif";
		setTimeout(function () {
			image.src = url;
		}, 2000);
	});
}
var url = "http://wangnan1305.github.io/img/object_enumerable2.png";
var imageLoad = loadImageAsync(url);
imageLoad.then(function (value) {
	document.body.appendChild(value);
	console.log(value);
	console.log('加载成功');
}, function (error) {
	alert(error);
});

var getJSON = function getJSON(method, url, data) {
	var promise = new Promise(function (resolve, reject) {
		var xhr = null;

		try {
			xhr = new XMLHttpRequest();
		} catch (e) {
			xhr = new ActiveObject('Microsoft.XMLHTTP');
		}

		if (method == 'get' && data) {
			url += '?' + data;
		}

		xhr.open(method, url, true);

		xhr.responseType = "json";

		if (method == 'get') {
			xhr.send();
		} else {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
			xhr.send(data);
		}

		xhr.onreadystatechange = handle;

		function handle() {
			if (this.readyState === 4) {
				if (xhr.status === 200) {
					console.dir(this);
					resolve(this.response);
				} else {
					reject(new Error(this.statusText));
				}
			}
		}
	});

	return promise;
};

getJSON("get", "http://book.rdtuijian.com/index").then(function (json) {
	console.log(json);
}, function (error) {
	console.error('出错了', error);
});