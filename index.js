const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const Product = require('./models/Product');

// Configurazione body-parser per gestire i dati del body delle richieste
app.use(bodyParser.urlencoded({ extended: true }));

// Configurazione EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Configurazione method-override per le richieste POST, PUT e DELETE dai forms in HTML
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Configurazione dei file statici
app.use(express.static(path.join(__dirname, 'public')));

// Connessione a MongoDB
mongoose.connect('mongodb+srv://dirosariccardo06:KTnFAqGR2rKY1awz@cluster0.rmgkhnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso al database'))
  .catch(err => console.error('Impossibile connettersi al database', err));

// Definizione degli endpoints
app.get('/', (req, res) => {
  res.render('homepage.ejs');
});

// Rotte CRUD per i prodotti
// Lista prodotti
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products.ejs', { products });
  } catch (err) {
    res.status(500).send('Errore nel recupero dei prodotti');
  }
});
// Form per nuovo prodotto
app.get('/products/new', (req, res) => {
  res.render('newProduct.ejs');
});
// Creazione prodotto
app.post('/products', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    await Product.create({ name, description, price, image });
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Errore nella creazione del prodotto');
  }
});
// Form modifica prodotto
app.get('/products/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('editProduct.ejs', { product });
  } catch (err) {
    res.status(500).send('Errore nel recupero del prodotto');
  }
});
// Aggiornamento prodotto
app.put('/products/:id', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { name, description, price, image });
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Errore nell\'aggiornamento del prodotto');
  }
});
// Eliminazione prodotto
app.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send('Errore nell\'eliminazione del prodotto');
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});