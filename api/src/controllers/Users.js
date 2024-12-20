const { Users } = require('../db');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res, next) => {
  try {
    const { name } = req.query;

    const getUsers = await Users.findAll();

    if (!getUsers.length) {
      return res.status(400).send('There are no registered users in the database');
    }

    if (name) {
      const searchUsers = await Users.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${name}%` } },
            { lastName: { [Op.iLike]: `%${name}%` } }
          ]
        }
      });

      searchUsers.length ? res.status(200).json(searchUsers) : res.status(400).send('There are no registered users with that name or surname');
    }
    else {
      return res.status(200).json(getUsers)
    }
  } catch (error) {
    next(error);
  };
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await Users.findByPk(id);
    if (getUser) {
      res.status(200).json(getUser);
    } else {
      return res.status(404).send("There is no registered user with that id");
    }
  } catch (error) {
    next(error);
  };
};

const createUser = async (req, res, next) => {
  try {
    const { dni, name, lastName, dateOfBirth, address, phone, ranks } = req.body;

    if (!(dni && name && lastName && dateOfBirth)) {
      return res.status(400).send('You must fill out the required fields');
    };

    const findUser = await Users.findOne({ where: { dni } });

    if (findUser) {
      return res.status(400).send('There is already a registered user with that ID');
    };

    const encryptedPassword = await bcrypt.hash(dni, 10);

    const createUser = await Users.create({
      dni,
      name,
      lastName,
      dateOfBirth,
      email: `${dni}@campusmail.com`,
      address,
      phone,
      ranks: ranks ? ranks : 'Student',
      password: encryptedPassword
    });

    res.status(201).json({ msg: 'User created successfully', user: createUser });

  } catch (error) {
    next(error);
  };
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('You must complete the required email and password fields');
    };

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(400).send('No registered user was found with that email');
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ user_id: user.id, user_email: email }, "secret", { expiresIn: "10h" });
      user.token = token;
      res.status(200).json({ "user": user, "token": token });
    } else {
      return res.status(400).send('Incorrect password');
    };
  } catch (error) {
    next(error);
  };
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { dni, name, lastName, profilePicture, dateOfBirth, email, address, phone, ranks, password, userActive } = req.body;

    const findUser = await Users.findByPk(id);

    if (!findUser) {
      return res.status(400).send('There is no registered user with that id');
    };

    const updateUser = await findUser.update({
      dni: dni ? dni : findUser.dni,
      name: name ? name : findUser.name,
      lastName: lastName ? lastName : findUser.lastName,
      profilePicture: profilePicture ? profilePicture : findUser.profilePicture,
      dateOfBirth: dateOfBirth ? dateOfBirth : findUser.dateOfBirth,
      email: email ? email : findUser.email,
      address: address ? address : findUser.address,
      phone: phone ? phone : findUser.phone,
      ranks: ranks ? ranks : findUser.ranks,
      password: password ? password : findUser.password,
      userActive: userActive ? userActive : findUser.userActive
    });

    res.status(200).json({ msg: 'User updated succesfully!', user: updateUser });

  } catch (error) {
    next(error);
  };
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findUser = await Users.findByPk(id);

    if (!findUser) {
      return res.status(404).send('There is no user registered in the database with that id');
    };

    await Users.destroy({ where: { id } });
    res.status(200).json({ destroy: true, msg: 'User deleted from database successfully' });

  } catch (error) {
    next(error);
  };
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};
//test