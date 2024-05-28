const slider = document.getElementById("slider");

  if (slider) {
    slider.addEventListener("mouseover", function () {
      this.classList.add("paused");
    });

    slider.addEventListener("mouseout", function () {
      this.classList.remove("paused");
    });
  } else {
    console.error('Element with ID "slider" not found.');
  }