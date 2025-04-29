const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();

const PORT = 3000;

// Connessione a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/e-commerce-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Database connesso correttamente"))
.catch((error) => console.error("Errore di connessione a MongoDB:", error));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.resolve(__dirname, "public")));

// Configurazione EJS
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Modello Mongoose
const Product = require("./models/Product");

// Homepage
app.get("/", (_, res) => {
  res.render("homepage.ejs");
});

// Elenco prodotti
app.get("/products", async (_, res) => {
  try {
    const allProducts = await Product.find();
    res.render("products/index", { products: allProducts });
  } catch (err) {
    res.status(500).send("Errore nel recupero dei prodotti");
  }
});

// Form per nuovo prodotto
app.get("/products/new", (_, res) => {
  res.render("products/new");
});

// Creazione prodotto
app.post("/products/new", async (req, res) => {
  try {
    const nuovoProdotto = new Product(req.body);
    await nuovoProdotto.save();
    res.redirect("/products");
  } catch (err) {
    res.status(500).send("Errore nella creazione del prodotto");
  }
});

// Modifica prodotto (form)
app.get("/products/edit/:productId", async (req, res) => {
  const prodotto = await Product.findById(req.params.productId);
  res.render("products/edit", { product: prodotto });
});

// Salvataggio modifica prodotto
app.put("/products/:productId", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.productId, req.body);
  res.redirect("/products");
});

// Eliminazione prodotto
app.delete("/products/:productId", async (req, res) => {
  await Product.findByIdAndRemove(req.params.productId);
  res.redirect("/products");
});

// Dettaglio prodotto
app.get("/products/:productId", async (req, res) => {
  const prodotto = await Product.findById(req.params.productId);
  res.render("products/show", { product: prodotto });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Applicazione attiva su http://localhost:${PORT}`);
});
