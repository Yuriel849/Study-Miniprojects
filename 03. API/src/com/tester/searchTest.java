package com.tester;

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
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class searchTest
 */
@WebServlet("/searchTest")
public class searchTest extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		execute(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		execute(request, response);
	}
	
	private void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String clientId = "WWfb_nRBdYNzKOt81QLH"; //애플리케이션 클라이언트 아이디값"
        String clientSecret = "vbM5QqqvTW";//애플리케이션 클라이언트 시크릿값"
        HttpSession session = request.getSession();
        try {
        	request.setCharacterEncoding("UTF-8");

//            String text = URLEncoder.encode(request.getParameter("keyword"), "UTF-8");
            String text = URLEncoder.encode("종각역", "UTF-8");

            String apiURL = "https://openapi.naver.com/v1/search/local.json?query="+ text; // json 결과
            //String apiURL = "https://openapi.naver.com/v1/search/blog.xml?query="+ text; // xml 결과
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("X-Naver-Client-Id", clientId);
            con.setRequestProperty("X-Naver-Client-Secret", clientSecret);
            int responseCode = con.getResponseCode();
            BufferedReader br;
            if(responseCode==200) { // 정상 호출
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {  // 에러 발생
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer sendBack = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
            	sendBack.append(inputLine);
            }
            br.close();

            session.setAttribute("result", sendBack);
    		response.sendRedirect("/map/searchTest.jsp");
        } catch (Exception e) {
            System.out.println(e);
        }
	}

}
