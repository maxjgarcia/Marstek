
const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');


form.addEventListener('submit', async function (event) {

    event.preventDefault();

    const FORM_ID = 'meopgwrr';
    // ---------------------

    if (FORM_ID === 'YOUR_FORM_ID_HERE') {
        showStatusMessage('Error: Please add your Formspree Form ID in the script.', false);
        return;
    }

    const formEndpoint = `https://formspree.io/f/${FORM_ID}`;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');


    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {

        const response = await fetch(formEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });


        if (response.ok) {
            showStatusMessage('¡Gracias! Tu mensaje ha sido enviado.', true);
            form.reset();
        } else {

            const data = await response.json();
            const errorMessage = data.errors?.map(err => err.message).join(', ') || 'Hubo un error al enviar el formulario.';
            showStatusMessage(`Error: ${errorMessage}`, false);
        }
    } catch (error) {

        console.error('Submission Error:', error);
        showStatusMessage('Error de red. Por favor, inténtalo de nuevo.', false);
    } finally {

        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
});


function showStatusMessage(message, isSuccess) {
    statusMessage.textContent = message;
    statusMessage.className = `text-center font-medium ${isSuccess ? 'text-green-400' : 'text-red-400'}`;
    statusMessage.style.opacity = '1';


    setTimeout(() => {
        statusMessage.style.opacity = '0';
    }, 5000);
}
