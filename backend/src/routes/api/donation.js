const { Router } = require('express');

const router = new Router();

// const ValidationCompany = require('../../middlewares/validations/validationCompany');
// const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');

const {
  postDonation,
  getDonations,
} = require('../../controllers/donationController');

router.post('/', postDonation);
router.get('/', authMiddleware, getDonations);

module.exports = router;
