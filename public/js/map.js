document.addEventListener("DOMContentLoaded", function() {
  const mapContainer = document.getElementById('map');
  
  const flyer = document.createElement('div');
  flyer.id = 'zoom-flyer';
  flyer.innerHTML = 'Pulsa CTRL para hacer Zoom';
  mapContainer.appendChild(flyer);

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

    return {
      marker,
      title: threat.title,
      description: threat.description,
      level: threat.level
    };
  });

  function getColor(level) {
    switch(level) {
      case 'Alta': return '#ff0000';
      case 'Media': return '#ffa500';
      case 'Baja': return '#ffff00';
      default: return '#ffffff';
    }
  }

  let isCtrlPressed = false;

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Control') {
      isCtrlPressed = true;
      map.scrollWheelZoom.enable();
      flyer.style.display = 'none';
    }
  });

  document.addEventListener('keyup', function(event) {
    if (event.key === 'Control') {
      isCtrlPressed = false;
      map.scrollWheelZoom.disable();
      flyer.style.display = 'block';
    }
  });

  map.scrollWheelZoom.disable();

  mapContainer.addEventListener('wheel', function(event) {
    if (!isCtrlPressed) {
      event.preventDefault(); 
    }
  });

  const searchBar = document.getElementById('search-bar-map');

  searchBar.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();

    markers.forEach(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm);
      if (matchesSearch) {
        item.marker.addTo(map);
      } else {
        map.removeLayer(item.marker);
      }
    });
  });
});
