package com.sample;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import model.destination.*;
import dbUtils.*;
import view.DestinationView;

@RestController
public class DestinationController {

    @RequestMapping(value = "/destination/getAll", produces = "application/json")
    public String alldestination() {

        StringDataList list = new StringDataList(); // dbError empty, list empty
        DbConn dbc = new DbConn();
        list = DestinationView.getAllDestinations(dbc);

        dbc.close(); // EVERY code path that opens a db connection must close it
                     // (or else you have a database connection leak).

        return Json.toJson(list); // convert sdl obj to JSON Format and return that.
    }
     @RequestMapping(value = "/destination/insert", params = { "jsonData" }, produces = "application/json")
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
                if (errorMsgs.errorMsg.length() == 0) { // db connection OK
                    errorMsgs = DbMods.insert(insertData, dbc);
                }
                dbc.close();
            } catch (Exception e) {
                String msg = "Could not convert jsonData to model.destination.StringData obj: "+
                jsonInsertData+ " - or other error in controller for 'user/insert': " +
                        e.getMessage();
                System.out.println(msg);
                errorMsgs.errorMsg += ". " + msg;
            }
        }
        return Json.toJson(errorMsgs);
    }
    @GetMapping(value = "/destination/getById", params = {"destinationId"}, produces = "application/json")
    public String getById(@RequestParam("destinationId") String destinationId) {
        StringData sd = new StringData();
        if (destinationId == null) {
            sd.errorMsg = "Error: URL must include destinationId parameter";
        } else {
            DbConn dbc = new DbConn();
            sd.errorMsg = dbc.getErr();
            if (sd.errorMsg.length() == 0) {
                System.out.println("*** Ready to call DbMods.getById with ID: " + destinationId);
                sd = DbMods.getById(dbc, destinationId);
            }
            dbc.close();
        }
        return Json.toJson(sd);
    }
    @RequestMapping(value = "/destination/update", params = {"jsonData"}, produces = "application/json")
    public String update(@RequestParam("jsonData") String jsonInsertData) {
        StringData errorData = new StringData();

        if ((jsonInsertData == null) || jsonInsertData.length() == 0) {
            errorData.errorMsg = "Cannot update. No destination data was provided in JSON format";
        } else {
            System.out.println("destination data for update (JSON): " + jsonInsertData);
            try {
                ObjectMapper mapper = new ObjectMapper();
                StringData updateData = mapper.readValue(jsonInsertData, StringData.class);
                System.out.println("destination data for update (java obj): " + updateData.toString());

                DbConn dbc = new DbConn();
                errorData = DbMods.update(updateData, dbc);
                dbc.close();
            } catch (Exception e) {
                String msg = "Error processing destination update: " + e.getMessage();
                System.out.println(msg);
                errorData.errorMsg = msg;
            }
        }
        return Json.toJson(errorData);
    }
    @RequestMapping(value = "/destination/delete", params = {
        "destinationId" }, produces = "application/json")
    public String deleteById(@RequestParam("destinationId") String DeleteDestinationId) {
        StringData sd = new StringData();
        if (DeleteDestinationId == null) {
            sd.errorMsg = "Error: URL must be destination/deleteById?destinationId=xx, where " +
                    "xx is the destination_id of the destination record to be deleted.";
        } else {
            DbConn dbc = new DbConn();
            sd = DbMods.delete(dbc, DeleteDestinationId);
            dbc.close(); // EVERY code path that opens a db connection must close it
            // (or else you have a database connection leak).
        }
        return Json.toJson(sd);
    }
}