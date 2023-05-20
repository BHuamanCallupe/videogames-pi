const { createGenres, getAllGenres } = require("../controllers/genresController");
const { cleanGenres } = require("../helpers");
const { getGenresAPI } = require("../utils")

const handleGETgenres = async (req, res) => {
    try {
        const genres = await getAllGenres();

        if (!Array.isArray(genres)) {
            throw Error("There are not genres.")
        } else {
            res.status(200).json(genres);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const handlePOSTgenres = async (req, res) => {
    try {
        let genres = await getGenresAPI();
        // genres = [...cleanGenres(genres)];

        const created = await createGenres(genres);

        res.status(201).json(created);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGETgenres,
    handlePOSTgenres
}