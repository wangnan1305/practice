function countOne(i) {
	var t, count = 0;
	while(i !== 0) {
		t = i & 1;
		if(t) {
			count ++;
		}
		i = i >> 1;
	}
	return count;
}

function func(l, r, m) {
	var count = 0;
	for(var i = l; i <= r; i++) {
		if(countOne(i) === m) {
			count ++;
		}
	}
	if(count === 0) {
		return -1;
	}
	return count;
}

var line;
while(line = read_line()){
    line = line.split(' ');
    var l = +line[0], 
    	r = +line[1], 
    	m = +line[2];

    print(func(l, r, m));
}