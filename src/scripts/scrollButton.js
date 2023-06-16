const scrollButton = document.querySelector('.scroll');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    scrollButton.classList.add('scroll--active');
  } else {
    scrollButton.classList.remove('scroll--active');
  }
});
