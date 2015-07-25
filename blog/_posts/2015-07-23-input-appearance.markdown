###自定义input样式
---
>web开发中，input元素默认的样式比较丑，我们总想美化它，有用图片，可以用css3,用js来实现各种切换效果等，反正是各有千秋。我这里使用的是CSS直接在input上面绘制。最主要用到的就是```-webkit-appearance:none```这个属性设置，它可以重置标签默认样式。还有就是使用了```::before,::after```这样的为元素来辅助一些效果

---
####0、一些基本CSS样式与html结构
```html
<input type="text" value="123" placeholder="这里是占位">
<input type="number" step="0.1" max="1.0" min="0.0">
<label>
    <input type="radio" name="gender" checked>
</label>
<label>
    <input type="radio" name="gender">
</label>
<input class="toggle" type="checkbox" checked>
<style>
input{
	border: 1px solid #ccc;
	transition:all .3s;
	vertical-align: middle;
}
label{
	padding: 0 20px;
}
input:focus{
	outline: 0;
}
input[type="number"],
input[type="text"]{
	padding: 5px 10px;
	border-radius: 4px;
	box-shadow:inset 0 1px 1px rgba(0,0,0,.075);
}
input[type="number"]::-webkit-input-placeholder,
input[type="text"]::-webkit-input-placeholder{
	color: #999;
}
input[type="number"]:focus,
input[type="number"]:hover,
input[type="text"]:focus{
	border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}
</style>
```

####1、type="number"
>```type="number"```类型的input，我主要是需要自定义那个默认的向上向下箭头，它有```::-webkit-inner-spin-button```这个为元素,这便是箭头的默认元素啦~~~,需要将他的appearance属性值设置为none,这样我们就看不见默认的箭头了，那么如何才能创建箭头呢？我使```::before```与```::after```来模拟，这两个伪元素 创建了两个三角形(关于如何使用元素画出三角形，请自行Google)。代码如下:
```css
/*number*/
input[type="number"]::-webkit-inner-spin-button{
	position: relative;
	width: 8px;
	transition:all .3s;
	-webkit-appearance: none;
}
input[type="number"]::-webkit-inner-spin-button::before,
input[type="number"]::-webkit-inner-spin-button::after{
	content: "\0020";
	display: block;
	position: absolute;
	width: 0; 
	height: 0; 
	border-left: 4px solid transparent; 
	border-right: 4px solid transparent; 
}
input[type="number"]::-webkit-inner-spin-button::before{
	top: -1px;
	border-bottom: 8px solid #66afe9; 
}
input[type="number"]::-webkit-inner-spin-button::after{
	top: 50%;
	margin-top: 1px;
	border-top: 8px solid #66afe9; 
}
```
效果:![Alt text](./input-number.png)

####2、type="radio"
>radio 类型的input自定义样式就更简单了，我们都知道radio有两个状态，checked和非checked，这展现在元素上面就是```input[type="radio"]:checked```这样就匹配到了checked状态，然后再在这下面写样式就可以了。使用```input[type="radio"]:checked::before```来创建的中间那个原点。代码如下
```css
input[type="radio"]{
	-webkit-appearance:none;
	padding: 3px;
	border: 3px solid #e6e6e6;
	border-radius: 50%;
	display: inline-block;
	width: 24px;
	height: 24px;
	position: relative;
}
input[type="radio"]:checked{
	border-color: #66afe9;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
}
input[type="radio"]:checked::before{
	content: "\0020";
	display: block;
	position: absolute;
	width: 12px;
	height: 12px;
	left: 50%;
	top: 50%;
	margin-left: -6px;
	margin-top: -6px;
	border-radius: 50%;
	background-color: #66afe9;
}
```
效果图![Alt text](./input-radio.png)

####3、type="checkbox"
>```type="checkbox"```这种复选框和```type="radio"```单选按钮 类似，都是通过```:checked```来控制的，不再赘述，模拟的一个开关，参见如下代码。
```css
/*开关按钮*/
.toggle{
	-webkit-appearance:none;
    transition:all .3s;
	display: inline-block;
	box-sizing: border-box;
	width: 61px;
	height: 31px;
	border: solid 2px #e6e6e6;
	border-radius: 20px;
	background-color: #fff;
	content: '\0020';
	cursor: pointer;
	position: relative;
}
.toggle::before{
	content: "\0020";
	position: absolute;
    display: block;
    width: 27px;
    height: 27px;
    border-radius: 27px;
    background-color: #fff;
    top: 0px;
    left: 0px;
    transition:left .3s;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.35), 0 1px 1px rgba(0, 0, 0, 0.15);
}
.toggle:checked{
	background-color: #66afe9;
	border-color: #66afe9;
}
.toggle:checked::before{
	left: calc(100% - 27px);
}
```
效果图![Alt text](./input-checkbox.png)

[这里是线上小例子](http://www.lyan.me/test/input-appearance/)