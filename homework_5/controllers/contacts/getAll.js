const { Contact } = require("../../models/contact");
//req.query - параметри запиту
//req.params -параметри маршруту
//req.body - тіло запиту
//req.headers - заголовки запиту

const getAll = async (req, res) => {
    const { id: owner } = req.user;
    const { page = 1, limit = 20, favorite = false } = req.query;
    const skip = (page - 1) * limit;
    const result = favorite
        ? await Contact.find({ owner, favorite }, "-createdAt -updatedAt", { skip, limit: Number(limit) }) // пагінація: skip - скільки обїектів  з початку бази пропустити, limit - скільки обїектів бази взяти
            .populate("owner", "email") // розширює респонс поле owner на email, id залишається завжди
        : await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit: Number(limit) }) // пагінація: skip - скільки обїектів  з початку бази пропустити, limit - скільки обїектів бази взяти
            .populate("owner", "email"); // розширює респонс поле owner на email, id залишається завжди
    res.json(result);
}

module.exports = getAll;