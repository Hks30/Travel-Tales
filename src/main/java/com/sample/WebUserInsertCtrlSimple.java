package com.sample;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;

import dbUtils.*;
import model.webUser.*;

@RestController
public class WebUserInsertCtrlSimple {

    @RequestMapping(value = "/webUser/insertSimple", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No user data was provided in JSON format";
        } else {
            System.out.println("user data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("user data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // means db connection OK

                    /*
                     * Useful to copy field names from StringData as a reference
                     * public String webUserId = "";
                     * public String userEmail = "";
                     * public String userPassword = "";
                     * public String userPassword2 = "";
                     * public String userImage = "";
                     * public String birthday = "";
                     * public String membershipFee = "";
                     * public String userRoleId = ""; // Foreign Key
                     * public String userRoleType = ""; // joined from user_role table
                     */

                    // Validation - check each fld of insertData, placing error message into
                    // errorMsgs.
                    errorMsgs.userEmail = Validate.stringMsg(insertData.userEmail, 45, true);
                    errorMsgs.userPassword = Validate.stringMsg(insertData.userPassword, 45, true);

                    if (insertData.userPassword.compareTo(insertData.userPassword2) != 0) { // case sensative comparison
                        errorMsgs.userPassword2 = "Both passwords must match";
                    }

                    errorMsgs.userImage = Validate.stringMsg(insertData.userImage, 300, true);
                    errorMsgs.birthday = Validate.dateMsg(insertData.birthday, false);
                    errorMsgs.membershipFee = Validate.decimalMsg(insertData.membershipFee, false);
                    errorMsgs.userRoleId = Validate.integerMsg(insertData.userRoleId, true);

                    if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
                        errorMsgs.errorMsg = "Please try again";

                    } else { // all fields passed validation

                        // Start preparing SQL statement
                        String sql = "INSERT INTO web_user (user_email, user_password, user_image, membership_fee, birthday, user_role_id) "
                                + "values (?,?,?,?,?,?)";

                        // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                        // Only difference is that Sally's class takes care of encoding null
                        // when necessary. And it also System.out.prints exception error messages.
                        PrepStatement pStatement = new PrepStatement(dbc, sql);

                        // Encode string values into the prepared statement (wrapper class).
                        pStatement.setString(1, insertData.userEmail); // string type is simple
                        pStatement.setString(2, insertData.userPassword);
                        pStatement.setString(3, insertData.userImage);
                        pStatement.setBigDecimal(4, Validate.convertDecimal(insertData.membershipFee));
                        pStatement.setDate(5, Validate.convertDate(insertData.birthday));
                        pStatement.setInt(6, Validate.convertInteger(insertData.userRoleId));

                        // here the SQL statement is actually executed
                        int numRows = pStatement.executeUpdate();

                        // This will return empty string if all went well, else all error messages.
                        errorMsgs.errorMsg = pStatement.getErrorMsg();
                        if (errorMsgs.errorMsg.length() == 0) {
                            if (numRows == 1) {
                                errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to
                                                         // tell this to the user.
                            } else {
                                // probably never get here unless you forgot your WHERE clause and did a bulk
                                // sql update.
                                errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                            }
                        } else if (errorMsgs.errorMsg.contains("foreign key")) {
                            errorMsgs.errorMsg = "Invalid User Role Id";
                        } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                            errorMsgs.errorMsg = "That email address is already taken";
                        }

                    } // all fields passed validation

                } // DB connection OK
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.webUser.StringData obj: "+
                jsonInsertData+ " - or other error in controller for 'user/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }

}