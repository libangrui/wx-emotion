/*main*/
(function(){
	
	this.wxEmotion = function(ops){
		
		var _default = {
			el: null,
			colNum: 0,
			rowNum: 3,
			imageWidth: 24,
			imageHeight: 24,
			imageCss: 'wx_emotion_item', //表情图片css类名
			imageCssOffset: 24, //表情图片偏移
			faceInfor:[
				"微笑","撇嘴","色","发呆","得意","流泪","害羞","闭嘴","睡","大哭","尴尬","发怒","调皮","呲牙","惊讶","难过","酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿","困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨","衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了","坏笑","左哼哼","右哼哼","哈欠","鄙视","委屈","快哭了","阴险","亲亲","吓","可怜","菜刀","西瓜","啤酒","篮球","乒乓","咖啡","饭","猪头","玫瑰","凋谢","示爱","爱心","心碎","蛋糕","闪电","炸弹","刀","足球","瓢虫","便便","月亮","太阳","礼物","拥抱","强","弱","握手","胜利","抱拳","勾引","拳头","差劲","爱你","NO","OK","爱情","飞吻","跳跳","发抖","怄火","转圈","磕头","回头","跳绳","挥手","激动","街舞","献吻","左太极","右太极"
			],
			clickFn: null
		};
		
		var cfg = extendObj(_default,ops),
			tab = cfg.el?cfg.el:document.createElement("div");
		console.warn(cfg);
		
		//复制对象方法
		function cloneObj(oldObj) { 
			if (typeof(oldObj) != 'object') return oldObj;
			if (oldObj == null) return oldObj;
			var newObj;
			if(oldObj instanceof Array){
				newObj = new Array();
			}else{
				newObj = new Object();
			}		
			for (var i in oldObj)
				newObj[i] = cloneObj(oldObj[i]);
			return newObj;
		};
		//扩展对象
		function extendObj() { 
			var args = arguments;
			if (args.length < 2) return;
			var temp = cloneObj(args[0]); //调用复制对象方法
			for (var n = 1; n < args.length; n++) {
				for (var i in args[n]) {
					temp[i] = args[n][i];
				}
			}
			return temp;
		}
		
		//宽度自适应
		if(!cfg.colNum){
			var offsetWidth = document.body.offsetWidth;
			if(offsetWidth>=414){
				cfg.colNum = 10;
			}else if(offsetWidth>320){
				cfg.colNum = 9;
			}else if(offsetWidth<=320){
				cfg.colNum = 8;
			}	
		}
		
		//创建单页表情列表
		function createList(start, num) {
			var emotionArr = cfg.faceInfor,
				colWidth = 100/cfg.colNum + "%",
				textHtml = ['<ul class="wx_emotion_list swiper-slide">'],
				end = start + num,
				offset;
			
			for(var i=start;i<end;i++){
				offset = cfg.imageCssOffset * i * (-1) - 0;
				
				if(emotionArr[i]){
					console.log(emotionArr[i]);
					textHtml.push('<li class="j_emotion_item" style="width:'+colWidth+'" data-title="'+emotionArr[i]+'">');
					textHtml.push('<i class="'+cfg.imageCss+'" style="background-position:'+offset+'px -1px;" data-title="'+emotionArr[i]+'"></i>');
					textHtml.push('</li>');									
				}
			}
			textHtml.push('<li style="width:'+colWidth+'" id="j_close_wx_emotion"><i class="wx_emotion_item del"></i></li>');
			textHtml.push('</ul>');
			
			return textHtml.join("");
		}
		
		//创建整个表情盒子
		function createBox() {
			var	textHtml = ['<div class="swiper-container">'];
				
			textHtml.push('<div class="swiper-wrapper" id="j_wx_emotion_list">');
			
			var list_sum = cfg.colNum * cfg.rowNum - 1;
			var times = Math.ceil( cfg.faceInfor.length/list_sum );
			var listHtml = [];
			var _start = 0;
			for(var i=0;i<times;i++){
				listHtml.push( createList(_start, list_sum) );
				_start += list_sum;
			}
			
			textHtml = textHtml.concat( listHtml );
			textHtml.push('</div>');
			textHtml.push('<div class="swiper-pagination"></div>');
			textHtml.push('</div>');
				
			tab.innerHTML += textHtml.join("");				
		}
			
		createBox();
		
		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true
		});
		
		//事件监听		
		tab.addEventListener("click", function(e){
			 if(e.target && (e.target.nodeName == "I" || e.target.nodeName == "LI") ) {			 
				 if(e.target.className.indexOf("del")>-1){
					 cfg.el.className = cfg.el.className.replace(/show/g,"");
				 }else{
					 cfg.clickFn && cfg.clickFn(e.target);
				 }
			 }
		});			
		
	}
	
})();

