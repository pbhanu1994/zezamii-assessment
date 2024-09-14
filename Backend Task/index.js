const express = require("express");
const app = express();
app.use(express.json());

// In-memory storage (array) for user data
let users = [];
let userId = 1;

/* CRUD Operation */
// Create (POST) - Add a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: userId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read (GET) - Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
