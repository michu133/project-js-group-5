//const API_KEY = 'd793dd4ca6e7be6c8e5a071661ccb72e';
//onst API_URL = 'https://api.themoviedb.org/3';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer d793dd4ca6e7be6c8e5a071661ccb72e',
  },
};

export async function getBySearch({ query = '', page = '1' }) {
  await fetch(
    'https://api.themoviedb.org/3/search/movie?${query}&${page}',
    options
  )
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
export async function getAllMovies() {
  await fetch('https://api.themoviedb.org/3/trending/all/day', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
export async function getInfoAboutMovie(movieId, query) {
  fetch('https://api.themoviedb.org/3/movie/movie_id', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}
