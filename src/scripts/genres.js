import { listOfGenres } from './api';

export function getGenre(arrayId) {
  listOfGenres().then(arrayGenres => {
    const arr = [];
    for (const value of arrayGenres) {
      if (arrayId.includes(value.id)) {
        arr.push(value.name);
      }
    }
    if (arrayId.length > 2) {
      arr.splice(2, arr.length - 2, 'Other');
    }
    console.log(arr.toString());
    return arr.toString();
  });
}
