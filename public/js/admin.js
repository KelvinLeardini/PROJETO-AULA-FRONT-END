// /js/admin.js

const { createApp } = Vue;

createApp({
    data() {
        return {
            listaJogos: [],
            novoJogo: { titulo: '', preco: '', imagem: '', plataforma: '' }
        }
    },
    methods: {
        verificarAcesso() {
            const cargo = localStorage.getItem('usuarioRole');
            if (cargo !== 'admin') window.location.href = 'index.html'; 
        },
        async carregarJogos() {
            try {
                const resposta = await fetch('/api/jogos');
                this.listaJogos = await resposta.json();
            } catch (erro) {
                console.error('Erro ao carregar jogos', erro);
            }
        },
        async adicionarJogo() {
            try {
                const resposta = await fetch('/api/jogos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.novoJogo)
                });
                
                if (resposta.ok) {
                    const dados = await resposta.json();
                    this.listaJogos.push(dados.jogo); 
                    this.novoJogo = { titulo: '', preco: '', imagem: '', plataforma: '' }; 
                    setTimeout(() => lucide.createIcons(), 50);
                }
            } catch (erro) {
                alert('Erro ao salvar jogo no servidor.');
            }
        },
        async excluirJogo(id) {
            if(confirm('Tem certeza que deseja remover este jogo da loja?')) {
                try {
                    const resposta = await fetch(`/api/jogos/${id}`, { method: 'DELETE' });
                    if (resposta.ok) {
                        this.listaJogos = this.listaJogos.filter(j => j.id !== id);
                    }
                } catch (erro) {
                    alert('Erro ao excluir jogo.');
                }
            }
        },
        sairDoPainel() {
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('usuarioRole');
            localStorage.removeItem('usuarioNome');
            window.location.href = 'index.html';
        }
    },
    mounted() {
        this.verificarAcesso(); 
        this.carregarJogos();
    },
    updated() {
        lucide.createIcons();
    }
}).mount('#aplicativo');