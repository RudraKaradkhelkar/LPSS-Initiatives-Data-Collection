document.addEventListener('DOMContentLoaded', function () {
    const deptSelect = document.getElementById('department');
    const newDeptInput = document.getElementById('newDeptInput');
    const otherDeptOption = document.createElement('option'); 
    
    otherDeptOption.value = 'OTHER'; 
    otherDeptOption.textContent = 'Other'; 
    deptSelect.appendChild(otherDeptOption); 

    const savedDeptOptions = JSON.parse(localStorage.getItem('customOptions')) || [];
    savedDeptOptions.forEach(option => addDeptOption(option));


    const orgSelect = document.getElementById('organization-name');
    const newOrgInput = document.getElementById('newOrgInput');
    const otherOrgOption = document.createElement('option');
    
    otherOrgOption.value = 'OTHER';
    otherOrgOption.textContent = 'Other';
    orgSelect.appendChild(otherOrgOption);

    const savedOrgOptions = JSON.parse(localStorage.getItem('customOptions2')) || [];
    savedOrgOptions.forEach(option => addOrgOption(option));

    deptSelect.addEventListener('change', function () {
        if (deptSelect.value === 'OTHER') {
            newDeptInput.style.display = 'block';
        } else {
            newDeptInput.style.display = 'none';
            newDeptInput.value = '';
        }
    });

    orgSelect.addEventListener('change', function(){
        if(orgSelect.value==='OTHER'){
            newOrgInput.style.display='block';
        } else{
            newOrgInput.style.display='none';
            newOrgInput.value='';
        }
    });

    document.getElementById('data-collection-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const newDept = newDeptInput.value.trim();
        if (deptSelect.value === 'OTHER' && newDept) {
            const option = document.createElement('option'); 
            option.value = newDept.toUpperCase()//.replace(/\s+/g, '-'); //Used to format value
            option.textContent = newDept;
            deptSelect.insertBefore(option, otherDeptOption);  

            deptSelect.value = option.value;
            // Save the new option to local storage 
            savedDeptOptions.push(newDept); 
            localStorage.setItem('customOptions', JSON.stringify(savedDeptOptions)); 

            newDeptInput.style.display = 'none'; 
            newDeptInput.value = '';
        }
        

        const newOrg = newOrgInput.value.trim();
        if(orgSelect.value==='OTHER'&&newOrg){
            const option = document.createElement('option'); 
            option.value = newOrg.toUpperCase()//.replace(/\s+/g, '-'); //Used to format value
            option.textContent = newOrg;
            orgSelect.insertBefore(option, otherOrgOption);  

            orgSelect.value = option.value;
            // Save the new option to local storage 
            savedOrgOptions.push(newOrg); 
            localStorage.setItem('customOptions2', JSON.stringify(savedOrgOptions)); 

            newOrgInput.style.display = 'none'; 
            newOrgInput.value = '';
        }


        const timestampInput = document.getElementById('timestamp');
        const currentTimestamp = new Date();
        const offset = -6; 
        const centralTime = new Date(currentTimestamp.getTime() + offset * 3600 * 1000);            
        timestampInput.value = centralTime.toISOString();

		const formData = new FormData(this); 
		fetch(this.action, { 
			method: 'POST', 
			body: formData, 
		}) 
		.then(response => response.json()) 
		.then(data => {
            alert("It worked");
            document.getElementById('data-collection-form').reset();
            deptSelect.value = '';
		}) 
		.catch(error => console.error('Error:', error)); 
	});

    function addDeptOption(value) { 
        const option = document.createElement('option'); 
        option.value = value.toUpperCase()//.replace(/\s+/g, '-'); //Used to format value
        option.textContent = value; 
        deptSelect.insertBefore(option, otherDeptOption); 
    }

    function addOrgOption(value) { 
        const option = document.createElement('option'); 
        option.value = value.toUpperCase()//.replace(/\s+/g, '-'); //Used to format value
        option.textContent = value; 
        orgSelect.insertBefore(option, otherOrgOption); 
    }
});
