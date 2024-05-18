/*
 * Ejecuta el código especificado cuando la ventana termina de cargar.
 * Obtiene el contenido de 'navbar.html' y lo establece como innerHTML del elemento con id 'navbar'.
 * Obtiene el contenido de 'footer.html' y lo establece como innerHTML del elemento con id 'footer'.
 */
window.onload = function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("navbar").innerHTML = data));

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
};

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(
    ".security-tips-section, .welcome-section, .malware-protection-section, .resources-section, .testimonials-section"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        entry.target.classList.remove("hidden");

        const elements = entry.target.querySelectorAll(
          "h1, h2, p, .tip, blockquote, button, .malware-type, .resource-item, .card"
        );

        elements.forEach((element) => {
          element.classList.remove("hidden");
          if (element.classList.contains("tip")) {
            element.classList.add("slide-in");
          } else if (element.tagName.toLowerCase() === "button") {
            element.classList.add("scale-up");
          } else if (element.classList.contains("malware-type")) {
            element.classList.add("scale-up");
          } else if (element.classList.contains("resource-item")) {
            element.classList.add("slide-up");
          } else if (element.classList.contains("card")) {
            element.classList.add("rotate-in");
          } else {
            element.classList.add("fade-in");
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
});

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
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

