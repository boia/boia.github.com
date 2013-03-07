/*  
 *  
 *
 *  2012-11-28  -- 2012-11-30
 *  
 *
 *--------------------------------------------------------------------------*/

	function addEvent(obj,event,fuc){
		if(obj.addEventListener){
			obj.addEventListener(event,fuc);
			
		}
		else if(obj.attachEvent){
			obj.attachEvent("on"+event,function(event){
								return fuc.call(obj,event);
							});
		}
	}

	//这个匹配算法错误
	/*function match(num,ob){
		var arr = document.getElementsByClassName("big1"); 

		for(var i=0;i<81;i++){
				var col = parseInt(i%9);	//列
				var row = parseInt(i/9);	//行
				var grid = parseInt(col/3)+parseInt(row/3)*3;
				
				if(arr[i] === undefined) continue;		
				if(arr[i] === ob.self) continue;

				if((col !== (ob.col)) && (row !== (ob.row)) && (grid !== (ob.grid))) continue;

				var othNum = parseInt(arr[i].innerHTML);
				
				if(othNum === num){
					alert(othNum);
					return false;
				}
			
		}
		return true;	
	}*/

var Square = function(className,/*op*/parent,/*op*/isEvent,/*op*/isCanCreate){
		if(isEvent === undefined){
			isEvent = true;
		}
		if(isCanCreate === undefined){
			isCanCreate = true;
		}
		if(parent === "" || parent ===undefined){
			//parent = document.body;
			//放在id为gameBody的div中
			parent = document.getElementById("gameBody");			
		}
		this.isEvent = isEvent;
		this.isCanCreate = isCanCreate;      //小方框是不能制造的
		//this.isClick = false;
		
		this.number = "";
		this.isAutoCreate = false;
		this.className = className;
		this.row = 0;
		this.col = 0;
		//this.rule = "";
		
		this.self = "";				//指向自己
		this.parent = parent;		//父类
		this.ancestor = "";			//祖先
		this.son    = [];			//产生的小方框
		this.bro    = [];			//兄弟
		
		//属于哪个宫
		this.grid = 0;
		//一个宫中的第几个
		this.position = 0;
};


Square.prototype.init = function(){
			this.self = document.createElement("div");        //代表一开始的方框
			this.self.className = this.className;
			this.parent.appendChild(this.self);

			this.event();

			if(this.isEvent && this.isCanCreate){				
				this.son.push(new Square("big2","",false));
				this.son[0].init();
				
				this.son[0].self.style.display = "none";
				for(var i=1;i<10;i++){
					this.son.push(new Square("small",this.son[0].self,true,false));
					this.son[i].init();
					this.son[i].ancestor = this;
					//this.son[i].self.style.cssFloat = "left";
					this.son[i].self.innerHTML = i;
				}
			}
};

//事件处理
Square.prototype.event = function(){
		var that = this;
		//祖先点击
		this.isEvent && this.isCanCreate && addEvent(this.self,"click",function(e){
											if(that.isEvent){//事件的bug
												e = e || event;
													
												that.hiddenBro();
												that.son[0].self.style.display = "block";	
												that.son[0].self.style.left = e.clientX+10+'px';
												that.son[0].self.style.top = e.clientY+'px';
											}
										});


		//给9个小方框绑定点击事件
		this.isEvent && !this.isCanCreate && addEvent(this.self,"click",function(e){
											if(that.isEvent){//事件的bug
												e = e || event;
													
												that.ancestor.number = this.innerHTML;
												that.ancestor.setNumber();
												that.ancestor.self.style.color = "red";
											}
										});


		this.isEvent && addEvent(this.self,"mouseover",function(){
											if(that.isEvent){//事件的bug
												if(that.isCanCreate){
													this.style.background = "#eeeeee";
												}
												else{
													this.style.background = "#55aaff";
												}
											}
									  });
		this.isEvent && addEvent(this.self,"mouseout",function(){
										if(that.isEvent){//事件的bug
											if(that.isCanCreate){
												if(that.grid % 2){																									
													this.style.background = "#cccccc";
												}
												else{
													this.style.background = "#999999";
												}
											}
											else{
												this.style.background = "white";
											}
										}
									 });

};

//获得方框中的数字
Square.prototype.getNumber = function(){
	return this.number;
};

//设置方框中的数字
Square.prototype.setNumber = function(){
	
	if(this.isEvent && this.isCanCreate || this.isAutoCreate){
		this.self.innerHTML = this.number;
	}
};

Square.prototype.clearNumber = function(){
	this.self.innerHTML = "";
};

//隐藏除自己以外其他对象的子类
Square.prototype.hiddenBro = function(){
	
	for(var i=0;i<80;i++){
		this.bro[i].son[0].self.style.display = "none";
	}

};

Square.prototype.distinguishGrid = function(){
	if(this.grid%2){
		this.self.style.background = "#cccccc";
	}
	else{
		this.self.style.background = "#999999";
	}
};


