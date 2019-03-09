package com.Yuriel.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import com.Yuriel.domain.Greeting;
import com.Yuriel.domain.HelloMessage;

@Controller
public class GreetingController {
	
	@MessageMapping("/hello") // If a message is sent to the URL "/hello", it is mapped to this method
	@SendTo("/topic/greetings") // Retur value is broadcast to all subscribers to "/topic/greetings"
	public Greeting greeting(HelloMessage message) throws Exception {
						  // Contents of the message is bound to a HelloMessage object
		Thread.sleep(1000); // Simulates 1-second processing delay
		return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
	}
}
