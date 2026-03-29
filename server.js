// server.js
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// server.js
const db = mysql.createConnection({
    host: 'hopper.proxy.rlwy.net',
    user: 'root',
    password: 'dIlFtbiCvRvKmmxJTByddUXolBNcragG', 
    database: 'gocar_test',
    port: 15625, // <--- VERIFIQUE NO PAINEL DO RAILWAY SE A PORTA É ESSA MESMO
    connectTimeout: 10000,
    ssl: { rejectUnauthorized: false } 
});

db.connect((err) => {
    if (err) {
        console.error('❌ ERRO AO CONECTAR:', err.message);
    } else {
        console.log('✅ Conectado ao MySQL do Railway!');
    }
});

// Suas rotas (/carros, /cadastro) continuam IGUAIS aqui abaixo...

app.get('/carros', (req, res) => {
    db.query('SELECT * FROM carros', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;
    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err) => {
        if (err) return res.status(500).send("Erro no cadastro");
        res.send("Cadastro realizado com sucesso!");
    });
});

// IMPORTANTE: O Railway define a porta sozinho
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});