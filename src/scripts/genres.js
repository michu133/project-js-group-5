import { genres } from './genres-list';

export function getGenre(genreId) {
  const arr = [];
  for (const value of genres) {
    if (genreId.includes(value.id)) {
      arr.push(value.name);
    }
  }
  if (genreId.length > 2) {
    arr.splice(2, arr.length - 2, 'Other');
  }
  return arr.toString();
}
