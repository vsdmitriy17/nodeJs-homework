const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const post = async (req, res) => {
    const { error } = schemas.add.validate(req.body); // перевырка об'єкту який додаємо (req.body)
    if (error) {
        throw createError(400, error.message);
    }
    const { id: owner } = req.user; // забираэмо id юзера
    const result = await Contact.create({ ...req.body, owner, }); // агументом до методу create() - повинен бути об'єкт
    res.status(200).json(result);
}

module.exports = post;