import { getBySearch } from './api';
import { mainGallery } from './main-body';
import { showGallery } from './main-body';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

function removeAll() {
  mainGallery.innerHTML = '';
}

searchForm.addEventListener('submit', showResultsOnSearch);

function showResultsOnSearch(e) {
  e.preventDefault();
  let page = 1;
  let query = input.value.trim();
  getBySearch({ query, page }).then(data => {
    if (data.length !== 0) {
      removeAll();
      mainGallery.innerHTML = showGallery(data);
    }
    if (data.length === 0 && query !== 0) {
      return Notiflix.Notify.failure('Oops, there is no movie with that name');
    }
    if (input.value === 0) {
      removeAll();
    }
  });
}
