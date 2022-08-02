const { createError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authIdent = async (req, res, next) => { // мідлвара перевіряє токен юзера і додає данні юзера до request, якщо токен вірний
    const { authorization = "" } = req.headers; // зоголовок authorization берем із request.headers
    const [bearer, token] = authorization.split(" "); // деструктуризація строки authorization

    if (bearer !== "Bearer") {
        next(createError(401));
    };

    try {
        const { id } = jwt.verify(token, SECRET_KEY); // забираємо айди (payload) з токену
        const user = await User.findById(id); // знаходимо юзера за id
        if (!user || !user.token) {
            next(createError(401));
        }
        req.user = user; // додаэмо user в request
        next();
    } catch (error) {
        next(createError(401, error.message));
    }
}

module.exports = authIdent;