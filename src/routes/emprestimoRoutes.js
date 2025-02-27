const express = require("express");
const { cadastrarEmprestimo, listarEmprestimos } = require("../controllers/emprestimoController");

const router = express.Router();

router.post("/emprestimos", cadastrarEmprestimo);
router.get("/emprestimos", listarEmprestimos);

module.exports = router;