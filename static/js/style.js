document.addEventListener("DOMContentLoaded", () => {

    // Animación secuencial de entrada
    const heroSection = document.getElementById("heroSection");
    const formCard = document.getElementById("formCard");
    const tableCard = document.getElementById("tableCard");
    const tableBody = document.getElementById("tableBody");
    const mobileCards = document.getElementById("mobileCards");

    // Hero section aparece primero
    setTimeout(() => {
        heroSection.classList.remove("opacity-0");
        heroSection.classList.add("opacity-100");
    }, 100);

    // Formulario aparece después
    setTimeout(() => {
        formCard.classList.remove("opacity-0");
        formCard.classList.add("opacity-100");
    }, 300);

    // Tabla aparece al final
    setTimeout(() => {
        tableCard.classList.remove("opacity-0");
        tableCard.classList.add("opacity-100");
    }, 500);

    // Contenido de la tabla con delay adicional
    setTimeout(() => {
        if (tableBody) {
            tableBody.classList.remove("opacity-0");
            tableBody.classList.add("opacity-100");
        }
        if (mobileCards) {
            mobileCards.classList.remove("opacity-0");
            mobileCards.classList.add("opacity-100");
        }
    }, 700);

    // Animaciones del botón submit
    const btn = document.getElementById("btnSubmit");
    
    btn.addEventListener("mouseover", () => {
        btn.classList.add("scale-105");
    });
    
    btn.addEventListener("mouseout", () => {
        btn.classList.remove("scale-105");
    });

    // Manejo del formulario
    const form = document.getElementById("leadForm");
    
    form.addEventListener("submit", (e) => {
        // Cambiar el estado del botón
        btn.innerHTML = `
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Guardando...</span>
        `;
        btn.disabled = true;
        btn.classList.add("opacity-75", "cursor-not-allowed");
    });

    // Animación de hover en las filas de la tabla
    const tableRows = document.querySelectorAll("#tableBody tr");
    tableRows.forEach((row, index) => {
        // Animación de entrada escalonada
        setTimeout(() => {
            row.style.opacity = "0";
            row.style.transform = "translateX(-20px)";
            setTimeout(() => {
                row.style.transition = "all 0.3s ease-out";
                row.style.opacity = "1";
                row.style.transform = "translateX(0)";
            }, 50);
        }, index * 50);
    });

    // Validación en tiempo real del formulario
    const emailInput = form.querySelector('input[name="correo"]');
    const nombreInput = form.querySelector('input[name="nombre"]');
    
    // Color de validación personalizado
    const errorBorderColor = 'oklch(63.7% 0.237 25.331)';

    emailInput.addEventListener("blur", function() {
        if (this.value && !this.validity.valid) {
            this.style.borderColor = errorBorderColor;
            this.style.setProperty('--tw-ring-color', errorBorderColor);
            this.classList.remove("border-gray-300");
        } else {
            this.style.borderColor = '';
            this.style.setProperty('--tw-ring-color', '');
            this.classList.add("border-gray-300");
        }
    });

    nombreInput.addEventListener("blur", function() {
        if (this.value.trim().length < 3) {
            this.style.borderColor = errorBorderColor;
            this.classList.remove("border-gray-300");
        } else {
            this.style.borderColor = '';
            this.classList.add("border-gray-300");
        }
    });

    // Efecto de focus en los inputs
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener("focus", function() {
            this.parentElement.classList.add("scale-102");
        });
        
        input.addEventListener("blur", function() {
            this.parentElement.classList.remove("scale-102");
        });
    });

    // Contador de caracteres para el nombre (opcional)
    nombreInput.addEventListener("input", function() {
        if (this.value.length > 50) {
            this.value = this.value.substring(0, 50);
        }
    });

    // Smooth scroll si hay errores (para formularios largos)
    const formErrors = document.querySelectorAll('.error-message');
    if (formErrors.length > 0) {
        formErrors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

});