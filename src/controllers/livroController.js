const fs = require("fs");
const path = require("path");
const { lerAutores } = require("./autorController"); 

const livrosFilePath = path.join(__dirname, "../livros.json");

function lerLivros() {
  try {
    const data = fs.readFileSync(livrosFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return []; 
  }
}

function salvarLivros(livros) {
  try {
    fs.writeFileSync(livrosFilePath, JSON.stringify(livros, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
  }
}

function cadastrarLivro(req, res) {
  const { titulo, autorId, anoPublicacao, isbn } = req.body;
  
  if (!titulo || !autorId || !anoPublicacao || !isbn) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const livros = lerLivros();
  const autores = lerAutores();

  const autor = autores.find(a => a.id === Number(autorId));
  
  if (!autor) {
    return res.status(400).json({ mensagem: "Autor não encontrado!" });
  }

  const novoLivro = { 
    id: livros.length + 1, 
    titulo, 
    autor,
    anoPublicacao, 
    isbn 
  };

  livros.push(novoLivro);
  salvarLivros(livros);

  res.status(201).json(novoLivro);
}
function listarLivros(req, res) {
  const livros = lerLivros();
  res.json(livros);
}

module.exports = { cadastrarLivro, listarLivros, lerLivros };
