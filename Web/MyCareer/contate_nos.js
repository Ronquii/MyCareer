document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const token = localStorage.getItem('authToken');

    if (token) {
        const user = parseJwt(token);
        const userId = user.id; 

        if (!userId) {
            alert("ID do usuário não encontrado no token!");
            return;
        }

        form.action = `http://localhost:8080/users/${userId}/forms`;

        console.log(form.action)

        // Manipula o envio do formulário
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            // Captura os dados do formulário
            const formData = new FormData(form);
            const jsonData = {};
            formData.forEach((value, key) => {
                if (key === 'motivo_contato') {
                    jsonData['preferenciaHorario'] = value;
                } else {
                    jsonData[key] = value;
                }
            });

            console.log(jsonData)

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(jsonData),
                });

                if (response.ok) {
                    alert('Dados enviados com sucesso!');
                    form.reset(); 
                } else {
                    try {
                        const error = await response.json();
                        console.error('Erro retornado pela API:', error);
                        alert(`Erro: ${error.message || 'Erro desconhecido'}`);
                    } catch (e) {
                        console.error('Erro ao processar a resposta:', e);
                        alert('Erro inesperado ao enviar os dados. Verifique a API.');
                    }
                }
            } catch (error) {
                console.error('Erro ao enviar os dados:', error);
                alert('Erro ao conectar-se à API.');
            }
        });
    } else {
        alert('Usuário não autenticado. Faça login para continuar.');
        window.location.href = 'index.html'; 
    }
});

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
