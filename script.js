document.addEventListener("DOMContentLoaded", function() {
    const departamentoSelect = document.getElementById("departamento");
    const ciudadSelect = document.getElementById("ciudad");
    const submitButton = document.getElementById("submitButton");

    // Populate city dropdown based on selected department
    const cities = {
        "la paz": ["La Paz", "El Alto", "Viacha"],
        "oruro": ["Oruro"],
        "potosi": ["Potosí", "Uyuni"],
        "pando": ["Cobija"],
        "santa cruz": ["Santa Cruz de la Sierra", "Montero"],
        "tarija": ["Tarija"],
        "beni": ["Trinidad", "Riberalta"],
        "cochabamba": ["Cochabamba", "Sacaba"],
        "chuquisaca": ["Sucre"]
    };

    departamentoSelect.addEventListener("change", function() {
        const selectedDepartamento = departamentoSelect.value;
        ciudadSelect.innerHTML = "";

        if (cities[selectedDepartamento]) {
            cities[selectedDepartamento].forEach(function(city) {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                ciudadSelect.appendChild(option);
            });
        }
    });

    // Form validation
    const formElements = document.querySelectorAll("input[type='text'], select, input[type='checkbox']");
    formElements.forEach(element => {
        element.addEventListener("input", checkFormValidity);
        element.addEventListener("change", checkFormValidity);
    });

    function checkFormValidity() {
        let isValid = true;

        // Validate text inputs
        formElements.forEach(element => {
            if (element.type === "text" && element.value.trim() === "") {
                isValid = false;
            }

            // Validate numeric input for phone number
            if (element.id === "celular" && isNaN(element.value.trim())) {
                isValid = false;
            }

            // Validate checkbox
            if (element.type === "checkbox" && !element.checked) {
                isValid = false;
            }
        });

        // Enable or disable the submit button
        if (isValid) {
            submitButton.disabled = false;
            submitButton.style.opacity = "1";
            submitButton.style.pointerEvents = "auto";
        } else {
            submitButton.disabled = true;
            submitButton.style.opacity = "0.5";
            submitButton.style.pointerEvents = "none";
        }
    }

    // Initial check
    checkFormValidity();
});
