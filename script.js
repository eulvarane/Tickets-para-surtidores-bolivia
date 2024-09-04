document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('questionnaire-form');
  const selection = document.getElementById('selection');
	
  const vehiculoDiv = document.getElementById('carga-vehiculo');
	const placaSelect = document.getElementById('placa-vehiculo');
	const combustibleSelect = document.getElementById('tipo-combustible');
  const departamentoSelect = document.getElementById('departamento');
  const ciudadSelect = document.getElementById('ciudad');
  const surtidorSelect = document.getElementById('surtidor');
	const checkbox = document.getElementById('terminos'); // 
	
	const bidonDiv = document.getElementById('carga-bidon');
	const documentoSelect = document.getElementById('documento-identidad');
	const combustibleSelectBidon = document.getElementById('tipo-combustibleBidon');
  const departamentoSelectBidon = document.getElementById('departamentoBidon');
  const ciudadSelectBidon = document.getElementById('ciudadBidon');
  const surtidorSelectBidon = document.getElementById('surtidorBidon');
	const checkboxBidon = document.getElementById('terminosBidon'); // 
	
  const submitButton = form.querySelector('button[type="submit"]');

  const requiredFields = ['nombre', 'apellido', 'numero-celular', 'placa-vehiculo', 'tipo-combustible', 'departamento', 'ciudad', 'surtidor','terminos'];
	
	const requiredFieldsBidon = ['nombre', 'apellido', 'numero-celular', 'documento-identidad', 'tipo-combustibleBidon', 'departamentoBidon', 'ciudadBidon', 'surtidorBidon','terminosBidon'];

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
	
	
	//----------------------------Fills name for both forms--------------------------
	const nombreFields = document.querySelectorAll('#nombre');
	nombreFields.forEach((field, index) => {
			field.addEventListener('input', (event) => {
					const nombreValue = event.target.value;
					// Update the other 'nombre' field
					nombreFields.forEach((otherField, otherIndex) => {
							if (otherIndex !== index) {
									otherField.value = nombreValue;
							}
					});
					checkFormValidity(); // Check validity whenever the form section changes
			});
	});
	
	//----------------------------Fills last name for both forms--------------------------
	const apellidoFields = document.querySelectorAll('#apellido');
	apellidoFields.forEach((field, index) => {
			field.addEventListener('input', (event) => {
					const apellidoValue = event.target.value;
					// Update the other 'nombre' field
					apellidoFields.forEach((otherField, otherIndex) => {
							if (otherIndex !== index) {
									otherField.value = apellidoValue;
							}
					});
					checkFormValidity(); // Check validity whenever the form section changes
			});
	});
	
	//----------------------------Fills phone number for both forms--------------------------
	const phoneNumberFields = document.querySelectorAll('#numero-celular');
	phoneNumberFields.forEach((field, index) => {
			field.addEventListener('input', (event) => {
					const phoneNumberValue = event.target.value;
					// Update the other 'nombre' field
					phoneNumberFields.forEach((otherField, otherIndex) => {
							if (otherIndex !== index) {
									otherField.value = phoneNumberValue;
							}
					});
					checkFormValidity(); // Check validity whenever the form section changes
			});
	});
	
	
	
	
	//--------------------------------------------------------------------------------
  //---------Show or hide the appropriate form sections based on selection----------
	//--------------------------------------------------------------------------------
  selection.addEventListener('change', (event) => {
    const value = event.target.value;
    vehiculoDiv.classList.add('hidden');
    bidonDiv.classList.add('hidden');

    if (value === 'carga-vehiculo') {
      vehiculoDiv.classList.remove('hidden');
			placaSelect.value = '';
			combustibleSelect.value = '';
			departamentoSelect.value = '';
			ciudadSelect.value = '';
			surtidorSelect.value = '';
			checkbox.checked = false;
			
    } else if (value === 'carga-bidon') {
      bidonDiv.classList.remove('hidden');
      documentoSelect.value = '';
			combustibleSelectBidon.value = '';
			departamentoSelectBidon.value = '';
			ciudadSelectBidon.value = '';
			surtidorSelectBidon.value = '';
			checkboxBidon.checked = false;
    }

    checkFormValidity(); // Check validity whenever the form section changes
  });


//--------------------------------------------------------------------------------
//--------------Populate city options based on selected departamento--------------
//--------------------------------------------------------------------------------
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
	
	
	departamentoSelectBidon.addEventListener('change', (event) => {
    const departamentoBidon = event.target.value;
    const citiesListBidon = cities[departamentoBidon] || [];

    // Clear existing options
    ciudadSelectBidon.innerHTML = '<option value="">Select Ciudad</option>';

    // Populate new options
    citiesListBidon.forEach(city => {
      const optionBidon = document.createElement('option');
      optionBidon.value = city.toLowerCase().replace(/\s+/g, '-'); // Convert to a suitable value
      optionBidon.textContent = city;
      ciudadSelectBidon.appendChild(optionBidon);
    });
    // Clear the surtidor options as the ciudad has not been selected yet
    surtidorSelectBidon.innerHTML = '<option value="">Seleccione un surtidor</option>';
    checkFormValidity(); // Check validity whenever the city changes
  });
	
//--------------------------------------------------------------------------------
//------Populate surtidor options based on selected departamento and ciudad-------
//--------------------------------------------------------------------------------
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

	ciudadSelectBidon.addEventListener('change', (event) => {
    const departamentoBidon = departamentoSelectBidon.value;
    const ciudadBidon = event.target.value;
    const surtidoresListBidon = (surtidores[departamentoBidon] && surtidores[departamentoBidon][ciudadBidon]) || [];

    // Clear existing options
    surtidorSelectBidon.innerHTML = '<option value="">Seleccione un surtidor</option>';

    // Populate new options
    surtidoresListBidon.forEach(surtidor => {
      const optionBidon = document.createElement('option');
      optionBidon.value = surtidor.toLowerCase().replace(/\s+/g, '-'); // Convert to a suitable value
      optionBidon.textContent = surtidor;
      surtidorSelectBidon.appendChild(optionBidon);
    });

    checkFormValidity(); // Check validity whenever the ciudad changes
  });

//--------------------------------------------------------------------------------
//-------------Disable/Enable submit button based on form validity----------------
//--------------------------------------------------------------------------------
	const checkFormValidity = () => {
			let isValid = true;

			if (selection.value === 'carga-vehiculo') {
					requiredFields.forEach(id => {
							const field = document.getElementById(id);
							if (field && !field.value.trim()) {
									isValid = false;
							}
					});
					if(isValid===true && checkbox.checked === true){
						submitButton.disabled = false;
					}else {
            submitButton.disabled = true;
        }
					
			} else if (selection.value === 'carga-bidon') {
					requiredFieldsBidon.forEach(id => {
							const field = document.getElementById(id);
							if (field && !field.value.trim()) {
									isValid = false;
							}
					});
					if(isValid===true && checkboxBidon.checked === true){
						submitButton.disabled = false;
					}else {
            submitButton.disabled = true;
        }
			}
  };

//--------------------------------------------------------------------------------
//----Add an event listener to validate numeric input for 'numero de celular'-----
//--------------------------------------------------------------------------------



  // Attach keyup/change event listeners to required fields
  requiredFields.forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('keyup', checkFormValidity);
      field.addEventListener('change', checkFormValidity);
    }
  });
	
	requiredFieldsBidon.forEach(id => {
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
