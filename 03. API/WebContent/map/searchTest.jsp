<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Starkhaven</title>
<!-- References external CSS file -->
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/map.css">
<!-- Includes jQuery library via CDN -->
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<!-- JavaScript API for the Kakao Map -->
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=917bd247b0791cf5d29c53a272e04d66&libraries=services"></script>
	
</head>
<body>
	<jsp:include page="../main/header.jsp" flush="false"></jsp:include>
	  	
	<c:if test="${not empty message}">
    	<script>
    		/* If there is a "message" attribute, it is shown */
    		$(document).ready(function() { alert("${message}"); });
    	</script>
	</c:if>

	<div class="body_wrap">
    	<div class="body_main">
    		<div class="section">
    			<div class="search-bar">
    				<div style="display: inline-block;">
    					<!-- <form onsubmit="searchPlaces(); return false;"> -->
    					<form action="/searchTest" method="post">
                    		<input type="text" name="keyword" id="keyword" placeholder="&nbsp;&nbsp;검색하고 싶은 키워드를 입력해주세요!" size="33">
                    		<input type="submit" name="search" id="search"> 
                		</form>
    				</div>
    				<input type="button" value="미세먼지">
    				<input type="button" value="날씨">
    			</div>
    		
    			<div id="map" style="margin-left: 1000px"></div>
    			<div id="clickLatlng"></div>
    			
    			<div class="sidebar" style="width: 1000px; left: 50px;">
        			<ul id="placesList"></ul>
        			<div id="pagination"></div>
    			</div>
			</div>
		</div>
	</div>
	
	<script>
		var jsonObj = '${result}';
		var localObj = JSON.parse(jsonObj);
		var buildDate = localObj.lastBuildDate;
		var totalData = localObj.total;
		var startNum = localObj.start;
		var display = localObj.display;
		var items = localObj.items;
		var cnt = 0;
		var newRows = '<ul>';
        for(var x in items) {
            var title = items[x].title;
            var link = items[x].link;
            var category = items[x].category;
            var description = items[x].description;
            var telephone = items[x].telephone;
            var address = items[x].address;
            var roadAddress = items[x].roadAddress;
            newRows += '<li>'+(++cnt)+title+'<ul style="list-style: circle"><li>'+link+'</li><li>'+category+'</li><li>'+description+'</li><li>'+telephone+
                        '</li><li>'+address+'</li><li>'+roadAddress+'</li></ul><li>';
        }
        newRows += '</ul>'
        console.log(newRows);
        $('#placesList').append(newRows);
		
	
	
	
		// 01. 지도 생성한다.
		var container = document.getElementById('map');
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표
			level: 3 //지도의 레벨(확대, 축소 정도)
		};

		var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
	</script>
</body>
</html>