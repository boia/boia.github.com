function clearNumbers(ob){
	for(var i=0;i<9;i++){
		for(var j=0;j<9;j++){
			ob[i][j].clearNumber();
			ob[i][j].isEvent = true;
			ob[i][j].number = "";
		}
	}
}

var createFull = function(level){
		allSquare = [];

		//将每个宫放到一个二维数组中
		gridSquare = [[],[],[],[],[],[],[],[],[]];        
		
		createMatrix();

		//将产生的81个方框对象放到一个数组里
		for(var i=0;i<9;i++){		
			for(var j=0;j<9;j++){
				var square = new Square("big1");
				square.init();
				
				square.grid = parseInt(j/3)+parseInt(i/3)*3;
				square.position = parseInt(j%3)+parseInt(i%3)*3;
				
				square.row = i;
				square.col = j;

				//将宫区分开
				square.distinguishGrid();			
				allSquare.push(square);
				
				gridSquare[square.grid][square.position] = square;
				square.number = Initial_State[i+1][j+1];
				
				//这个算法是错误的
				/*rand = parseInt(9*Math.random());
				para = arr[rand];

				while(!match(para,square)){
					rand = parseInt(9*Math.random());
					para = arr[rand];
				}*/

				if(Math.random()<level){				
					square.setNumber();
					square.isEvent = false;
				}
			}
		}

		//遍历，给每个方框对象bro属性赋值
		for(var i=0;i<81;i++){
			for(var j=0;j<81;j++){
				if(i === j) continue;
				allSquare[i].bro.push(allSquare[j]);
			}
		}
	};
			
	function changeAllNumber(level){
		clearNumbers(gridSquare);
		createMatrix();
		
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
					//重新赋值
					gridSquare[i][j].number = Initial_State[i+1][j+1];

					//将原来的显示清除，将是否可以事件改为true
					//gridSquare[i][j].self.innerHTML = "";
					//gridSquare[i][j].isEvent = true;

					if(Math.random()<level){				
						gridSquare[i][j].setNumber();
						gridSquare[i][j].isEvent = false;
					}
			}
		}		
	}

	function displayResult(){
		for(var i=0;i<9;i++){
			for(var j=0;j<9;j++){
					//gridSquare[i][j].self.innerHTML = "";				
					gridSquare[i][j].setNumber();
					gridSquare[i][j].isEvent = false;
			}
		}		
	}

	function checkResult(){
		var arr = document.getElementsByClassName("big1");

		for(var i=0;i<81;i++){
				var col = parseInt(i%9)+1;	//列
				var row = parseInt(i/9)+1;	//行

				var value = parseInt(arr[i].innerHTML);
				if(allSquare[i].number != value){
					alert("答案错误,错误在第"+row+"行第"+col+"列");
					return;
				}
		}
		alert("恭喜你，答案正确");
		return;
	}
