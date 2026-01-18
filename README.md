🌍 WanderLust

WanderLust is a full-stack Travel-Tech web application inspired by Airbnb, built for browsing, creating, managing, and reviewing property listings.
It features a responsive UI, secure authentication, image uploads, interactive maps, and a scalable backend following modern best practices.

🚀 Live Demo

🔗 Deployed Application:
👉https://wanderlust-5y6a.onrender.com/listings

✨ Features
🔐 User Authentication & Authorization

Secure Login & Signup using Passport-Local

Role-based access control

Only listing owners can edit or delete their listings

Review ownership checks to prevent unauthorized actions

🏠 Property Listings (Full CRUD)

Create, view, update, and delete property listings

Protected routes with authorization middleware

Server-side rendering for fast and SEO-friendly pages

🖼️ Image Uploads (Cloudinary)

Upload property images directly to Cloudinary

Secure cloud storage with optimized image delivery

Multiple images supported per listing

Automatic image handling during listing update & deletion

🗺️ Maps & Geolocation (LocationIQ API)

Interactive maps integrated using LocationIQ

Automatic geocoding of listing locations

Map markers displayed for each property

Improves user experience and location clarity

⭐ Review & Rating System

Authenticated users can add reviews & ratings

Ownership validation for review deletion

Clean and structured review UI

🔔 Flash Messages

Instant success & error feedback

Implemented using connect-flash and Bootstrap alerts

✅ Data Validation with Joi

Schema-based request validation

Protects against invalid or malicious data

Centralized validation logic

⚠️ Centralized Error Handling

Custom error-handling middleware

Consistent server-side error responses

User-friendly error messages on the client side

📱 Responsive & Dynamic UI

Built with HTML, CSS, JavaScript, EJS & Bootstrap

Fully responsive across devices

Clean and intuitive user interface

🗄️ Scalable Backend & Database

RESTful backend powered by Node.js & Express

MongoDB for efficient and scalable data storage

Mongoose schemas with relationships and middleware

🛠️ Tech Stack
Frontend

HTML

CSS

JavaScript

EJS

Bootstrap

Backend

Node.js

Express.js

Passport-Local

Joi

connect-flash

Database

MongoDB

Cloud & APIs

Cloudinary – Image upload & storage

LocationIQ API – Maps & geocoding

Render – Deployment & hosting

🚧 Work in Progress

Advanced search & filters

Wishlist / favorites feature

Improved map interactions

Performance & security optimizations
