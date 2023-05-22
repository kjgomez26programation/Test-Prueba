## Notes Application

Welcome to the Notes application! This project is a small React-based application that allows you to perform operations such as creating, deleting, and editing notes.

### Features

- Create a new note with a title, description, and importance level (High, Medium, Low).
- List all available notes for all users.
- User authentication with a simple login system.
- Route protection for note creation and listing, accessible only to authenticated users.
- Users can only edit and delete their own notes.
- Utilization of Material UI for component styling.
- Route management with React Router DOM.
- Storage of users and notes using JSON Server.
- Implementation of React Context for data management.

### Installation

1. Clone this repository to your local machine.
2. Open a terminal and navigate to the server folder using the following command: `cd server`
3. Run the command `npm install` to install the dependencies.
4. Execute the command `node server.js` to start the server.
5. Open a new terminal and navigate to the client folder using the following command: `cd client`
6. Run the command `npm install` to install the dependencies.
7. Execute the command `npm run dev` to start the application.
8. Copy the provided HTTP address from the console and paste it into your browser.

### Usage

1. Access the homepage.
2. Register as a new user or log in if you already have an account.
3. Once authenticated, you can create new notes and view the list of all notes.
4. You can only edit and delete notes that you have created.
5. To log out, use the corresponding option in the navigation bar.
