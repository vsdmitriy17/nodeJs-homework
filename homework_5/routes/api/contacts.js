const express = require('express')
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { authIdent } = require("../../middlewares");

const router = express.Router();

router.get('/', authIdent, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authIdent, ctrlWrapper(ctrl.get));

router.post('/', authIdent, ctrlWrapper(ctrl.post));

router.delete('/:contactId', authIdent, ctrlWrapper(ctrl.remove));

router.put('/:contactId', authIdent, ctrlWrapper(ctrl.put));

router.patch('/:contactId/favorite', authIdent, ctrlWrapper(ctrl.patch));

module.exports = router
