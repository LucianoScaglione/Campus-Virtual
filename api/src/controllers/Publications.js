const { Publications } = require('../db');

const getPublications = async (req, res, next) => {
    try {
    const findPublications = await Publications.findAll({ include:  Users});
    if (!findPublications.length) {
    return res.status(404).send('There are no publications registered on the data base.');
    }
    res.status(200).json(findPublications);
    } catch (error) {
    next(error);
    }
};

const getPublicationById = async (req, res, next) => {
    try {
    const { id } = req.params;
    const findPublicationById = await Publications.findByPk(id);
    if (!findPublicationById) {
        return res.status(404).send('There is no publication with that ID registered in the data base.');
    }
    res.status(200).json(findPublicationById);
    } catch (error) {
    next(error);
    }
};

module.exports ={
    getPublications,
    getPublicationById
}