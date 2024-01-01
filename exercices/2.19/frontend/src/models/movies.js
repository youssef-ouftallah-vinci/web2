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

async function addOneMovie (movie) {
    const options = {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch('/api/films', options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const newFilm = await response.json();

    console.log('New film added : ', newFilm);
};

async function deleteOneMovie(id){
    const options = {
        method: 'DELETE',
    };

    const response = await fetch(`/api/films/${id}`, options);

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const deletedFilm = await response.json();

    console.log('Deleted film : ', deletedFilm);

}

export { readAllMovies, addOneMovie, deleteOneMovie };
