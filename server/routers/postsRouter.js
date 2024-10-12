const router = require('express').Router();
const postsController = require('../controllers/postController');
const requireUser = require("../middlewares/requireUser");

router.get('/all',requireUser,postsController);

module.exports = router; 