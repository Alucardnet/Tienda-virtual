// ==========================================
// 1. FUNCIONES AUXILIARES DE VALIDACIÓN (CON REGLAS CORREGIDAS)
// ==========================================

// Bloquea caracteres no deseados en tiempo real (reemplaza al viejo controlTag)
function controlTag(e) {
    // Permitir teclas de control del sistema (Backspace, Delete, Arrow keys, Tab)
    if (e.key.length > 1) return true; 
    
    // Permitir solo números y espacios
    const patron = /[0-9\s]/;
    return patron.test(e.key);
}

// Valida texto con acentos y Ñ
function testText(txtString) {
    const stringText = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    return stringText.test(txtString);
}

// CORREGIDO: Valida enteros correctamente usando corchetes y requiriendo mínimo 1 dígito
function testEntero(intCant) {
    const intCantidad = /^[0-9]+$/; 
    return intCantidad.test(intCant);
}

// Valida formato de correo electrónico estándar
function fntEmailValidate(email) {
    const stringEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return stringEmail.test(email);
}

// ==========================================
// 2. ESCUCHADORES PARA AGREGAR CLASES DE BOOTSTRAP (is-invalid)
// ==========================================

function fntValidText() {
    const inputsText = document.querySelectorAll(".validText");
    inputsText.forEach(input => {
        // Usamos 'input' para capturar teclado, clics de autocompletado y "pegar" con mouse
        input.addEventListener('input', function() {
            // Si está vacío o no cumple el patrón de texto, es inválido
            if (this.value.trim() === "" || !testText(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
}

function fntValidNumber() {
    const inputsNumber = document.querySelectorAll(".validNumber");
    inputsNumber.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() === "" || !testEntero(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
}

function fntValidEmail() {
    const inputsEmail = document.querySelectorAll(".validEmail");
    inputsEmail.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() === "" || !fntEmailValidate(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });
    });
}

// ==========================================
// 3. INICIALIZACIÓN
// ==========================================

// Usamos DOMContentLoaded para arrancar tan pronto como el HTML esté listo, sin esperar imágenes
document.addEventListener('DOMContentLoaded', () => {
    fntValidText();
    fntValidEmail();
    fntValidNumber();
});