//…≠¡÷¿‡
$(document).ready(function(){
	var Forest = function(){
		this.x = this.showWidth/2;
		this.y = this.showHeight/2;
		this.init();
	};

	Forest.prototype = new boia.LivingThing(false,"images/forest.jpg");

	boia["Forest"] = Forest;
});
