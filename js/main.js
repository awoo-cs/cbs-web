window.onload = function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("navbar").innerHTML = data));

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
};

document.getElementById('toggle').addEventListener('change', function () {
  const tipsContent = document.getElementById('tips-content');
  const malwareContent = document.getElementById('malware-content');
  if (this.checked) {
    tipsContent.style.display = 'block';
    malwareContent.style.display = 'none';
  } else {
    tipsContent.style.display = 'none';
    malwareContent.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  const slider = document.getElementById('slider');

  if (slider) {
    slider.addEventListener('mouseover', function() {
      this.classList.add('paused');
    });

    slider.addEventListener('mouseout', function() {
      this.classList.remove('paused');
    });
  } else {
    console.error('Element with ID "slider" not found.');
  }
});

let object = document.querySelector('#casos-de-estudio');

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
});

observer.observe(object);
