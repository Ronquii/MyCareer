
  // carrinho_compras.js

document.addEventListener('DOMContentLoaded', function () {
  // Função para atualizar o total
  function updateTotal() {
      let total = 0;
      const items = document.querySelectorAll('tbody tr');

      items.forEach(item => {
          const price = parseFloat(item.querySelector('td:nth-child(2)').innerText.replace('R$', '').trim());
          const quantity = parseInt(item.querySelector('.qty span').innerText);
          const itemTotal = price * quantity;
          item.querySelector('td:nth-child(4)').innerText = `R$ ${itemTotal.toFixed(2)}`;
          total += itemTotal;
      });

      // Atualizando subtotal e total
      const subtotal = document.querySelector('.box .info span:nth-child(2)');
      const totalPrice = document.querySelector('.box footer span:nth-child(2)');

      subtotal.innerText = `R$ ${total.toFixed(2)}`;
      totalPrice.innerText = `R$ ${total.toFixed(2)}`;
  }

  // Aumentar a quantidade de um item
  function increaseQuantity(event) {
      const quantityElement = event.target.closest('.qty').querySelector('span');
      let quantity = parseInt(quantityElement.innerText);
      quantityElement.innerText = quantity + 1;
      updateTotal();
  }

  // Diminuir a quantidade de um item
  function decreaseQuantity(event) {
      const quantityElement = event.target.closest('.qty').querySelector('span');
      let quantity = parseInt(quantityElement.innerText);

      if (quantity > 1) {
          quantityElement.innerText = quantity - 1;
          updateTotal();
      }
  }

  // Remover item do carrinho
  function removeItem(event) {
      const item = event.target.closest('tr');
      item.remove();
      updateTotal();
  }

  // Atribuindo eventos aos botões
  const increaseButtons = document.querySelectorAll('.bx-plus');
  const decreaseButtons = document.querySelectorAll('.bx-minus');
  const removeButtons = document.querySelectorAll('.remove');

  increaseButtons.forEach(button => button.addEventListener('click', increaseQuantity));
  decreaseButtons.forEach(button => button.addEventListener('click', decreaseQuantity));
  removeButtons.forEach(button => button.addEventListener('click', removeItem));

  // Inicializar total quando a página carregar
  updateTotal();
});
// Carrinho de compras JavaScript
// Carrinho de compras JavaScript

d// carrinho_compras.js

document.addEventListener('DOMContentLoaded', function () {
  // Função para finalizar a compra e exibir a mensagem
  function finalizePurchase() {
      // Cria o elemento de mensagem
      const message = document.createElement('div');
      message.className = 'finalize-message';  // A classe usada para estilizar a mensagem
      message.innerText = "Compra Finalizada!";

      // Adiciona a mensagem ao corpo da página
      document.body.appendChild(message);

      // Remover a mensagem após 3 segundos
      setTimeout(() => {
          message.remove();
      }, 3000);
  }

  // Adiciona o evento de clique ao botão "Finalizar Compra"
  const finalizeButton = document.querySelector('.finalize-purchase'); // Buscando o botão pela classe
  finalizeButton.addEventListener('click', finalizePurchase); // Adicionando o evento de clique
});
