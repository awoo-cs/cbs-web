const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/questions/:difficulty', (req, res) => {
  const difficulty = req.params.difficulty;
  const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
  res.json(questions[difficulty]);
});

app.post('/validate', (req, res) => {
  const { difficulty, answers } = req.body;
  const questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'))[difficulty];
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