import { getGenre } from './genres';
import noimage from '../images/header-main/noimage.jpg';
export function markupModal(movie) {
  const genres = movie.genres.map(genre => genre.id);
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : noimage;
  return `<div class="modal__info">
<span class="modal__closeBtn" type="button">x</span>
<div class="container__img">

<button class="button_trailer" type="button" id="button_trailer"
></button>
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
  <h2 class="about">ABOUT</h2>
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
}
