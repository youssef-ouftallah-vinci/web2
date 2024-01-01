const movies = [];

const readAllMovies = async () => {
    try{

        const response = await fetch('/api/films');

        const films = await response.json();

        return films;

    } catch(err){
        console.error('HomePage::error: ', err);
        throw err;
    }
};

const addOneMovie = (movie) => movies.push(movie);

export { readAllMovies, addOneMovie };
