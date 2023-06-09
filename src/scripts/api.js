const API_KEY = `d793dd4ca6e7be6c8e5a071661ccb72e`;
const API_URL = `https://api.themoviedb.org/3`;
import Notiflix from 'notiflix';

export async function getBySearch({ query = '', page = '1' }) {
  const response = await fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  if (!response.ok) {
    reject(Notiflix.Notify.failure('Oops, there is no movie with that name'));
  }
  const movies = await response.json();
  return movies;
}

export async function getTrending(page = 1) {
  const response = await fetch(
    `${API_URL}/trending/all/day?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    reject(Notiflix.Notify.failure('Oops, there is no movie with that name'));
  }
  const { results: movies } = await response.json();
  return movies;
}
export async function getInfoAboutMovie(movieId, query) {
  fetch(`${API_URL}/movie?api_key=${API_KEY}&movie_id=${movieId}`).then(
    response => {
      if (!response.ok) {
        reject(
          Notiflix.Notify.failure('Oops, there is no movie with that name')
        );
      }
      return response.json();
    }
  );
}
