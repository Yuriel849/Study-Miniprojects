package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import bbs.BBS;

public class BBSDAO {
	private Connection conn;
	private ResultSet rs;
	
	public BBSDAO() {
		// MySQL DB와의 접속(connection)을 만드는 역할
		try {
			String dbURL = "jdbc:mysql://localhost:3306/BBS?useUnicode=true&characterEncoding=utf8";
			String dbID = "root";
			String dbPwd = "IriDesCence";
			
			Class.forName("com.mysql.jdbc.Driver"); // MySQL DB에 접속할 수 있도록 매개체 역할
			conn = DriverManager.getConnection(dbURL, dbID, dbPwd);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	public String getDate() { // 현재 시간을 반환
		String SQL = "SELECT NOW()";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				return rs.getString(1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ""; // DB 오류를 의미하도록
	}
	
	public int getNext() { // 다음이 몇 번째 게시글인지 숫자를 반환
		String SQL = "SELECT bbsID FROM bbs ORDER BY bbsID DESC"; // 게시글 번호 (첫번째 게시글 등등)
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				return rs.getInt(1) + 1;
			}
			return 1; // 지금 글이 첫번째 게시글인 경우
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1; // DB 오류를 의미하도록
	}
	
	// 실제로 DB에 데이터를 저장하는 역할
	public int write(String bbsTitle, String userID, String bbsContent) {
		String SQL = "INSERT INTO bbs VALUES(?, ?, ?, ?, ?, ?)"; // 게시글 번호 (첫번째 게시글 등등)
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, getNext());
			pstmt.setString(2, bbsTitle);
			pstmt.setString(3, userID);
			pstmt.setString(4, getDate());
			pstmt.setString(5, bbsContent);
			pstmt.setInt(6, 1); // bbsAvailable의 값 (새로 만들고 삭제하지 않았으니까 available하다는 의미에서 1)
			return pstmt.executeUpdate();
				/* executeUpdate()
				 * 		returns either the row count for SQL DML statements
				 * 		or 0 for SQL statements that return nothing
				 */	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1; // DB 오류를 의미하도록
	}
	
	public ArrayList<BBS> getList(int pageNumber) {
		String SQL = "SELECT * FROM bbs WHERE bbsID < ? AND bbsAvailable = 1 ORDER BY bbsID DESC LIMIT 10"; // 게시글 번호 (첫번째 게시글 등등)
		ArrayList<BBS> list = new ArrayList<>();
		
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1,  getNext() - (pageNumber - 1) * 10);
			rs = pstmt.executeQuery();

			while(rs.next()) {
				BBS bbs = new BBS();
				bbs.setBbsID(rs.getInt(1));
				bbs.setBbsTitle(rs.getString(2));
				bbs.setUserID(rs.getString(3));
				bbs.setBbsDate(rs.getString(4));
				bbs.setBbsContent(rs.getString(5));
				bbs.setBbsAvailable(rs.getInt(6));
				list.add(bbs);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	public boolean nextPage(int pageNumber) {
		String SQL = "SELECT * FROM bbs WHERE bbsID < ? AND bbsAvailable = 1 ORDER BY bbsID DESC LIMIT 10"; // 게시글 번호 (첫번째 게시글 등등)
		
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1,  getNext() - (pageNumber - 1) * 10);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				return true; // 다음 페이지로 이동할 수 있다는 의미 (다음 페이지에 표시할 내용이 더 있다는 의미)
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return false;
	}
	
	public BBS getBBS(int bbsID) {
		String SQL = "SELECT * FROM bbs WHERE bbsID = ?";
		
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1,  bbsID);
			rs = pstmt.executeQuery();
			if(rs.next()) {
				BBS bbs = new BBS();
				bbs.setBbsID(rs.getInt(1));
				bbs.setBbsTitle(rs.getString(2));
				bbs.setUserID(rs.getString(3));
				bbs.setBbsDate(rs.getString(4));
				bbs.setBbsContent(rs.getString(5));
				bbs.setBbsAvailable(rs.getInt(6));
				return bbs;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return null;
	}
	
	public int update(int bbsID, String bbsTitle, String bbsContent) {
		String SQL = "UPDATE bbs SET bbsTitle = ?, bbsContent = ? WHERE bbsID = ?";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, bbsTitle);
			pstmt.setString(2, bbsContent);
			pstmt.setInt(3, bbsID);
			return pstmt.executeUpdate();
				/* executeUpdate()
				 * 		returns either the row count for SQL DML statements
				 * 		or 0 for SQL statements that return nothing
				 */	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // DB 오류를 의미하도록
	}
	
	public int delete(int bbsID) {
		String SQL = "UPDATE bbs SET bbsAvailable = 0 WHERE bbsID = ?";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, bbsID);
			return pstmt.executeUpdate();
				/* executeUpdate()
				 * 		returns either the row count for SQL DML statements
				 * 		or 0 for SQL statements that return nothing
				 */	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // DB 오류를 의미하도록
	}
}
