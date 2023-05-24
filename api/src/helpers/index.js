// genres 
const cleanGenres = (genres) => {
    return genres.map(element => element.name)
}

const cleanGenresOfDB = (db_data) => {
    // Extraemos solo los generos de los videojuegos
    let genresOfVideogames = [];
    db_data.forEach((element, i) => {
        db_data[i]["Genres"].forEach((genre, j) => {
            genresOfVideogames[i] = {
                ...genresOfVideogames[i],
                [genre.name]: db_data[i]["Genres"][j].dataValues.name
            }
        })
    });

    // modificamos el campo Genres por genres y sustituimos su valor
    for (let i = 0; i < db_data.length; i++) {
        delete db_data[i].dataValues["Genres"];
        let keys = Object.keys(genresOfVideogames[i]);
        db_data[i].dataValues["genres"] = [...keys];
    }

    return db_data;
}


// videogames 
const cleanArray = (array) => {
    return array.map(element => {
        return {
            id: element.id,
            name: element.name,
            released: element.released,
            platforms: cleanAttributePlatforms(element.platforms),
            image: element.background_image,
            rating: element.rating,
            genres: cleanGenres(element.genres),
        }
    })
}

const cleanArrayByName = (array) => {
    return array.map(element => {
        if (element.platforms && element.genres.length && element.background_image) {
            return {
                id: element.id,
                name: element.name,
                released: element.released,
                platforms: element.platforms ? cleanAttributePlatforms(element.platforms) : null,
                image: element.background_image,
                rating: element.rating,
                genres: cleanGenres(element.genres),
            }
        }
    })
}

const cleanAttributePlatforms = (platforms) => {
    return platforms.map(element => element.platform.name);
}

const cleanVideogameByID = (videogame) => {
    return {
        id: videogame.id,
        name: videogame.name,
        description: videogame.description_raw,
        released: videogame.released,
        image: videogame.background_image,
        rating: videogame.rating,
        platforms: cleanAttributePlatforms(videogame.platforms),
        genres: cleanGenres(videogame.genres)
    }
}

module.exports = {
    cleanArray,
    cleanGenres,
    cleanAttributePlatforms,
    cleanVideogameByID,
    cleanGenresOfDB,
    cleanArrayByName
}