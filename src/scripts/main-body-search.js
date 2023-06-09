import { getBySearch, getInfoAboutMovie, getTrending } from './api';
import { gallery } from './main-body';
import { showGallery } from './main-body';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.form-search');
const input = document.querySelector('.search-box');

function removeAll() {
  gallery.innerHTML = '';
}

searchForm.addEventListener('submit', showResultsOnSearch);

function showResultsOnSearch(e) {
  e.preventDefault();
  let page = 1;
  let query = input.value.trim();
  getBySearch({ query, page }).then(data => {
    if (data.length !== 0) {
      removeAll();
      gallery.innerHTML = showGallery(data);
    }
    if (data.length === 0 && query !== 0) {
      return Notiflix.Notify.failure('Oops, there is no movie with that name');
    }
    if (input.value === 0) {
      removeAll();
    }
    console.log(query);
  });
}
