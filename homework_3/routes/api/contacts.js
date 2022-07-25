const express = require('express')
const Contact = require('../../models/contact');
const { createError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router()

const contactAddSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})

const contactUpdateFavoriteSchema = Joi.object({ // бібліотека для перевірки - схема для перевірки (як propTypes)
  favorite: Joi.boolean().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt");
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
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
    const result = await Contact.create(req.body); // агументом до методу create() - повинен бути об'єкт
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body); // перевырка об'єкту який додаємо (req.body)
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw createError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
