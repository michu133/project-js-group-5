'use strict';
const footerModal = document.querySelector('.footer-modal');
const footerModalCloseBtn = document.querySelector('.footer-modal__closeBtn');
const footerModalOpenBtn = document.querySelector('#openFooterModal');

footerModalOpenBtn.addEventListener('click', (evt) => { evt.preventDefault(); footerModal.style.display = "block" });
footerModalCloseBtn.addEventListener('click', () => {
    footerModal.style.display = "none";});

window.addEventListener('click', (evt) => {
    if (evt.target == footerModal) {
    footerModal.style.display = "none"
    }
});