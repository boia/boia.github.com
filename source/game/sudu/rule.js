/**/

var Initial_State = [[],[],[],[],[],[],[],[],[],[]];

function get_Initial_State(   i ,   j  )   //搜索第（ i , j ）位置处可以存储的数字
{
	if( i > 9 || j > 9 ) 
		return true;

	for( var k = 1 ; k <= 9 ; ++k ) 
	{
		var can =  true  ;  		// can 变量用于记录数字k能否放在 ( i , j ) 处 
		for( var m = 1 ; m < i ; ++m ) 
			if( Initial_State[m][j] == k )  // 检查同一列是否出现过数字k
			{
				can = false ;
				break ;
			}

		if( can == true ) 
		{
			for( var n = 1 ; n < j ; ++n ) 
				if( Initial_State[i][n] == k )  // 检查同一行是否出现过数字k
				{
					can = false ;
					break; 
				}
		}
		
		if( can == true ) 				// 检查在3×3的小方格中是否出现过数字k
		{
			//注意：javascript数字式Number类型，而不是int类型，不会像C++一样自动取整
			var up_i = parseInt( i/3 ) * 3 + 3 ;  // 小方格在i坐标的上限
			var up_j = parseInt( j/3 ) * 3 + 3;    // 小方格在j坐标的上限
			
			if( i % 3 == 0 )   //这是针对特殊情况的处理
				up_i = i ; 
			if( j % 3 == 0 ) 
				up_j = j ;
	
			for( var p = up_i-2 ; p <= up_i ; ++p  )  
			{
				for( var q = up_j-2 ; q <= up_j ; ++q ) 
					if( Initial_State[p][q] == k ) 
					{
						can = false ;
						break ;
					}
				if( can == false ) 
					break ;
			}
		}

		if( can ) 
		{
			Initial_State[i][j] = k ; 
			if( j<9 ) 
			{
				if( get_Initial_State( i  , j +1 ) )   // 到同一行的下一位置开始搜索 
					return true ;
			}
			else
			{
				if( i < 9 )  
				{
					if( get_Initial_State( i + 1 , 1 ) )    // 到下一行开始搜索 
						return true ;
				}
				else
					return true ;  // i >= 9  && j >= 9  , 搜索结束 

			}
			Initial_State[i][j] = 0 ;   // 关键这一步：找不到解就要回复原状 
		}
	}
	return false ;
};

	function createMatrix(){
		for( var i = 1; i <= 9 ; ++i )
			for( var j = 1 ; j <= 9 ; ++j )
				Initial_State[i][j] = 0 ;

		for( var i = 1 ; i <= 9 ; ++i ) 
			Initial_State[1][i] = i ; 

		for( var i = 1 ; i <= 9 ; ++i )   /* 第一行随机排列产生 */
		{
			var random_num = parseInt( Math.random() * 8 + 1 ) ;  //产生1到9间的随机数
			var temp = Initial_State[1][i] ; 
			Initial_State[1][i] = Initial_State[1][random_num] ;  //交换第i个数字与第random_num个数字
			Initial_State[1][random_num] = temp ; 
		}

		while(get_Initial_State(2,1));	
	}

/**/