const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

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
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }); // генерування токена
    await User.findByIdAndUpdate(user._id, {token});
    res.status(200).json({
        token,
    });
}

module.exports = login;