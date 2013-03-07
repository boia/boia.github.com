//小熊类
$(document).ready(function(){
	var Bear = function(){
		
		//熊的速度
		this.speedX = 2;
		this.speedY = 2;

		this.showWidth = 40;
		this.showHeight = 40;

		this.angle = 0;

		//小熊的初始坐标，舞台中心
		this.x = this.stage.width/2;
		this.y = this.stage.height/2+100;

		this.init();
		//this.rotate();
	};

	Bear.prototype = new boia.LivingThing(true,"images/bear_eyesclosed.png");

	//小熊旋转
	Bear.prototype.rotate = function(){
		this.stage.ctx.save();
		//将0,0点移动熊的中心
		this.stage.ctx.translate(this.x,this.y);
		this.stage.ctx.rotate(this.angle*Math.PI/180);
		this.draw(0,0);
		this.stage.ctx.restore();
	};

	//碰撞检测
	Bear.prototype.checkTouch = function(ob,/*Optional*/sign){
		if((this.x+this.showWidth/2 > this.stage.width) || 
				(this.x-this.showWidth/2  < 0)){
			this.speedX *= -1;
		}
		if(this.y-this.showHeight/2 < 0){
			this.speedY *= -1;
		}
		if(this.y+this.showHeight/2 > this.stage.height){
			clearInterval(sign);
			
			this.x = this.stage.width/2;
			this.y = this.stage.height/2+100;	
			this.angle = 0;
			
			$("#start").show();
			//alert("Game Over");

			return true;   //是否坠地
		}

		if(this.hitTestObject(ob)){
			this.speedY = -2;
			if(this.x > ob.x){
				this.speedX = 2;
			}else{
				this.speedX = -2;
			}
		}

		return false;
	};

	//检测俩物体是否碰撞
	/*Bear.prototype.hitTestObject = function(ob){
		return	((this.x+this.showWidth/2) >= (ob.x-ob.showWidth/2)) &&
				((this.y+this.showHeight/2) >= (ob.y-ob.showHeight/2)) &&
				((ob.x+ob.showWidth/2) >= (this.x-this.showWidth/2)) ;
	};*/

	boia["Bear"] = Bear;
});