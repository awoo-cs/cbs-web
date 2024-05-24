const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const questionsPath = path.join(__dirname, 'questions.json');

// Endpoint para obtener preguntas según la dificultad
app.get('/questions/:difficulty', (req, res) => {
  const difficulty = req.params.difficulty;
  fs.readFile(questionsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error leyendo las preguntas');
    }
    const questions = JSON.parse(data);
    if (questions[difficulty]) {
      res.json(questions[difficulty]);
    } else {
      res.status(404).send('Dificultad no encontrada');
    }
  });
});

// Endpoint para validar las respuestas
app.post('/validate', (req, res) => {
  const { difficulty, answers } = req.body;
  fs.readFile(questionsPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error leyendo las preguntas');
    }
    const questions = JSON.parse(data)[difficulty];
    if (!questions) {
      return res.status(404).send('Dificultad no encontrada');
    }

    let score = 0;
    let explanations = [];

    answers.forEach((answer, index) => {
      const question = questions[index];
      if (question.correctAnswer === answer) {
        score++;
      } else {
        explanations.push(question.explanation);
      }
    });

    res.json({ score, explanations });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
