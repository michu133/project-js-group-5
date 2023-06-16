let themeLibrary = localStorage.getItem('theme-library') || 'light-library';
const btnSwitchLibrary = document.querySelector('.btn-switch-library');
btnSwitchLibrary.addEventListener('click', function(){
    if (themeLibrary === 'dark-library') {
        document.querySelector('body').classList.remove('dark-library');
        themeLibrary = 'light-library';
    } else {
        document.querySelector('body').classList.add('dark-library');
        themeLibrary = 'dark-library';
    }
    localStorage.setItem('theme-library', themeLibrary);
});

if (themeLibrary === 'dark-library') {
    document.querySelector('body').classList.add('dark-library');
};