const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const questions = require('./questions.json');

app.get('/api/questions/:difficulty', (req, res) => {
  const difficulty = req.params.difficulty;
  const selectedQuestions = questions[difficulty];
  if (selectedQuestions) {
    res.json(selectedQuestions);
  } else {
    res.status(404).json({ error: 'Difficulty not found' });
  }
});

app.post('/api/validate', (req, res) => {
  const { difficulty, answers } = req.body;
  const correctAnswers = questions[difficulty].map(q => q.correctAnswer);
  let score = 0;
  let correctQuestions = [];
  let incorrectQuestions = [];

  answers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score++;
      correctQuestions.push(questions[difficulty][index]);
    } else {
      incorrectQuestions.push(questions[difficulty][index]);
    }
  });

  res.json({
    score,
    correctQuestions,
    incorrectQuestions
  });
});

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});