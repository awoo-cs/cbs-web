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

  answers.forEach((answer, index) => {
    console.log(`Evaluating answer ${index + 1}:`);
    console.log(`User answer: ${answer}`);
    console.log(`Correct answer: ${questions[index].correctAnswer}`);

    if (questions[index].correctAnswer === answer) {
      score++;
      console.log('Answer is correct.');
    } else {
      explanations.push(questions[index].explanation);
      console.log('Answer is incorrect.');
    }
  });

  res.json({ score, explanations });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});