# 🎮 Keep Keys - Loja Gamer

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=flat&logo=javascript&logoColor=F7DF1E)

O **Keep Keys** é uma plataforma de e-commerce focada na venda de chaves de jogos digitais. Desenvolvido como projeto acadêmico para o curso de **Análise e Desenvolvimento de Sistemas (ADS)**, o sistema simula a experiência completa de uma loja virtual, com carrinho de compras, sistema de busca dinâmica e autenticação, tudo operando no lado do cliente.

## 🚀 Funcionalidades

- **Vitrine e Busca Dinâmica:** Filtragem em tempo real de jogos através da barra de pesquisa.
- **Carrinho de Compras Inteligente:** Adição e remoção de itens com cálculo automático de valores. Os dados do carrinho são persistidos no navegador utilizando `localStorage`.
- **Autenticação Simulada:** Sistema de Login e Cadastro com trava de segurança, impedindo que usuários não logados adicionem itens ao carrinho.
- **Painel Administrativo:** Área restrita (baseada em regra de permissões _Role-Based Access Control_) construída com integração em Vue.js para gestão do catálogo.
- **Design Responsivo:** Layout adaptável (Mobile-First) utilizando CSS Grid e Flexbox.

## 🛠️ Tecnologias Utilizadas

Este projeto prioriza a construção "na raça" dos fundamentos web, evitando frameworks pesados na interface principal de vendas:

- **HTML5:** Estrutura semântica (`<header>`, `<main>`, `<aside>`, etc).
- **CSS3:** Estilização própria com paleta Dark Mode (`#1a1a1a`, `#2a2a30`), variáveis, Grid e Flexbox.
- **JavaScript (Vanilla):** Manipulação do DOM, controle de estado, temporizadores e lógica de persistência.
- **Vue.js (via CDN):** Utilizado pontualmente para reatividade no painel administrativo.
- **Lucide Icons:** Biblioteca de ícones vetorizados em formato SVG.

## ⚙️ Como Executar o Projeto

Por se tratar de uma aplicação baseada inteiramente no Front-end sem necessidade de _build_ ou transpilação, rodar o projeto é extremamente simples:

1. Clone este repositório:
   ```bash
   git clone [https://github.com/SEU_USUARIO/keep-keys-ecommerce.git](https://github.com/SEU_USUARIO/keep-keys-ecommerce.git)
