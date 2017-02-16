var x = 1;
var y = 2;

[x,y] = [y,x];

console.log(x);
console.log(y)

function demo() {
	return {"name":"张三","age":55}
}

var {name,age} = demo();

console.log(name);

console.log(age)

//函数参数的默认值
function demo2(a) {
	var name;
	if(a === undefined){
		name = "zhangsan"
	}else{
		name =a;
	}
	console.log(name)
}

function demo3({name="zhangsan"}) {
	console.log(name)
}

//字符串的扩展
let name2 = '王楠';
let work2 = "font-end developer";

let str = "he is" + name2 + "他的工作是" +work2;  //传统做法

console.log(str) 

let str2 = `我是${name2},我的工作是${work2}`;
console.log(str2) 

var a = 1;
var b = 2;
console.log(`结果是${a+b}`);

function fn_test() {
	return 'es6learn';
}
console.log(`打印出来的是${fn_test()}`);

function tagFn(arr,v1,v2) {
	console.log(arr);
	console.log(v1);
	console.log(v2);
}
tagFn`我是${name2},我的工作是${work2}`; 
/*标签模板常用来过滤用户的非法输入和多语言转换*/
let n = "dll";
let n2 = n.repeat(3)
console.log(n2)
console.log(n.includes('d',1))   //false
console.log(n.startsWith('l',1))  //true
console.log(n.endsWith('l',2))  //true  只针对前两个字符

console.log(n.startsWith('l',1));

var num = 3.2; 
console.log(Number.isInteger(num)) //false 判断是否是整数
console.log(Math.trunc(num)); //去除一个数的小树部分

console.log(Array.of(1,2,3,4,5));

//Array.from()  //1.可以将类数组转换为数组 2.可以将字符串转换为数组
console.log(Array.from("hello"));

let arr = [1,2,3,4,5,6];
//find()函数找出数组中符合条件的第一个元素
var target = arr.find(function (value) {
	return value > 2;  //value > 7返回undefined
})
console.log(target);

//findIndex()返回符合条件的第一个数组成员的位置
var target2 = arr.findIndex(function (value) {
	return value > 4;
})

console.log(target2)

for(let [i1,i2] of ['a','b','c'].entries()){ //对数组进行遍历
	console.log(i1,i2)
	//打印出键值和对应的值
	// 0 "a"
	// 1 "b"
	// 2 "c"
}

for(let index of ['a','b','c'].keys()){  //对数组进行遍历
	console.log(index)
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
var objname = "zhangsan";
var objage = 18;
var person = {objage,objname,
	say(){
		alert("sadsa")
	},
	[objage+objname]:"张三18了"
};

console.log(person)

//Object扩展
//Object.is(arg1,arg2)  //判断是否全等===

//Object.assign(target,origin1,origin2) //合并这三个对象
function Dog(name) {
	this.name = name;
}
Dog.prototype = {
	type:"动物",
	say:function () {
		console.log(this.type+"的名字叫"+this.name);
	}
}
var dog = new Dog("dll");
dog.say()

function log(x,y='world') {
	console.log(x,y)
}
log('hello')
log('hello','');

var f= ()=>{console.log(this.x)}
var obj = {
	x:"1000",
	show(){
		setTimeout(()=>{console.log(this.x)},10);
	}
}
obj.show();

var testjiantou = (x) => {x=x+2;x=x*x*x;return x;}

var array = [1,2,3].map(x => testjiantou(x))

console.log(array)

let sm = Symbol("newType");
console.log(typeof sm)
console.log(sm)

const COLOR_RED    = Symbol('red');
const COLOR_GREEN  = Symbol('green');

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

console.log(getComplement(COLOR_RED))

function timeout(ms){
	return new Promise((resolve,reject) => {
		setTimeout(resolve,ms,'done');
	})
}

timeout(3000).then((value) =>{
	console.log(value)
})

let promise = new Promise(function(resolve,reject){
	console.log('Promise  '+ new Date().getTime());
	resolve();
})

promise.then(function(){
	console.log('Resolved  '+ new Date().getTime())
})

console.log('Hi '+ new Date().getTime())

function loadImageAsync(url) {

	return new Promise(function(resolve, reject) {

		var image = new Image();
		var timeoutTimer;

		//开始加载超时监控，超时后进行reject操作
		function beginTimeoutWatcher() {
			timeoutTimer = setTimeout(function() {
				reject('timeout')
			}, 10000)
		}

		//结束加载超时监控
		function endTimeoutWatcher() {
			if (!timeoutTimer) {
				return;
			}

			clearTimeout(timeoutTimer);
		}
		
		image.onload = function() {
			resolve(image)
		};

		image.onerror = function() {
			reject(new Error('Could not load image at' + url))
		}
		image.src = "loading.gif";
		setTimeout(function() {
			image.src = url;
		}, 2000)


	})

}
var url = "http://wangnan1305.github.io/img/object_enumerable2.png"
var imageLoad = loadImageAsync(url);
imageLoad.then(function(value){
	document.body.appendChild(value)
	console.log(value)
	console.log('加载成功')
},function(error){
	alert(error)
})


var getJSON = function(method,url,data){
	var promise = new Promise(function(resolve,reject){
		var xhr = null;

		try{
			xhr = new XMLHttpRequest();
		}catch(e){
			xhr = new ActiveObject('Microsoft.XMLHTTP')
		}

		if(method == 'get' && data){
			url += '?'+data;
		}

		xhr.open(method,url,true);

		xhr.responseType = "json";
		
		if(method == 'get'){
			xhr.send();
		}else{
			xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
			xhr.send(data);
		}

		xhr.onreadystatechange = handle;

		function handle(){
			if(this.readyState === 4){
				if(xhr.status === 200){
					console.dir(this)
					resolve(this.response)
				}else{
					reject(new Error(this.statusText))
				}
			}
		}

	});

	return promise;
}

getJSON("get","http://book.rdtuijian.com/index").then(function(json){
	console.log(json)
},function(error){
	console.error('出错了',error)
})






