import { readAllMovies, deleteOneMovie, updateOneMovie } from '../../models/movies';

const ViewMoviePage = async () => {
  const main = document.querySelector('main');
  main.innerHTML = '<div id="movieWrapper"></div>';

  const movieWrapper = document.querySelector('#movieWrapper');

  const movies = await readAllMovies();

  const moviesAsHtmlTable = getHtmlMovieTableAsString(movies);

  movieWrapper.innerHTML = moviesAsHtmlTable;
  deleteMovie();
  updateMovie();
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
    <th scope="col">Link</th>
    <th scope="col">Duration (min)</th>
    <th scope="col">Budget (million)</th>
    <th scope="col">Operations</th>    
  </tr>
</thead>
<tbody>`;

  movies.forEach((element) => {
    htmlMovieTable += `
    <tr>
      <td contenteditable="true">${element.title}</td>
      <td contenteditable="true"><a href="${element.link}" target="_blank">${element.link}</a></td>
      <td contenteditable="true">${element.duration}</td>
      <td contenteditable="true">${element.budget}</td>
      <td> <button id="filmDelete" data-value="${element.id}">Delete</button>
      <td> <button id="filmUpdate" data-value="${element.id}">Save</button>
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

function updateMovie(){
  const buttons = document.querySelectorAll('#filmUpdate');

  buttons.forEach(button => {
    button.addEventListener('click', async(e) => {
      const {value} = e.target.dataset;
      const filmRow = e.target.parentElement.parentElement;
      const newFilm = {
        title: filmRow.children[0].innerText,
        link: filmRow.children[1].innerText,
        duration: Number(filmRow.children[2].innerHTML),
        budget: Number(filmRow.children[3].innerHTML),
      };
      await updateOneMovie(value,newFilm);
      ViewMoviePage();
    })
  });
}

export default ViewMoviePage;
