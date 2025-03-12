package com.sample;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import model.webUser.*;
import dbUtils.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class AuthController {

    @PostMapping(value = "/api/login", produces = "application/json")
    public String login(HttpServletRequest request, @RequestBody LoginRequest loginRequest) {
        StringData sd = new StringData();
        DbConn dbc = new DbConn();

        try {
            // SQL to find user by email and password
            String sql = "SELECT web_user_id, user_email, user_password, user_image, membership_fee, " +
                        "birthday, web_user.user_role_id, user_role_type " +
                        "FROM web_user " +
                        "JOIN user_role ON web_user.user_role_id = user_role.user_role_id " +
                        "WHERE user_email = ? AND user_password = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            stmt.setString(1, loginRequest.getEmail());
            stmt.setString(2, loginRequest.getPassword());

            ResultSet results = stmt.executeQuery();
            
            if (results.next()) {
                // User found - create session
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sd.userImage = Format.fmtString(results.getObject("user_image"));
                sd.birthday = Format.fmtDate(results.getObject("birthday"));
                sd.membershipFee = Format.fmtDollar(results.getObject("membership_fee"));
                sd.userRoleId = Format.fmtInteger(results.getObject("user_role_id"));
                sd.userRoleType = Format.fmtString(results.getObject("user_role_type"));
                
                // Store user in session
                HttpSession session = request.getSession();
                session.setAttribute("currentUser", sd);
                
                sd.errorMsg = ""; // Clear any error message
            } else {
                sd.errorMsg = "Invalid email or password";
            }
            
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Error during login: " + e.getMessage();
        } finally {
            dbc.close();
        }

        return Json.toJson(sd);
    }
    @GetMapping(value = "/api/profile", produces = "application/json")
    public String getProfile(HttpServletRequest request) {
        StringData sd = new StringData();
        HttpSession session = request.getSession(false); // Get existing session, if it exists
    
        if (session != null && session.getAttribute("currentUser") != null) {
            sd = (StringData) session.getAttribute("currentUser");
        } else {
            sd = new StringData();
            sd.errorMsg = "Cannot show profile because you are not logged in.";
        }
    
        return Json.toJson(sd);
    }
    @PostMapping("/api/logoff")
    public ResponseEntity<StringData> logoff(HttpServletRequest request) {
        StringData responseMessage = new StringData();
        
        try {
            HttpSession session = request.getSession(false); // Get existing session without creating new one
            if (session != null) {
                session.invalidate(); // Invalidate the session if it exists
            }
            responseMessage.errorMsg = "User is now logged off";
            return ResponseEntity.ok(responseMessage);
        } catch (Exception e) {
            responseMessage.errorMsg = "Error during logoff: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseMessage);
        }
    }

    
}

// Request body class
class LoginRequest {
    private String email;
    private String password;

    // Getters and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
