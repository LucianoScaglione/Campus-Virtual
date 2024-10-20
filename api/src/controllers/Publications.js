const { Publications } = require('../db');

const getPublications = async (req, res, next) => {
    try {
    const publications = await Publications.findAll({ include:  Users});
    if (!publications.length) {
    return res.status(404).send('There are no publications registered on the data base.');
    }
    res.status(200).json(publications);
    } catch (error) {
    next(error);
    }
};