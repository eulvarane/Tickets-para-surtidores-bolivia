document.addEventListener('DOMContentLoaded', () => {
    const selection = document.getElementById('selection');
    const vehiculoDiv = document.getElementById('carga-vehiculo');
    const bidonDiv = document.getElementById('carga-bidon');

    selection.addEventListener('change', (event) => {
        const value = event.target.value;
        vehiculoDiv.classList.add('hidden');
        bidonDiv.classList.add('hidden');

        if (value === 'carga-vehiculo') {
            vehiculoDiv.classList.remove('hidden');
        } else if (value === 'carga-bidon') {
            bidonDiv.classList.remove('hidden');
        }
    });

    document.getElementById('questionnaire-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('https://YOUR_CLOUD_FUNCTION_URL', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('Failed to submit the form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    });
});
