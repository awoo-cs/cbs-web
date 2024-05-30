document.querySelector('.feedback-button').addEventListener('click', openFeedbackModal);
document.querySelector('.feedback-close').addEventListener('click', closeFeedbackModal);

let selectedSection = null;

function openFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'block';
}

function closeFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'none';
}

function startSectionSelection() {
  closeFeedbackModal();
  document.body.classList.add('selection-mode');
  alert("Haga click en la seccion para seleccionar");

  document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('click', selectSection);
    section.addEventListener('mouseover', highlightSection);
    section.addEventListener('mouseout', removeHighlightSection);
    section.style.cursor = 'pointer';
  });
}

function selectSection(event) {
  document.querySelectorAll('.section').forEach(section => {
    section.removeEventListener('click', selectSection);
    section.removeEventListener('mouseover', highlightSection);
    section.removeEventListener('mouseout', removeHighlightSection);
    section.style.cursor = 'default';
  });

  selectedSection = event.currentTarget;
  selectedSection.classList.remove('selected');
  document.getElementById('feedback-section').value = selectedSection.getAttribute('data-section');
  document.getElementById('selected-section-name').innerText = `Seccion seleccionada: ${selectedSection.getAttribute('data-section')}`;
  document.body.classList.remove('selection-mode');
  document.getElementById('section-indicator').style.display = 'none';
  openFeedbackModal();
}

function highlightSection(event) {
  if(document.body.classList.contains('selection-mode')) {
    const sectionName = event.currentTarget.getAttribute('data-section');
    const indicator = document.getElementById('section-indicator');
    indicator.textContent = sectionName;
    indicator.style.display = 'block';
  }
}

function removeHighlightSection() {
  if(document.body.classList.contains('selection-mode')){
    document.getElementById('section-indicator').style.display = 'none';
  }
}

async function sendFeedback(event) {
  event.preventDefault();
  const feedbackText = document.getElementById('feedback-text').value;
  const feedbackSection = document.getElementById('feedback-section').value;

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ section: feedbackSection, feedback: feedbackText })
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      alert('Error al enviar el feedback.');
    }
  } catch (error) {
    console.error('Error al enviar el feedback:', error);
    alert('Error al enviar el feedback.');
  }

  closeFeedbackModal();
  document.getElementById('feedback-form').reset();
}