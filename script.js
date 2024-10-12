// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Handle Email Subscription Form
    const emailForm = document.getElementById("emailForm");
    const emailInput = document.getElementById("emailInput");
    const emailMessage = document.getElementById("emailMessage");

    emailForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const email = emailInput.value;
        if (validateEmail(email)) {
            sendFormDataToGoogleSheet({ email: email }, "email");
            showSuccessMessage(emailMessage, "Thank you for subscribing!");
        } else {
            showErrorMessage(emailMessage, "Please enter a valid email address.");
        }
    });

    // Handle Contact Form
    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value;
        const email = document.getElementById("contactEmail").value;
        const phone = document.getElementById("contactPhone").value;
        const message = document.getElementById("contactMessageContent").value;

        if (validateEmail(email) && name && message) {
            const contactData = { name: name, email: email, phone: phone, message: message };
            sendFormDataToGoogleSheet(contactData, "contact");
            showSuccessMessage(contactMessage, "Your message has been sent successfully!");
        } else {
            showErrorMessage(contactMessage, "Please fill out all required fields correctly.");
        }
    });
});

// Helper Functions

// Email validation using regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Display a success message
function showSuccessMessage(element, message) {
    element.textContent = message;
    element.style.color = "green";
    element.style.display = "block";
}

// Display an error message
function showErrorMessage(element, message) {
    element.textContent = message;
    element.style.color = "red";
    element.style.display = "block";
}

// Send form data to Google Sheets (using Google Apps Script URL as backend)
function sendFormDataToGoogleSheet(formData, formType) {
    const scriptURL = "https://script.google.com/macros/s/your-google-app-script-url/exec"; // Replace with your Google Apps Script URL

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            formType: formType,
            formData: formData
        })
    })
    .then(response => {
        if (response.ok) {
            console.log(`${formType} form submitted successfully.`);
        } else {
            console.error(`${formType} form submission failed.`);
        }
    })
    .catch(error => console.error("Error submitting form:", error));
}
