const { getVideogamesAPI, getVideogamesAPIbyID, getVideogamesAPIbyName } = require("../utils/index");
const { getVideogamesDB, getVideogamesDBbyID, getVideogamesDBbyName, createVideogame } = require("../controllers/videogamesController");
const { cleanArray, cleanAttributePlatforms, cleanVideogameByID, cleanGenresOfDB, cleanArrayByName } = require("../helpers/index");
const { getGenresByVideogameID } = require("../controllers/genresController")

const handlerGETvideogames = async (req, res) => {
    try {

        let api_data = await getVideogamesAPI();
        let db_data = await getVideogamesDB();

        if (!Array.isArray(api_data)) {
            throw Error(api_data);
        } else if (!Array.isArray(db_data)) {
            throw Error(db_data);
        } else {
            //limpiamos el array q viene de la API
            api_data = [...cleanArray(api_data)]

            // //limpiamos el array q viene de la DB
            db_data = [...cleanGenresOfDB(db_data)]

            res.status(200).json({
                database: [...db_data],
                api: [...api_data],
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handlerByIDvideogames = async (req, res) => {
    try {
        const { idVideogame } = req.params;

        const videogame = isNaN(Number(idVideogame)) ? await getVideogamesDBbyID(idVideogame) : await getVideogamesAPIbyID(idVideogame);

        if (videogame.id || videogame.dataValues) {
            if (videogame.dataValues) { //db
                const genresArrayByVideogameID = await getGenresByVideogameID(videogame.dataValues.id);
                return res.status(200).json({ ...videogame.dataValues, genres: genresArrayByVideogameID });
            }
            //api
            return res.status(200).json(cleanVideogameByID(videogame));
        } else {
            throw Error(videogame);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handlerByNamevideogames = async (req, res) => {
    try {
        const { search } = req.query;

        if (search) {
            let api_search = await getVideogamesAPIbyName(search);
            let db_search = await getVideogamesDBbyName(search);

            if (!Array.isArray(api_search)) {
                throw Error(api_search);
            } else if (!Array.isArray(db_search)) {
                throw Error(db_search);
            } else if (db_search.length == 0 && api_search.length == 0) {
                res.status(200).json({ message: `There are no video games with: ${search}` });
            } else {
                // limpiamos el array que viene de la api
                api_search = [...cleanArrayByName(api_search)];

                // //limpiamos el array q viene de la DB
                db_search = [...cleanGenresOfDB(db_search)]
                res.status(200).json({
                    database: [...db_search],
                    api: [...api_search],
                });
            }
        } else {
            return await handlerGETvideogames(req, res);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handlerPostVideogame = async (req, res) => {
    try {
        const { name, description, platforms, image, released, genres, rating } = req.body;
        if (!name || !description || !platforms || !image || !released || !genres) {
            throw Error("Missing Data");
        } else {
            let videogame = await createVideogame({ name, description, platforms, image, released, genres, rating });

            if (videogame.id) {
                return res.status(201).json({ message: `${name} has been created succesfully.` });
            }
            throw Error(videogame);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handlerGETvideogames,
    handlerByIDvideogames,
    handlerByNamevideogames,
    handlerPostVideogame
}