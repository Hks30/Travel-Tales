package view;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import model.destination.StringData;
import model.destination.StringDataList;
import dbUtils.*;

public class DestinationView {

    public static StringDataList getAllDestinations(DbConn dbc) {

        StringDataList sdl = new StringDataList();

        sdl.dbError = dbc.getErr();
        if (sdl.dbError.length() > 0) {
            return sdl;
        }

        StringData sd = new StringData();

        try {
            String sql = "SELECT destination.destination_id, destination.destination_name, destination.country, "
            + "destination.description, destination.image_url, destination.visit_date, "
            + "destination.trip_duration, destination.rating, "
            + "web_user.web_user_id, web_user.user_email, web_user.user_image "
            + "FROM destination "
            + "JOIN web_user ON destination.web_user_id = web_user.web_user_id "
            + "ORDER BY destination.destination_id";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                sd = new StringData();
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
                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DestinationView.getAllDestinations(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}