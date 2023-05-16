const { Videogame, Genre } = require("../db");

const getVideogamesDB = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
}

const getVideogamesDBbyID = async (id) => {
    return await Videogame.findByPk(id);
}

const getVideogamesDBbyName = async (search) => {
    let arrayByName = await Videogame.findAll();
    return arrayByName.filter(element => element.name.includes(search));
}

const createVideogame = async ({ name, description, platforms, image, released, genres }) => {
    const newVideogame = await Videogame.create({ name, description, platforms, image, released });

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