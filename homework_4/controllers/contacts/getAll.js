const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
    const { id: owner } = req.user;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt")
        .populate("owner", "email"); // розширює респонс поле owner на email, id залишається завжди
    res.json(result);
}

module.exports = getAll;