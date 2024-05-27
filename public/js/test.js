let questions = [];
let timer;
let timeRemaining = 20 * 60; 

let currentQuestionIndex = 0;
let userAnswers = [];
let isTimerEnabled = false;
let selectedDifficulty = ''; 
let selectedTest = ''; 

function startTest() {
  document.getElementById('introduction').style.display = 'none';
  document.getElementById('difficulty-selection').style.display = 'block';
}

function selectDifficulty(difficulty) {
  selectedDifficulty = difficulty; 
  document.querySelectorAll('.difficulty-card').forEach(card => card.classList.remove('selected'));
  document.querySelector(`.difficulty-card[onclick="selectDifficulty('${difficulty}')"]`).classList.add('selected');
  document.getElementById('start-test-button').disabled = false; 
}

function goBack() {
  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('introduction').style.display = 'block';
}

async function loadQuestions(difficulty) {
  try {
    const response = await fetch(`/api/questions/${difficulty}`);
    const data = await response.json();
    console.log('Questions loaded:', data); // Depuración
    return data;
  } catch (error) {
    console.error('Error loading questions:', error);
  }
}

async function confirmInstructions() {
  if (!selectedDifficulty) {
    alert('Por favor selecciona una dificultad.');
    return;
  }

  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('instructions').style.display = 'block';
}

function startTestFromInstructions() {
  if (!selectedDifficulty) {
    alert('Por favor selecciona una dificultad.');
    return;
  }

  document.getElementById('instructions').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';

  isTimerEnabled = document.getElementById('timer').checked;

  loadQuestions(selectedDifficulty).then(data => {
    questions = data;
    if (isTimerEnabled) {
      document.getElementById('timer-container').style.display = 'block';
      startTimer();
    }
    showQuestion();
  });
}

function startTimer() {
  const timerDisplay = document.getElementById('timer-display');
  timer = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timer);
      alert('Tiempo agotado');
      showResults();
    } else {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }, 1000);
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  const questionTitle = document.getElementById('question-title');
  const formLabel = document.querySelector('.form-label');

  if (!questionTitle || !formLabel) {
    console.error('Required elements not found');
    return;
  }

  questionTitle.innerText = `Pregunta ${currentQuestionIndex + 1}`;
  formLabel.innerText = question.text;
  document.getElementById('progress-indicator').innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

  const optionsContainer = document.querySelector('.options-container');
  optionsContainer.innerHTML = '';

  question.options.forEach((option, index) => {
    const optionCard = document.createElement('div');
    optionCard.classList.add('option-card');
    optionCard.setAttribute('data-value', option.value);
    optionCard.innerHTML = `
      <span class="option-icon">${index + 1}</span>
      <span class="option-text">${option.text}</span>
    `;
    optionCard.onclick = () => selectOption(optionCard);
    optionsContainer.appendChild(optionCard);
  });

  const nextButton = document.querySelector('.next-button');
  nextButton.style.top = `${optionsContainer.clientHeight / 2}px`;

  document.querySelector('.prev-button').style.display = currentQuestionIndex > 0 ? 'block' : 'none';
}

function selectOption(selectedCard) {
  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  if (selectedCard) {
    selectedCard.classList.add('selected');
  } else {
    console.error('Selected card not found');
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key >= '1' && event.key <= '3') {
    const optionCards = document.querySelectorAll('.option-card');
    const selectedIndex = parseInt(event.key) - 1;
    if (selectedIndex >= 0 && selectedIndex < optionCards.length) {
      selectOption(optionCards[selectedIndex]);
    }
  }
  if (event.key === 'Enter') {
    nextQuestion();
  }
});

function nextQuestion() {
  const selectedOption = document.querySelector('.option-card.selected');
  if (!selectedOption) {
    alert('Por favor selecciona una respuesta.');
    return;
  }
  const answer = selectedOption.getAttribute('data-value');
  userAnswers.push(answer);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

async function showResults() {
  if (isTimerEnabled) {
    clearInterval(timer);
  }
  document.getElementById('question-container').style.display = 'none';
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.style.display = 'block';

  try {
    const response = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: selectedDifficulty, answers: userAnswers })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const resultData = await response.json();
    const { score, explanations, correctQuestions, incorrectQuestions } = resultData;

    document.getElementById('score-display').innerText = `Puntaje total: ${score} / ${questions.length}`;
    document.getElementById('feedback').innerText = getFeedback(score);

    const canvas = document.getElementById('resultsChart');
    const ctx = canvas.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Correctas', 'Incorrectas'],
        datasets: [{
          data: [score, questions.length - score],
          backgroundColor: ['#28a745', '#dc3545'],
          borderColor: '#2c2c2c',
          borderWidth: 3,
          hoverBackgroundColor: ['#218838', '#c82333'],
          hoverBorderColor: '#1e1e1e',
          hoverBorderWidth: 5
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#e0e0e0',
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#2c2c2c',
            titleColor: '#e0e0e0',
            bodyColor: '#e0e0e0',
            borderColor: '#28a745',
            borderWidth: 1,
            cornerRadius: 4,
            padding: 10
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        onClick: (evt, item) => {
          if (item.length > 0) {
            const index = item[0].index;
            if (index === 0) {
              showQuestionsModal(correctQuestions, 'Correctas');
            } else if (index === 1) {
              showQuestionsModal(incorrectQuestions, 'Incorrectas');
            }
          }
        }
      }
    });

  } catch (error) {
    console.error('Error validating answers:', error);
    alert('No se pudieron cargar las preguntas, intentalo de nuevo.');
  }
}

function showQuestionsModal(questions, type) {
  const questionsModalLabel = document.getElementById('questionsModalLabel');
  const questionsList = document.getElementById('questionsList');
  questionsModalLabel.innerText = `Preguntas ${type}`;
  questionsList.innerHTML = '';

  if (!questions || questions.length === 0) {
    const noQuestionsItem = document.createElement('li');
    noQuestionsItem.classList.add('list-group-item');
    noQuestionsItem.innerText = `No hay preguntas ${type.toLowerCase()} disponibles.`;
    questionsList.appendChild(noQuestionsItem);
  } else {
    questions.forEach((question, index) => {
      const questionItem = document.createElement('li');
      questionItem.classList.add('list-group-item');
      questionItem.innerText = `${index + 1}. ${question.text}`;
      questionsList.appendChild(questionItem);
    });
  }

  const questionsModal = new bootstrap.Modal(document.getElementById('questionsModal'));
  questionsModal.show();
}

async function validateAnswers(payload) {
  try {
    const response = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Validation response:', data); // Depuración
    return data;
  } catch (error) {
    console.error('Error validating answers:', error);
    alert('No se pudieron cargar las preguntas, intentalo de nuevo.');
  }
}

function restartTest() {
  window.location.reload();
}

function exploreResources() {
  window.location.href = 'index.html'
}

function getFeedback(score) {
  if (score >= 16) { 
    return '¡Excelente! Estás en el nivel Experto.';
  } else if (score >= 10) { 
    return '¡Buen trabajo! Estás en el nivel Intermedio.';
  } else { 
    return 'Necesitas mejorar. Estás en el nivel Novato.';
  }
}