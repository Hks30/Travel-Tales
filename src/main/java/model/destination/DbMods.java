package model.destination;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import dbUtils.*;

public class DbMods {
    
    private static StringData validate(StringData inputData) {
        StringData errorMsgs = new StringData();
        
        // Validate fields related to destination
        errorMsgs.destination_name = Validate.stringMsg(inputData.destination_name, 100, true);
        errorMsgs.country = Validate.stringMsg(inputData.country, 100, true);
        errorMsgs.description = Validate.stringMsg(inputData.description, 500, false);
        errorMsgs.image_url = Validate.stringMsg(inputData.image_url, 300, false);
        errorMsgs.visit_date = Validate.dateMsg(inputData.visit_date, false);
        errorMsgs.trip_duration = Validate.stringMsg(inputData.trip_duration, 20, false);
        errorMsgs.rating = Validate.decimalMsg(inputData.rating, false);
        errorMsgs.webUserId = Validate.integerMsg(inputData.webUserId, true);

        return errorMsgs;
    }

    public static StringData insert(StringData inputData, DbConn dbc) {
        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);

        if (errorMsgs.characterCount() > 0) {
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { 
            String sql = "INSERT INTO destination (destination_name, country, description, image_url, " +
                         "visit_date, trip_duration, rating, web_user_id) " +
                         "VALUES (?,?,?,?,?,?,?,?)";

            PrepStatement pStatement = new PrepStatement(dbc, sql);
            pStatement.setString(1, inputData.destination_name);
            pStatement.setString(2, inputData.country);
            pStatement.setString(3, inputData.description);
            pStatement.setString(4, inputData.image_url);
            pStatement.setDate(5, Validate.convertDate(inputData.visit_date));
            pStatement.setBigDecimal(6, Validate.convertDecimal(inputData.trip_duration));
            pStatement.setBigDecimal(7, Validate.convertDecimal(inputData.rating));
            pStatement.setInt(8, Validate.convertInteger(inputData.webUserId));
            

            int numRows = pStatement.executeUpdate();
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
            }
        }
        else if (errorMsgs.errorMsg.contains("foreign key")) {
            errorMsgs.errorMsg = "Invalid Destination Id - " + errorMsgs.errorMsg;
        } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
            errorMsgs.errorMsg = "That destination is already inputed - " + errorMsgs.errorMsg;
    }
} // customerId is not null and not empty string.
return errorMsgs;
}
    public static StringData update(StringData updateData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(updateData);

        // For update, we also need to check that webUserId has been supplied by the user...
        errorMsgs.destinationId = Validate.integerMsg(updateData.destinationId, true);

        if (errorMsgs.characterCount() > 0) { // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /* Useful to know the exact field names in the database... 
             * String sql =
             * "SELECT web_user_id, user_email, user_password, user_image, membership_fee, "
             * "birthday, web_user.user_role_id, user_role_type "+
             * "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
             * "ORDER BY web_user_id ";
             */

             String sql = "UPDATE destination SET destination_name = ?, country = ?, " +
             "description = ?, image_url = ?, visit_date = ?, trip_duration = ?, " +
             "rating = ?, web_user_id = ? WHERE destination_id = ?";

                PrepStatement pStatement = new PrepStatement(dbc, sql);
                pStatement.setString(1, updateData.destination_name);
                pStatement.setString(2, updateData.country);
                pStatement.setString(3, updateData.description);
                pStatement.setString(4, updateData.image_url);
                pStatement.setDate(5, Validate.convertDate(updateData.visit_date));
                pStatement.setBigDecimal(6,Validate.convertDecimal( updateData.trip_duration));
                pStatement.setBigDecimal(7, Validate.convertDecimal(updateData.rating));
                pStatement.setInt(8, Validate.convertInteger(updateData.webUserId));
                pStatement.setInt(9, Validate.convertInteger(updateData.destinationId));
                // Integer type is simple

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to
                                             // the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk
                    // sql update OR the web User id (supplied by the client side) does not exist.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Destination Id - " + errorMsgs.errorMsg;
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That Destination Name is already taken - " + errorMsgs.errorMsg;
            }

        }
        return errorMsgs;
    } // update

    public static StringData getById(DbConn dbc, String id) {
        StringData sd = new StringData();
        // This case already tested in the controller, but ("belt and suspenders")
        // we are double checking here as well.
        if (id == null) {
            sd.errorMsg = "Cannot getById (destination): id is null";
            return sd;
        }

        Integer intId;
        try {
            intId = Integer.valueOf(id);
        } catch (Exception e) {
            sd.errorMsg = "Cannot getById (destination): URL parameter 'id' can't be converted to an Integer.";
            return sd;
        }
        try {
            String sql = "SELECT destination_id, destination_name, country, description, image_url, visit_date, trip_duration, rating, "
                    + "user_image, destination.web_user_id, user_email "
                    + "FROM web_user, destination WHERE destination.web_user_id = web_user.web_user_id "
                    + "AND destination_id = ?";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the
            // the first (and only) ?
            stmt.setInt(1, intId);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.destinationId = Format.fmtInteger(results.getObject("destination_id"));
                sd.destination_name = Format.fmtString(results.getObject("destination_name"));
                sd.country = Format.fmtString(results.getObject("country"));
                sd.description = Format.fmtString(results.getObject("description"));
                sd.image_url = Format.fmtString(results.getObject("image_url"));
                sd.visit_date = Format.fmtDate(results.getObject("visit_date"));
                sd.trip_duration = Format.fmtString(String.valueOf(results.getObject("trip_duration")));
                sd.rating = Format.fmtString(String.valueOf(results.getObject("rating")));
                sd.webUserId = Format.fmtInteger(results.getObject("web_user_id"));
                sd.userEmail = Format.fmtString(results.getObject("user_email"));
                sd.userImage = Format.fmtString(results.getObject("user_image"));

            } else {
                sd.errorMsg = "Destination Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in model.destination.DbMods.getById(): " + e.getMessage();
        }
        return sd;
    } // getById
    public static StringData delete(DbConn dbc, String destinationId) {

        StringData sd = new StringData();

        if (destinationId == null) {
            sd.errorMsg = "modeldestination.DbMods.delete: " +
                    "cannot delete destination record because 'destinationId' is null";
            return sd;
        }

        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() > 0) { // cannot proceed, db error
            return sd;
        }

        try {

            String sql = "DELETE FROM destination WHERE destination_id = ?";

            // Compile the SQL (checking for syntax errors against the connected DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, destinationId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                sd.errorMsg = "Record not deleted - there was no record with destinationId " + destinationId;
            } else if (numRowsDeleted > 1) {
                sd.errorMsg = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            if (e.getMessage().contains("foreign key")) {
                sd.errorMsg = "This destination cannot be deleted because it has related records. " + e.getMessage();
            } else {
                sd.errorMsg = "Exception thrown in model.destination.DbMods.delete(): " + e.getMessage();
            }
        }

        return sd;
    }//delete

}
