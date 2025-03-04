const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");


const livrosPath = path.join(__dirname, "../livros.json");


function lerLivros() {
  const data = fs.readFileSync(livrosPath, "utf-8");
  return JSON.parse(data);
}


const emprestimos = [
  { livro: { id: 1 }, usuario: "João Silva", dataEmprestimo: "2023-10-01" }
];


router.get("/livros-disponiveis", (req, res) => {
  const livros = lerLivros();


  const livrosDisponiveis = livros.filter(livro => {
    return !emprestimos.some(emprestimo => emprestimo.livro.id === livro.id);
  });

 
  res.json(livrosDisponiveis);
});

module.exports = router;