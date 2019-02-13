package dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import userinfo.User;

public class UserDAO {
	private Connection conn;
	private PreparedStatement pstmt;
	private ResultSet rs;
	
	public UserDAO() {
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
		
	public int login(String userID, String userPwd) {
		String SQL = "SELECT userPassword FROM userinfo WHERE userID = ?";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, userID);
			rs = pstmt.executeQuery();
				
			if(rs.next()) {
				if(rs.getString(1).equals(userPwd)) {						
					return 1; // "로그인 성공"을 의미하도록
				} else {
					return 0; // "비밀번호 불일치"를 의미하도록						
				}
			}
			return -1; // "아이디 없음"을 의미하도록
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // "DB 오류"를 의미하도록
	}
	
	public int join(User user) {
		String SQL = "INSERT INTO userinfo VALUES (?, ?, ?, ?, ?)";
		try {
			pstmt = conn.prepareStatement(SQL);
			pstmt.setString(1, user.getUserID());
			pstmt.setString(2, user.getUserPassword());
			pstmt.setString(3, user.getUserName());
			pstmt.setString(4, user.getUserGender());
			pstmt.setString(5, user.getUserEmail());
			return pstmt.executeUpdate();
				/* executeUpdate()
				 * 		returns either the row count for SQL DML statements
				 * 		or 0 for SQL statements that return nothing
				 */			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // "DB 오류"를 의미하도록
	}
}

