const watchedButton = document.getElementById('watchedButton');
const queueButton = document.getElementById('queueButton');

watchedButton.addEventListener('click', function () {
  watchedButton.classList.add('active');
  queueButton.classList.remove('active');
});

queueButton.addEventListener('click', function () {
  queueButton.classList.add('active');
  watchedButton.classList.remove('active');
});
