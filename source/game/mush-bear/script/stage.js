var boia = {};

//动画的使用....
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
})();


//LivingThing是所有生物的父类，此款游戏就是围绕在这个父类写的
$(document).ready(function(){

	var Stage = function(){
		this.canvas = $("#mycanvas");
		this.width = this.canvas.width();
		this.height = this.canvas.height();
		this.ctx = document.getElementById("mycanvas").getContext("2d");
	};


	//isTouch是判断一个物体是否可以碰撞检测
	var LivingThing = function(/*Optional*/isTouch,src,x,y,isImg){
		x = x || 0;
		y = y || 0;
		isTouch = isTouch || true;
		isImg = isImg || true;
		src = src || "";
		
		//对象自己
		var that = this;
		
		this.stage = new Stage();
		this.img = null;

		//生物显示在舞台上的坐标
		this.x = x;
		this.y = y;
		
		//生物自身的尺寸
		this.selfWidth;
		this.selfHeight;	

		//生物显示在舞台上的宽高
		this.showWidth = this.stage.width;
		this.showHeight = this.stage.height;

		if(isImg){
			this.img = new Image();
			this.img.src = src;		
		}		
	};

	//参数(x,y)是物体的坐标
	LivingThing.prototype.draw = function(x,y){
			this.stage.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,
								x-this.showWidth/2,y-this.showHeight/2,this.showWidth,this.showHeight);			
	};
	
	LivingThing.prototype.init = function(){										
		var that = this;
		this.img.onload = function(){
			that.draw(that.x,that.y);
			//判断图片是否加载好
			//return true;
		};		
		//return false;
	};

	//生物的碰撞检测
	LivingThing.prototype.hitTestObject = function(ob){
		return	((this.x+this.showWidth/2) >= (ob.x-ob.showWidth/2)) &&
				((this.y+this.showHeight/2) >= (ob.y-ob.showHeight/2)) &&
				((ob.x+ob.showWidth/2) >= (this.x-this.showWidth/2)) &&
				((ob.y+ob.showHeight/1.5) >= (this.y-this.showHeight/3));			
	};

	boia["Stage"] = Stage;
	boia["LivingThing"] = LivingThing;
});