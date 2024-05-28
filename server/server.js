require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api/questions/:difficulty", (req, res) => {
  const difficulty = req.params.difficulty;
  const questions = require("./questions.json");
  res.json(questions[difficulty]);
});

app.post("/api/validate", (req, res) => {
  const { difficulty, answers } = req.body;
  const questions = require("./questions.json")[difficulty];
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

app.post("/api/feedback", async (req, res) => {
  const { feedback } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.FEEDBACK_EMAIL,
    subject: "Nuevo Feedback del Usuario",
    text: feedback,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: ", info.response);
    res.status(200).json({ message: "Feedback enviado correctamente." });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ message: "Error al enviar el feedback." });
  }
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
