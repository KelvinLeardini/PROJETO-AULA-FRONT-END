const inputBusca = document.querySelector('.buscar input');
const cardsJogos = document.querySelectorAll('.jogo-produtos');

inputBusca.addEventListener('input', () => {
    const termoBusca = inputBusca.value.toLowerCase().trim();

    cardsJogos.forEach(card => {
        const tituloJogo = card.querySelector('h4').textContent.toLowerCase();

        if (tituloJogo.includes(termoBusca)) {
            // Primeiramente reexibe o elemento no layout
            card.style.display = '';
            
            // Remove a classe para iniciar a animação de "aparecer"
            setTimeout(() => {
                card.classList.remove('escondido');
            }, 10);
        } else {
            // Adiciona a classe que reduz a opacidade e o tamanho
            card.classList.add('escondido');
            
            // Espera os 300ms da animação CSS terminar antes de aplicar display: none
            setTimeout(() => {
                if (card.classList.contains('escondido')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
});



// Seleciona todos os botões COMPRAR dos cards
const botoesComprar = document.querySelectorAll('.jogo-produtos button');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', () => {
        // Altera o texto e aplica a cor verde
        botao.textContent = 'ADICIONADO!';
        botao.classList.add('adicionado');

        // Volta ao estado original depois de 1.5 segundo
        setTimeout(() => {
            botao.textContent = 'COMPRAR';
            botao.classList.remove('adicionado');
        }, 1500);
    });
});



// Seleciona os elementos do carrossel
const slides = document.querySelectorAll('.carrocel-container .slide');
const btnAnterior = document.querySelector('.btn-carrocel.anterior');
const btnProximo = document.querySelector('.btn-carrocel.proximo');

let slideAtual = 0;
let temporizadorCarrocel;

function mostrarSlide(indice) {
    // Garante rotação contínua (volta ao início ou vai ao final)
    if (indice >= slides.length) slideAtual = 0;
    else if (indice < 0) slideAtual = slides.length - 1;
    else slideAtual = indice;

    // Atualiza a classe ativo
    slides.forEach((slide, i) => {
        slide.classList.toggle('ativo', i === slideAtual);
    });
}

function proximoSlide() {
    mostrarSlide(slideAtual + 1);
}

function anteriorSlide() {
    mostrarSlide(slideAtual - 1);
}

// Inicia temporizador automático (a cada 5 segundos)
function iniciarAutoPlay() {
    temporizadorCarrocel = setInterval(proximoSlide, 5000);
}

function reiniciarAutoPlay() {
    clearInterval(temporizadorCarrocel);
    iniciarAutoPlay();
}

// Eventos dos botões
if (btnProximo && btnAnterior) {
    btnProximo.addEventListener('click', () => {
        proximoSlide();
        reiniciarAutoPlay();
    });

    btnAnterior.addEventListener('click', () => {
        anteriorSlide();
        reiniciarAutoPlay();
    });
}


document.addEventListener('DOMContentLoaded', () => {
    // Captura dos elementos
    const modal = document.getElementById('modal-login');
    const btnEntrar = document.getElementById('btn-entrar-header');
    const btnSair = document.getElementById('btn-sair-header');
    const painelUsuario = document.getElementById('painel-usuario');
    const btnFechar = document.querySelector('.fechar-modal');
    const formLogin = document.getElementById('form-login');

    // Alterna a exibição entre Entrar x Painel do Usuário
    function atualizarEstadoLogin() {
        const estaLogado = localStorage.getItem('usuarioLogado') === 'true';

        if (estaLogado) {
            // Esconde o botão Entrar e mostra o Painel
            btnEntrar.style.setProperty('display', 'none', 'important');
            painelUsuario.style.setProperty('display', 'flex', 'important');
        } else {
            // Mostra o botão Entrar e esconde o Painel completamente
            btnEntrar.style.setProperty('display', 'inline-block', 'important');
            painelUsuario.style.setProperty('display', 'none', 'important');
        }
    }

    // Ações dos botões
    if (btnEntrar && modal) {
        btnEntrar.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (btnSair) {
        btnSair.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            atualizarEstadoLogin();
        });
    }

    if (btnFechar && modal) {
        btnFechar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Submissão do Formulário de Login
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            localStorage.setItem('usuarioLogado', 'true');
            atualizarEstadoLogin();

            modal.style.display = 'none';
            formLogin.reset();
        });
    }

    // Inicialização
    atualizarEstadoLogin();
});