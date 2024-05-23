window.onload = function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("navbar").innerHTML = data));

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
};


document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});


// Añadir clases de depuración al abrir el modal
$('#myModal').on('show.bs.modal', function (e) {
  $('.modal-backdrop').addClass('modal-backdrop-debug');
  $('#myModal').addClass('modal-debug');
});

// Remover clases de depuración al cerrar el modal
$('#myModal').on('hidden.bs.modal', function (e) {
  $('.modal-backdrop').removeClass('modal-backdrop-debug');
  $('#myModal').removeClass('modal-debug');
});
