const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const archiver = require('archiver');
const Tests = require('../models/tests');

exports.tests_list_get = asyncHandler(async (res, req, next) => {
    req.render('tests')
})