const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const post = async (req, res, next) => {
    const { error } = schemas.add.validate(req.body); // перевырка об'єкту який додаємо (req.body)
    if (error) {
        throw createError(400, error.message);
    }
    const result = await Contact.create(req.body); // агументом до методу create() - повинен бути об'єкт
    res.status(200).json(result);
}

module.exports = post;