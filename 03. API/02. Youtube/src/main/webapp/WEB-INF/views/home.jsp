<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<!DOCTYPE html>
<html>
<body>
	<h1>
		Youtube 임베디드 플레이어 테스트입니다.
	</h1>  
    
    <!-- Test : Live streaming iframe player with channelID -->
    <iframe id="player" width="1080" height="600" src="https://www.youtube.com/embed/3OCzoZU3BWo?autoplay=1&livemonitor=1"
    	frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    	allowfullscreen></iframe>
</body>
</html>