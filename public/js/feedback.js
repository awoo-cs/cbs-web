document.addEventListener('DOMContentLoaded', function () {
    const feedbackButton = document.getElementById('feedback-button');
    const feedbackModal = document.getElementById('feedback-modal');
    const closeModal = document.querySelector('.feedback-close');
    const feedbackForm = document.getElementById('feedback-form');
  
    feedbackButton.addEventListener('click', () => {
      feedbackModal.style.display = 'block';
    });
  
    closeModal.addEventListener('click', () => {
      feedbackModal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === feedbackModal) {
        feedbackModal.style.display = 'none';
      }
    });
  
    feedbackForm.addEventListener('submit', async (event) => {
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
  
        if (response.ok) {
          alert('¡Gracias por tu feedback!');
          feedbackModal.style.display = 'none';
        } else {
          alert('Hubo un problema al enviar tu feedback. Por favor, inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al enviar tu feedback. Por favor, inténtalo de nuevo.');
      }
    });
  });
  