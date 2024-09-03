document.addEventListener('DOMContentLoaded', () => {
    const selection = document.getElementById('selection');
    const vehiculoDiv = document.getElementById('carga-vehiculo');
    const bidonDiv = document.getElementById('carga-bidon');
    const departamentoSelect = document.getElementById('departamento');
    const ciudadSelect = document.getElementById('ciudad');

    // Define the cities for each departamento
    const cities = {
        'la-paz': ['La Paz', 'El Alto', 'Viacha'],
        'oruro': ['Oruro', 'Huanuni', 'Cochabamba'],
        'potosi': ['Potosí', 'Uyuni', 'Villazón'],
        'pando': ['Cobija', 'Bella Vista', 'Bolívar'],
        'santa-cruz': ['Santa Cruz', 'Warnes', 'Montero'],
        'tarija': ['Tarija', 'Villamontes', 'Yacuiba'],
        'beni': ['Trinidad', 'Riberalta', 'Guayaramerín'],
        'cochabamba': ['Cochabamba', 'Quillacollo', 'Sacaba'],
        'chuquisaca': ['Sucre', 'Yamparaez', 'Monteagudo'],
    };

    // Show or hide the appropriate form sections based on selection
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

    // Populate city options based on selected departamento
    departamentoSelect.addEventListener('change', (event) => {
        const departamento = event.target.value;
        const citiesList = cities[departamento] || [];
        
        // Clear existing options
        ciudadSelect.innerHTML = '';

        // Populate new options
        citiesList.forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase().replace(/\s+/g, '-'); // Convert to a suitable value
            option.textContent = city;
            ciudadSelect.appendChild(option);
        });
    });

    // Handle form submission
    document.getElementById('questionnaire-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('https://YOUR_CLOUD_FUNCTION_URL/submitForm', {
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

