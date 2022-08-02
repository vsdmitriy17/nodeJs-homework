const express = require("express");
const ctrl = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { authIdent } = require("../../middlewares");

const router = express.Router();
router.post('/signup', ctrlWrapper(ctrl.register)); // signup
router.post('/login', ctrlWrapper(ctrl.login)); // signin
router.get('/current', authIdent, ctrlWrapper(ctrl.getCurrent)); // получити данні юзера по токену
router.get('/logout', authIdent, ctrlWrapper(ctrl.logout)); // logout
router.patch('/', authIdent, ctrlWrapper(ctrl.subscriptionUpdate)); // logout

module.exports = router;