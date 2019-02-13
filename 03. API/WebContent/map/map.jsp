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
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=33a433a61100ce7b57f3c75f0c7fc83a&libraries=services"></script>
	
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
    					<form onsubmit="searchPlaces(); return false;">
                    		<input type="text" value="" name="keyword" id="keyword" placeholder="&nbsp;&nbsp;검색하고 싶은 키워드를 입력해주세요!" size="33"> 
                    		<input type="submit" name="search" id="search" value="검색하기"> 
                		</form>
    				</div>
    				<div style="display: inline-block; margin-left: -6px;">
                		<form onsubmit="return false;">
                    		<input type="text" value="" name="blogKeyword" id="blogKeyword" placeholder="&nbsp;&nbsp;맛집 후기를 검색하세요!" size="33"> 
                    		<input type="submit" name="search" id="search" value="검색하기"> 
                		</form>
    				</div>
    				<input type="button" value="미세먼지">
    				<input type="button" value="날씨">
    			</div>
    		
    			<div id="map"></div>
    			<div id="clickLatlng"></div>
    			
    			<div class="sidebar_wrap">
	    			<div class="sidebar">
	        			<ul id="placesList"></ul>
	        			<div id="pagination"></div>
	    			</div>    			
    			</div>
			</div>
		</div>
	</div>
	
	<script>
		$('.sidebar_wrap').on('click', function() {
			$('.sidebar_wrap').css({'width':'304px', 'transition': '0.5s'});
			$('.sidebar').css({'width':'294px', 'transition': '0.5s'});
			$('#map').css({'margin-left':'304px', 'transition': '0.5s'})
		});
		$('.sidebar_wrap').on('dblclick', function() {
			$('.sidebar_wrap').css({'width':'10px', 'transition': '0.5s'});
			$('.sidebar').css({'width':'0px', 'transition': '0.5s'});
			$('#map').css({'margin-left':'10px', 'transition': '0.5s'})
		});
		
		
		$('#button').toggle(function() {
			  $(this).parent().css('height', 'auto');
			}, function() {
			  $(this).parent().css('height', '18px');
			});
	
		// 01. 지도 생성한다.
		var container = $('#map')[0];
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(37.5642135, 127.0016985), //지도의 중심좌표
			level: 3 //지도의 레벨(확대, 축소 정도)
		};
		var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

		// 02. 지도 타입 컨트롤, 지도 줌 컨트롤 생성한다. 
		var mapTypeControl = new daum.maps.MapTypeControl(); // 지도 타입 컨트롤 생성
		// "daum.maps.ControlPosition" -> 컨트롤이 표시될 위치를 정의
		map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPLEFT); // 지도 타입 컨트롤을 지도의 오른쪽 위에 위치시킴
		
		var zoomControl = new daum.maps.ZoomControl(); // 지도 줌 컨트롤 생성
		map.addControl(zoomControl, daum.maps.ControlPosition.LEFT); // 지도 줌 컨트롤을 지도의 오른쪽에 위치시킴
		
		// 03. geolocation 사용하여 접속 위치로 지도를 위치시킨다.
		if (navigator.geolocation) { // HTML5의 geolocation 사용할 수 있는지 확인
		    navigator.geolocation.getCurrentPosition(function(position) { // geolocation으로 현재 접속 위치 파악
				var lat = position.coords.latitude, // latitude
		        	lon = position.coords.longitude; // longitude
		        var locPosition = new daum.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 잡는다
		            message = ""; // 인포윈도우에 표시될 내용
		        displayMarker(locPosition, message); // 마커와 인포윈도우 표시
			});
		} else { // HTML5의 geolocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정한다		    
		    var locPosition = new daum.maps.LatLng(37.5642135, 127.0016985),
		        message = 'GEOLOCATION UNAVAILABLE';
		    displayMarker(locPosition, message); // 마커와 인포윈도우 표시
		}

		// 지도에 마커와 인포윈도우를 표시하는 함수입니다
		function displayMarker(locPosition, message) {
		    if(message != "") { // message의 값이 빈 문자열이 아니라면 (즉, 내용이 있다면) 실행한다. 
				// 마커 생성
			    var marker = new daum.maps.Marker({  
			        map: map, 
			        position: locPosition
			    });
			    var iwContent = message, // 인포윈도우에 표시할 내용
			        iwRemoveable = true;
			    // 인포윈도우를 생성합니다
			    var infowindow = new daum.maps.InfoWindow({
			        content : iwContent,
			        removable : iwRemoveable
			    });	
			    // 인포윈도우를 마커위에 표시합니다
			    infowindow.open(map, marker);
		    }
		    // 지도 중심좌표를 접속위치로 변경합니다
			map.setCenter(locPosition);
		}

	
	
	

/* 		// 04. 클릭한 위치에 마커 표시하기
		// 지도를 클릭한 위치에 표출할 마커입니다
		var marker = new daum.maps.Marker({
    		// 지도 중심좌표에 마커를 생성합니다 
    		position: map.getCenter() 
		});
		// 지도에 마커를 표시합니다
		marker.setMap(map);
		
		// 마커가 드래그 가능하도록 설정합니다 
		marker.setDraggable(true); 

		// 지도에 클릭 이벤트를 등록합니다
		// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
		daum.maps.event.addListener(map, 'click', function(mouseEvent) {        
    		// 클릭한 위도, 경도 정보를 가져옵니다 
    		var latlng = mouseEvent.latLng; 
    		// 마커 위치를 클릭한 위치로 옮깁니다
    		marker.setPosition(latlng);
    
    		var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    		message += '경도는 ' + latlng.getLng() + ' 입니다';    
    		var resultDiv = document.getElementById('clickLatlng'); 
    		resultDiv.innerHTML = message;
		});
 */		
		// 05. 키워드로 장소검색하고 목록으로 표출하기
		var markers = [];

		// 장소 검색 객체를 생성합니다
		var ps = new daum.maps.services.Places();  
		
		// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
		var infowindow = new daum.maps.InfoWindow({zIndex:1});

		// 키워드 검색을 요청하는 함수입니다
		function searchPlaces() {
		    var keyword = document.getElementById('keyword').value;

		     if (!keyword.replace(/^\s+|\s+$/g, '')) {
        		alert('키워드를 입력해주세요!');
        		return false;
    		}

		    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
		    ps.keywordSearch( keyword, placesSearchCB); 
		}

		// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
		function placesSearchCB(data, status, pagination) {
    		if (status === daum.maps.services.Status.OK) {
		        // 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출합니다
		        displayPlaces(data);
		        // 페이지 번호를 표출합니다
		        displayPagination(pagination);
		    } else if (status === daum.maps.services.Status.ZERO_RESULT) {
		    	alert('검색 결과가 존재하지 않습니다.');
		        return;
		    } else if (status === daum.maps.services.Status.ERROR) {
		        alert('검색 결과 중 오류가 발생했습니다.');
		        return;
		    }
		}

		// 검색 결과 목록과 마커를 표출하는 함수입니다
		function displayPlaces(places) {
			$('.sidebar_wrap').css({'width':'304px', 'transition': '0.5s'});
			$('.sidebar').css({'width':'294px', 'transition': '0.5s'});
			$('#map').css({'margin-left':'304px', 'transition': '0.5s'})
		    var listEl = $('#placesList')[0], 
		    menuEl = $('#menu_wrap')[0],
		    fragment = document.createDocumentFragment(), 
		    bounds = new daum.maps.LatLngBounds(), 
		    listStr = '';
		    
		    // 검색 결과 목록에 추가된 항목들을 제거합니다
		    removeAllChildNods(listEl);
		
		    // 지도에 표시되고 있는 마커를 제거합니다
		    removeMarker();
		    
		    for ( var i=0; i<places.length; i++ ) {
		
		        // 마커를 생성하고 지도에 표시합니다
		        var placePosition = new daum.maps.LatLng(places[i].y, places[i].x),
		            marker = addMarker(placePosition, i), 
		            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
		
		        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
		        // LatLngBounds 객체에 좌표를 추가합니다
		        bounds.extend(placePosition);
		
		        // 마커와 검색결과 항목에 mouseover 했을때
		        // 해당 장소에 인포윈도우에 장소명을 표시합니다
		        // mouseout 했을 때는 인포윈도우를 닫습니다
		        (function(marker, title) {
		            daum.maps.event.addListener(marker, 'mouseover', function() {
		                displayInfowindow(marker, title);
		            });
		
		            daum.maps.event.addListener(marker, 'mouseout', function() {
		                infowindow.close();
		            });
		
		            itemEl.onmouseover =  function () {
		                displayInfowindow(marker, title);
		            };
		
		            itemEl.onmouseout =  function () {
		                infowindow.close();
		            };
		        })(marker, places[i].place_name);
		
		        fragment.appendChild(itemEl);
		    }
		
		    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
		    listEl.appendChild(fragment);
		    //menuEl.scrollTop = 0;
		    
		    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
		    map.setBounds(bounds);
		}
		
		// 검색결과 항목을 Element로 반환하는 함수입니다
		function getListItem(index, places) {
		
		    var el = document.createElement('li'),
		    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
		                '<div class="info">' +
		                '   <h5>' + places.place_name + '</h5>';
		
		    if (places.road_address_name) {
		        itemStr += '    <span>' + places.road_address_name + '</span>' +
		                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
		    } else {
		        itemStr += '    <span>' +  places.address_name  + '</span>'; 
		    }
		                 
		      itemStr += '  <span class="tel">' + places.phone  + '</span>' +
		                '</div>';           
		
		    el.innerHTML = itemStr;
		    el.className = 'item';
		
		    return el;
		}
		
		// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
		function addMarker(position, idx, title) {
		    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
		        imageSize = new daum.maps.Size(36, 37),  // 마커 이미지의 크기
		        imgOptions =  {
		            spriteSize : new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
		            spriteOrigin : new daum.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
		            offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
		        },
		        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
		            marker = new daum.maps.Marker({
		            position: position, // 마커의 위치
		            image: markerImage 
		        });
		
		    marker.setMap(map); // 지도 위에 마커를 표출합니다
		    markers.push(marker);  // 배열에 생성된 마커를 추가합니다
		
		    return marker;
		}
		
		// 지도 위에 표시되고 있는 마커를 모두 제거합니다
		function removeMarker() {
		    for ( var i = 0; i < markers.length; i++ ) {
		        markers[i].setMap(null);
		    }   
		    markers = [];
		}
		
		// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
		function displayPagination(pagination) {
		    var paginationEl = document.getElementById('pagination'),
		        fragment = document.createDocumentFragment(),
		        i; 
		
		    // 기존에 추가된 페이지번호를 삭제합니다
		    while (paginationEl.hasChildNodes()) {
		        paginationEl.removeChild (paginationEl.lastChild);
		    }
		
		    for (i=1; i<=pagination.last; i++) {
		        var el = document.createElement('a');
		        el.href = "#";
		        el.innerHTML = i;
		
		        if (i===pagination.current) {
		            el.className = 'on';
		        } else {
		            el.onclick = (function(i) {
		                return function() {
		                    pagination.gotoPage(i);
		                }
		            })(i);
		        }
		
		        fragment.appendChild(el);
		    }
		    paginationEl.appendChild(fragment);
		}
		
		// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
		// 인포윈도우에 장소명을 표시합니다
		function displayInfowindow(marker, title) {
		    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
		
		    infowindow.setContent(content);
		    infowindow.open(map, marker);
		}
		
		 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
		function removeAllChildNods(el) {   
		    while (el.hasChildNodes()) {
		        el.removeChild (el.lastChild);
		    }
		}
	</script>
</body>
</html>