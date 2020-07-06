const express = require('express');
const router = express.Router();

router.use(require('./home'));
router.use(require('./signup'));
router.use(require('./signin'));
router.use(require('./profile'));
router.use(require('./signout'));
router.use(require('./notes'));

module.exports = router;