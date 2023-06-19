const footerModal = document.querySelector(".footer-modal");
const footerModalCloseBtn = document.querySelector(".footer-modal__closeBtn");
const footerModalOpenBtn = document.querySelector("#openFooterModal");
const footerModalIntro = document.querySelector(".footer-modal__intro");
const footerModalContent = document.querySelector(".footer-modal__content");

footerModalOpenBtn.addEventListener('click', evt => {
  evt.preventDefault();
  footerModal.classList.remove("invisible");
  setTimeout(() => {
    footerModalIntro.classList.add("invisible");
    footerModalContent.classList.remove("invisible");
  }, 2000);
});
footerModalCloseBtn.addEventListener('click', () => {
  footerModal.classList.add("invisible");
  footerModalIntro.classList.remove("invisible");
  footerModalContent.classList.add("invisible");
});

window.addEventListener('click', evt => {
  if (evt.target === footerModal) {
    footerModal.classList.add("invisible");
    footerModalIntro.classList.remove("invisible");
    footerModalContent.classList.add("invisible");
  }
});
