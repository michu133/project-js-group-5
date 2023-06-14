import { getTrending } from './api';

export const mainGallery = document.querySelector('.gallery');

getTrending().then(data => {
  mainGallery.insertAdjacentHTML('beforeend', showGallery(data));
});
export function showGallery(movies) {
  const genres = Object.values(movies[0].genre_ids).join(',');
  const date = Object.values(movies[0].release_date).slice(0, 4).join('');
  return movies
    .map(
      movie =>
        `<li class="movie">
    <div class="movie__info">        
        <img class="movie__image"
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="movie-title"
        loading="lazy"
        href="#" data-hystmodal="#myModal"
        />
      <p class="movie__name">${movie.title}</p>
      <p class="movie__description">${genres} | ${date}</p>
    </div>
  </li>`
    )
    .join('');
}
