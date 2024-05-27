require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/questions/:difficulty', (req, res) => {
  const difficulty = req.params.difficulty;
  const questions = require('./questions.json');
  res.json(questions[difficulty]);
});

app.post('/api/validate', (req, res) => {
  const { difficulty, answers } = req.body;
  const questions = require('./questions.json')[difficulty];
  let score = 0;
  const explanations = [];
  const correctQuestions = [];
  const incorrectQuestions = [];

  answers.forEach((answer, index) => {
    if (questions[index].correctAnswer === answer) {
      score++;
      correctQuestions.push(questions[index]);
    } else {
      explanations.push(questions[index].explanation);
      incorrectQuestions.push(questions[index]);
    }
  });

  res.json({ score, explanations, correctQuestions, incorrectQuestions });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});