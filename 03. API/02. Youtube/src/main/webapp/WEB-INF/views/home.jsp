<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<body>
	<h1>
		Youtube 임베디드 플레이어 테스트입니다.
	</h1>  
    
    <!-- Test : Live streaming iframe player with channelID -->
    <iframe id="player" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    	title="YouTube video player" src="https://www.youtube.com/embed/live_stream?channel=UC13SnYX0UKiVsbZLSW6IBzg&amp;enablejsapi=1&amp;"
    	width="640" height="390" frameborder="0"></iframe>
</body>
</html>