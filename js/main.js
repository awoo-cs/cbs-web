window.onload = function () {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("navbar").innerHTML = data));

  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => (document.getElementById("footer").innerHTML = data));
};

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
});

let object = document.querySelector(".casos-de-estudio");

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
});

if (object) {
  observer.observe(object);
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document ready!");

  const timelineEvents = document.querySelectorAll(
    ".historia-ciberseguridad .timeline-event"
  );
  console.log(
    `Eventos de la línea de tiempo encontrados: ${timelineEvents.length}`
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        console.log("Observando entrada:", entry);
        if (entry.isIntersecting) {
          console.log("Elemento en vista:", entry.target);
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
    console.log("Observando evento:", event);
    observer.observe(event);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Document ready!");

  const searchBar = document.getElementById("search-bar");
  const alphabetButtons = document.querySelectorAll(".alphabet-index .btn");
  const resultadosDiv = document.getElementById("glosario-resultados");

  // Sample glossary terms
  const glossaryTerms = {
    A: [
      {
        term: "Antivirus",
        definition: "Software designed to detect and destroy computer viruses.",
      },
      {
        term: "Authentication",
        definition:
          "The process of verifying the identity of a user or device.",
      },
    ],
    B: [
      {
        term: "Botnet",
        definition:
          "A network of private computers infected with malicious software.",
      },
      {
        term: "Brute Force Attack",
        definition:
          "An attack that tries all possible combinations of passwords.",
      },
    ],
    C: [
      {
        term: "Cybersecurity",
        definition:
          "The practice of protecting systems, networks, and programs from digital attacks.",
      },
      {
        term: "Cryptography",
        definition:
          "The practice of secure communication in the presence of third parties.",
      },
    ],
    D: [
      {
        term: "Data Breach",
        definition:
          "The intentional or unintentional release of secure information.",
      },
      {
        term: "Denial of Service (DoS)",
        definition:
          "An attack that makes a machine or network resource unavailable to its intended users.",
      },
    ],
    E: [
      {
        term: "Encryption",
        definition:
          "The process of converting information into a code to prevent unauthorized access.",
      },
      {
        term: "Endpoint",
        definition:
          "A device that serves as a connection point between two or more devices.",
      },
    ],
    F: [
      {
        term: "Firewall",
        definition:
          "A network security system that monitors and controls incoming and outgoing network traffic.",
      },
      {
        term: "Firmware",
        definition: "Software that is embedded into hardware devices.",
      },
    ],
    G: [
      {
        term: "Gray Hat",
        definition:
          "A hacker who may violate ethical standards but without malicious intent.",
      },
      {
        term: "Griefer",
        definition:
          "A player who deliberately irritates and harasses other players.",
      },
    ],
    H: [
      {
        term: "Hacker",
        definition:
          "A person who uses computers to gain unauthorized access to data.",
      },
      {
        term: "Honeypot",
        definition:
          "A security mechanism set to detect, deflect, or counteract attempts at unauthorized use of information systems.",
      },
    ],
    I: [
      {
        term: "Incident Response",
        definition: "The process of responding to computer security incidents.",
      },
      {
        term: "IoT",
        definition:
          "The network of physical devices, vehicles, home appliances, and other items embedded with electronics, software, sensors, actuators, and connectivity.",
      },
    ],
    J: [
      {
        term: "JavaScript",
        definition:
          "A programming language that enables interactive web pages.",
      },
      { term: "JSON", definition: "A lightweight data-interchange format." },
    ],
    K: [
      {
        term: "Keylogger",
        definition:
          "A type of surveillance software that records every keystroke.",
      },
      {
        term: "Kerberos",
        definition: "A computer network authentication protocol.",
      },
    ],
    L: [
      {
        term: "Logic Bomb",
        definition:
          "A piece of code intentionally inserted into a software system that will set off a malicious function when specified conditions are met.",
      },
      {
        term: "LAN",
        definition: "A network that connects computers in a limited area.",
      },
    ],
    M: [
      {
        term: "Malware",
        definition:
          "Software designed to disrupt, damage, or gain unauthorized access to a computer system.",
      },
      {
        term: "MITM",
        definition:
          "A cyberattack where the attacker secretly intercepts and possibly alters the communication between two parties.",
      },
    ],
    N: [
      {
        term: "Network",
        definition: "A group of two or more computer systems linked together.",
      },
      {
        term: "NIST",
        definition: "The National Institute of Standards and Technology.",
      },
    ],
    O: [
      {
        term: "Open Source",
        definition:
          "Software with source code that anyone can inspect, modify, and enhance.",
      },
      { term: "OSINT", definition: "Open-source intelligence." },
    ],
    P: [
      {
        term: "Phishing",
        definition:
          "The fraudulent attempt to obtain sensitive information by disguising oneself as a trustworthy entity.",
      },
      {
        term: "Patch",
        definition:
          "A piece of software designed to update a computer program or its supporting data.",
      },
    ],
    Q: [
      { term: "Qubit", definition: "The basic unit of quantum information." },
      {
        term: "Quantum Computing",
        definition:
          "The use of quantum-mechanical phenomena to perform computation.",
      },
    ],
    R: [
      {
        term: "Ransomware",
        definition:
          "A type of malware that threatens to publish the victim's data or perpetually block access to it unless a ransom is paid.",
      },
      {
        term: "Rootkit",
        definition:
          "A collection of computer software, typically malicious, designed to enable access to a computer or an area of its software that is not otherwise allowed.",
      },
    ],
    S: [
      {
        term: "Spyware",
        definition:
          "Software that enables a user to obtain covert information about another's computer activities.",
      },
      {
        term: "SQL Injection",
        definition:
          "A code injection technique used to attack data-driven applications.",
      },
    ],
    T: [
      {
        term: "Trojan Horse",
        definition:
          "A type of malware that is often disguised as legitimate software.",
      },
      {
        term: "Threat Intelligence",
        definition:
          "Information that helps an organization understand the risks to its environment.",
      },
    ],
    U: [
      { term: "URL", definition: "A reference to a web resource." },
      {
        term: "USB",
        definition:
          "A common type of computer port used to connect various devices.",
      },
    ],
    V: [
      {
        term: "Virus",
        definition:
          "A type of malware that is capable of copying itself and spreading to other computers.",
      },
      {
        term: "VPN",
        definition: "A secure tunnel between two or more devices.",
      },
    ],
    W: [
      {
        term: "Worm",
        definition:
          "A type of malware that is capable of spreading and replicating itself.",
      },
      { term: "WPA", definition: "Wi-Fi Protected Access." },
    ],
    X: [
      { term: "XSS", definition: "Cross-Site Scripting." },
      { term: "XML", definition: "Extensible Markup Language." },
    ],
    Y: [
      {
        term: "YARA",
        definition:
          "A tool aimed at helping malware researchers to identify and classify malware samples.",
      },
      { term: "YubiKey", definition: "A hardware authentication device." },
    ],
    Z: [
      {
        term: "Zero-Day",
        definition:
          "A software security flaw that is known to the software vendor but doesn't have a patch available.",
      },
      {
        term: "Zombie",
        definition:
          "A computer connected to the Internet that has been compromised by a hacker, computer virus, or trojan horse.",
      },
    ],
  };

  // Function to display terms
  function displayTerms(letter) {
    resultadosDiv.innerHTML = ""; // Clear previous results
    if (glossaryTerms[letter]) {
      glossaryTerms[letter].forEach((term) => {
        const termElement = document.createElement("div");
        termElement.className = "term";
        termElement.innerHTML = `<h4>${term.term}</h4><p>${term.definition}</p>`;
        resultadosDiv.appendChild(termElement);
      });
    } else {
      resultadosDiv.innerHTML = "No terms available for this letter.";
    }
    resultadosDiv.style.display = "block";
  }

  // Event listener for search bar
  searchBar.addEventListener("input", function () {
    const query = searchBar.value.toLowerCase();
    resultadosDiv.innerHTML = ""; // Clear previous results
    if (query === "") {
      resultadosDiv.style.display = "none";
      return;
    }
    for (const letter in glossaryTerms) {
      glossaryTerms[letter].forEach((term) => {
        if (term.term.toLowerCase().includes(query)) {
          const termElement = document.createElement("div");
          termElement.className = "term";
          termElement.innerHTML = `<h4>${term.term}</h4><p>${term.definition}</p>`;
          resultadosDiv.appendChild(termElement);
        }
      });
    }
    resultadosDiv.style.display = "block";
  });

  // Event listeners for alphabet buttons
  alphabetButtons.forEach((button) => {
    button.addEventListener("click", function () {
      searchBar.value = ""; // Clear the search bar
      const letter = button.getAttribute("data-letter");
      displayTerms(letter);
    });
  });
});










document.addEventListener("DOMContentLoaded", function() {
  const map = L.map('map').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const threatData = [
    { lat: 40.7128, lon: -74.0060, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Nueva York.' },
    { lat: 34.0522, lon: -118.2437, level: 'Media', title: 'Phishing', description: 'Campaña de phishing en Los Ángeles.' },
    { lat: 51.5074, lon: -0.1278, level: 'Alta', title: 'Malware', description: 'Distribución de malware en Londres.' },
    { lat: 48.8566, lon: 2.3522, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en París.' },
    { lat: 35.6895, lon: 139.6917, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Tokio.' },
    { lat: -33.8688, lon: 151.2093, level: 'Media', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Sídney.' },
    { lat: 55.7558, lon: 37.6173, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Moscú.' },
    { lat: 39.9042, lon: 116.4074, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Pekín.' },
    { lat: 19.4326, lon: -99.1332, level: 'Media', title: 'Malware', description: 'Distribución de malware en Ciudad de México.' },
    { lat: 37.7749, lon: -122.4194, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en San Francisco.' },
    { lat: -23.5505, lon: -46.6333, level: 'Media', title: 'Spyware', description: 'Spyware detectado en São Paulo.' },
    { lat: 52.5200, lon: 13.4050, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Berlín.' },
    { lat: 31.2304, lon: 121.4737, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Shanghái.' },
    { lat: 41.9028, lon: 12.4964, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Roma.' },
    { lat: 28.6139, lon: 77.2090, level: 'Media', title: 'Malware', description: 'Distribución de malware en Nueva Delhi.' },
    { lat: 40.4168, lon: -3.7038, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Madrid.' },
    { lat: 13.7563, lon: 100.5018, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en Bangkok.' },
    { lat: 33.8688, lon: 151.2093, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Sídney.' },
    { lat: 45.4654, lon: 9.1859, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Milán.' },
    { lat: -34.6037, lon: -58.3816, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Buenos Aires.' },
    { lat: 51.1657, lon: 10.4515, level: 'Media', title: 'Malware', description: 'Distribución de malware en Alemania.' },
    { lat: -22.9068, lon: -43.1729, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Río de Janeiro.' },
    { lat: -26.2041, lon: 28.0473, level: 'Media', title: 'Spyware', description: 'Spyware detectado en Johannesburgo.' },
    { lat: 37.9838, lon: 23.7275, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Atenas.' },
    { lat: 59.3293, lon: 18.0686, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Estocolmo.' },
    { lat: 41.3851, lon: 2.1734, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Barcelona.' },
    { lat: -1.2921, lon: 36.8219, level: 'Media', title: 'Malware', description: 'Distribución de malware en Nairobi.' },
    { lat: 50.1109, lon: 8.6821, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Fráncfort.' },
    { lat: 60.1695, lon: 24.9354, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en Helsinki.' },
    { lat: 43.6511, lon: -79.3470, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Toronto.' },
    { lat: 1.3521, lon: 103.8198, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Singapur.' },
    { lat: 14.5995, lon: 120.9842, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Manila.' },
    { lat: 55.7558, lon: 37.6173, level: 'Media', title: 'Malware', description: 'Distribución de malware en Moscú.' },
    { lat: 40.7128, lon: -74.0060, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Nueva York.' },
    { lat: 34.0522, lon: -118.2437, level: 'Media', title: 'Phishing', description: 'Campaña de phishing en Los Ángeles.' },
    { lat: 51.5074, lon: -0.1278, level: 'Alta', title: 'Malware', description: 'Distribución de malware en Londres.' },
    { lat: 48.8566, lon: 2.3522, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en París.' },
    { lat: 35.6895, lon: 139.6917, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Tokio.' },
    { lat: -33.8688, lon: 151.2093, level: 'Media', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Sídney.' },
    { lat: 55.7558, lon: 37.6173, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Moscú.' },
    { lat: 39.9042, lon: 116.4074, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Pekín.' },
    { lat: 19.4326, lon: -99.1332, level: 'Media', title: 'Malware', description: 'Distribución de malware en Ciudad de México.' },
    { lat: 37.7749, lon: -122.4194, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en San Francisco.' },
    { lat: -23.5505, lon: -46.6333, level: 'Media', title: 'Spyware', description: 'Spyware detectado en São Paulo.' },
    { lat: 52.5200, lon: 13.4050, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Berlín.' },
    { lat: 31.2304, lon: 121.4737, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Shanghái.' },
    { lat: 41.9028, lon: 12.4964, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Roma.' },
    { lat: 28.6139, lon: 77.2090, level: 'Media', title: 'Malware', description: 'Distribución de malware en Nueva Delhi.' },
    { lat: 40.4168, lon: -3.7038, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Madrid.' },
    { lat: 13.7563, lon: 100.5018, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en Bangkok.' },
    { lat: 33.8688, lon: 151.2093, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Sídney.' },
    { lat: 45.4654, lon: 9.1859, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Milán.' },
    { lat: -34.6037, lon: -58.3816, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Buenos Aires.' },
    { lat: 51.1657, lon: 10.4515, level: 'Media', title: 'Malware', description: 'Distribución de malware en Alemania.' },
    { lat: -22.9068, lon: -43.1729, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Río de Janeiro.' },
    { lat: -26.2041, lon: 28.0473, level: 'Media', title: 'Spyware', description: 'Spyware detectado en Johannesburgo.' },
    { lat: 37.9838, lon: 23.7275, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Atenas.' },
    { lat: 59.3293, lon: 18.0686, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Estocolmo.' },
    { lat: 41.3851, lon: 2.1734, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Barcelona.' },
    { lat: -1.2921, lon: 36.8219, level: 'Media', title: 'Malware', description: 'Distribución de malware en Nairobi.' },
    { lat: 50.1109, lon: 8.6821, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Fráncfort.' },
    { lat: 60.1695, lon: 24.9354, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en Helsinki.' },
    { lat: 43.6511, lon: -79.3470, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Toronto.' },
    { lat: 1.3521, lon: 103.8198, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Singapur.' },
    { lat: 14.5995, lon: 120.9842, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Manila.' },
    { lat: 55.7558, lon: 37.6173, level: 'Media', title: 'Malware', description: 'Distribución de malware en Moscú.' },
    { lat: 40.7128, lon: -74.0060, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Nueva York.' },
    { lat: 34.0522, lon: -118.2437, level: 'Media', title: 'Phishing', description: 'Campaña de phishing en Los Ángeles.' },
    { lat: 51.5074, lon: -0.1278, level: 'Alta', title: 'Malware', description: 'Distribución de malware en Londres.' },
    { lat: 48.8566, lon: 2.3522, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en París.' },
    { lat: 35.6895, lon: 139.6917, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Tokio.' },
    { lat: -33.8688, lon: 151.2093, level: 'Media', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Sídney.' },
    { lat: 55.7558, lon: 37.6173, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Moscú.' },
    { lat: 39.9042, lon: 116.4074, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Pekín.' },
    { lat: 19.4326, lon: -99.1332, level: 'Media', title: 'Malware', description: 'Distribución de malware en Ciudad de México.' },
    { lat: 37.7749, lon: -122.4194, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en San Francisco.' },
    { lat: -23.5505, lon: -46.6333, level: 'Media', title: 'Spyware', description: 'Spyware detectado en São Paulo.' },
    { lat: 52.5200, lon: 13.4050, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Berlín.' },
    { lat: 31.2304, lon: 121.4737, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Shanghái.' },
    { lat: 41.9028, lon: 12.4964, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Roma.' },
    { lat: 28.6139, lon: 77.2090, level: 'Media', title: 'Malware', description: 'Distribución de malware en Nueva Delhi.' },
    { lat: 40.4168, lon: -3.7038, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Madrid.' },
    { lat: 13.7563, lon: 100.5018, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en Bangkok.' },
    { lat: 33.8688, lon: 151.2093, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Sídney.' },
    { lat: 45.4654, lon: 9.1859, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Milán.' },
    { lat: -34.6037, lon: -58.3816, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Buenos Aires.' },
    { lat: 51.1657, lon: 10.4515, level: 'Media', title: 'Malware', description: 'Distribución de malware en Alemania.' },
    { lat: -22.9068, lon: -43.1729, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Río de Janeiro.' },
    { lat: -26.2041, lon: 28.0473, level: 'Media', title: 'Spyware', description: 'Spyware detectado en Johannesburgo.' },
    { lat: 37.9838, lon: 23.7275, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Atenas.' },
    { lat: 59.3293, lon: 18.0686, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Estocolmo.' },
    { lat: 41.3851, lon: 2.1734, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Barcelona.' },
    { lat: -1.2921, lon: 36.8219, level: 'Media', title: 'Malware', description: 'Distribución de malware en Nairobi.' },
    { lat: 50.1109, lon: 8.6821, level: 'Alta', title: 'Ataque DDoS', description: 'Ataque de denegación de servicio en Fráncfort.' },
    { lat: 60.1695, lon: 24.9354, level: 'Baja', title: 'Spyware', description: 'Spyware detectado en Helsinki.' },
    { lat: 43.6511, lon: -79.3470, level: 'Alta', title: 'Ataque Ransomware', description: 'Ataque de ransomware en Toronto.' },
    { lat: 1.3521, lon: 103.8198, level: 'Alta', title: 'Intrusión', description: 'Intento de intrusión en Singapur.' },
    { lat: 14.5995, lon: 120.9842, level: 'Baja', title: 'Phishing', description: 'Campaña de phishing en Manila.' }
  ];

  const markers = threatData.map(threat => {
    const marker = L.circleMarker([threat.lat, threat.lon], {
      radius: 8,
      fillColor: getColor(threat.level),
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    }).addTo(map);

    const popupContent = `<div class="popup-content"><h4>${threat.title}</h4><p>${threat.description}</p></div>`;
    marker.bindPopup(popupContent);

    return marker;
  });

  function getColor(level) {
    switch(level) {
      case 'Alta': return '#ff0000';
      case 'Media': return '#ffa500';
      case 'Baja': return '#ffff00';
      default: return '#ffffff';
    }
  }
});