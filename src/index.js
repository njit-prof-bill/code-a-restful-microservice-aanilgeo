const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
let users = [];
let userIdCounter = 1;

// POST 
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }

    const newUser = {
        id: userIdCounter++,  
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);  
});

// GET 
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
});

// PUT 
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

    user.name = name;
    user.email = email;

    res.json(user);  
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }

    users.splice(userIndex, 1);  
    res.status(204).send();  
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