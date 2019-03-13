<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
	<h1>
		Hello world!  
	</h1>

	<P>  The time on the server is ${serverTime}. </P>
	
	<!-- The IFrame player API lets you embed a YouTube video player on your website and control the player using JavaScript
			(from https://developers.google.com/youtube/iframe_api_reference) -->
	
	<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
	<iframe title="player" class="youtube-player" type="text/html" width="640" height="390"
		src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1" frameborder="0" allowFullScreen></iframe>
</body>
</html>
