const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { error } = schemas.register.validate(req.body); // перевырка об'єкту який додаємо (req.body), валідація
    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Перевірка на наявність такого email в базі, агументом до методу create() - повинен бути об'єкт
    if (user) {
        throw createError(409, `Email ${email} in use`);
    }

    const hashPassword = await bcrypt.hash(password, 10); // хешування пароля
    const result = await User.create({ ...req.body, password: hashPassword }); // створення нового user в базі
    res.status(201).json({
        email: result.email,
    });
}

module.exports = register;