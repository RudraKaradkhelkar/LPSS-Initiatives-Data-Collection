document.addEventListener('DOMContentLoaded', function () {
    fetch('https://script.google.com/macros/s/AKfycbwtUkwrA8eC1G4XCfuQJHaaWXeBHYDuUqFqSczndseN6TP0kNXbjziPmEhFsFLBP4LC/exec')
        .then(response => response.json())
        .then(data => {
            populateSelect(deptSelect, data.departments, newDeptInput);
            populateSelect(orgSelect, data.organizations, newOrgInput);
        });

    const deptSelect = document.getElementById('department');
    const newDeptInput = document.getElementById('newDeptInput');
    const otherDeptOption = document.createElement('option'); 
    otherDeptOption.value = 'OTHER'; 
    otherDeptOption.textContent = 'Other'; 
    deptSelect.appendChild(otherDeptOption); 


    const orgSelect = document.getElementById('organization-name');
    const newOrgInput = document.getElementById('newOrgInput');
    const otherOrgOption = document.createElement('option');
    otherOrgOption.value = 'OTHER';
    otherOrgOption.textContent = 'Other';
    orgSelect.appendChild(otherOrgOption);
  
    deptSelect.addEventListener('change', function () {
        toggleInputVisibility(deptSelect, newDeptInput);
    });

    orgSelect.addEventListener('change', function () {
        toggleInputVisibility(orgSelect, newOrgInput);
    });

    document.getElementById('data-collection-form').addEventListener('submit', function (e) {
        e.preventDefault();

        
        const newDept = newDeptInput.value.trim();
        if (deptSelect.value === 'OTHER' && newDept) {
            const option = document.createElement('option'); 
            option.value = newDept.toUpperCase()//.replace(/\s+/g, '-'); //Used to format value
            option.textContent = newDept;
            
            deptSelect.append(option);  
            
            deptSelect.value = option.value;

            newDeptInput.style.display = 'none'; 
            newDeptInput.value = ''; 
        }
        const newOrg = newOrgInput.value.trim();
        if(orgSelect.value==='OTHER'&&newOrg){
            const option = document.createElement('option'); 
            option.value = newOrg.toUpperCase()//.replace(/\s+/g, '-'); //Used to format value
            option.textContent = newOrg;
            
            orgSelect.append(option);  
            
            orgSelect.value = option.value;

            newOrgInput.style.display = 'none'; 
            newOrgInput.value = '';
            
        }

        const timestampInput = document.getElementById('timestamp');
        const currentTimestamp = new Date();
        const offset = -6; 
        const centralTime = new Date(currentTimestamp.getTime() + offset * 3600 * 1000);            
        timestampInput.value = centralTime.toISOString();


        const formData = new FormData(this);

        fetch('https://script.google.com/macros/s/AKfycby8UfSlLSTM74sibUpDF8nPQfYsMWGEW1_k5i46VFS26zB6LICta0QT6nuUwm-pwzFgUA/exec', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                alert("Form submitted successfully. Thank you for supporting LPSS!");
                if(newDept){
                    deptSelect.removeChild(deptSelect.lastChild);
                }
                if(newOrg){
                    orgSelect.removeChild(orgSelect.lastChild);
                }
                
                document.getElementById('data-collection-form').reset();
                deptSelect.value = '';
                orgSelect.value = '';
            })
            .catch(error => console.error('Error:', error));
    });

    function populateSelect(selectElement, options, newInput) {
        options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            selectElement.appendChild(option);
        });


        toggleInputVisibility(selectElement, newInput);
    }

    function toggleInputVisibility(selectElement, inputElement) {
        if (selectElement.value === 'OTHER') {
            inputElement.style.display = 'block';
        } else {
            inputElement.style.display = 'none';
            inputElement.value = '';
        }
    }
});
