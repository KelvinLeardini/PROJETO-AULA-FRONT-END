// Aguarda o HTML carregar completamente para renderizar os ícones
document.addEventListener('DOMContentLoaded', () => {
    
    // Verifica se a biblioteca Lucide carregou antes de chamar
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

});

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
            botao.innerHTML = '<i data-lucide="shopping-cart"></i> COMPRAR';
            botao.classList.remove('adicionado');

            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

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

    const linkIrCadastro = document.getElementById('link-ir-cadastro');
    const linkIrLogin = document.getElementById('link-ir-login');
    const formCadastro = document.getElementById('form-cadastro'); 
    // Certifique-se de que const formLogin = document.getElementById('form-login'); também está lá em cima

    // Clicou em "Cadastre-se"
    if (linkIrCadastro) {
        linkIrCadastro.addEventListener('click', (e) => {
            e.preventDefault(); 
            formLogin.style.display = 'none';
            formCadastro.style.display = 'block'; // Mostra o de cadastro
        });
    }

    // Clicou em "Faça login"
    if (linkIrLogin) {
        linkIrLogin.addEventListener('click', (e) => {
            e.preventDefault();
            formCadastro.style.display = 'none';
            formLogin.style.display = 'block'; // Mostra o de login
        });
    }

    // Alterna a exibição entre Entrar x Painel do Usuário e aplica Roles
    function atualizarEstadoLogin() {
        const estaLogado = localStorage.getItem('usuarioLogado') === 'true';
        const role = localStorage.getItem('usuarioRole'); // Pega se é admin ou cliente
        
        // Captura o novo botão Admin
        const btnAdmin = document.getElementById('btn-admin-header');

        if (estaLogado) {
            if (btnEntrar) btnEntrar.style.setProperty('display', 'none', 'important');
            if (painelUsuario) painelUsuario.style.setProperty('display', 'flex', 'important');
            
            // Lógica do Administrador
            if (role === 'admin') {
                if (btnAdmin) btnAdmin.style.setProperty('display', 'inline-block', 'important');
            } else {
                // Se for cliente comum, garante que o botão admin fica escondido
                if (btnAdmin) btnAdmin.style.setProperty('display', 'none', 'important');
            }
        } else {
            // Se estiver deslogado, volta tudo ao estado inicial
            if (btnEntrar) btnEntrar.style.setProperty('display', 'inline-block', 'important');
            if (painelUsuario) painelUsuario.style.setProperty('display', 'none', 'important');
            if (btnAdmin) btnAdmin.style.setProperty('display', 'none', 'important');
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
            localStorage.removeItem('usuarioRole'); // Limpa a role
            localStorage.removeItem('usuarioNome'); // Limpa o nome
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
// Submissão do Formulário de Login
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email').value;
            const senhaInput = document.getElementById('senha').value;

            try {
                const resposta = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailInput, senha: senhaInput })
                });

                const dados = await resposta.json();

                if (dados.sucesso) {
                    localStorage.setItem('usuarioLogado', 'true');
                    localStorage.setItem('usuarioRole', dados.usuario.role);
                    localStorage.setItem('usuarioNome', dados.usuario.nome);
                    
                    atualizarEstadoLogin();

                    modal.style.display = 'none';
                    formLogin.reset();
                } else {
                    alert(dados.mensagem);
                }
            } catch (erro) {
                console.error("Erro ao fazer login:", erro);
                alert("Não foi possível conectar ao servidor.");
            }
        });
    }

    // Captura o formulário de cadastro e envia para a API
    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nomeInput = document.getElementById('nome-cadastro').value;
            const emailInput = document.getElementById('email-cadastro').value;
            const senhaInput = document.getElementById('senha-cadastro').value;

            try {
                const resposta = await fetch('/api/cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome: nomeInput, email: emailInput, senha: senhaInput })
                });

                const dados = await resposta.json();

                if (dados.sucesso) {
                    alert('Conta criada com sucesso!');
                    
                    localStorage.setItem('usuarioLogado', 'true');
                    localStorage.setItem('usuarioRole', dados.usuario.role);
                    localStorage.setItem('usuarioNome', dados.usuario.nome);
                    
                    atualizarEstadoLogin();

                    modal.style.display = 'none';
                    formCadastro.reset();
                } else {
                    alert(dados.mensagem);
                }
            } catch (erro) {
                console.error("Erro no cadastro:", erro);
                alert("Não foi possível conectar ao servidor.");
            }
        });
    }

    // Inicialização do estado visual dos botões ao carregar a página
    atualizarEstadoLogin();
});

// Seleciona os elementos do DOM (Menu Lateral)
const btnHamburguer = document.getElementById('btn-hamburguer');
const menuLateral = document.querySelector('aside');

if (btnHamburguer && menuLateral) {
    btnHamburguer.addEventListener('click', () => {
        menuLateral.classList.toggle('ativo');
    });
}

// Exemplo para o botão de comprar não acionar o link do elemento pai
document.querySelectorAll('.jogo-produtos button').forEach(botao => {
    botao.addEventListener('click', (evento) => {
        evento.stopPropagation(); // Impede que o clique suba para a tag <a> do card
        evento.preventDefault();  // Evita comportamentos indesejados de link
        
        // A sua lógica atual de adicionar ao carrinho entra aqui:
        // ...
    });
});

// ==========================================
//   LÓGICA DO CARRINHO DE COMPRAS
// ==========================================

let carrinho = JSON.parse(localStorage.getItem('keepkeys_carrinho')) || [];

document.addEventListener('DOMContentLoaded', () => {
    inicializarCarrinho();
    atualizarContadorCarrinho();
    configurarBotoesComprar();
});

function inicializarCarrinho() {
    const modalCarrinho = document.getElementById('modal-carrinho');
    const btnAbrir = document.getElementById('btn-abrir-carrinho');
    const btnFechar = document.getElementById('fechar-carrinho');

    if (!modalCarrinho) return;

    // Garante que o modal comece totalmente oculto ao carregar a página
    modalCarrinho.style.display = 'none';
    modalCarrinho.classList.remove('ativo');

    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            renderizarCarrinho();
            modalCarrinho.style.display = 'flex';
            setTimeout(() => {
                modalCarrinho.classList.add('ativo');
            }, 10);
        });
    }

    const fecharCarrinhoAnimado = () => {
        modalCarrinho.classList.remove('ativo');
        setTimeout(() => {
            modalCarrinho.style.display = 'none';
        }, 350);
    };

    if (btnFechar) {
        btnFechar.addEventListener('click', fecharCarrinhoAnimado);
    }

    modalCarrinho.addEventListener('click', (e) => {
        if (e.target === modalCarrinho) {
            fecharCarrinhoAnimado();
        }
    });
}

function configurarBotoesComprar() {
    document.querySelectorAll('.jogo-produtos button').forEach((botao) => {
        botao.addEventListener('click', (evento) => {
            evento.stopPropagation();
            evento.preventDefault();

            // Verifica se o usuário está logado (pode usar a mesma chave que o admin ou o login usam)
            const usuarioLogado = localStorage.getItem('usuarioLogado'); // ou 'usuarioRole', ajuste conforme a chave do seu login

            if (!usuarioLogado) {
                alert('Você precisa estar logado para adicionar itens ao carrinho!');
                // Opcional: Redirecionar para a página de login, se houver
                // window.location.href = 'login.html'; 
                return;
            }

            // Se estiver logado, continua a lógica normal de adicionar ao carrinho
            const card = botao.closest('.jogo-produtos');
            if (!card) return;

            const tituloEl = card.querySelector('h4');
            const precoEl = card.querySelector('p');
            const imagemEl = card.querySelector('img');

            if (tituloEl && precoEl && imagemEl) {
                const produto = {
                    titulo: tituloEl.innerText,
                    preco: precoEl.innerText,
                    imagem: imagemEl.getAttribute('src')
                };

                adicionarAoCarrinho(produto);

            }
        });
    });
}

function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    salvarEAtualizar();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    salvarEAtualizar();
    renderizarCarrinho();
}

function salvarEAtualizar() {
    localStorage.setItem('keepkeys_carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        contador.innerText = carrinho.length;
    }
}

function renderizarCarrinho() {
    const listaItens = document.getElementById('lista-itens-carrinho');
    const valorTotal = document.getElementById('valor-total-carrinho');

    if (!listaItens) return;

    listaItens.innerHTML = '';

    if (carrinho.length === 0) {
        listaItens.innerHTML = '<p style="text-align: center; color: #888; margin-top: 30px;">O seu carrinho está vazio.</p>';
        if (valorTotal) valorTotal.innerText = 'R$ 0,00';
        return;
    }

    let total = 0;

    carrinho.forEach((item, index) => {
        let precoNumerico = parseFloat(
            item.preco.replace('R$', '').replace('.', '').replace(',', '.').trim()
        ) || 0;

        total += precoNumerico;

        const divItem = document.createElement('div');
        divItem.className = 'item-carrinho';
        divItem.innerHTML = `
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="detalhes-item">
                <h4>${item.titulo}</h4>
                <p class="preco-item">${item.preco}</p>
            </div>
            <button type="button" class="btn-remover-item" onclick="removerDoCarrinho(${index})">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        listaItens.appendChild(divItem);
    });

    if (valorTotal) {
        valorTotal.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}