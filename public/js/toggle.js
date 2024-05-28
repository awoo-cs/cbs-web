document.getElementById("toggle").addEventListener("change", function () {
    const tipsContent = document.getElementById("tips-content");
    const malwareContent = document.getElementById("malware-content");
    if (this.checked) {
      tipsContent.style.display = "block";
      malwareContent.style.display = "none";
    } else {
      tipsContent.style.display = "none";
      malwareContent.style.display = "block";
    }
  });