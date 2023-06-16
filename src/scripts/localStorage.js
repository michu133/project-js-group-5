const buttonWatched = document.querySelector('.button_watched');
const buttonQueue = document.querySelector('.button_queue');

buttonWatched.addEventListener('click', addToWatched);
buttonQueue.addEventListener('click', addToQueue);

let watchedMovies = [];
let moviesInQueue = [];

if (localStorage.getItem('watchedMovies' === null)){
    watchedMovies = [];  
} else {
    watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
}

if (localStorage.getItem('moviesInQueue' === null)){
    moviesInQueue = [];  
} else {
    moviesInQueue = JSON.parse(localStorage.getItem('moviesInQueue'));
}
export  function checkLocalStorageWatched(e) {
    
}