# scrollSlider
-----------------------------------------
use javascript

    var myScrollSlider1 = new scrollSlider('scrollSlider_1', {
        direction : 'horizontal',//vertical 滚动方向 水平/垂直
        mode : 'left',//right 滑动方向 左/右 , 上/下
        speed : 2,
        speedQuick : 4,
        autoplay : false,
        lazyimg : false,
        loop : true 
    });
    
use jQuery
    
    $('.scrollSlider-2').scrollSlider({
        direction : 'horizontal',//vertical 滚动方向 水平/垂直
        mode : 'right',//right 滑动方向 左/右 , 上/下
        speed : 2,
        autoplay : true,
        speedQuick : 4,
        loop : true 
    });