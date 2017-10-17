/* @scrollSlider
 * @by F 
 * @date 2017-06-25
 * @version 1.0.0
 */
/**
(function(){
	function insert(arr){
		var scripts = document.getElementsByTagName('script');
		var current = scripts[scripts.length-1];
		var path = current.src.match(/^.*[\/]/)[0];
		var head = document.head || document.getElementsByTagName('head')[0];
		for(var i=0; i<arr.length; i++){
			var a = arr[i].split('.');
			var filetype = a[a.length-1].toLowerCase();
			if(filetype == 'css'){
				document.writeln('<link rel="stylesheet" type="text/css" href="'+path+''+arr[i]+'?by=writeln">');
			}else if(filetype == 'js'){
				document.writeln('<script src="'+path+''+arr[i]+'"></script>');
			};
		};
	};
	insert(['scrollSlider.css', 'fun.js']);
})();
/**/

require('./scrollSlider.css')
const _$ = require('./fun.js')
;(function(window, jQuery, undefined){
	'use strict';
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);//定义每秒执行60次动画
				};
	})();
	window.cancelAnimationFrame = window.cancelAnimationFrame
			|| window.webkitCancelAnimationFrame
			|| window.webkitCancelRequestAnimationFrame
			|| window.mozCancelRequestAnimationFrame
			|| window.oCancelRequestAnimationFrame
			|| window.msCancelRequestAnimationFrame
			|| clearTimeout;
	
	var pluginName = 'scrollSlider';
	
	/***************
	 * by javascript
	 **************/	
	var scrollSlider = function(selecter, option){
		var s = this;
		s.option = _$.extend({
			direction : 'horizontal',//vertical 滚动方向 水平/垂直
			mode : 'left',//right 滑动方向 左/右 , 上/下
			speed : 1,
			speedQuick : 4,
			overStop : true,
			drag : true,
			autoplay : true,
			lazyimg : false,//图片懒加载，限于horizontal;vertical时会导致高度计算BUG
			loop : true 
		}, option);
		s.option.speed = s.option.speed<1 ? 1:s.option.speed;
		s.option.speedQuick = s.option.speedQuick<1 ? 1:s.option.speedQuick;
		s.option.mode = s.option.mode.toLowerCase();
		s.option.mode = s.option.direction == 'horizontal' && !/left|right/.test(s.option.mode) ?'left':s.option.mode;
		s.option.mode = s.option.direction == 'vertical' && !/top|bottom/.test(s.option.mode) ?'top':s.option.mode;
		s.self = (typeof selecter === 'string') ? document.getElementById(selecter) : selecter;
		s.container = _$.getElement('.scrollSlider-container', s.self);
		s.wrapper = _$.getElement('.scrollSlider-wrapper', s.self);
		s.prev = _$.getElement('.scrollSlider-prev', s.self);
		s.next = _$.getElement('.scrollSlider-next', s.self);		
		s.imgs = _$.getElement('img', s.wrapper);
		var sMode = {left:1,right:-1,top:1,bottom:-1};
		var sSize = s.option.direction == 'horizontal' ? 'clientWidth':'clientHeight'; 
		var sDirection = s.option.direction == 'horizontal' ? 'scrollLeft':'scrollTop'; 
		var sDistance = 0;
		var u = navigator.userAgent.toLowerCase();
		var isPc = (u.indexOf('mobile') == -1);
		var events = {
			start : isPc ? 'mouseenter':'touchstart', 
			end : isPc ? 'mouseleave':'touchend'
		};
		_$.addClass('scrollSlider-'+s.option.direction, s.self);
		
		s.scrollto = function(scroll, speed, container){
			container = container || s.container;
			var anOption = {};
			anOption[sDirection] = scroll;
			_$.stop(container);
			_$.animate(container, anOption, speed, function(){
				if(s.option.loop){
					container[sDirection] = s.wrapperSize;
					s.scrollto(scroll, speed, container);
				};
			});
		};
		
		s.init = function(){
			s.containerSize = s.container[sSize];
			s.wrapperSize = s.wrapper[sSize];
			
			if(s.option.loop){
				var slideCloneBefore = _$.clone(_$.children(s.wrapper),true);
				_$.addClass('clone clone-before', slideCloneBefore);
				var slideCloneAfter = _$.clone(_$.children(s.wrapper),true);
				_$.addClass('clone clone-after', slideCloneAfter);
				_$.prepend(slideCloneBefore, s.wrapper);
				_$.append(slideCloneAfter, s.wrapper);
				s.wrapperSize < s.containerSize && _$.append(_$.clone(slideCloneAfter,true), s.wrapper);
				s.wrapper = _$.getElement('.scrollSlider-wrapper', s.self);
				s.imgs = _$.getElement('img', s.wrapper);
				s.option.drag && _$.dragDisabled(s.imgs);
				s.container[sDirection] = s.wrapperSize;
				sDistance = s.wrapperSize;
				s.containerScrollinit = sDistance+s.wrapperSize*sMode[s.option.mode];
			}else{
				s.container[sDirection] = -sMode[s.option.mode]*100000;
				s.containerScrollinit = s.wrapperSize*sMode[s.option.mode]-s.containerSize;
			};
			s.containerScrollinit = s.containerScrollinit<0 ? 0:s.containerScrollinit;
			s.containerScrollend  = sDistance+s.wrapperSize;
			s.option.autoplay && s.scrollto(s.containerScrollinit, s.option.speed, s.container);
			_$.addClass('scrollSlider-initialized', s.self);
		};
		
		s.setup = s.updata = function(){
			if(s.option.lazyimg && s.option.direction == 'horizontal'){
				setTimeout(s.init, 10);
			}else{
				_$.loadImage(s.imgs, function(){
					window.console && console.log('loadImage completed');
					setTimeout(s.init, 10);
				});
			};
		};
		
		s.slidePrev = function(){
			s.scrollto(0, s.option.speedQuick, s.container);
		};
		
		s.slideNext = function(){
			s.scrollto(s.containerScrollend, s.option.speedQuick, s.container);
		};
		
		s.go = function(){
			s.scrollto(s.containerScrollinit, s.option.speed, s.container)
		};
		
		s.stop = function(){
			_$.stop(s.container);
		};
		
		/* events */
		if(s.option.overStop){
			_$.addEvent(s.container, events.start, s.stop);
			_$.addEvent(s.container, events.end, function(){
				s.stop();
				s.option.autoplay && setTimeout(function(){
					s.go();
				}, 500);
			});
		};
		
		_$.addEvent(s.prev, events.start, s.slidePrev);
		_$.addEvent(s.prev, events.end, function(){
			s.stop();
			s.option.autoplay && s.go();
		});
		
		_$.addEvent(s.next, events.start, s.slideNext);
		_$.addEvent(s.next, events.end, function(){
			s.stop();
			s.option.autoplay && s.go();
		});
		
		/* for drag */
		if(s.option.drag){
			_$.addClass('scrollSlider-drag', s.self);
			_$.addEvent(s.container, 'mousedown', function(e){
				s.stop();
				s.pos = {x : e.pageX,y : e.pageY};
				s.containerScrollCurrent = s.container[sDirection];
			});
			_$.addEvent(s.container, 'mousemove', function(e){
				if(!s.pos) return;
				var pos = {horizontal : e.pageX - s.pos.x,vertical : e.pageY - s.pos.y};
				s.container[sDirection] = s.containerScrollCurrent - pos[s.option.direction];
			});
			_$.addEvent(s.container, 'mouseup', function(e){
				s.pos = null;
				s.option.autoplay && !s.option.overStop && s.go();
			});
		};
		
		s.setup();
		
		return s;
	};
	window.scrollSlider = scrollSlider;
	
	jQuery.fn[pluginName] = function ( options ) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!jQuery.data(this, 'plugin_' + pluginName)) {
					jQuery.data(this, 'plugin_' + pluginName, new scrollSlider( this, options ));
				}
			});
		}else if(typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			var returns;
			this.each(function () {
				var instance = jQuery.data(this, 'plugin_' + pluginName);
				if (instance instanceof scrollSlider && typeof instance[options] === 'function') {
					returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
				}
				if (options === 'destroy') {
					jQuery.data(this, 'plugin_' + pluginName, null);
				}
			});
			return returns !== undefined ? returns : this;
		}
	};

})(window, jQuery);
