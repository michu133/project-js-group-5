import { getMovieTrailer, getBySearch, getInfoAboutMovie } from './api';
import { showGallery } from './get-trending';
import Notiflix from 'notiflix';
import { markupModal } from './markup-modal';
import { markup } from './markup';

export const mainGallery = document.querySelector('.gallery');
export const input = document.querySelector('.search-input');
const modalCard = document.querySelector('.modal');
const movie = document.querySelector('.movie');
const searchForm = document.querySelector('.search-form');
const modal = document.querySelector('.modal');

searchForm.addEventListener('submit', showResultsOnSearch);

export function addEventToCard(cards) {
  cards.forEach(card => {
    card.addEventListener('click', () => showPopUp(card));
  });
}
export async function showPopUp(card) {
  modalCard.classList.add('show-popup');
  const movieId = card.getAttribute('data-movie');

  const movie = await getInfoAboutMovie(movieId);
  const movieTrailer = await getMovieTrailer(movieId);
  modal.innerHTML = markupModal(movie);
  const modalCloseBtn = document.querySelector('.modal__closeBtn');
  const traileModal = document.querySelector('.trailer__modal');
  const buttonTrailerClose = document.querySelector('.button_trailer-close');
  const buttonTrailer = document.querySelector('.button_trailer');
  let video = document.querySelector('.iframe');
  const trailer = document.querySelector('.trailer');
  const modalInfo = document.querySelector('.modal__info');

  buttonTrailer.addEventListener('click', () => {
    traileModal.classList.remove('trailerHiden');
    // modal.classList.remove('modal')
    modalInfo.classList.add('hidden');
    modal.classList.add('overflow');

    video.src = `https://www.youtube.com/embed/${movieTrailer}`;
  });

  trailer.addEventListener('click', () => {
    traileModal.classList.add('trailerHiden');
    modal.classList.remove('overflow');
    modalInfo.classList.remove('hidden');
    video.src = '';
  });

  buttonTrailerClose.addEventListener('click', () => {
    traileModal.classList.add('trailerHiden');
    modal.classList.remove('overflow');
    video.src = '';
  });
  modalCloseBtn.addEventListener('click', () =>
    modalCard.classList.remove('show-popup')
  );

  // Dodawanie do watched
  const buttonWatched = document.querySelector('.button__watched');
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const movieIndexInWatched = watchedMovies.indexOf(movieId);

  if (movieIndexInWatched > -1) {
    buttonWatched.innerHTML = 'DELETE FROM WATCHED';
    buttonWatched.style.backgroundColor = '#ff6b01';
  } else {
    buttonWatched.style.backgroundColor = '#fff';
  }

  buttonWatched.addEventListener('click', () => {
    addToWatched(movieId);
  });

  function addToWatched(movieId) {
    const movieIndex = watchedMovies.indexOf(movieId);

    if (movieIndex > -1) {
      // Film jest już zapisany w zakładce Watched, więc usuń go
      watchedMovies.splice(movieIndex, 1);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      buttonWatched.innerHTML = 'ADD TO WATCHED';
      buttonWatched.style.backgroundColor = '#fff';
    } else {
      // Film nie jest zapisany w zakładce Watched, dodaj go
      watchedMovies.push(movieId);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      buttonWatched.innerHTML = 'DELETE FROM WATCHED';
      buttonWatched.style.backgroundColor = '#ff6b01';
    }
  }

  // Dodawanie do Queue
  const buttonQueue = document.querySelector('.button__queue');
  const queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
  const movieIndexInQueue = queueMovies.indexOf(movieId);

  if (movieIndexInQueue > -1) {
    buttonQueue.innerHTML = 'DELETE FROM QUEUE';
    buttonQueue.style.backgroundColor = '#ff6b01';
  }

  buttonQueue.addEventListener('click', () => {
    addToQueue(movieId);
  });

  function addToQueue(movieId) {
    const movieIndex = queueMovies.indexOf(movieId);

    if (movieIndex > -1) {
      // Film jest już zapisany w zakładce Queue, więc usuń go
      queueMovies.splice(movieIndex, 1);
      localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
      buttonQueue.innerHTML = 'ADD TO QUEUE';
      buttonQueue.style.backgroundColor = '#fff';
    } else {
      // Film nie jest zapisany w zakładce Queue, dodaj go
      queueMovies.push(movieId);
      localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
      buttonQueue.innerHTML = 'DELETE FROM QUEUE';
      buttonQueue.style.backgroundColor = '#ff6b01';
    }
  }
}

async function showResultsOnSearch(e) {
  e.preventDefault();
  const query = input.value;
  const data = await getBySearch(query);
  if (data.length === 0) {
    showGallery();
    return Notiflix.Notify.failure('Oops, there is no movie with that name');
  }
  mainGallery.innerHTML = markup(data);
  const cards = document.querySelectorAll('.card');
  addEventToCard(cards);
}
