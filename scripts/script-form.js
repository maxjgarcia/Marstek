// Get the form and status message elements
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');

// Add the submit event listener
form.addEventListener('submit', async function (event) {
    // Prevent the default form submission (page reload)
    event.preventDefault();

    // --- CONFIGURATION ---
    // 1. Sign up at https://formspree.io/
    // 2. Create a new form.
    // 3. Formspree will give you an endpoint URL like: https://formspree.io/f/xlegyqlg
    // 4. Copy the 8-character ID (e.g., "xlegyqlg") and paste it below.
    const FORM_ID = 'meopgwrr';
    // ---------------------

    if (FORM_ID === 'YOUR_FORM_ID_HERE') {
        showStatusMessage('Error: Please add your Formspree Form ID in the script.', false);
        return;
    }

    const formEndpoint = `https://formspree.io/f/${FORM_ID}`;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');

    // Disable button and show loading text
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
        // Send the data using fetch
        const response = await fetch(formEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        // Check if the submission was successful
        if (response.ok) {
            showStatusMessage('¡Gracias! Tu mensaje ha sido enviado.', true);
            form.reset(); // Clear the form fields
        } else {
            // Handle server errors
            const data = await response.json();
            const errorMessage = data.errors?.map(err => err.message).join(', ') || 'Hubo un error al enviar el formulario.';
            showStatusMessage(`Error: ${errorMessage}`, false);
        }
    } catch (error) {
        // Handle network errors
        console.error('Submission Error:', error);
        showStatusMessage('Error de red. Por favor, inténtalo de nuevo.', false);
    } finally {
        // Re-enable the button
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});

// Helper function to show the status message
function showStatusMessage(message, isSuccess) {
    statusMessage.textContent = message;
    statusMessage.className = `text-center font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'}`;
    statusMessage.style.opacity = '1';

    // Hide the message after 5 seconds
    setTimeout(() => {
        statusMessage.style.opacity = '0';
    }, 5000);
}
