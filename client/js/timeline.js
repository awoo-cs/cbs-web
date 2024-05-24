document.addEventListener("DOMContentLoaded", function () {

    const timelineEvents = document.querySelectorAll(
      ".historia-ciberseguridad .timeline-event"
    );
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );
  
    timelineEvents.forEach((event) => {
      observer.observe(event);
    });
  });