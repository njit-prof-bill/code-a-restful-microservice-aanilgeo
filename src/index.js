const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// User In-Memory Storage
let users = [];
let userIdCounter = 1;

// POST /users: Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const newUser = {
        id: userIdCounter++,  // Increment the ID counter for unique ID
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);  // Return the created user
});

// GET /users/:id: Retrieve user information by their id
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
});

// PUT /users/:id: Update user information by their id
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    // Update user details
    user.name = name;
    user.email = email;

    res.json(user);  // Return updated user details
});

// DELETE /users/:id: Delete a user by their id
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }

    users.splice(userIndex, 1);  // Remove user from array
    res.status(204).send();  // No content to return
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing