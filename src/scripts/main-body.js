import { getBySearch, getTrending } from './api';
const searchForm = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', showResultsOnSearch);

function showResultsOnSearch(e) {
  e.preventDefault();
  getBySearch({ query, page }).then(data => {});
}

getTrending((page = 1)).then(data => {
  gallery.insertAdjacentHTML('beforeend', showGallery(data));
});
function showGallery(movies) {
  const genres = Object.values(movies[0].genre_ids).join(',');
  return movies
    .map(
      movie =>
        `<li class="movie">
    <div class="movie__info">        
        <img class="movie__image"
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        alt="movie-title"
        loading="lazy"
        />
      <p class="movie__name">${movie.title}</p>
      <p class="movie__description">${genres} | ${movie.release_date}</p>
    </div>
  </li>`
    )
    .join('');
}
