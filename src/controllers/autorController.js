const fs = require("fs");
const path = require("path");

const autoresFilePath = path.join(__dirname, "../autores.json");

function lerAutores() {
  try {
    const data = fs.readFileSync(autoresFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo de autores:", error);
    return [];
  }
}

function salvarAutores(autores) {
  try {
    fs.writeFileSync(autoresFilePath, JSON.stringify(autores, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo de autores:", error);
  }
}

function cadastrarAutor(req, res) {
  const { nome, nacionalidade } = req.body;

  if (!nome || !nacionalidade) {
    return res.status(400).json({ mensagem: "Nome e nacionalidade são obrigatórios!" });
  }

  const autores = lerAutores();
  const novoAutor = { id: autores.length + 1, nome, nacionalidade };
  autores.push(novoAutor);

  salvarAutores(autores);

  res.status(201).json(novoAutor);
}

function listarAutores(req, res) {
  const autores = lerAutores();
  res.json(autores);
}

module.exports = { cadastrarAutor, listarAutores, lerAutores };
