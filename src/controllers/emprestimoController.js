const fs = require("fs");
const path = require("path");
const { lerLivros } = require("./livroController"); 
const { lerUsuarios } = require("./usuarioController");

const emprestimosFilePath = path.join(__dirname, "../emprestimo.json");

function lerEmprestimos() {
  try {
    const data = fs.readFileSync(emprestimosFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return []; 
  }
}

function salvarEmprestimos(emprestimos) {
  try {
    fs.writeFileSync(emprestimosFilePath, JSON.stringify(emprestimos, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
  }
}

function cadastrarEmprestimo(req, res) {
  const { livroId, usuarioId, data_emprestimo } = req.body;
  
  if (!livroId || !usuarioId || !data_emprestimo) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const emprestimos = lerEmprestimos();
  const livros = lerLivros();
  const usuarios = lerUsuarios();

  const livro = livros.find(a => a.id === Number(livroId));
  const usuario = usuarios.find(a => a.id === Number(usuarioId));
  
  if (!livro) {
    return res.status(400).json({ mensagem: "Livro não encontrado!" });
  }
  if (!usuario) {
    return res.status(400).json({ mensagem: "Usuario não encontrado!" });
  }
  const novoEmprestimo = { 
    id: emprestimos.length + 1,
    titulo: livro.titulo,
    usuario: usuario.nome,
    data_emprestimo
  };

  emprestimos.push(novoEmprestimo);
  salvarEmprestimos(emprestimos);

  res.status(201).json(novoEmprestimo);
}
function listarEmprestimos(req, res) {
  const emprestimos = lerEmprestimos();
  res.json(emprestimos);
}

module.exports = { cadastrarEmprestimo, listarEmprestimos, lerEmprestimos };
