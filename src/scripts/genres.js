import { listOfGenres } from './api';

const genres = listOfGenres().then(data => data.genres);
