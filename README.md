# scrollSlider

|Author|evan.fu|
|---|---
|E-mail|153668770@qq.com

---

## HTML
```
<div id="scrollSlider_1" class="scrollSlider scrollSlider-1">
    <div class="scrollSlider-container">
        <ul class="scrollSlider-wrapper">
            <li class="scrollSlider-slide"><a href="#1" target="_blank"><img src="http://pafassionlab.beats-digital.com/Uploads/2017/6/26/b5e8169f-d5e5-4042-a5e2-b64fcdfae4bc.jpg"></a></li>
            <li class="scrollSlider-slide"><a href="#2" target="_blank"><img src="http://pafassionlab.beats-digital.com/Uploads/2017/6/26/132823f0-3e79-42f4-9623-1aaf5844b1fe.jpg"></a></li>
            <li class="scrollSlider-slide"><a href="#3" target="_blank"><img src="http://pafassionlab.beats-digital.com/Uploads/2017/6/26/4d98fb1d-3e1d-44cc-8adc-9eea096a9c44.JPG"></a></li>
            <li class="scrollSlider-slide"><a href="#4" target="_blank"><img src="http://pafassionlab.beats-digital.com/Uploads/2017/6/26/59b30e75-7ee4-47d7-8c51-de15dfe2d582.JPG"></a></li>
            <li class="scrollSlider-slide"><a href="#5" target="_blank"><img src="http://pafassionlab.beats-digital.com/Uploads/2017/6/26/52f7a4ea-7b8b-42f9-af54-fdcdc93854ff.jpg"></a></li>
            <li class="scrollSlider-slide"><a href="#6" target="_blank"><img src="http://pafassionlab.beats-digital.com/Uploads/2017/6/26/cc36ecb9-69cc-40f8-a432-b817a2eda0be.jpg"></a></li>
        </ul>
    </div>
    <div class="scrollSlider-controls">
        <div class="scrollSlider-prev"></div>
        <div class="scrollSlider-next"></div>
    </div>
</div>
```
---

## script
1.use javascript
```
var myScrollSlider1 = new scrollSlider('scrollSlider_1', {
    direction : 'horizontal',//vertical 滚动方向 水平/垂直
    mode : 'left',//right 滑动方向 左/右 , 上/下
    speed : 2,
    speedQuick : 4,
    autoplay : false,
    lazyimg : false,
    loop : true 
});
```  
---

## Object function
`go`
`stop`
`slidePrev`
`slideNext`

```
myScrollSlider1.slideNext()
```

2.use jQuery
<script src="jquery.js"></script>
    
```
$('.scrollSlider-2').scrollSlider({
    direction : 'horizontal',//vertical 滚动方向 水平/垂直
    mode : 'right',//right 滑动方向 左/右 , 上/下
    speed : 2,
    autoplay : true,
    speedQuick : 4,
    loop : true 
});
```
---
## Example
1.[demo](https://awin8516.github.io/scrollSlider/docs/)  