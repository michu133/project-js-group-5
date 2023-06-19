import { getInfoAboutMovie } from './api';
import { getGenre } from './genres';

const galleryIcon = document.querySelector('.movie-icon');
const galleryLibrary = document.querySelector('.gallery-library');

getWatchedFromLS();
arrayOfWatchedMovies();

function getWatchedFromLS() {
  const watched = JSON.parse(localStorage.getItem('watchedMovies'));
  return watched;
}
function getQueueFromLS() {
  const queue = JSON.parse(localStorage.getItem('queueMovies'));
  return queue;
}
async function arrayOfWatchedMovies() {
  const movies = [];
  const data = await getWatchedFromLS();
  for (let i = 0; i <= data.length; i++) {
    const movie_id = data[i];
    let movie = await getInfoAboutMovie(movie_id);
    showWatchedMovies(movie);
    movies.push(movie);
  }
  return movies;
}

function showWatchedMovies(data) {
  galleryIcon.innerHTML = '';
  let date = '';
  if (data.release_date) {
    date = data.release_date;
  } else if (data.first_air_date) {
    date = data.first_air_date;
  } else {
    date = `No date`;
  }
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : noimage;
  const genres = data.genres.map(genre => genre.id);
  galleryLibrary.innerHTML = `<li class="card tracking" data-movie="${data.id}">
    <div class="movie__info">        
      <img class="movie__image" src="https://image.tmdb.org/t/p/w500/${poster}" alt="movie-title" loading="lazy"/>
    </div>
  <p class="movie__name">${data.title}</p>
  <p class="movie__description">${getGenre(genres)} | ${date.slice(0, 4)}</p>
  </li>`;
}
