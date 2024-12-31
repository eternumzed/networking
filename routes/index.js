const express = require('express');
const router = express.Router();

const homePage_controller = require('../controllers/homePageController');
const materials_controller = require('../controllers/materialsController');
const tests_controller = require('../controllers/testsController');

// HOMEPAGE ROUTES

// GET homepage
router.get('/', homePage_controller.index);

// MATERIALS ROUTES

// GET request for list of all materials
router.get('/materials', materials_controller.materials_list)

// GET request for downloading all material
router.get('/materials/all/download', materials_controller.materials_download_all_get);

// GET request for downloading a material
router.get('/materials/:id/download', materials_controller.materials_download_get);

// TESTS ROUTES

// GET tests list
router.get('/tests', tests_controller.tests_list_get);

module.exports = router;