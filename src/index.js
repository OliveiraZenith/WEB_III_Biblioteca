const express = require('express');
const livroRoutes = require("./routes/livroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const autorRoutes = require("./routes/autorRoutes");
const emprestimoRoutes = require("./routes/emprestimoRoutes");
const path = require("path");

const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors()); // Deve vir ANTES das rotas e do app.listen()

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use("/api", livroRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", autorRoutes);
app.use("/api", emprestimoRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});