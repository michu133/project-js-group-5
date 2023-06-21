let themeLibrary = localStorage.getItem('theme-library') || 'light-library';
let theme = localStorage.getItem('theme') || 'light';
const btnSwitchLibrary = document.querySelector('.btn-switch-library');

btnSwitchLibrary.addEventListener('click', function () {
  if (themeLibrary === 'dark-library') {
    document.querySelector('body').classList.remove('dark-library');
    themeLibrary = 'light-library';
    theme = 'light';
  } else {
    document.querySelector('body').classList.add('dark-library');
    themeLibrary = 'dark-library';
    theme = 'dark';
  }
  localStorage.setItem('theme-library', themeLibrary);
  localStorage.setItem('theme', theme);
});

if (themeLibrary === 'dark-library') {
  document.querySelector('body').classList.add('dark-library');
}
