import { getMovieTrailer, getBySearch, getInfoAboutMovie } from './api';
import noimage from '../images/header-main/noimage.jpg';
import { mainGallery } from './main-body';
import { getGenre } from './genres';
import { add_click_effect_to_card } from './main-body';

export const mainGallery = document.querySelector('.gallery');
export const input = document.querySelector('.search-input');
const modalCard = document.querySelector('.modal');
const movie = document.querySelector('.movie');
const searchForm = document.querySelector('.search-form');
const modal = document.querySelector('.modal');

searchForm.addEventListener('submit', showResultsOnSearch);

export function add_click_effect_to_card(cards) {
  cards.forEach(card => {
    card.addEventListener('click', () => showPopUp(card));
  });
}
export async function showPopUp(card) {
  modalCard.classList.add('show-popup');
  const movieId = card.getAttribute('data-movie');
  const movie = await getInfoAboutMovie(movieId);
  const movieTrailer = await getMovieTrailer(movieId);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : noimage;
  modal.innerHTML = `<span class="modal__closeBtn" type="button">x</span>
  <div class="modal__info">
    <div class="container_imag">
      <img
        class="img"
        src="${poster}"
        alt="${movie.title}"
      />
      <div class="info_text">
        <h1 class="info_title">${movie.title}</h1>
        <div class="info_movie">
          <div class="info_name">
            <p class="name">Vote / Votes</p>
            <p class="name">Popularity</p>
            <p class="name">Original Title</p>
            <p class="name">Genre</p>
          </div>
          <div class="info_value">
            <p class="value">
              <span class="value">${
                movie.vote_average
              }</span>/<span class="value">${movie.vote_count}</span>
            </p>
            <p class="value">${movie.popularity}</p>
            <p class="value">${movie.original_title}</p>
            <p class="value">${getGenre(movieId)}</p>
          </div>
          <h2 class="about">About</h2>
          <p class="about_text">
            ${movie.overview}
          </p>
          <ul class="button">
            <li class="button_item">
              <button class="button_watched" type="button">
                ADD TO WATCHED
              </button>
            </li>
            <li class="button_item">
              <button class="button_queue" type="button">ADD TO QUEUE</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;
  const modalCloseBtn = document.querySelector('.modal__closeBtn');
  modalCloseBtn.addEventListener('click', () =>
    modalCard.classList.remove('show-popup')
  );
}

async function showResultsOnSearch(e) {
  e.preventDefault();
  const query = input.value;
  const data = await getBySearch(query);
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
  add_click_effect_to_card(cards);
}
async function showResultsById(id) {
  e.preventDefault();
  const query = input.value;
  const data = await getInfoAboutMovie({ query });
}

async function showTrailer(id) {
  e.preventDefault();
  const query = input.value;
  const data = await getMovieTrailer({ query });
}
