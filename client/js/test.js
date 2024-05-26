let questions = [];
let timer;
let timeRemaining = 20 * 60; // 20 minutos en segundos

let currentQuestionIndex = 0;
let userAnswers = [];
let isTimerEnabled = false;
let selectedDifficulty = ''; // Variable global para almacenar la dificultad seleccionada
let selectedTest = ''; // Variable global para almacenar el test seleccionado

function selectTest(test) {
  selectedTest = test;
  if (test === 'preguntas') {
    document.getElementById('introduction').style.display = 'none';
    document.getElementById('difficulty-selection').style.display = 'block';
  } else {
    alert('Próximamente disponible');
  }
}

function selectDifficulty(difficulty) {
  selectedDifficulty = difficulty; // Almacena la dificultad seleccionada en la variable global
  document.querySelectorAll('.difficulty-card').forEach(card => card.classList.remove('selected'));
  document.querySelector(`.difficulty-card[onclick="selectDifficulty('${difficulty}')"]`).classList.add('selected');
  document.getElementById('start-test-button').disabled = false; // Habilita el botón "Comenzar Test"
}

function goBack() {
  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('introduction').style.display = 'block';
}

async function loadQuestions(difficulty) {
  try {
    const response = await fetch(`http://localhost:3000/questions/${difficulty}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading questions:', error);
  }
}

async function confirmStart() {
  if (!selectedDifficulty) {
    alert('Por favor selecciona una dificultad.');
    return;
  }

  document.getElementById('difficulty-selection').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
}

async function startTest() {
  if (!selectedDifficulty) {
    alert('Por favor selecciona una dificultad.');
    return;
  }

  isTimerEnabled = document.getElementById('timer').checked;

  questions = await loadQuestions(selectedDifficulty);

  document.getElementById('confirmation').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';

  if (isTimerEnabled) {
    document.getElementById('timer-container').style.display = 'block';
    startTimer();
  }

  showQuestion();
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

  const optionsContainer = document.querySelector('.options-container');
  optionsContainer.innerHTML = '';

  question.options.forEach(option => {
    const optionCard = document.createElement('div');
    optionCard.classList.add('option-card');
    optionCard.setAttribute('data-value', option.value);
    optionCard.innerText = option.text;
    optionCard.onclick = () => selectOption(optionCard);
    optionsContainer.appendChild(optionCard);
  });
}

function selectOption(selectedCard) {
  document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));
  if (selectedCard) {
    selectedCard.classList.add('selected');
    selectedCard.dataset.selected = true; // Marcamos la opción como seleccionada
  } else {
    console.error('Selected card not found');
  }
}

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

async function showResults() {
  if (isTimerEnabled) {
    clearInterval(timer);
  }
  document.getElementById('question-container').style.display = 'none';
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.style.display = 'block';

  try {
    console.log('User answers:', userAnswers); // Debugging: print user answers
    const response = await fetch('http://localhost:3000/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ difficulty: selectedDifficulty, answers: userAnswers })
    });
    const { score, explanations } = await response.json();

    let resultsHTML = '<h3>Resultados del Test</h3><ul class="list-group">';
    explanations.forEach((explanation, index) => {
      const questionId = `Pregunta ${index + 1}`;
      resultsHTML += `<li class="list-group-item list-group-item-danger">${questionId}: Incorrecto. ${explanation}</li>`;
    });
    resultsHTML += `</ul><p class="mt-3">Puntaje total: ${score} / ${questions.length}</p>`;
    resultsContainer.innerHTML = resultsHTML;

    if (!document.getElementById('resultsChart')) {
      const canvas = document.createElement('canvas');
      canvas.id = 'resultsChart';
      canvas.width = 400;
      canvas.height = 200;
      resultsContainer.appendChild(canvas);
    }

    const canvas = document.getElementById('resultsChart');
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Correctas', 'Incorrectas'],
        datasets: [{
          label: 'Resultados del Test',
          data: [score, questions.length - score],
          backgroundColor: ['#28a745', '#dc3545'],
          borderColor: ['#28a745', '#dc3545'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

  } catch (error) {
    console.error('Error validating answers:', error);
  }
}