// genres 
const cleanGenres = (genres, type = "") => {
    if (!type) {
        return genres.map(element => {
            return {
                name: element.name,
                id: element.id
            }
        });
    } else {
        return genres.map(element => {
            return {
                name: element.name,
            }
        });
    }
}


// videogames 
const cleanArray = (array) => {
    return array.map(element => {
        return {
            id: element.id,
            name: element.name,
            released: element.released,
            platforms: element.platforms,
            background_image: element.background_image,
            rating: element.rating,
            genres: cleanGenres(element.genres, "without ID"),
        }
    })
}

const cleanAttributePlatforms = (platforms) => {
    return platforms.map(element => element.platform.name);
}

module.exports = {
    cleanArray,
    cleanGenres,
    cleanAttributePlatforms
}