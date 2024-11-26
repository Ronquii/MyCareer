const carousel = document.querySelector('.carousel');
const boxes = document.querySelectorAll('.box');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

function showBox(index) {
  const boxWidth = boxes[0].offsetWidth;
  carousel.style.transform = `translateX(${-index * boxWidth}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentIndex < boxes.length - 1) {
    currentIndex++;
    showBox(currentIndex);
  }
});

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    showBox(currentIndex);
  }
});
