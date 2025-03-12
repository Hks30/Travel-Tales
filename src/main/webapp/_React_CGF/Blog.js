"use strict";
function Blog() {
    return (
        
        <div className="blog">
            <h1>Travel Tales Blog</h1>
            <div className="blog-entry">
            <h3>Proposed Database Table</h3>
        <p>
            Our "Destinations" table will store information about the places our users have visited.
        </p>
        
        <h3>Server Page</h3>
        <p>
            Click <a href="features" target="_blank">here</a> to see our latest featured destination!
        </p>

        
        <ul>
            <li>destination_id: Integer (auto-increment primary key)</li>
            <li>destination_name: VARCHAR(100) (unique)</li>
            <li>country: VARCHAR(50)</li>
            <li>description: TEXT</li>
            <li>image_url: VARCHAR(255)</li>
            <li>visit_date: DATE (nullable)</li>
            <li>trip_duration: INTEGER (nullable)</li>
            <li>rating: DECIMAL(3,2)</li>
            <li>user_id: INTEGER (foreign key to web_user table)</li>
        </ul>

        <h3>My Database Experience</h3>
        <p>
            I have basic experience with relational databases, including creating tables, inserting data, 
            and performing queries. I've worked with MySQL in previous coursework and am excited to 
            apply this knowledge to our travel blog project. Also, in software desigining class I worked with django database, created few users forms.
            These experiences will help me apply my knowledge in database design and web development. In this class I found MySQL little bit easy as 
            I am working with MySQLWorkbench, it really made our job easy rather than typing all the queries.
        </p>

        <h3>My Web Development Experience</h3>
        <p>
            I have some experience with HTML and CSS from previous courses and personal projects. 
            I am familiar with creating responsive layouts and styling web pages. This project will 
            be an excellent opportunity to enhance my skills and learn more about server-side programming.
        </p>

        <h3>HW 1 Home Page</h3>
        <p>
            Creating this home page was an exciting challenge. I found the HTML structure relatively easy 
            to set up. The most challenging aspect was implementing the responsive design for the titleNav. 
            I found the requirement to create a fixed header and footer particularly valuable, as it taught 
            me how to maintain important navigation elements while allowing content to scroll.
        </p>
        <h3>HW 2 Database</h3>
        <p> 
            Creating database was kind of confusing at first but as soon as I tried to get deeper into that, I understood it. Also I learned the foreign key linking thing to other table. </p>
        
        <h3>HW 3 SPA</h3>
        <p>
            This HW is the most challeging one for me also the Lab of this part was really hard and long enough to do. I have learned many react componets from  this HW.</p>
            
        <h3>HW 4 JS Components</h3>
        <p>
            The most challenging part of this homework was implementing the private display function within the reusable Make function. Ensuring that it dynamically updates the component's state based on user interactions, while also maintaining clear separation between event handling and rendering logic, proved to be complex. Balancing default parameter values with the destructured object structure required careful attention to detail to ensure seamless functionality.</p>
        
        <h3>HW 5 Web API</h3>
        <p>Understanding common database errors and how to fix them was easy.
            Setting up the Web API, especially connecting it to your own database and creating new APIs for "other" table was little bit challenging.
            I learned the importance of how to handle errors gracefully.</p>
        <p>
            <strong> User API </strong>
             click <a href="webUser/getAll" target="_blank">here</a>. 
        </p>

        <p>
            <strong>Other/Destination API </strong>
             click <a href="destination/getAll" target="_blank">here</a>.
        </p>

        <p>
            <strong>Error ListAPI </strong>
            click <a target="_blank" href="docs/API_Errors.pdf">here</a>
        </p>
        
        <h3>HW 6 Show Data & AJAX</h3>
        <p>
        For this homework, the most challenging part was implementing the sorting functionality for the table, as it required careful attention to detail in handling various data types. 
        On the other hand, the process of fetching and displaying data was relatively straightforward and highlighted the importance of clean and efficient AJAX calls in enhancing user experience. 
        Overall, mastering these concepts was crucial for creating a functional and user-friendly application.
        </p>
        
        <h3>HW 7 Logon HW </h3>
        <p>
        For this homework, the most challenging part was connecting APIs. Whereas Styling navigation and creating static components 
        were relatively straightforward, managing API requests and handling responses was more challenging.
        </p>
    
        <h3>HW 8 Insert </h3>
        <p>
        For this homework, I created a form that lets users add or update destination details. 
        The easy part was setting up the form and managing the data with React state. 
        The harder part was making sure the correct data was sent to the backend and handling like adding the information.
        Through this task, I learned how to manage form data in React, make requests to the server, and handle errors in a more complex user interface.
        </p>

        <h3>HW 9 Update </h3>
        <p>
        For this homework, I have added update icons and added client side code to update the records, which was pretty easy.
        The confusing part was to have prepopulated input fields of update icons form but I managed to figure it out.
        Overall, I felt this HW was pretty simple.
        </p>
        <h3>HW 10 Delete </h3>
        <p>
        For this homework, I have added delete icons and customize popup to delete the user and destination, which was pretty easy.
        I felt this HW was pretty simple and fastest to do from all the HWs of this course. With this course I am confident to work with
        HTML, CSS, Javascript, Database and Web APIs.
        </p>
        <p>  </p>
            </div>
        </div>
    );
}
