const fs = require("fs");
const path = require("path");

const usuariosFilePath = path.join(__dirname, "../usuarios.json");

function lerUsuarios() {
  try {
    const data = fs.readFileSync(usuariosFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler o arquivo:", error);
    return []; 
  }
}

function salvarUsuarios(usuarios) {
  try {
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
  }
}

function cadastrarUsuarios(req, res) {
  const { nome, email } = req.body;
  
  if (!nome || !email) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const usuarios = lerUsuarios();
  const novoUsuario = { id: usuarios.length + 1, nome, email };
  usuarios.push(novoUsuario);

  salvarUsuarios(usuarios);

  res.status(201).json(novoUsuario);
}

function listarUsuarios(req, res) {
  const usuarios = lerUsuarios();
  res.json(usuarios);
}

module.exports = { cadastrarUsuarios, listarUsuarios, lerUsuarios };
