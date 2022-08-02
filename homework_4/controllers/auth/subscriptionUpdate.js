const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");

const subscriptionUpdate = async (req, res, next) => {
    const { error } = schemas.subscriptionUpdate.validate(req.body); // перевырка об'єкту який додаємо (req.body), валідація
    if (error) {
        throw createError(400, error.message);
    } 

    const { id } = req.user;
    await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        message: "User subscription updated",
    });
}

module.exports = subscriptionUpdate;