//奖品类
$(document).ready(function(){
	//树叶的类
	var Leaf = function(){
		this.x = 0;
		//一排树叶的y坐标是一样的
		this.y = 160;
		
		this.showWidth = 20;
		this.showHeight = 20;

		this.init();
	};

	Leaf.prototype = new boia.LivingThing(true,"images/leaf.png");

	var Acorn = function(){
		this.x = 0;
		this.y = 120;
		
		this.showWidth = 20;
		this.showHeight = 20;

		this.init();
	};

	Acorn.prototype = new boia.LivingThing(true,"images/acorn.png");

	var Flower = function(){
		this.x = 0;
		this.y = 80;
		
		this.showWidth = 20;
		this.showHeight = 20;

		this.init();
	};

	Flower.prototype = new boia.LivingThing(true,"images/flower.png");
	
	var Prizes = function(){
		//奖品放到一个数组里
		this.things = [];
		this.nums = 28;

		this.init();
	};

	//将所有奖品放在这个类中
	Prizes.prototype.init = function(){

		//感觉这里i的变量不放到闭包里会出问题
		for(var i=0;i<this.nums;i++){
			var leaf = new Leaf();
			var acorn = new Acorn();
			var flower = new Flower();

			//(function(){
				acorn.x = flower.x = leaf.x = i*45+20;
				
			//})(i);
			this.things.push(leaf);
			this.things.push(acorn);
			this.things.push(flower);
		}
	};

	boia["Prizes"] = Prizes;
});