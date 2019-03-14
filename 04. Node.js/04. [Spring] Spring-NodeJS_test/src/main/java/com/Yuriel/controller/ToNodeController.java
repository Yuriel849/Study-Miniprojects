package com.Yuriel.controller;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/node/*")
public class ToNodeController {
	
	@GetMapping("test-socket")
	public void TestSocket() {}

	@GetMapping("sendGet")
	public void SendToNodeGET() {
		System.out.println("This is the 'SendToNode' method");

		String target = "http://127.0.0.1:12050/node";
		
		try {
			// When encoding a query string before sending to Node.js, the equal sign ("=") MUST NOT be encoded!
//			String key = URLEncoder.encode("일본의 진정한 수도", "utf-8");
//			String value = URLEncoder.encode("사포로", "utf-8");
//			String uri = target + "?" + key + "=" + value;
//			System.out.println(uri);
			
			// If using anything other than English letters, if using spaces or apostrophes or commas etc., encoding is REQUIRED!
			String query = "OrderCode=VWS91232&Germany=Hamburg";
			String uri = target + "?" + query;
			URL url = new URL(uri);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setInstanceFollowRedirects(false);
			conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			conn.getResponseCode();
			
			System.out.println("'SendToNode' successful - END");
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@GetMapping("sendPost")
	public void SendToNodePOST() {
		System.out.println("This is the 'SendToNode' method");

		String target = "http://127.0.0.1:12050/node";
		String postData = "OrderCode=VWS91232&Germany=Hamburg";
				
		try {
			URL url = new URL(target);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();

			conn.setDoOutput(true);
			conn.setInstanceFollowRedirects(false);
			conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
			DataOutputStream stream = new DataOutputStream(conn.getOutputStream());
			stream.writeBytes(postData);
			stream.flush();
			stream.close();
			conn.getResponseCode();
			
			System.out.println("'SendToNode' successful - END");
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
