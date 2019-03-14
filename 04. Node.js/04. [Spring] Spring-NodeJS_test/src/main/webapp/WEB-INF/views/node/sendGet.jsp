<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
	<h1>
		GET request to Node.js successful!
	</h1>

	<P>  The time on the server is ${serverTime}. </P>
	
	<ul>
		<li><a href="/node/sendGet">Test : Send data to Node.js via GET</a>
		<li><a href="/node/sendPost">Test : Send data to Node.js via POST</a>
		<li><a href="http://127.0.0.1:12050/node?일본의 진정한 수도=사포로&France's City of Lights=Paris">Test : Send from HTML to Node.js</a></li>
	</ul>

	<section>
        <div id="change_username">
            <input id="username" type="text" />
            <button id="send_username" type="button">Change username</button>
        </div>
    </section>

    <section id="chatroom">
        <section id="feedback"></section>
    </section>

    <section id="input_zone">
        <input id="message" class="vertical-align" type="text" />
        <button id="send_message" class="vertical-align" type="button">Send</button>
    </section>
    
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js"></script>
    <script src="/resources/js/chat.js"></script>
</body>
</html>
