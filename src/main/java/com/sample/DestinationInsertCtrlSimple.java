package com.sample;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.ObjectMapper;

import dbUtils.*;
import model.destination.*;

@RestController
public class DestinationInsertCtrlSimple {

    @RequestMapping(value = "/destination/insertSimple", params = { "jsonData" }, produces = "application/json")
    public String insert(@RequestParam("jsonData") String jsonInsertData) {

        StringData errorMsgs = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorMsgs.errorMsg = "Cannot insert. No destination data was provided in JSON format";
        } else {
            System.out.println("destination data for insert (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData insertData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("destination data for insert (java obj): " + insertData.toString());

                DbConn dbc = new DbConn();
                errorMsgs.errorMsg = dbc.getErr();
                if (errorMsgs.errorMsg.length() == 0) { // means db connection OK

                    // Validation - check each field of insertData, placing error message into errorMsgs.
                    errorMsgs.destination_name = Validate.stringMsg(insertData.destination_name, 100, true);
                    errorMsgs.country = Validate.stringMsg(insertData.country, 50, true);
                    errorMsgs.description = Validate.stringMsg(insertData.description, 300, true);
                    errorMsgs.image_url = Validate.stringMsg(insertData.image_url, 255, true);
                    errorMsgs.visit_date = Validate.dateMsg(insertData.visit_date, false);
                    errorMsgs.trip_duration = Validate.stringMsg(insertData.trip_duration, 50, false);
                    errorMsgs.rating = Validate.integerMsg(insertData.rating, false);
                    errorMsgs.webUserId = Validate.integerMsg(insertData.webUserId, true);

                    if (errorMsgs.characterCount() > 0) { // at least one field has an error
                        errorMsgs.errorMsg = "Please try again";
                    } else { // all fields passed validation

                        // Start preparing SQL statement
                        String sql = "INSERT INTO destination (destination_name, country, description, image_url, visit_date, trip_duration, rating, webUserId) "
                                   + "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

                        PrepStatement pStatement = new PrepStatement(dbc, sql);

                        // Encode string values into the prepared statement
                        pStatement.setString(1, insertData.destination_name);
                        pStatement.setString(2, insertData.country);
                        pStatement.setString(3, insertData.description);
                        pStatement.setString(4, insertData.image_url);
                        pStatement.setDate(5, Validate.convertDate(insertData.visit_date));
                        pStatement.setString(6, insertData.trip_duration);
                        pStatement.setInt(7, Validate.convertInteger(insertData.rating));
                        pStatement.setInt(8, Validate.convertInteger(insertData.webUserId));

                        // Execute the SQL statement
                        int numRows = pStatement.executeUpdate();

                        // Check for errors
                        errorMsgs.errorMsg = pStatement.getErrorMsg();
                        if (errorMsgs.errorMsg.length() == 0) {
                            if (numRows == 1) {
                                errorMsgs.errorMsg = ""; // This means SUCCESS
                            } else {
                                errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                            }
                        }

                    } // all fields passed validation

                } // DB connection OK
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.destination.DestinationData obj: " +
                        jsonInsertData + " - or other error in controller for 'destination/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }

}
