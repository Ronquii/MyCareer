// Selecionando os elementos do modal
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('qr_conhecer');
const closeModalBtn = document.querySelector('.close');

// Páginas do modal
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const nextPageBtn = document.getElementById('nextPage');

// Abrindo o modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Fechando o modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    resetModal();
});

// Mudando para a Página 2
nextPageBtn.addEventListener('click', () => {
    page1.style.display = 'none';
    page2.style.display = 'block';
});

// Resetando o modal para a Página 1 ao fechar
function resetModal() {
    page1.style.display = 'block';
    page2.style.display = 'none';
}

// Fechando o modal ao clicar fora dele
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        resetModal();
    }
});
