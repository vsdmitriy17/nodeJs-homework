const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // для контент тайп джейсон в req.body (інакше відповідь в req.body - андефайнд)
app.use(express.static("public")); // всі файли котрі можна роздавати шукати в папці public

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {   // мідлвара для обробки помилок (тому що приймає 4 параметри)
  const { status = 500, message = "Server error"} = err;
  res.status(status).json({ message });
})

module.exports = app
