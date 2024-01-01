import { readAllMovies, deleteOneMovie } from '../../models/movies';

const ViewMoviePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  const movies = await readAllMovies();

  const moviesAsHtmlTable = getHtmlMovieTableAsString(movies);

  movieWrapper.innerHTML = moviesAsHtmlTable;
  deleteMovie();
};

function getHtmlMovieTableAsString(movies) {
  if (movies?.length === undefined || movies.length === 0) {
    return '<p class="p-5">No movies yet : (</p>';
  }

  let htmlMovieTable = `<div class="table-responsive p-5">
  <table class="table">
<thead>
  <tr>
    <th scope="col">Title</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Budget (million)</th>    
  </tr>
</thead>
<tbody>`;

  movies.forEach((element) => {
    htmlMovieTable += `
    <tr>
      <td><a href="${element.link}" target="_blank""> ${element.title}</a></td>
      <td>${element.duration}</td>
      <td>${element.budget}</td>
      <td> <button id="filmDelete" data-value="${element.id}">Delete</button>
    </tr>
    `;
  });

  htmlMovieTable += '</tbody></table>';

  return htmlMovieTable;
}

function deleteMovie(){
  const buttons = document.querySelectorAll('#filmDelete');

  buttons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const {value} = e.target.dataset;
      await deleteOneMovie(value);
      ViewMoviePage();
    })
  });
}

export default ViewMoviePage;
