//蘑菇类
$(document).ready(function(){
	var Mushroom = function(){
		//boia.LivingThing.call(this);

		this.showWidth = 60;
		this.showHeight = 40;

		//蘑菇的初始坐标
		this.x = this.stage.width/2 - this.showWidth/2;
		this.y = this.stage.height - this.showHeight/2;

		this.init();
		this.addEvent(); 
	};

	Mushroom.prototype = new boia.LivingThing(true,"images/mushroom.png");

	//蘑菇的鼠标事件
	Mushroom.prototype.addEvent = function(){
		var that = this;
		this.stage.canvas.mousemove(function(e){
			that.x = e.pageX;
		});
	};

	//var mushroom = new Mushroom();

	boia["Mushroom"] = Mushroom;

});