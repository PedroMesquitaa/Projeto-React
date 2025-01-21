# Team Manager

I created this application in React and Node.js aimed at facilitating the organization of championships and the formation of teams for online games, with several features that will help both players and organizers.🎮

## How to Run This Project

Follow the steps below to set up and run this project on your machine.

### Prerequisites

- **Node.js**: Version 18.x or 20.x (LTS recommended)
- **React**: Version 18.x
- **NPM**: Comes with Node.js
- **MongoDB Atlas**: Configured with a free account
The page will reload when you make changes.\
You may also see any lint errors in the console.

### Initial Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject

2. Install dependencies:
   ```bash
   npm install

3. Set up the database:
   - Create an account on MongoDB Atlas.<br>
   - Create a new cluster and get your connection string.<br>
   - Replace the DB_CONNECTION variable in the .env file with your MongoDB Atlas connection string:<br>
   ```bash
   DB_CONNECTION=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

4. Start the server:
   - Start the frontend, run:
   ```npm start```
   npm startl
   - Open your browser and go to:
     ```http://localhost:3000```
<br>
<br>
This project is licensed under the MIT License. © 2025 Pedro Patelli.
