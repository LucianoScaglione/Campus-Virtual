const express = require('express');
const router = express.Router();
const Publications = require('../controllers/Publications');

router.get('/', Publications.getPublications);
router.get('/:id', Publications.getPublicationById);
router.post('/create', Publications.createPublication);
router.put('/:id', Publications.updatePublication);
router.delete('/:id', Publications.deletePublication);

module.exports = router;