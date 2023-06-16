import { listOfGenres } from './api';

export async function getGenre(genreId) {
  const arrOfGenres = await listOfGenres();
  const arr = [];
  for (const value of arrOfGenres.genres) {
    if (genreId.includes(value.id)) {
      arr.push(value.name);
    }
  }
  if (genreId.length > 2) {
    arr.splice(2, arr.length - 2, 'Other');
  }
  console.log(arr.toString());
  return arr.toString();
}
