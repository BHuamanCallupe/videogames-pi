const { Videogame, Genre } = require("../db");

const getVideogamesDB = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        },
        // raw: true,
        // nest: true
    });
}

const getVideogamesDBbyID = async (id) => {
    return await Videogame.findOne({ where: { id: id } });
}

const getVideogamesDBbyName = async (search) => {
    let arrayByName = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        },
        // raw: true,
        // nest: true
    });
    return arrayByName.filter(element => element.name.includes(search));
}

const createVideogame = async ({ name, description, platforms, image, released, genres, rating }) => {
    const newVideogame = await Videogame.create({ name, description, platforms, image, released, rating });

    let genresByName = [];

    genres.map((genre) => {
        genresByName.push(Genre.findOne({
            where: {
                name: genre
            }
        }))
    });

    let genresID = [];
    await Promise.all(genresByName).then(genres => {
        genres.forEach(genre => {
            genresID.push(genre.id);
        })
    })

    newVideogame.addGenres(genresID);

    return newVideogame;
}

module.exports = {
    getVideogamesDB,
    getVideogamesDBbyID,
    getVideogamesDBbyName,
    createVideogame
}