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

  // Validação de campos obrigatórios
  if (!livroId || !usuarioId || !data_emprestimo) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando!" });
  }

  // Ler os dados dos empréstimos, livros e usuários
  const emprestimos = lerEmprestimos();
  const livros = lerLivros();
  const usuarios = lerUsuarios();

  // Encontrar o livro e o usuário
  const livro = livros.find(a => a.id === Number(livroId));
  const usuario = usuarios.find(a => a.id === Number(usuarioId));

  // Verificar se o livro existe
  if (!livro) {
    return res.status(400).json({ mensagem: "Livro não encontrado!" });
  }

  // Verificar se o usuário existe
  if (!usuario) {
    return res.status(400).json({ mensagem: "Usuário não encontrado!" });
  }

  // Criar o novo empréstimo
  const novoEmprestimo = {
    id: emprestimos.length + 1,    // Gera um novo ID baseado no tamanho do array
    livroId: livro.id,            // ID do livro
    livroTitulo: livro.titulo,    // Título do livro
    usuarioId: usuario.id,       // ID do usuário
    usuarioNome: usuario.nome,   // Nome do usuário
    data_emprestimo              // Data do empréstimo
  };

  // Adicionar o novo empréstimo ao array
  emprestimos.push(novoEmprestimo);

  // Salvar os empréstimos no arquivo
  salvarEmprestimos(emprestimos);

  // Responder com o empréstimo criado
  res.status(201).json(novoEmprestimo);
}

function listarEmprestimos(req, res) {
  const emprestimos = lerEmprestimos();
  res.json(emprestimos);
}

module.exports = { cadastrarEmprestimo, listarEmprestimos, lerEmprestimos };
