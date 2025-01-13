const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./assets/db.js');

app.use(cors());
app.use(bodyParser.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  res.json(user);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push({ ...newUser, id: String(users.length + 1) });
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
});

app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    res.send('User deleted');
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
