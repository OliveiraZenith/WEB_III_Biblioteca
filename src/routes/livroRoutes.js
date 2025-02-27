const express = require("express");
const { cadastrarLivro, listarLivros } = require("../controllers/livroController");

const router = express.Router();

router.post("/livros", cadastrarLivro);
router.get("/livros", listarLivros);

module.exports = router;