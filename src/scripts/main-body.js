import { getTrending } from './api';

export const mainGallery = document.querySelector('.gallery');

getTrending().then(data => {
  mainGallery.insertAdjacentHTML('beforeend', showGallery(data));
});
export function showGallery(movies) {
  return movies
    .map(movie => {
      let date = '';
      if (movie.release_date) {
        date = movie.release_date;
      } else if (movie.first_air_date) {
        date = movie.first_air_date;
      } else {
        date = `No date`;
      }
      return `<li class="movie">
    <div class="movie__info">        
        <img class="movie__image"
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="movie-title"
        loading="lazy"
        href="#" data-hystmodal="#myModal"
        />
      <p class="movie__name">${movie.title}</p>
      <p class="movie__description">${Object.values(movie.genre_ids).join(
        ','
      )} | ${date.slice(0, 4)}</p>
    </div>
  </li>`;
    })
    .join('');
}
