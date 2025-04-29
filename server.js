require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connessione a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.error('Errore nella connessione a MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Ciao, questa è la tua applicazione e-commerce!');
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
