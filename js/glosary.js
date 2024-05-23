document.addEventListener("DOMContentLoaded", function () {

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