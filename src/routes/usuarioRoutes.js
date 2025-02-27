const express = require("express");
const { cadastrarUsuarios, listarUsuarios } = require("../controllers/usuarioController");

const router = express.Router();

router.post("/usuarios", cadastrarUsuarios);
router.get("/usuarios", listarUsuarios);

module.exports = router;