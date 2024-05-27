require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

const questions = require('./questions.json');

app.get('/api/questions/:difficulty', (req, res) => {
  const difficulty = req.params.difficulty;
  if (questions[difficulty]) {
    res.json(questions[difficulty]);
  } else {
    res.status(404).send('Questions not found');
  }
});

app.post('/api/validate', (req, res) => {
  const { difficulty, answers } = req.body;
  if (!difficulty || !answers) {
    return res.status(400).send('Invalid request');
  }

  const selectedQuestions = questions[difficulty];
  if (!selectedQuestions) {
    return res.status(404).send('Questions not found');
  }

  let score = 0;
  const explanations = [];
  const correctQuestions = [];
  const incorrectQuestions = [];

  answers.forEach((answer, index) => {
    if (selectedQuestions[index].correctAnswer === answer) {
      score++;
      correctQuestions.push(selectedQuestions[index]);
    } else {
      explanations.push(selectedQuestions[index].explanation);
      incorrectQuestions.push(selectedQuestions[index]);
    }
  });

  res.json({ score, explanations, correctQuestions, incorrectQuestions });
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
});

const nodemailer = require('nodemailer');

app.post('/api/feedback', (req, res) => {
  const { feedback } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.FEEDBACK_EMAIL,
    subject: 'Nuevo Feedback del Proyecto',
    text: feedback
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Feedback sent');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});