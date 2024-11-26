document.addEventListener('DOMContentLoaded', () => {
    const profileMenu = document.getElementById('profile-menu');
    const profileIcon = document.getElementById('profile-icon');
    const dropdown = document.getElementById('dropdown');
    const userNameSpan = document.getElementById('user-name');
    const userEmailSpan = document.getElementById('user-email');
    const loginButton = document.querySelector('.login-button');
    const profileLinks = document.getElementById('profile-links');
    const token = localStorage.getItem('authToken');

    if (token) {
        // Decodifica o token para obter os dados do usuário
        const user = parseJwt(token);

        // Oculta o botão de login e exibe o menu de perfil
        loginButton.style.display = 'none';
        profileMenu.style.display = 'flex';

        // Preenche o nome do usuário no dropdown
        userNameSpan.textContent = `${user.name || 'Usuário'}`;

        userEmailSpan.textContent = `${user.email}`;

        // Alterna o menu suspenso ao clicar na bolinha de perfil
        profileIcon.addEventListener('click', () => {
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
        });

        // Adiciona o botão de logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('authToken'); // Remove o token
            window.location.href = 'index.html'; // Redireciona para a página inicial
        });

        profileIcon.addEventListener('click', () => {
            dropdown.classList.toggle('show'); // Alterna a exibição do menu suspenso
        });
        
    }
});

// Função para decodificar o JWT
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return {};
    }
}
