//生命条
$(document).ready(function(){
	var Lives = function(){
		this.x = 100;
		this.y = 30;

		this.showWidth = 130;
		this.showHeight = 40;

		//生命数
		this.num = 5;

		this.init();
	};

	Lives.prototype = new boia.LivingThing(false,"images/lives5.png");

	boia["Lives"] = Lives;	
});