const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//rota de cadastro

app.post('/register', (req, res) => {
    const { nome, email, senha } = req.body;

    bcrypt.hash(senha, 10,(err, hash) => {
        if(err) return res.status(500).json({ Error: 'erro ao criptografar senha'})
    
    const sql = 'INSERT INTO users (nome, email, senha) VALUES (?,?,?)';
    db.query(sql, [nome, email, hash], (err) => {
        if (err) return res.status(500).json({ Error: 'Erro ao cadastrar usuário'});
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!'});
    })
    })
})

//rota de login

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json({ Error: 'Erro no login'});
        if (results.length === 0) return res.status(401).json({ Error: 'Usuário não encontrado'});

        const user = results[0];

    bcrypt.compare(senha, user.senha, (err, match) => {
        if (err) return res.status(500).json({ Error: 'Erro ao verificar senha'});
        if (!match) return res.status(401).json({ Error: 'Senha incorreta'});

        res.json({ message: 'Login realizado com sucesso!'})
    })
    })
})

//sobe servidor

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}')
})