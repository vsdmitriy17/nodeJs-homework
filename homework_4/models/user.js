const { Schema, model } = require('mongoose');
const Joi = require("joi");

const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // регулярний вираз email

const registerSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegExp).required(),
    subscription: Joi.string(),
    token: Joi.string(),
});

const loginSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegExp).required(),
});

const subscriptionUpdateSchema = Joi.object({
    subscription: Joi.string().required(),
});

const schemas = {
    register: registerSchema,
    login: loginSchema,
    subscriptionUpdate: subscriptionUpdateSchema,
}

const userSchema = new Schema( // схема моделі contact
    { 
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Password is required'],
        },
        email: {
            type: String,
            match: emailRegExp, // валідація згідно регулярного виразу
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: {
            type: String,
            default: null,
        },
    },
    { // налаштування версії
        versionKey: false, // номер, кількість весій
        timestamps: true, // час зміни версії
    }
);

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};