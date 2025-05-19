const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let users = [
  { id: 1, name: 'Lucio Corsi', email: 'lucio.corsi@example.com' },
  { id: 2, name: 'Federico Lucia', email: 'federico.lucia@example.com' },
  { id: 3, name: 'Luis Sal', email: 'luis.sal@example.com' }
];


app.get('/', (req, res) => {
  res.json({ message: 'Benvenuto nella REST API di esempio' });
});


app.get('/api/users', (req, res) => {
  res.json(users);
});


app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'Utente non trovato' });
  }
  
  res.json(user);
});


app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome ed email sono obbligatori' });
  }
  
  const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  const newUser = { id: newId, name, email };
  
  users.push(newUser);
  res.status(201).json(newUser);
});


app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Nome ed email sono obbligatori' });
  }
  
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Utente non trovato' });
  }
  
  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Utente non trovato' });
  }
  
  const deletedUser = users[userIndex];
  users = users.filter(user => user.id !== id);
  
  res.json({ message: 'Utente eliminato con successo', user: deletedUser });
});


app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});