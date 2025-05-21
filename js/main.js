import { initNavigation } from './navigation.js';
import { initAnimations, animateNumbers } from './animation.js';

import { initMenu } from './menu.js';
import { initModal } from './modal.js';

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initMenu();
    initModal();
    animateNumbers();

    // Obtener elementos del DOM
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

        // Crear el contenido del modal
        modalContent.innerHTML = `
            <h2 class="modal-main-title">${service.titulo}</h2>
            <p class="modal-desc">${service.descripcion}</p>
            
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
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Agregar event listeners a los botones "Conoce más"
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            console.log('Botón clickeado, servicio:', serviceId); // Para debugging
            showModal(serviceId);
        });
    });

    // Cerrar modal al hacer clic en el botón de cerrar
    closeButton.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cerrar modal al hacer clic fuera del contenido
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
