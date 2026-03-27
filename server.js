const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Isso diz ao Node onde estão seus arquivos (HTML, CSS, JS do front)
app.use(express.static(path.join(__dirname, 'public')));

const supabaseUrl = 'https://ftjejowrvdfmhmbipdbz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0amVqb3dydmRmbWhtYmlwZGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Nzc5OTQsImV4cCI6MjA5MDE1Mzk5NH0.yAQqQ2-D6LWtqtQktRdJ9KuaIc9ksqDBlJHwPCNgtdc';
const supabase = createClient(supabaseUrl, supabaseKey);

// ROTA PARA BUSCAR CARROS (Ajustada para a tabela 'carro' no singular)
app.get('/api/carros', async (req, res) => {
    // Mudança importante aqui: 'carro' em vez de 'carros'
    const { data, error } = await supabase.from('carro').select('*');
    if (error) {
        console.error("Erro no Supabase:", error);
        return res.status(500).json(error);
    }
    res.json(data);
});

// ROTA PARA CADASTRO DE USUÁRIOS
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    const { data, error } = await supabase.from('usuarios').insert([{ nome, email, senha }]);
    
    if (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).send("Erro no cadastro");
    }
    res.send("Cadastro realizado com sucesso!");
});

// ESSA LINHA FAZ O SITE APARECER (Serve o index.html para qualquer outra rota)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

module.exports = app;