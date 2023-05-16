const { Genre } = require("../db");

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

module.exports = {
    getAllGenres,
    createGenres
}