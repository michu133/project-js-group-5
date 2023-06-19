import { getMovieTrailer, getBySearch, getInfoAboutMovie } from './api';
import { showGallery } from './get-trending';
import noimage from '../images/header-main/noimage.jpg';
import { getGenre } from './genres';
import Notiflix from 'notiflix';

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
  const genres = movie.genres.map(genre => genre.id);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : noimage;
  modal.innerHTML = `<span class="modal__closeBtn" type="button">x</span>
  <button class="button_trailer" type="button" id="button_trailer"
  ></button>
  <div class="modal__info">
  <div class="container__img">
    <img class="img" src="${poster}" alt="${movie.title}" />
  </div>
  <div class="container__text">
    <div class="info__text">
      <h1 class="info__title">${movie.title}</h1>
    </div>
    <div class="info__movie">
      <div class="info__name">
        <p class="name">Vote / Votes</p>
        <p class="name">Popularity</p>
        <p class="name">Original Title</p>
        <p class="name">Genre</p>
      </div>
      <div class="info__value">
        <p class="value">
          <span class="value__orange">${
            movie.vote_average
          }</span> / <span class="value__white"
            >${movie.vote_count}</span
          >
        </p>
        <p class="value">${movie.popularity}</p>
        <p class="value">${movie.original_title}</p>
        <p class="value">${getGenre(genres)}</p>
      </div>
    </div>
    <h2 class="about">About</h2>
    <p class="about__text">${movie.overview}</p>
    <ul class="button">
      <li class="button__item">
        <button class="button__watched" type="button">ADD TO WATCHED</button>
      </li>
      <li class="button__item">
        <button class="button__queue" type="button">ADD TO QUEUE</button>
      </li>
    </ul>
  </div>
</div>
  <div class="trailer__modal trailerHiden ">Trailer<div class="trailer">
  <iframe class="iframe" id="iframe" frameborder="0" border="0" cellspacing="0" allowfullscreen src="" title="Youtube">
  </iframe>
  <button class="button_trailer-close">X</button></div></div>
  `;
  const modalCloseBtn = document.querySelector('.modal__closeBtn');
  const traileModal = document.querySelector('.trailer__modal');
  const buttonTrailerClose = document.querySelector('.button_trailer-close');
  const buttonTrailer = document.querySelector('.button_trailer');
  let video = document.querySelector('.iframe');
  const trailer = document.querySelector('.trailer');

  buttonTrailer.addEventListener('click', () => {
    traileModal.classList.remove('trailerHiden');
    // modal.classList.remove('modal')
    modal.classList.add('overflow');
    video.src = `https://www.youtube.com/embed/${movieTrailer}`;
  });

  trailer.addEventListener('click', () => {
    traileModal.classList.add('trailerHiden');
    modal.classList.remove('overflow');
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
    } else {
      // Film nie jest zapisany w zakładce Watched, dodaj go
      watchedMovies.push(movieId);
      localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
      buttonWatched.innerHTML = 'DELETE FROM WATCHED';
    }
  }

  // Dodawanie do Queue
  const buttonQueue = document.querySelector('.button__queue');
  const queueMovies = JSON.parse(localStorage.getItem('queueMovies')) || [];
  const movieIndexInQueue = queueMovies.indexOf(movieId);

  if (movieIndexInQueue > -1) {
    buttonQueue.innerHTML = 'DELETE FROM QUEUE';
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
    } else {
      // Film nie jest zapisany w zakładce Queue, dodaj go
      queueMovies.push(movieId);
      localStorage.setItem('queueMovies', JSON.stringify(queueMovies));
      buttonQueue.innerHTML = 'DELETE FROM QUEUE';
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
  console.log(data);
  mainGallery.innerHTML = data
    .map(movie => {
      let date = '';
      if (movie.release_date) {
        date = movie.release_date;
      } else if (movie.first_air_date) {
        date = movie.first_air_date;
      } else {
        date = `No date`;
      }
      const genre = getGenre(movie.genre_ids);
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : noimage;
      return `
    <li class="card tracking" data-movie="${movie.id}">
      <div class="movie__info">        
        <img class="movie__image" src="https://image.tmdb.org/t/p/w500/${poster}" alt="movie-title" loading="lazy"/>
      </div>
    <p class="movie__name">${movie.title}</p>
    <p class="movie__description"> ${genre}
     | ${date.slice(0, 4)}</p>
  </li>`;
    })
    .join('');
  const cards = document.querySelectorAll('.card');
  addEventToCard(cards);
}
