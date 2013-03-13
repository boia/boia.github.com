//动画类
$(document).ready(function(){

	var Animation = function(){
		this.things = {};
		this.stage = new boia.Stage();
		//动画是否停止
		this.stopSign = 0;
		
		this.init();
	};

	//将所有生物(或者非生物例如分数和奖励之类的)加入到动画中
	Animation.prototype.init = function(){
		this.things["forest"] = new boia.Forest();
		this.things["mushroom"] = new boia.Mushroom();
		this.things["bear"] = new boia.Bear();
		this.things["prizes"] = new boia.Prizes();
		
		this.things["score"] = new boia.Score();
		this.things["lives"] = new boia.Lives();

		//this.things.score.drawText();

		//this.stage.ctx.font = "30px serif";
		//this.stage.ctx.fillStyle = "RGB(100,100,100)";
		//this.stage.ctx.fillText("hello",100,100);
		//new boia.Text1("he",100,100);
		
	};

	//动画起来
	Animation.prototype.interval = function(){
		var that = this;
		this.stage.ctx.clearRect(0,0,this.stage.width,this.stage.height);
		
		for(property in this.things){
			var thing = this.things[property];
		
			if(property === "prizes"){
				for(var i=0;i<thing.things.length;i++){
					//命名有点让人崩溃
					var everyPrize = thing.things[i];

					if(everyPrize.hitTestObject(this.things.bear)){
						this.things.score.point += 3;

						//将奖品从数组中去掉
						this.things.prizes.things.splice(i,1);

						//这样改变y的速度算法是不对的，需要判断碰撞的不同位置来做不同操作
						this.things.bear.speedY *= -1;
						
						this.things.bear.rotate();
					}

					//将奖品每一个都绘制出来
					everyPrize.draw(everyPrize.x,everyPrize.y);
					
					//显示每个奖品的边框
					//this.stage.ctx.strokeRect(everyPrize.x-everyPrize.showWidth/2,everyPrize.y-everyPrize.showHeight/2,
					//							everyPrize.showWidth,everyPrize.showHeight);
				}
			}
			//让熊运动起来
			else if(property === "bear"){
				if(thing.checkTouch(this.things["mushroom"],this.stopSign)){
					//处理生命
					var lives = this.things.lives;
					lives.num--;
					
					lives.img.src = "images/lives"+lives.num+".png";
					if(lives.num === 0){
						var str = "你已经死了，是芥末!日";
						var dieText = new boia.Text1(str.blink,this.stage.width/2-str.length/2*50,this.stage.height/2,
													"50px serif","RGB(255,255,255)"); 
					}
				}

				thing.rotate();

				thing.x += thing.speedX;
				thing.y += thing.speedY;
				thing.angle += 2;

			}
			else{
				thing.draw(thing.x,thing.y);	
				if(property === "score"){
					thing.drawText();
				}
			}
		}			
	};

	boia["Animation"] = Animation;
});
