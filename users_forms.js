document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('user-forms-container');
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Usuário não autenticado. Faça login para continuar.');
        window.location.href = 'index.html';
        return;
    }


    const user = parseJwt(token);
    const userId = user.id;

    try {
        const response = await fetch(`http://localhost:8080/users/${userId}/forms`, {
            method: 'GET',
        });

        if (response.ok) {
            const { forms } = await response.json(); 

            if (forms.length === 0) {
                container.innerHTML = '<p>Nenhum formulário encontrado.</p>';
                return;
            }

            forms.forEach(form => {
                const card = document.createElement('div');
                card.className = 'user-card';

                const avatar = document.createElement('div');
                avatar.className = 'user-avatar';
                avatar.textContent = form.user.name.charAt(0);

                const info = document.createElement('div');
                info.className = 'user-info';

                const name = document.createElement('div');
                name.className = 'user-name';
                name.textContent = form.user.name;

                const details = document.createElement('div');
                details.className = 'user-details';
                details.innerHTML = `
                    <p><strong>Telefone:</strong> ${form.telefone}</p>
                    <p><strong>Cargo:</strong> ${form.cargo}</p>
                    <p><strong>Área:</strong> ${form.area}</p>
                    <p><strong>Preferência de horário:</strong> ${form.preferenciaHorario}</p>
                    <p><strong>Desafios:</strong> ${form.desafios}</p>
                    <p><strong>Consultoria:</strong> ${form.consultoria}</p>
                `;

                info.appendChild(name);
                info.appendChild(details);
                card.appendChild(avatar);
                card.appendChild(info);

                container.appendChild(card);
            });
        } else {
            const error = await response.json();
            console.error('Erro ao buscar formulários:', error);
            alert('Erro ao carregar os formulários.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao carregar os formulários. Tente novamente mais tarde.');
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
