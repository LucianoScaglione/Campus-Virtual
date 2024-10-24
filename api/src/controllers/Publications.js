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

const createPublication = async (req, res, next) => {
    try {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('Title and Description fields must be completed.');
    }
    const newPublication = await Publications.create({ title, description });
    res.status(201).json(newPublication);
    } catch (error) {
    next(error);
    }
};

const updatePublication = async (req, res, next) => {
    try {
    const { id } = req.params;
    const { title, description } = req.body;
    const publication = await Publications.findByPk(id);

    if (!publication) {
        return res.status(404).send('There is no publication with that ID');
    }
    await publication.update({
        title: title || publication.title,
        description: description || publication.description
    });

    res.status(200).json({ msg: 'Publication updated succesfully.', publication });
    } catch (error) {
    next(error);
    }
};

const deletePublication = async (req, res, next) => {
    try {
    const { id } = req.params;
    const publication = await Publications.findByPk(id);
    if (!publication) {
        return res.status(404).send('There is no publication with that ID');
    }

    await publication.destroy();
    res.status(200).send('Publication deleted successfully');
    } catch (error) {
    next(error);
    }
};


module.exports ={
    getPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication
}