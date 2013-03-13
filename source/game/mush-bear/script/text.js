//文字类
$(document).ready(function(){
	//Text是JS的关键字，只好用Text1了
	var Text1 = function(content,x,y,font,color){
		content = content || "";
		x = x || 0;
		y = y || 0;
		font = font || "30px serif";
		color = color || "RGB(100,100,100)";
		this.stage = new boia.Stage();

		this.content = content;
		this.x = x;
		this.y = y;

		this.font = font;
		this.color = color;
		this.write(this.content);
	};

	Text1.prototype.write = function(content){
		this.content = content;
		this.stage.ctx.save();
		this.stage.ctx.font = this.font;
		this.stage.ctx.fillStyle = this.color;
		this.stage.ctx.fillText(this.content,this.x,this.y);
		this.stage.ctx.restore();
	};

	boia["Text1"] = Text1;
});