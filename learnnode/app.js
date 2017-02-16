var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views','./views/pages');
app.set('view engine', 'jade');

//-app.use(express.bodyParser());

app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('imooc started on port' + port);

//index.jade
app.get('/',function(req,res){
  res.render('index',{
    title:'imooc 首页',
    movies:[
    {
      title:'机械战警',
      _id:1,
      poster:'http://www.baidu.com'
    },{
      title:'机械战警',
      _id:2,
      poster:'http://www.baidu.com'
    },{
      title:'机械战警',
      _id:3,
      poster:'http://www.baidu.com'
    },{
      title:'机械战警',
      _id:4,
      poster:'http://www.baidu.com'
    },{
      title:'机械战警',
      _id:5,
      poster:'http://www.baidu.com'
    }]
  });
});

//detail.jade
app.get('/movie/:id',function(req,res){
  res.render('detail',{
    title:'imooc 详情页',
    movie:{
      doctor:'邓超',
      country:'中国',
      title:'美人鱼',
      year:2015,
      poster:'sadasdas',
      language:'guoyu',
      flash:'http://www.baidu.com',
      summary:'算法飞洒发法案污染问题'
    }
  });
});

//admin.jade
app.get('/admin/movie',function(req,res){
  res.render('admin',{
    title:'imooc 后台录入页',
    movie:{
      doctor:'',
      country:'',
      title:'',
      year:'',
      poster:'',
      language:'',
      flash:'',
      summary:''
    }
  });
});

//list.jade
app.get('/admin/list',function(req,res){
  res.render('list',{
    title:'imooc 列表页',
    movies:[{
      doctor:'邓超',
      country:'中国',
      title:'美人鱼',
      year:2015,
      poster:'sadasdas',
      language:'guoyu',
      flash:'http://www.baidu.com',
      summary:'算法飞洒发法案污染问题'
    }]
  });
});
