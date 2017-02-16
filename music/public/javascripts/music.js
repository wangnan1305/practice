function Music(obj){
    this.source=null;

    this.count=0;

    this.analyser=Music.ac.createAnalyser();
    this.size=obj.size;
    this.analyser.fftSize=this.size * 2;

    this.gainNode = Music.ac[Music.ac.createGain ? "createGain" : "createGainNode"]();
    this.gainNode.connect(Music.ac.destination);

    this.analyser.connect(this.gainNode);

    this.xhr=new XMLHttpRequest();

    this.visualizer = obj.visualizer;

    this.visualize();
}
Music.ac=new (window.AudioContext||window.webkitAudioContext)();

Music.prototype.load=function(url,fun){
    this.xhr.abort();
    this.xhr.open("GET",url);
    this.xhr.responseType="arraybuffer";
    var _this=this;
    this.xhr.onload=function(){
        fun(_this.xhr.response);
    }
    this.xhr.send();
}
Music.prototype.decode=function(arraybuffer,fun){
    Music.ac.decodeAudioData(arraybuffer,function(buffer){
        fun(buffer);
    },function(err){
        console.log(err);
    });
}
Music.prototype.play=function(url){
    var n=++this.count;
    var _this=this;
    this.source && this.stop();
    this.load(url,function(arraybuffer){
        if(n != _this.count) return;
        _this.decode(arraybuffer,function(buffer){
            if(n != _this.count) return;
            var bs=Music.ac.createBufferSource();
            bs.connect(_this.analyser);
            bs.buffer = buffer;
            bs[bs.start ? "start" : "noteOn"](0);
            _this.source=bs;
        })
    })
}
Music.prototype.stop=function(){
    this.source[this.source.stop? "stop" : "noteOff"](0);
}
Music.prototype.changeVolumn=function(percent){
    this.gainNode.gain.value=percent * percent;
}

Music.prototype.visualize=function(){
    var arr=new Uint8Array(this.analyser.frequencyBinCount);

    requestAnimationFrame=window.requestAnimationFrame||
        window.webkitRequestAnimationFrame||
        window.mozRequestAnimationFrame;
    var _this=this;
    function v(){
        _this.analyser.getByteFrequencyData(arr);
        //console.log(arr)
        _this.visualizer(arr);
        requestAnimationFrame(v);
    }

    requestAnimationFrame(v);
}