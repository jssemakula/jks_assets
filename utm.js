
// Function to append URL parameters to the form action before submission
function appendUrlParametersToForm() {
    const form = document.getElementById('pb_137705');
    const urlparams = new URLSearchParams(window.location.search);

    //alert(urlparams);

    // Listen for the form submit event
    form.addEventListener('submit', function (event) {
    //form.addEventListener('en__submit', function (event) {
        event.preventDefault(); // Prevent form submission until the action URL is modified
        
        // Append the parameters to the form action
        let actionUrl = form.action;
        urlparams.forEach((value, key) => {
            // Add '?' or '&' based on whether there are already parameters in the action URL
            actionUrl += actionUrl.includes('?') ? `&${key}=${value}` : `?${key}=${value}`;

            //alert(actionUrl);
        });

        // Debugging: check the final action URL after appending
        //console.log("Final form action URL: ", actionUrl);                

        // Update the form action with the new URL
        form.action = actionUrl;

        // Submit the form with the new action URL
        form.submit();
    });
}

// Call the function to modify form action before submission
appendUrlParametersToForm();
