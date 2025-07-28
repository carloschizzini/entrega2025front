document.addEventListener('DOMContentLoaded', () => {
  // Seleccionamos el formulario por su ID
  const contactForm = document.getElementById('contact-form');

  // Nos aseguramos de que el formulario exista antes de agregar el listener
  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      // Si la validación falla, prevenimos el envío.
      // La función validateForm se encarga de mostrar los errores.
      if (!validateForm(contactForm)) {
        event.preventDefault();
      }
    });
  }
});

/**
 * Valida los campos del formulario de contacto.
 * @param {HTMLFormElement} form - El formulario a validar.
 * @returns {boolean} - Devuelve true si el formulario es válido, de lo contrario false.
 */
function validateForm(form) {
  // Empezamos asumiendo que el formulario es válido
  let isValid = true;
  // Limpiamos los errores previos antes de cada validación
  clearErrors();

  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const message = form.querySelector('#message');

  // 1. Validación del Nombre
  const nameValue = name.value.trim();
  if (nameValue === '') {
    showError('name-error', 'El nombre es obligatorio.');
    isValid = false;
  } else if (nameValue.split(' ').length > 1) {
    showError('name-error', 'Solo el primer nombre.');
    isValid = false;
  }

  // 2. Validación del Email
  const emailValue = email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailValue === '') {
    showError('email-error', 'El email es obligatorio.');
    isValid = false;
  } else if (!emailRegex.test(emailValue)) {
    showError('email-error', 'El formato del email no es válido.');
    isValid = false;
  }

  // 3. Validación del Mensaje
  const messageValue = message.value.trim();
  // Usamos una expresión regular para contar palabras y manejar múltiples espacios
  const wordCount = messageValue === '' ? 0 : messageValue.split(/\s+/).length;
  if (messageValue === '') {
    showError('message-error', 'El mensaje es obligatorio.');
    isValid = false;
  } else if (wordCount < 6) {
    showError('message-error', 'Al menos debe escribir 6 palabras.');
    isValid = false;
  }

  return isValid;
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(el => el.textContent = '');
}