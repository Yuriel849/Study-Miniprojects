package com.map;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
@WebServlet("/searchBlogs")
public class SearchBlogs extends HttpServlet{
	// 테스트용!
/*	public static void main(String[] args0) {
		search u = new search();
	}*/

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		process(request, response);  
	}
	
	private void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String search = request.getParameter("keyword");
		String clientId = "_AkNsvIuyi2TeMrCu8nW"; // 애플리케이션 클라이언트 아이디값
        String clientSecret = "CAem2VfVII"; // 애플리케이션 클라이언트 시크릿값

System.out.println("CHECK - 1 : " + search);
        
        try {
        	// 키워드 인코딩 UTF8 처리
            String text = URLEncoder.encode(search, "UTF-8");
            // Naver OpenAPI로 데이터 요청
            String apiURL = "https://openapi.naver.com/v1/search/blog?query="+ text;
System.out.println("CHECK - 2 : " + apiURL);
            // String apiURL = "https://openapi.naver.com/v1/search/blog.xml?query="+ text; // xml 반환값이 필요하다면...
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            int responseCode = con.getResponseCode();
            BufferedReader br;
            
            // 요청응답이 정상으로 나올때 새로운 객체를 생성하여 데이터를 추가함
            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
System.out.println("CHECK - 3 : " + br);
            
            String inputLine;
            StringBuffer results = new StringBuffer();
            
            // inputLine에 위에서 생성한 객체를 하나씩 저장한다
            while ((inputLine = br.readLine()) != null) {
            	results.append(inputLine);
            }
            
            request.setAttribute("information", results);
System.out.println("CHECK - 4 : " + results.toString());
            br.close();
System.out.println("CHECK - 5 : " + response.toString());
			RequestDispatcher dispatcher = request.getRequestDispatcher("/map/searchBlogResults.jsp");
			dispatcher.forward(request, response);
			 
        } catch (Exception e) {
System.out.println("CHECK - 6 : " + e);
        }
	}
}