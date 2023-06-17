const myModal = new HystModal({
  linkAttributeName: 'data-hystmodal',

  //settings (optional). see API
});
import { getGenre } from './genres';
import { getInfoAboutMovie } from './api';

const modalMovie = document.querySelector('.modal');

function showInfoAboutOneMovie(movieId) {
  const movie = getInfoAboutMovie(movieId).then(data => {
    infoAboutOneMovie(data);
    return movie;
  });
}
function infoAboutOneMovie(movie) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `noposter`;
  const markup = `<div class="container_imag">
    <img
      class="img"
      src="${poster}"
      alt="${movie.name}"
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
            <span class="value">${movie.vote_average.toFixed(
              1
            )}</span>/<span class="value"
              >${movie.vote_count}</span
            >
          </p>
          <p class="value">${movie.popularity.toFixed(1)}</p>
          <p class="value">${movie.title}</p>
          <p class="value">${getGenre(movie.genres)}</p>
        </div>
        <h2 class="about">About</h2>
        <p class="about_text">
          ${movie.name}
        </p>
        <ul class="button">
          <li class="button_item">
            <button class="button_watched" type="button">
              ADD TO WATCHED
            </button>
          </li>
          <li class="button_item">
            <button class="button_queue" type="button">
              ADD TO QUEUE
            </button>
          </li>
        </ul>
      </div>
    </div>`;
  modalMovie.innerHTML = markup;
}
