// server.js
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '75231', 
    database: 'gocar_test'
});

db.connect((err) => {
    if (err) {
        console.error('ERRO AO CONECTAR NO BANCO:', err.message);
    } else {
        console.log('Conectado ao banco de dados MySQL!');
    }
});

app.get('/carros', (req, res) => {
    db.query('SELECT * FROM carros', (err, results) => {
        if (err) {
            console.error("Erro na consulta /carros:", err);
            return res.status(500).send(err);
        }
        console.log(`Consulta realizada: ${results.length} carros encontrados.`);
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});