const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const patch = async (req, res) => {
    const { error } = schemas.updateFavorite.validate(req.body); // перевырка об'єкту який додаємо (req.body)
    if (error) {
        throw createError(400, message = "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw createError(404);
    }
    res.status(200).json(result);
}

module.exports = patch;