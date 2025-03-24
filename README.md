# Travel-Tales
# Blog Management System

A full-stack blog management application with user authentication and content management capabilities.

## Demo

![image](https://github.com/user-attachments/assets/746241bd-7361-4730-be54-27d2e5525dd2)

![image](https://github.com/user-attachments/assets/bb610417-9594-4f1c-b4a4-20573cd2703d)
![image](https://github.com/user-attachments/assets/d3c4a909-cb43-4ca9-a3f6-1579559d66ce)

## Overview
This project is a comprehensive blog management system featuring user authentication, blog post creation/editing, and responsive design. It utilizes a normalized MySQL database structure for efficient data retrieval and manipulation through RESTful APIs.

## Features

- **User Authentication**: Secure login and registration system
- **Content Management**: Create, read, update, and delete blog posts
- **Responsive Design**: Mobile-friendly user interface
- **Optimized Database**: Normalized MySQL structure with efficient foreign key relationships
- **RESTful API**: Complete CRUD operations with proper error handling

## Tech Stack

### Backend
- **Java Spring Boot**: For building robust RESTful APIs
- **MySQL**: Normalized database design
- **Maven**: Dependency management (version 3.8.7)

### Frontend
- **React**: Component-based UI development
- **React Hooks**: For efficient state management
- **CSS/Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites
- Java JDK 11 or higher
- Maven 3.8.7 or higher
- MySQL 5.7 or higher
- Node.js and npm

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory
3. Configure database connection in `application.properties`
4. Run the following commands:
   ```bash
   mvn clean install
   mvn spring-boot:run
