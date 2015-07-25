---
layout: post
title:  "learn localStorage"
date:   2015-07-20 14:34:17
categories: HTML5
---
###LocalStorage的基本使用
####保存数据 setItem
```javascript
var items=[{
        "time": "1435460974604",
        "name": "50元话费",
        "count": 2,
        "e_coin": 123,
        "status": "兑换成功",
        "msg": "充值失败,E币已退回"
    }];
window.localStorage.setItem('eb_status_items',JSON.stringify(items));
```
####获得数据getItem
```javascript
var stored_items=window.localStorage.getItem('eb_status_items');
```
####使用心得
1.  除了使用setItem,getItem方法保存与读取数据外，还可以直接在localStorage对象上附加属性来保存，比如localStorage.user="liuyan"，那么我要获取的话也可以直接写成var user=localStorage.user。在使用getItem的时候，第二个参数不能是一个js对象，而需要把对象转化成字符串，否则保存下来的结果就是"[object Object]"。**需要注意的是**，如果第二个参数是一个function，比如localStorage.setItem("c",function(){alert(1)})，它会把function转换成字符串，从这里可以看出，在setItem的时候，函数内部对第二个参数应该进行了**.toString()**;
####如果要兼容IE6 IE7怎么办?
- 在有些需求中我们不得不兼容IE6/7，但是IE6/7是不支持localStorage的，因此需要找到兼容的方案。我们用cookie来模拟操作，但是cookie得存储容量只有4K...
```javascript
var setItem=function(key,val){
	if (window.localStorage) {
		localStorage.setItem(key,val);
	}else{
		Cookie.write(key,val);
	}
}

var getItem=window.localStorage:localStorage.getItem:Cookie.read;
```
####使用现有的库store.js

