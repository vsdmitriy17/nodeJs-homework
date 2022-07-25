const { Schema, model } = require('mongoose');

const contactSchema = new Schema(
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

module.exports = Contact;