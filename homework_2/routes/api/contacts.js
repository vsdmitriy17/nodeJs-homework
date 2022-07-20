const express = require('express')
const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router()
const contactAddSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body); // перевырка об'єкту який додаємо (req.body)
    if (error) {
      throw createError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json({
      message: "Contact deleted"
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body); // перевырка об'єкту який додаємо (req.body)
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateContacById(contactId, name, email, phone);
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
