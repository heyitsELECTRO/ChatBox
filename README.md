ChatBox
ChatBox is a real-time, secure and user-friendly chat web application built on the MERN stack (MongoDB, Express, React, Node.js) with Socket.IO for live messaging.

Features
User Authentication:
Enables secure registration and login with JWT. Passwords are hashed and duplicate usernames are not allowed.

Bot Prevention:
Signup uses honeypot fields and rate-limiting to block spam and bots.

Real-Time Group Chat:
Enables multi-user messaging in rooms, powered by Socket.IO.

User-Friendly Interface:
Your own messages are right-aligned in a dark bubble.
Other users messages are left-aligned in a light bubble, each with usernames.
Multi-line messages are supported and preserved.

Emoji Picker:
Users can add emojis to messages with a slick emoji picker.

Responsive Design:
Enjoy ChatBox on both desktop and mobile devices.

Black & White Modern Theme:
Minimalist, clear styling with interactive, hoverable buttons and subtle transitions.

Tech Stack used :
Frontend: React, Axios, emoji-picker-react, React Router, Socket.IO Client
Backend: Node.js, Express, Socket.IO, Mongoose, JWT, bcrypt, CORS, Helmet
Database: MongoDB