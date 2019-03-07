package com.Yuriel.controller;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/node/*")
public class ToNodeController {

	@GetMapping("send")
	public void SendToNode() throws JsonProcessingException {
		System.out.println("This is the 'SendToNode' method");

		String target = "http://127.0.0.1:12050/node";
		String postData = "code=테스트 테스트 테스트&test=뭐니 뭐니 뭐니&드래곤=dragon dragon";
		
		// Jackson-Databind ObjectMapper -> reuseable instance for data-binding
		ObjectMapper mapper = new ObjectMapper();
		
		String jsonString = mapper.writeValueAsString(postData);
		System.out.println("jsonString : " + jsonString);
		
		try {
			URL url = new URL(target);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setInstanceFollowRedirects(false);
			conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			DataOutputStream stream = new DataOutputStream(conn.getOutputStream());
			stream.writeBytes(jsonString);
			conn.getResponseCode();
			
			System.out.println("'SendToNode' successful - END");
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
