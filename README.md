
# EcoWear
#### Deployed link :  https://eco-wear.netlify.app/
EcoWear is a full-stack e-commerce platform for buying and selling second-hand clothes. It allows users to create posts, upload images of clothing items, and browse, purchase, or comment on listings. The project is built using the MERN stack with a focus on efficiency, security, and scalability.

## Features
#### User Authentication & Authorization: 

Users can sign up, log in, and securely manage their accounts using JWT tokens for authentication, which are stored as HTTP cookies.

Middleware ensures secure API access.

#### Image Management:

Users can upload up to 5 images per post with real-time validation, previews, and deletion options.

GridFS is used to efficiently store and retrieve images from MongoDB.

#### Product Listings & CRUD Operations:

Create, read, update, and delete (CRUD) operations for products, with real-time data updates on the client side.

Each post includes details like clothing type, size, price, description, and uploaded images.

#### User-specific Homepages:

After logging in, users are greeted with personalized content and have the ability to edit their profiles.

#### Responsive Design:

Built with Chakra UI to ensure a seamless experience across all devices, including mobile, tablet, and desktop.
## Tech Stack

**Front-End :** React.js with Chakra UI for component-based, responsive design.

**Back-End :** Node.js and Express.js to handle authentication, business logic, and routing and Axios for API communication.

**Database :** MongoDB for efficient, scalable storage of user data and posts and GridFS for managing image uploads.

**Authentication & Security :** JWT tokens are used for authentication, with user sessions managed through HTTP-only cookies for secure access control.

**Deployment & Hosting :** Deployed using vercel (for backend) & netlify(for the frontend) and MongoDB Atlas for cloud-based database management.
## Screenshots

![App Screenshot](https://i.ibb.co/hZgFKZQ/ew1.png)

![App Screenshot](https://i.ibb.co/zFm0H5y/ew3.png)

![App Screenshot](https://i.ibb.co/5swSgB2/ew2.png)

![App Screenshot](https://i.ibb.co/6B9dMmQ/ew4.png)


## Installation

Clone the Repository :-

git clone https://github.com/rdrkshkhrn/EcoWear_Front.git

Navigate to the project directory : cd server

Install dependencies:
npm install

Run the application:
npm start
    
The application will run at http://localhost:3000.
## API Reference

#### Authentication
POST /signin: User login

POST /signup: User registration

POST /logout: User logout

#### Product Management
POST /posts: Create a new post

PUT /posts/:id: Edit a post

DELETE /posts/:id: Delete a post

GET /posts: Fetch all posts

#### Image Upload
POST /upload/images: Upload new product images

## Contributing

Contributions are welcome! If you'd like to contribute to the project, feel free to open a pull request or create an issue for discussion. Here's how you can contribute:

Fork the repository.

Create a new branch (git checkout -b feature-branch).

Make your changes and commit them (git commit -m 'Added new feature').

Push to the branch (git push origin feature-branch).

Create a pull request.
