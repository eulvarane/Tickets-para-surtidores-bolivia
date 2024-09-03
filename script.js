document.addEventListener('DOMContentLoaded', () => {
    const selection = document.getElementById('selection');
    const vehiculoDiv = document.getElementById('carga-vehiculo');
    const bidonDiv = document.getElementById('carga-bidon');
    const departamentoSelect = document.getElementById('departamento');
    const ciudadSelect = document.getElementById('ciudad');
    const surtidorSelect = document.getElementById('surtidor');
    const form = document.getElementById('questionnaire-form');
    const submitButton = form.querySelector('button[type="submit"]');
    
    const requiredFields = ['nombre', 'apellido', 'numero-celular', 'placa-vehiculo', 'tipo-combustible', 'departamento', 'ciudad', 'surtidor'];
  
    const checkbox = document.getElementById('terminos'); // Replace with the actual checkbox ID
    
    // Disable the submit button on initial load
    submitButton.disabled = true;
  
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
    
  // Define the surtidores for each departamento and ciudad combination
    const surtidores = {
        'la-paz': {
            'la-paz': ['Surtidor 1', 'Surtidor 2'],
            'el-alto': ['Surtidor 3', 'Surtidor 4'],
            'viacha': ['Surtidor 5'],
        },
        'oruro': {
            'oruro': ['Surtidor 6', 'Surtidor 7'],
            'huanuni': ['Surtidor 8'],
            'cochabamba': ['Surtidor 9'], // Note: Cochabamba as a city in Oruro department
        },
        // Add other departamento and ciudad combinations with their respective surtidores here
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
            surtidorSelect.innerHTML = '<option value="">Seleccione un surtidor</option>';
        }

        checkFormValidity(); // Check validity whenever the form section changes
    });

    // Populate city options based on selected departamento
    departamentoSelect.addEventListener('change', (event) => {
        const departamento = event.target.value;
        const citiesList = cities[departamento] || [];
        
        // Clear existing options
        ciudadSelect.innerHTML = '<option value="">Select Ciudad</option>';

        // Populate new options
        citiesList.forEach(city => {
            const option = document.createElement('option');
            option.value = city.toLowerCase().replace(/\s+/g, '-'); // Convert to a suitable value
            option.textContent = city;
            ciudadSelect.appendChild(option);
        });
        // Clear the surtidor options as the ciudad has not been selected yet
        surtidorSelect.innerHTML = '<option value="">Seleccione un surtidor</option>';
        checkFormValidity(); // Check validity whenever the city changes
    });

    
  // Populate surtidor options based on selected departamento and ciudad
    ciudadSelect.addEventListener('change', (event) => {
        const departamento = departamentoSelect.value;
        const ciudad = event.target.value;
        const surtidoresList = (surtidores[departamento] && surtidores[departamento][ciudad]) || [];
        
        // Clear existing options
        surtidorSelect.innerHTML = '<option value="">Seleccione un surtidor</option>';

        // Populate new options
        surtidoresList.forEach(surtidor => {
            const option = document.createElement('option');
            option.value = surtidor.toLowerCase().replace(/\s+/g, '-'); // Convert to a suitable value
            option.textContent = surtidor;
            surtidorSelect.appendChild(option);
        });

        checkFormValidity(); // Check validity whenever the ciudad changes
    });
  
  
    // Disable/Enable submit button based on form validity
    const checkFormValidity = () => {
        let isValid = true;

        requiredFields.forEach(id => {
            const field = document.getElementById(id);
            if (field && !field.value.trim()) {
                isValid = false;
            }

            // Check if 'numero de celular' is numeric
            if (id === 'numero-celular' && field && isNaN(field.value.trim())) {
                isValid = false;
                field.setCustomValidity('Please enter a valid numeric value.'); // Set custom validation message
            } else if (id === 'numero-celular' && field) {
                field.setCustomValidity(''); // Clear any previous validation message
            }
        });

        submitButton.disabled = !isValid; // Disable button if any required field is empty or invalid
    };

    // Add an event listener to validate numeric input for 'numero de celular'
    document.getElementById('numero-celular').addEventListener('input', function() {
        if (isNaN(this.value.trim())) {
            this.setCustomValidity('Please enter a valid numeric value.');
        } else {
            this.setCustomValidity('');
        }
    });


    // Attach keyup/change event listeners to required fields
    requiredFields.forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('keyup', checkFormValidity);
            field.addEventListener('change', checkFormValidity);
        }
    });

    // Validate form before submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Prepare form data for submission
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Submit form data
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
