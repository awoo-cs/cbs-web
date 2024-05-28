document.querySelector('.feedback-button').addEventListener('click', openFeedbackModal);
document.querySelector('.feedback-close').addEventListener('click', closeFeedbackModal);

function openFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'block';
}

function closeFeedbackModal() {
  document.getElementById('feedbackModal').style.display = 'none';
}

async function sendFeedback(event) {
  event.preventDefault();
  const feedbackText = document.getElementById('feedback-text').value;

  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feedback: feedbackText })
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