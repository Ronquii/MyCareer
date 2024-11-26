// Seleciona os elementos
const openModalButton = document.getElementById('open-modal');
const closeModalButton = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const fade = document.getElementById('fade');
const registerForm = document.querySelector('#modal form'); // Seleciona o formulário de registro

// Função para abrir o modal
function openModal() {
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    fade.style.visibility = 'visible';
    fade.style.opacity = '1';
}

// Função para fechar o modal
function closeModal() {
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
    fade.style.visibility = 'hidden';
    fade.style.opacity = '0';
}

// Adiciona os eventos de clique
openModalButton.addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
fade.addEventListener('click', closeModal); // Fecha o modal ao clicar fora

// Adiciona o evento de submissão do formulário de registro
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    // Captura os valores dos campos do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email-register').value;
    const password = document.getElementById('password-register').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validação simples de senhas
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        // Faz a requisição para a API de registro
        const response = await fetch('http://localhost:8080/users/CreateUSer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Registro bem-sucedido
            alert('Registro realizado com sucesso! Agora você pode fazer login.');
            closeModal(); // Fecha o modal de registro
        } else {
            // Exibe mensagem de erro retornada pela API
            alert(data.message || 'Erro ao realizar registro.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar registrar. Tente novamente.');
    }
});

// Lógica de login
document.getElementById('btn-login').addEventListener('click', async () => {
    // Captura os valores do formulário
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        // Realiza a requisição para a rota /Login
        const response = await fetch('http://localhost:8080/auth/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login bem-sucedido
            alert(data.message);

            // Armazena o token no localStorage para usar posteriormente
            localStorage.setItem('authToken', data.token);

            // Redirecionar ou realizar outra ação
            window.location.href = 'http://127.0.0.1:5500/Web/MyCareer/empresas.html';
        } else {
            // Exibe mensagem de erro
            alert(data.message || 'Erro ao realizar login.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar realizar login. Tente novamente.');
    }
});
