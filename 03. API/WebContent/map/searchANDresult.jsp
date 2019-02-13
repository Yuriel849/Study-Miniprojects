<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>

*{margin: 0px;}

#map {
    display: block;
    width: 800px;
    height: 500px;
    margin: 50px auto;
}

#search{
    display: block;
    width: 300px;
    height: 60px;
    margin: 50px auto;
    text-align: center;
    line-height: 60px;
}

#whatthematzip{
    display: block;
    margin: 0px auto;
    width: 40%;
    height: 200px;
    overflow-y: scroll;
}

#searchResult{
    display: block;
    margin: 10px auto;
    width: 80%;
    height: 85px;
    text-overflow: ellipsis;
    overflow-y: hidden;
    border-bottom: 1px solid black;
}

#searchResult a {
    text-decoration : none;
}

</style>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
</head>
<body>
<div class="mainArea"> 	
    <div id="map"></div>
    <div id="search"><input type="text" id="keyword"><input type="submit" id="searchBtn" value="검색"></div>
	</div>
    <div id="whatthematzip">
    </div>
	<script>
		//view page에서 모듈화 형식으로 data를 가져옴(ajax)
		$('#searchBtn').on('click',function(){
			$.ajax({
	            type : "GET", //전송방식을 지정한다 (POST,GET)
	            url : "/searchBlogs",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.,
	            data : {keyword:$('#keyword').val()},
	            dataType : "JSON",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
	            error : function(){
	                alert("통신실패!!!!");
	            },
	            success : function(Parse_data){
	            	console.log(Parse_data.items);
	            	var cnt=0;
	            	$('#whatthematzip').empty();
	            	for(var i=0;i<Parse_data.items.length;i++){
	            		cnt++;
	            		$("#whatthematzip").append('<div id="searchResult">'+cnt+'<a href="'+Parse_data.items[i].link+'">'
	            				+Parse_data.items[i].title+'</a><br>'+Parse_data.items[i].bloggername+'<br>'
	            				+Parse_data.items[i].description+'</div>'); //div에 받아온 값을 넣는다.
	            	}
	            }
	        });
			
			$('#keyword').val("");
		});


	</script>
</body>
</html>