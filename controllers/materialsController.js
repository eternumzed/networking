const { body, validationResult } = require('express-validator');
const asyncHandler = require("express-async-handler");
const archiver = require('archiver');
const Materials = require('../models/materials');

const materialsPath = './public/materials/';

// Diplay list of materials
exports.materials_list = asyncHandler(async (req, res, next) => {
    const allMaterials = await Materials.find().sort({ name: 1 }).exec();
    res.render('materials', {
        title: 'materials',
        materials_list: allMaterials,
    })
})

// Download all materials
exports.materials_download_all_get = asyncHandler(async (req, res, next) => {
    const archive = archiver('zip');
    const allMaterials = await Materials.find().sort({ name: 1 }).exec();
    const materialsCount = await Materials.countDocuments({}, { hint: "_id_" });
    archive.on('error', (err) => {
        res.status(500).send({ error: err.message });
    });

    res.attachment('materials.zip').type('zip');
    archive.pipe(res);
    for (let i = 0; i < materialsCount; i++) {
        archive.file(materialsPath + allMaterials[i].name, { name: allMaterials[i].name })
    };
    archive.finalize();
})

// Download specific material
exports.materials_download_get = asyncHandler(async (req, res, next) => {
    const allMaterials = await Materials.find().sort({ name: 1 }).exec();
    const materialsCount = await Materials.countDocuments({}, { hint: "_id_" });
    for (let i = 0; i < materialsCount; i++) {
        if (allMaterials[i]._id == req.params.id) {
            res.download(materialsPath + allMaterials[i].name)
        }
    };
})

