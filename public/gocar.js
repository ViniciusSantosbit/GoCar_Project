// gocar.js - Localizado em: public/gocar.js

// 1. Função que busca os carros do Servidor e monta a vitrine
async function carregarCarros() {
    const grid = document.getElementById('vitrine-grid');
    
    // FEEDBACK VISUAL: Skeleton Loading
    if (grid) {
        grid.innerHTML = `
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        `;
    }

    try {
        const response = await fetch('/carros'); 
        const carros = await response.json();
        
        setTimeout(() => {
            if (!grid) return;
            grid.innerHTML = ''; 

            if (carros.length === 0) {
                grid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-secondary);">Nenhum veículo disponível no momento.</p>';
                return;
            }

            carros.forEach(carro => {
                const fotoUrl = carro.imagem ? `img/${carro.imagem}` : 'img/default-car.png';

                grid.innerHTML += `
                    <div class="car-card">
                        <div>
                            <p style="color: var(--neon-green); font-size: 11px; margin-bottom: 2px; font-weight: 600; text-transform: uppercase;">Disponível</p>
                            <p style="color: var(--text-secondary); font-size: 13px; margin: 0;">${carro.marca}</p>
                            <h3 style="margin-top: 5px;">${carro.modelo}</h3>
                            <p class="price">R$ ${carro.preco_diaria}/dia</p>
                        </div>
                        <div class="car-image-container" style="text-align: center; padding: 20px 0; height: 150px; display: flex; align-items: center; justify-content: center;">
                            <img src="${fotoUrl}" alt="${carro.modelo}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                        </div>
                        <button onclick="simularAluguel('${carro.modelo}')" class="btn-reserva" style="width: 100%; border: none; cursor: pointer;">
                            Reservar agora
                        </button>
                    </div>
                `;
            });
        }, 600);
    } catch (error) {
        if (grid) grid.innerHTML = '<p style="color: #ff4545; text-align: center; width: 100%;">Erro ao conectar com o servidor.</p>';
    }
}

// 2. Função de Notificação Premium (Toast)
function mostrarToast(mensagem) {
    let toast = document.getElementById('toast-notif');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notif';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `<span>⚡</span> ${mensagem}`;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// 3. Lógica para o Modal de Feedbacks (Comentários)
function configurarModalFeedback() {
    const btnSaibaMais = document.getElementById('btn-saiba-mais');
    const modal = document.getElementById('modal-feedback');
    const btnFechar = document.querySelector('.close-modal');

    if (btnSaibaMais && modal) {
        btnSaibaMais.onclick = (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            mostrarToast("Abrindo avaliações da comunidade...");
        };
    }

    if (btnFechar) {
        btnFechar.onclick = () => {
            modal.style.display = 'none';
        };
    }
}

// 4. Lógica para o Modal de Suporte e Contato
function configurarModalSuporte() {
    const btnSuporte = document.getElementById('btn-suporte');
    const modalSuporte = document.getElementById('modal-suporte');
    const btnFecharSuporte = document.getElementById('fechar-suporte');

    if (btnSuporte && modalSuporte) {
        btnSuporte.onclick = (e) => {
            e.preventDefault();
            modalSuporte.style.display = 'block';
            mostrarToast("Acessando Central de Apoio...");
        };
    }

    if (btnFecharSuporte) {
        btnFecharSuporte.onclick = () => {
            modalSuporte.style.display = 'none';
        };
    }
}

// 5. Função de Envio do Formulário de Suporte
function enviarSuporte(event) {
    event.preventDefault();
    
    const tipo = document.getElementById('tipo-contato').value;
    const msg = document.getElementById('mensagem-suporte').value;

    mostrarToast("Enviando sua solicitação...");

    setTimeout(() => {
        document.getElementById('modal-suporte').style.display = 'none';
        document.getElementById('form-suporte').reset();
        
        if (tipo === 'avaliacao') {
            mostrarToast("Obrigado pela sua avaliação! ⭐");
        } else {
            mostrarToast("Recebemos sua mensagem. Retornaremos em breve!");
        }
    }, 1500);
}

// 6. Função de Cadastro
async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
        mostrarToast("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch('/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        
        if (response.ok) {
            localStorage.setItem('usuarioNome', nome);
            mostrarToast(`Bem-vindo, ${nome}!`);
            setTimeout(() => location.reload(), 1500); 
        } else {
            const erro = await response.text();
            mostrarToast("Erro: " + erro);
        }
    } catch (error) {
        mostrarToast("Erro ao realizar cadastro.");
    }
}

// 7. Lógica do White Mode
function configurarTema() {
    const btnTema = document.getElementById('theme-toggle');
    if (!btnTema) return;

    btnTema.onclick = () => {
        document.body.classList.toggle('light-mode');
        const modoAtual = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('temaPreferido', modoAtual);
    };

    if (localStorage.getItem('temaPreferido') === 'light') {
        document.body.classList.add('light-mode');
    }
}

// 8. Verificar Login
function verificarLogin() {
    const nomeSalvo = localStorage.getItem('usuarioNome');
    const menu = document.querySelector('.menu');

    if (nomeSalvo && menu) {
        menu.innerHTML = `
            <li><a href="#vitrine">Veículos</a></li>
            <li><a href="#" style="color: var(--neon-green); font-weight: bold;">Olá, ${nomeSalvo}</a></li>
            <li><a href="#" onclick="logout()" style="color: #ff4545; margin-left: 15px;">Sair</a></li>
            <li><button id="theme-toggle" style="background:none; border:none; cursor:pointer; font-size: 20px;">🌓</button></li>
        `;
        
        const secaoCadastro = document.getElementById('cadastro');
        if (secaoCadastro) secaoCadastro.style.display = 'none';
        
        configurarTema();
    }
}

// 9. Simular Aluguel
function simularAluguel(modeloCarro) {
    const usuario = localStorage.getItem('usuarioNome');
    if (!usuario) {
        mostrarToast("Crie uma conta para reservar!");
        window.location.href = "#cadastro";
        return;
    }
    mostrarToast(`Reserva do ${modeloCarro} em processamento!`);
}

// 10. Logout
function logout() {
    localStorage.removeItem('usuarioNome');
    location.reload();
}

// 11. Fechamento Global de Modais (Clicar fora)
window.onclick = (event) => {
    const modalFeedback = document.getElementById('modal-feedback');
    const modalSuporte = document.getElementById('modal-suporte');
    
    if (event.target == modalFeedback) modalFeedback.style.display = 'none';
    if (event.target == modalSuporte) modalSuporte.style.display = 'none';
};

// 12. Inicialização Global
window.onload = () => {
    configurarTema(); 
    carregarCarros();
    verificarLogin();
    configurarModalFeedback();
    configurarModalSuporte();
};