const express = require('express')
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.get));

router.post('/', ctrlWrapper(ctrl.post));

router.delete('/:contactId', ctrlWrapper(ctrl.remove));

router.put('/:contactId', ctrlWrapper(ctrl.put));

router.patch('/:contactId/favorite', ctrlWrapper(ctrl.patch));

module.exports = router
