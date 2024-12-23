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
    });
});
