const express = require("express");
const { cadastrarAutor, listarAutores } = require("../controllers/autorController");

const router = express.Router();

router.post("/autores", cadastrarAutor);
router.get("/autores", listarAutores);

module.exports = router;