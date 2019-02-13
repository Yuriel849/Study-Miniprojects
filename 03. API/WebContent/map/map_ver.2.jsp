<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Starkhaven</title>
<!-- References external CSS file -->
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/map_ver.2.css">
<!-- Includes jQuery library via CDN -->
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<!-- JavaScript API for the Kakao Map -->
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=33a433a61100ce7b57f3c75f0c7fc83a&libraries=services"></script>
	
</head>
<body>
	<jsp:include page="../main/header.jsp" flush="false"></jsp:include>

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
                		<form onsubmit="searchBlogs(); return false;">
                    		<input type="text" value="" name="blogKeyword" id="blogKeyword" placeholder="&nbsp;&nbsp;맛집 후기를 검색하세요!" size="33"> 
                    		<input type="submit" name="search" id="search" value="검색하기"> 
                		</form>
    				</div>
    				<input type="button" value="미세먼지">
    				<input type="button" value="날씨">
    			</div>
    		
				<div class="map_wrap">
    				<div id="map"></div>
    				<div class="hAddr">
        				<span class="title">지도중심기준 행정동 주소정보</span>
        				<span id="centerAddr"></span>
    				</div>
				</div>
    			
    			<div class=lists_wrap>
	    			<div class="places_wrap">
		       			<ul id="placesList"></ul>    			
		       			<div id="pagination"></div>
	    			</div><div class="blogs_wrap"">
						<ul id="blogsList"></ul>    			
	    			</div>    			
    			</div>
			</div>
		</div>
	</div>
	
	<script>
// 좌표를 저장할 변수
		var latitude = '';
		var longitude = '';
	
// 01. CREATE MAP (지도 생성하기)
		var container = $('#map')[0];
		var options = { //지도를 생성할 때 필요한 기본 옵션
			center: new daum.maps.LatLng(37.5642135, 127.0016985), //지도의 중심좌표
			level: 3 //지도의 레벨(확대, 축소 정도)
		};
		var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

// 02. ADD MAP CONTROLS (지도 조작 컨트롤 생성하기)
		var mapTypeControl = new daum.maps.MapTypeControl(); // 지도 타입 컨트롤 생성
		// "daum.maps.ControlPosition" -> 컨트롤이 표시될 위치를 정의
		map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT); // 지도 타입 컨트롤을 지도의 오른쪽 위에 위치시킴
		
		var zoomControl = new daum.maps.ZoomControl(); // 지도 줌 컨트롤 생성
		map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT); // 지도 줌 컨트롤을 지도의 오른쪽에 위치시킴
		
// 03. CENTER WITH GEOLOCATION (접속 위치를 이용하여 지도 중심을 잡기).
		if (navigator.geolocation) { // HTML5의 geolocation 사용할 수 있는지 확인
		    navigator.geolocation.getCurrentPosition(function(position) { // geolocation으로 현재 접속 위치 파악
				var lat = position.coords.latitude, lon = position.coords.longitude;
				map.setCenter(new daum.maps.LatLng(lat, lon)); });
		} else { // HTML5의 geolocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정한다		    
			map.setCenter(new daum.maps.LatLng(37.5642135, 127.0016985));
		}
		
// 04. SEARCH BY KEYWORD AND SHOW (키워드로 검색하고 목록으로 표출하기)
		var markers = [];

		// 장소 검색 객체 생성
		var ps = new daum.maps.services.Places();  
		
		// 검색 결과 목록이나 마커를 클릭하면 장소명을 보여줄 인포윈도우를 생성
		var infowindow = new daum.maps.InfoWindow({zIndex:1});

		function searchPlaces() {
			var keyword = document.getElementById('keyword').value;

		    if (!keyword.replace(/^\s+|\s+$/g, '')) { // 검색창이 비었을 경우
        		alert('키워드를 입력해주세요!');
        		return false;
    		}

		    // 장소검색 객체에게 키워드 검색을 요청
		    ps.keywordSearch( keyword, placesSearchCB); 
		}

		// 검색 완료 시 호출할 콜백함수
		function placesSearchCB(data, status, pagination) {
    		if (status === daum.maps.services.Status.OK) { // 정상적으로 검색이 완료 시
		        displayPlaces(data);
		        displayPagination(pagination);
		    } else if (status === daum.maps.services.Status.ZERO_RESULT) {
		    	alert('검색 결과가 존재하지 않습니다.');
		        return;
		    } else if (status === daum.maps.services.Status.ERROR) {
		        alert('검색 결과 중 오류가 발생했습니다.');
		        return;
		    }
		}

		// 검색 결과 목록과 마커를 표출하는 함수
		function displayPlaces(places) {
		    var listEl = document.getElementById('placesList'), 
		    	fragment = document.createDocumentFragment(), 
		    	bounds = new daum.maps.LatLngBounds(), 
		    	listStr = '';
		    
		    removeAllChildNods(listEl); // 기존 검색 결과 목록을 삭제
			removeMarker(); // 지도에 표시되고 있는 마커를 삭제
		    
		    for ( var i=0; i<places.length; i++ ) {
		        // 마커를 생성하고 지도에 표시
		        var placePosition = new daum.maps.LatLng(places[i].y, places[i].x),
		            marker = addMarker(placePosition, i), 
		            itemEl = getListItem(i, places[i]);
		        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표를 추가합니다
		        bounds.extend(placePosition);
		
		        // 마커와 검색결과 항목에 mouseover하면 인포윈도우에 장소명을 표시, mouseout하면 인포윈도우 제거
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
		
		    // 검색결과 항목을 검색결과 목록에 추가
		    listEl.appendChild(fragment).scrollTop = 0;
		    
		    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
		    map.setBounds(bounds);
		}
		
		// 검색결과 항목을 Element로 반환하는 함수
		function getListItem(index, places) {
		    var el = document.createElement('li'),
		    	itemStr = '<span class="markerbg marker_' + (index+1) + '"></span><div class="info">' + '<h5>' + places.place_name + '</h5>';

		    if(places.road_address_name) { // 지번 주소가 있다면...
		        itemStr += '<span class="roadAddr">지번  주소&nbsp;&nbsp;:&nbsp;' + places.road_address_name + '</span><br>' +
		                    '<span class="addr gray">도로명 주소:&nbsp;' + places.address_name  + '</span><br>';
		    } else { // 지번 주소가 없다면...
		        itemStr += '<span class="addr gray">도로명 주소:&nbsp;' + places.address_name  + '</span><br>';
		    }
		    if(places.phone) {
				itemStr += '<span class="tel">전화번호&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;' + places.phone  + '</span></div>';	    	
		    }

		    el.innerHTML = itemStr;
		    $('#placesList').css('width', '92%').css('padding-left', '40px');
		    el.className = 'item';		
		    return el;
		}
		
		// 마커를 생성하여 지도에 표시하는 함수
		function addMarker(position, idx, title) {
		    var imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지 사용
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
		
		    marker.setMap(map); // 지도 위에 마커를 표출
		    markers.push(marker);  // 생성된 마커를 배열에 추가
		    return marker;
		}
		
		// 지도 위에 표시되고 있는 마커를 모두 제거하는 함수
		function removeMarker() {
		    for ( var i = 0; i < markers.length; i++ ) { markers[i].setMap(null); }   
		    markers = [];
		}
		
		// 검색결과 목록 하단에 페이지번호를 표시는 함수
		function displayPagination(pagination) {
		    var paginationEl = document.getElementById('pagination'),
		        fragment = document.createDocumentFragment(),
		        i; 
		
		    // 기존에 추가된 페이지번호를 삭제합니다
		    while (paginationEl.hasChildNodes()) { paginationEl.removeChild (paginationEl.lastChild); }
		
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
		
		// 검색결과 목록 또는 마커를 클릭했을 때 인포윈도우에 장소명을 표시하는 함수
		function displayInfowindow(marker, title) {
		    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
		
		    infowindow.setContent(content);
		    infowindow.open(map, marker);
		}
		
		 // 검색결과 목록의 자식 Element를 제거하는 함수
		function removeAllChildNods(el) {   
		    while (el.hasChildNodes()) {
		        el.removeChild (el.lastChild);
		    }
		}

// 05. SHOW ADDR VIA COORD (좌표로 주소 표시)
		// 주소-좌표 변환 객체 생성
		var geocoder = new daum.maps.services.Geocoder();

		var marker = new daum.maps.Marker(), // 클릭한 위치를 표시할 마커 생성
    		infowindow = new daum.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

		// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시
		searchAddrFromCoords(map.getCenter(), displayCenterInfo);

		// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록
		daum.maps.event.addListener(map, 'click', function(mouseEvent) {
    		searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        		if (status === daum.maps.services.Status.OK) {
            		var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            		detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            		var content = '<div class="bAddr"><span class="title">도로명 주소정보</span>' + detailAddr + '</div>';

            		// 마커를 클릭한 위치에 표시
            		marker.setPosition(mouseEvent.latLng);
            		marker.setMap(map);

            		// 클릭한 위치의 도로명 주소정보를 인포윈도우에 표시
            		infowindow.setContent(content);
            		infowindow.open(map, marker);
		        }
    		});
		});

		// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록
		daum.maps.event.addListener(map, 'idle', function() {
    		searchAddrFromCoords(map.getCenter(), displayCenterInfo);
		});

		// 좌표로 행정동 주소 정보를 요청
		function searchAddrFromCoords(coords, callback) {
    		geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
		}
		
		// 좌표로 도로명 주소 정보를 요청
		function searchDetailAddrFromCoords(coords, callback) {
    		geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
		}

		// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
		function displayCenterInfo(result, status) {
    		if (status === daum.maps.services.Status.OK) {
        		var infoDiv = document.getElementById('centerAddr');

        		for(var i = 0; i < result.length; i++) {
            		// 행정동의 region_type 값은 'H' 이므로
            		if (result[i].region_type === 'H') {
                		infoDiv.innerHTML = result[i].address_name;
                		break;
            		} } } } // displayCenterInfo() 끝.

// 06. 맛집 블로그 검색
		// searchBlogResults에서 모듈화 형식으로 data를 가져옴 (ajax 사용)
		function searchBlogs() {
			$.ajax({
	            type : "GET", //전송방식을 지정한다 (POST,GET)
	            url : "/searchBlogs",//호출 URL을 설정한다. GET방식일경우 뒤에 파라티터를 붙여서 사용해도된다.,
	            data : {keyword:$('#blogKeyword').val()},
	            dataType : "JSON",//호출한 페이지의 형식이다. xml,json,html,text등의 여러 방식을 사용할 수 있다.
	            error : function(){
	                alert("통신실패!!!!");
	            },
	            success : function(data){
	            	var cnt=0, itemStr = '';
	            	$('#blogsList').empty();
	            	for(var i=0;i<data.items.length;i++){
	            		cnt++;
	    	            var el = document.createElement('li'),
	    		    	itemStr = '<span class="markerbg marker_' + (cnt+1) + '"></span><div class="info">' + '<h5><a target="_blank" href="' + data.items[i].link + '">'
	    		    			+ data.items[i].title + '</a></h5><br><span class="roadAddr">' + data.items[i].bloggername
	    		    			+ '</span><span class="tel">' + data.items[i].description  + '</span></div>';
	    		    	el.innerHTML = itemStr;
	    		    	el.className = 'item';
	    		    	$('#blogsList').append(el);
	            	}
	            }
			});
			
		    $('#blogsList').css('width', '95%').css('padding-left', '40px');
			$('#keyword').val("");
		}
	</script>
</body>
</html>