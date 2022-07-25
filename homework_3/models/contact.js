const { Schema, model } = require('mongoose');
const Joi = require("joi");

const contactAddSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
    favorite: Joi.boolean().required(),
});

const schemas = {
    add: contactAddSchema,
    updateFavorite: contactUpdateFavoriteSchema,
}

const contactSchema = new Schema( // схема моделі contact
    { 
        name: {
            type: String, //типи змінних mongoose
            required: [true, 'Set name for contact'],
        },
        email: {
            type: String,
            default: "unknown",
        },
        phone: {
            type: String,
            default: "unknown",
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { // налаштування версії
        versionKey: false, // номер, кількість весій
        timestamps: true, // час зміни версії
    }
);

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};