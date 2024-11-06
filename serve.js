const express = require('express');
const http = require('http');
const path = require('path');


const app = express();
app.use('/.well-known/pki-validation', express.static(path.join(__dirname, '.well-known/pki-validation')));
app.get('/', (req, res) => {
    res.send('Servidor HTTP ativo');
});

const PORT = 80; // Porta HTTP padrão
http.createServer(app).listen(PORT, () => {
    console.log(`Servidor HTTP rodando na porta ${PORT}`);
});
