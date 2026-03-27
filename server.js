const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// CONFIGURAÇÃO DO SUPABASE
const supabaseUrl = 'https://ftjejowrvdfmhmbipdbz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amVqb3dydmRmbWhtYmlwZGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Nzc5OTQsImV4cCI6MjA5MDE1Mzk5NH0.yAQqQ2-D6LWtqtQktRdJ9KuaIc9ksqDBlJHwPCNgtdc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ROTA PARA BUSCAR CARROS
app.get('/carros', async (req, res) => {
    const { data, error } = await supabase.from('carros').select('*');
    if (error) return res.status(500).json(error);
    res.json(data);
});

// ROTA PARA CADASTRO (LOGIN/CADASTRO)
app.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    const { data, error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha }]);

    if (error) return res.status(500).send("Erro no cadastro");
    res.send("Cadastro realizado com sucesso!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));

module.exports = app;