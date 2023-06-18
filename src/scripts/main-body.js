import { getMovieTrailer, getBySearch, getInfoAboutMovie } from './api';
import noimage from '../images/header-main/noimage.jpg';
import { getGenre } from './genres';

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
  console.log(movieTrailer);
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
      <button class="button_trailer" type="button" id="button_trailer"
       > Trailer</button>
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
          
          
            <li class="button_item">
              <button class="button_watched" type="button">
                ADD TO WATCHED
              </button>
            </li>
            <li class="button_item">
              <button class="button_queue" type="button"
              onclick="trailerModal()">ADD TO QUEUE</button>
            </li>
          </ul>
        </div>
      </div>
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
  console.log(video);

  buttonTrailer.addEventListener('click', () => {
    traileModal.classList.remove('trailerHiden');
    video.src = `https://www.youtube.com/embed/${movieTrailer}`;
  });

  buttonTrailerClose.addEventListener('click', () => {
    traileModal.classList.add('trailerHiden');
    video.src = '';
  });
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
  addEventToCard(cards);
}
