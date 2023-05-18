const { Genre, VideogameGenre } = require("../db");

const getAllGenres = async () => {
    return await Genre.findAll();
}

const createGenres = async (genres) => {
    let promisesArray = [];

    for (let index = 0; index < genres.length; index++) {
        promisesArray.push(Genre.create({ id: genres[index]["id"], name: genres[index]["name"] }));
    }

    return await Promise.all(promisesArray);
}

const getGenresByVideogameID =  async (videogameID) => {
    // buscamos los generos del videogameID
    let arrayGenres = await VideogameGenre.findAll({
        where: {
            VideogameId: videogameID
        }
    });

    // obtenemos los genreID del videogameID
    arrayGenres = arrayGenres.map( videogamegenre => {
        return videogamegenre.GenreId;
    });

    // buscamos los generos en la DB
    arrayGenres = arrayGenres.map( genreID => {
        return Genre.findByPk(genreID);
    })

    //obtenemos los generos 
    arrayGenres = await Promise.all(arrayGenres);

    //por cada genero devolveremos unicamente su name
    return arrayGenres.map( genre => {
        return genre.name;
    })
}

module.exports = {
    getAllGenres,
    createGenres,
    getGenresByVideogameID
}