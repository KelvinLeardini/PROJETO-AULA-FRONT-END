// 1. Importa o módulo 'express', que é o framework responsável por criar e gerenciar o servidor web
const express = require('express');

// 2. Importa o módulo 'path' (nativo do Node.js), usado para lidar com caminhos de pastas e arquivos no sistema
const path = require('path');

// 3. Inicializa a aplicação do Express chamando a função e armazenando na variável 'app'
const app = express();

// 4. Configura o Express para servir arquivos estáticos (HTML, CSS, JS, imagens)
// 'path.join(__dirname, 'public')' junta o caminho da pasta atual (__dirname) com a pasta 'public',
// fazendo com que tudo dentro de 'public' seja acessível direto na raiz do navegador
app.use(express.static(path.join(__dirname, 'public')));

// 5. Inicia o servidor e o coloca para escutar as requisições na porta 3000.
// A função de callback exibe a mensagem no terminal assim que o servidor estiver rodando
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});