const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Serve arquivos da pasta public (HTML, CSS, JS)

// CONEXÃO COM O BANCO
// ATENÇÃO: 'localhost' só funciona no seu PC. 
// Para o site online, você precisará de um banco na nuvem (ex: PlanetScale ou Clever Cloud).
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '75231', 
    database: 'gocar_test'
});

// ROTA PARA BUSCAR CARROS
app.get('/carros', (req, res) => {
    db.query('SELECT * FROM carros', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// ROTA PARA CADASTRO
app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err) => {
        if (err) return res.status(500).send("Erro no cadastro");
        res.send("Cadastro realizado com sucesso!");
    });
});

// CONFIGURAÇÃO DE PORTA PARA VERCEL OU LOCAL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Necessário para a Vercel entender o roteamento do Express
module.exports = app;