const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { error } = schemas.login.validate(req.body); // перевырка об'єкту який додаємо (req.body), валідація
    if (error) {
        throw createError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Перевірка на наявність такого email в базі, агументом до методу create() - повинен бути об'єкт
    if (!user) {
        throw createError(401, 'Email is wrong');
    }

    const comparePassword = await bcrypt.compare(password, user.password); // Перевірка пароля
    if (!comparePassword) {
        throw createError(401, 'Password is wrong');
    }
    const token = "some_token"; // генерування токена
    res.status(200).json({
        token,
    });
}

module.exports = login;