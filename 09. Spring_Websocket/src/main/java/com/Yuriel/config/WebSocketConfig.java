package com.Yuriel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Enables WebSocket message handling with a message broker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic"); // Enables simple message broker to carry messages to clients on destinations prefixed with "/topic"
		config.setApplicationDestinationPrefixes("/app"); // Designate the prefix "/app" for messages bound for @MessageMapping-annotated methods
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/gs-guide-websocket").withSockJS(); // Enables alternate transports if WebSocket is unavailable -> SockJS client will attempt to connect to "/gs-guide-websocket"
	}
}
