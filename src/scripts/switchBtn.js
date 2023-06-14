//switch btn
let theme = localStorage.getItem('theme') || 'light';
const btnSwitch = document.querySelector('.btn-switch');
btnSwitch.addEventListener('click', function(){
    if (theme === 'dark') {
        document.querySelector('body').classList.remove('dark');
        theme = 'light';
    } else {
        document.querySelector('body').classList.add('dark');
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);

});

if (theme === 'dark') {
    document.querySelector('body').classList.add('dark');
};