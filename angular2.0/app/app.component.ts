import {Component} from 'angular2/core';     //导入一个模块
//组件是一个装饰功能,它需要一个元数据对象.元数据告诉angular如何创建和使用这个组件。 　　 　　
//通过用前缀@调用:
@Component({
    selector:'my-app',     //值为一个css选择器,组件元素的名称为my-app，Angular会为HTML中的my-app元素创建并显示AppComponent实例
    template:'<h1>Angular 2 hello wold</h1>' //指定对应的模板，以及数据绑定
})

export class AppComponent { }  //导出 AppComponent