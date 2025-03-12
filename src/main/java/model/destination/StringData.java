package model.destination;

public class StringData {
    public String destinationId = "";     // auto-increment primary key
    public String destination_name = "";
    public String country="";
    public String description= "";
    public String image_url = "";
    public String visit_date = "";  
    public String trip_duration = "";        // not actually in the database, used by the app
    public String rating = "";
    public String webUserId = "";         // foreign key (integer), required by DB
    public String userEmail = "";
    public String userImage = "";

    public String errorMsg = "";          // not actually in the database, used by the app 
                                          // to convey success or failure.    
    public int characterCount() {
        String s = this.destinationId + this.destination_name + this.country +
                this.description + this.image_url + this.visit_date +
                this.trip_duration + this.rating + this.webUserId;
        return s.length();
    }
    public String toString() {
        return "Destination Id: " + this.destinationId
                + ", Destination Name: " + this.destination_name
                + ", Country: " + this.country
                + ", Description: " + this.description
                + ", Image URL: " + this.image_url
                + ", Visit Date: " + this.visit_date
                + ", Trip Duration: " + this.trip_duration
                + ", Rating: " + this.rating
                + ", Web User Id: " + this.webUserId;
    }
}