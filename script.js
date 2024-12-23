document.addEventListener('DOMContentLoaded', function () {
    const topicSelect = document.getElementById('department');
    const newTopicInput = document.getElementById('newDeptInput');
    const orgSelect = document.getElementById('organization-name');
    const newOrgInput = document.getElementById('newOrgInput');

    // Show input box if "Other" is selected
    topicSelect.addEventListener('change', function () {
        if (topicSelect.value === 'Other') {
            newTopicInput.style.display = 'block';
        } else {
            newTopicInput.style.display = 'none';
            newTopicInput.value = '';  // Reset input value
        }
    });

    orgSelect.addEventListener('change', function(){
        if(orgSelect.value==='Other'){
            newOrgInput.style.display='block';
        } else{
            newOrgInput.style.display='none';
            newOrgInput.value='';
        }
    });
    // Add new topic to the select element upon form submission
    document.getElementById('data-collection-form').addEventListener('submit', function (e) {
        e.preventDefault();  // Prevent the default form submission

        const newTopic = newTopicInput.value.trim();
        if (topicSelect.value === 'Other' && newTopic) {
            const option = document.createElement('option');
            option.value = newTopic.toLowerCase().replace(/\s+/g, '-');
            option.textContent = newTopic;

            // Insert the new option before "Other"
            topicSelect.insertBefore(option, topicSelect.querySelector('option[value="Other"]'));
            
            // Select the newly added option
            topicSelect.value = option.value;
            
            // Hide the input box
            newTopicInput.style.display = 'none';
            newTopicInput.value = '';
        }
        
        const newOrg = newOrgInput.value.trim();
        if(orgSelect.value==='Other'&&newOrg){
            const option = document.createElement('option');
            option.value = newOrg.toLowerCase().replace(/\s+/g,'-');
            option.textContent = newOrg;
            
            orgSelect.insertBefore(option, orgSelect.querySelector('option[value="Other"]'));

            orgSelect.value = option.value;

            newOrgInput.style.display = 'none';
            newOrgInput.value = '';
        }

        console.log("its working");
        const department = document.getElementById('department').value;
        console.log("its working2");
        const organization = document.getElementById('organization-name').value;
        console.log("its working3");
        var initiativeType = '';

        if(document.getElementById('non-profit').checked){
            initiativeType = document.getElementById('non-profit').value;
        } else if(document.getElementById('business').checked){
            initiativeType = document.getElementById('business').value;
        }
        console.log("its working4"); 

        const initiativeDate = document.getElementById('initiative-date').value;
        console.log("its working5"); 
        const typeOfSupport = document.getElementById('type-of-support').value;
        console.log("its working6"); 
        const provided = document.getElementById('provided').value;
        console.log("its working7"); 
        const focusArea = document.getElementById('focus-area').value;
        console.log("its working8"); 
        const whyItFits = document.getElementById('why-does-it-fit').value;
        console.log("its working9"); 

        const data = { 
            department, 
            organization, 
            initiativeType, 
            initiativeDate,
            typeOfSupport,
            provided,
            focusArea,
            whyItFits, 
        };         

        fetch('https://script.google.com/macros/s/AKfycbx79uVhEI5Rup5dvhPl4kDpMXP19J3Z_uekqR5BRttE-O1PkIU0L2sm4J4roavqHKTy/exec', { 
            method: 'POST', 
            body: JSON.stringify(data), 
            headers: { 
                'Content-Type': 'application/json' 
                } 
            }) 
            .then(response => response.text()) 
            .then(result => { 
                alert('Form submitted successfully. Thank you for helping improve LPSS!');
                document.getElementById('data-collection-form').reset();
            }) 
            .catch(error => { 
                console.error('Error!', error.message); 
            });
    });
});
