//分数类(这里很类似生物类,但总不能把非生物继承于生物吧,好吧，只能勉强接受了)
$(document).ready(function(){
	var Score = function(){
		this.x = this.stage.width-130;
		this.y = 30;

		this.showWidth = 100;
		this.showHeight = 40;

		//得分 为了和score分开，就用了point
		this.point = 0;
		this.text = new boia.Text1(""+this.point,this.x+10,this.y+10,'30px serif',"RGB(100,100,100)");

		this.init();
		this.drawText();
	};

	Score.prototype = new boia.LivingThing(false,"images/score.png");

	//写文字
	Score.prototype.drawText = function(){
		this.text.write(this.point);
	};

	boia["Score"] = Score;	
});