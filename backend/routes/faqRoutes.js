const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');
const auth = require('../middleware/auth');

// FAQ Routes
router.post('/create', auth, faqController.createFAQ);
router.get('/',faqController.getFAQs);
router.put('/update', auth, faqController.updateFAQ);
router.delete('/delete', auth, faqController.deleteFAQ);

module.exports = router;
