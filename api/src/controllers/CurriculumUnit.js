const { CurriculumUnit, Users, Publications } = require('../db');

const getCurriculumUnit = async (req, res, next) => {
  try {
    const findCurriculumUnit = await CurriculumUnit.findAll({ include: Users });
    if (!findCurriculumUnit.length) {
      return res.status(404).send('There are no curriculum unit registered in the database');
    };
    res.status(200).json(findCurriculumUnit);
  } catch (error) {
    next(error);
  };
};

const getCurriculumUnitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findById = await CurriculumUnit.findOne({ where: { id }, include: [Users, Publications] });
    if (!findById) {
      return res.status(404).send('There is no curricular unit registered with that id in the database');
    };
    res.status(200).json(findById);
  } catch (error) {
    next(error);
  };
};

const createCurriculumUnit = async (req, res, next) => {
  try {
    // UserId va a ser un arreglo de id de usuarios: [1, 2, 3, 4, 5, 6, 7]
    const { name, description, assignedTeacher, UserId } = req.body;

    const searchCurriculumUnit = await CurriculumUnit.findOne({ where: { name } });

    if (searchCurriculumUnit) {
      return res.status(400).send('There is already a matter registered with that name');
    };

    const newCurriculumUnit = await CurriculumUnit.create({
      name,
      description,
      assignedTeacher
    });

    if (UserId && UserId.length > 0) {
      //"A la unidad curricular (newCurriculumUnit) que acabo de crear, agrégale los usuarios con los IDs especificados en el arreglo UserId."
      await newCurriculumUnit.addUsers(UserId);
    };

    res.status(201).json(newCurriculumUnit);

  } catch (error) {
    next(error);
  };
};

const updateCurriculumUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, assignedTeacher } = req.body;

    const findCurriculumUnit = await CurriculumUnit.findByPk(id);

    if (!findCurriculumUnit) {
      return res.status(404).send('There is no curricular unit with that id');
    };

    await findCurriculumUnit.update({
      name: name || findCurriculumUnit.name,
      description: description || findCurriculumUnit.description,
      assignedTeacher: assignedTeacher || findCurriculumUnit.assignedTeacher
    });

    res.status(200).send('Curriculum Unit updated succesfully!');

  } catch (error) {
    next(error);
  };
};

const addUsersToCurriculumUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { UserId } = req.body;

    const searchUsers = await Users.findAll({ where: { id: UserId } });
    const userIdsInDb = searchUsers.map(user => user.id);
    const unregisteredUser = UserId.filter(userId => !userIdsInDb.includes(userId));

    if (unregisteredUser.length > 0) {
      return res.status(400).send('There is no registered user with that id');
    };

    const findCurriculumUnit = await CurriculumUnit.findByPk(id);

    if (!findCurriculumUnit) {
      return res.status(404).send('There is no curricular unit with that id');
    };

    const users = await findCurriculumUnit.getUsers(); // Obtener usuarios asociados
    const existingUsers = users.map(user => user.id);
    const usersToAdd = UserId.filter(userId => existingUsers.includes(userId));

    if (usersToAdd.length > 0) {
      return res.status(400).send('Cannot add a user who already belongs to the unit');
    };

    UserId.forEach(async id => {
      await findCurriculumUnit.addUsers(id);
    });
    res.status(200).send(`Added users to the curriculum unit ${findCurriculumUnit.name}`);
  } catch (error) {
    next(error);
  };
};

const removeUserFromCurriculumUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { UserId } = req.body; 
    const curriculumUnit = await CurriculumUnit.findByPk(id);
    if (!curriculumUnit) {
      return res.status(404).send('Curriculum unit not found');
    }
    const user = await Users.findByPk(UserId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const result = await curriculumUnit.removeUser(user);
    if (result === 0) {
      return res.status(400).send('User is not associated with this curriculum unit');
    }
    res.status(200).send('User removed successfully from the curriculum unit');
  } catch (error) {
    console.error('Error removing user from curriculum unit:', error);
    res.status(500).send('An error occurred while removing the user from the curriculum unit');
  }
};

const deleteCurriculumUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findCurriculumUnit = await CurriculumUnit.findByPk(id);
    if (!findCurriculumUnit) {
      return res.status(404).send('There is no curricular unit with that id');
    };

    await findCurriculumUnit.destroy();

    res.status(200).send('Curriculum unit deleted successfully');

  } catch (error) {
    next(error);
  };
};

module.exports = {
  getCurriculumUnit,
  getCurriculumUnitById,
  createCurriculumUnit,
  updateCurriculumUnit,
  addUsersToCurriculumUnit,
  removeUserFromCurriculumUnit,
  deleteCurriculumUnit
}