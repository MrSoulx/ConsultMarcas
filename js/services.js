import { serviciosData } from './servicesData.js';

document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.querySelector('.service-more-modal-overlay');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.close-more');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    // Función para mostrar el modal con el contenido del servicio
    function showModal(serviceId) {
        const service = serviciosData[serviceId];
        if (!service) {
            console.error('Servicio no encontrado:', serviceId);
            return;
        }

        // Título y descripción
        modalContent.innerHTML = `
            <h2 class="modal-main-title">${service.titulo}</h2>
            <p class="modal-desc">${service.descripcion}</p>
        `;

        // Mostrar bloque especial "que" si existe
        if (service.que) {
            modalContent.innerHTML += `
                <div class="modal-what-is">
                    <h3 class="modal-subtitle">${service.que.titulo}</h3>
                    <p>${service.que.descripcion}</p>
                    <ul class="modal-benefits">
                        ${service.que.protege.map(item => `
                            <li>
                                <i class="fas fa-check benefit-icon"></i>
                                ${item}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Beneficios
        modalContent.innerHTML += `
            <div class="modal-benefits-card">
                <h3 class="modal-subtitle">Beneficios</h3>
                <ul class="modal-benefits">
                    ${service.beneficios.map(beneficio => `
                        <li>
                            <i class="fas fa-check benefit-icon"></i>
                            ${beneficio}
                        </li>
                    `).join('')}
                </ul>
            </div>
            <div class="modal-process-card">
                <h3 class="modal-process-title">Nuestro Proceso</h3>
                <ol class="modal-process-list">
                    ${service.proceso.map(paso => `
                        <li>${paso}</li>
                    `).join('')}
                </ol>
            </div>
        `;

        // Mostrar el modal
        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Agregar event listeners a los botones "Conoce más"
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            showModal(serviceId);
        });
    });

    // Cerrar modal al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', function() {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}); 