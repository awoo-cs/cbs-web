document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('data-target');
      showCaseStudy(target);
    });
  });
  
  function showCaseStudy(target) {
    let title, impact, resolution, lessons;
  
    switch (target) {
      case 'caseStudy1':
        title = 'Ataque de Phishing a una Empresa de Comercio Electrónico';
        impact = 'Acceso a información sensible de clientes y pérdida financiera significativa.';
        resolution = 'Campaña de concientización sobre phishing y mejora de filtros de correo.';
        lessons = 'Importancia de la capacitación en ciberseguridad y filtros de correo robustos.';
        break;
      case 'caseStudy2':
        title = 'Ransomware en una Institución Educativa';
        impact = 'Interrupción de las operaciones y pérdida de datos importantes.';
        resolution = 'Restauración de datos desde copias de seguridad y actualización de sistemas de seguridad.';
        lessons = 'Importancia de las copias de seguridad y actualizaciones regulares de software.';
        break;
      case 'caseStudy3':
        title = 'Exfiltración de Datos en una Compañía de Tecnología';
        impact = 'Compromiso de información confidencial y daño a la reputación.';
        resolution = 'Parche de la vulnerabilidad y fortalecimiento de la seguridad de los sistemas.';
        lessons = 'Necesidad de monitoreo continuo y gestión de vulnerabilidades.';
        break;
      case 'caseStudy4':
        title = 'Ataque DDoS a un Proveedor de Servicios';
        impact = 'Interrupción del servicio y pérdida de clientes.';
        resolution = 'Implementación de soluciones de mitigación DDoS y fortalecimiento de la infraestructura.';
        lessons = 'Importancia de la preparación y respuesta ante incidentes DDoS.';
        break;
      case 'caseStudy5':
        title = 'Inyección SQL en una Aplicación Web';
        impact = 'Robo de datos sensibles y compromiso de la integridad de la base de datos.';
        resolution = 'Corrección del código vulnerable y aplicación de prácticas de codificación segura.';
        lessons = 'Necesidad de validación y saneamiento de entradas de usuario.';
        break;
      case 'caseStudy6':
        title = 'Brecha de Seguridad en una Red Social';
        impact = 'Pérdida de confianza de los usuarios y daño reputacional significativo.';
        resolution = 'Parche de la vulnerabilidad y mejora de las políticas de privacidad y seguridad.';
        lessons = 'Importancia de la seguridad de los datos y la privacidad de los usuarios.';
        break;
    }
  
    Swal.fire({
      title: title,
      html: `
        <p><strong>Impacto:</strong> ${impact}</p>
        <p><strong>Resolución:</strong> ${resolution}</p>
        <p><strong>Lecciones Aprendidas:</strong> ${lessons}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      customClass: {
        popup: 'modal-content',
        title: 'modal-title',
        content: 'modal-body',
        confirmButton: 'btn btn-primary',
      }
    });
  }
  