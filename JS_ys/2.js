var line1 = read_line().split('');
var obj1 = toObj(line1);
var line2 = read_line().split('');
var obj2 = toObj(line2);
var flag = 1;
for(var key in obj2){
	if(obj2[key] && !obj1[key]){
		flag = 0;
	}else if(obj2[key]>obj1[key]){
		flag = 0;
	}
}
print(flag);

function toObj(line){
var obj = {};
for(var i=0;i<line.length;i++){
  if(!obj[line[i]]){
    	obj[line[i]] = 1;
  }else{
        obj[line[i]]++;    
  }
}
  return obj;
}