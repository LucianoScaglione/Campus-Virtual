const express = require('express');
const router = express.Router();
const CurriculumUnitControllers = require('../controllers/CurriculumUnit');

router.get('/', CurriculumUnitControllers.getCurriculumUnit);
router.get('/:id', CurriculumUnitControllers.getCurriculumUnitById);
router.post('/', CurriculumUnitControllers.createCurriculumUnit);
router.post('/:id', CurriculumUnitControllers.addUsersToCurriculumUnit);
router.put('/:id', CurriculumUnitControllers.updateCurriculumUnit);
router.post('/:id/remove-users', CurriculumUnitControllers.removeUsersFromCurriculumUnit);
router.delete('/:id', CurriculumUnitControllers.deleteCurriculumUnit);

module.exports = router;