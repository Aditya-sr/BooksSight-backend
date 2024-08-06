const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile.controller');
const multer=require('multer')
const upload = multer({ dest: 'uploads/' });

// router.post('/profiles',upload.single('profilePic'),profileController.createProfile)
router.post('/profiles', profileController.createProfile);
// router.get('/profiles', profileController.findAllProfiles);

module.exports = router;
