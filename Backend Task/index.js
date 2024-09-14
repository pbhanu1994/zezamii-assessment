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

// Read (GET) - GET a specific user by id
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ error: `User not found with id: ${userId}` });
  }
  res.json(user);
});

// Update (PUT) - Update an existing user by id
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === parseInt(userId));
  if (!user) {
    return res.status(404).json({ error: `User not found with id: ${userId}` });
  }
  const { name, email } = req.body;
  user.name = name;
  user.email = email;
  res.json(user);
});

// Delete (DELETE) - Remove a user by id
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  users = users.filter((u) => u.id !== parseInt(userId));
  res.status(204).end();
});

// Starting the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
