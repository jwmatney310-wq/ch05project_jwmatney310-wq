// Jackson Matney | October 6, 2026
const form = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const missingCount = document.getElementById("missing-count");
const validationResult = document.getElementById("validation-result");
const submitButton = document.getElementById("submit-button");

/* <p>checkMissing checks each required field for an empty value.
It displays the number of incomplete fields and returns that number.</p> */
function checkMissing() {
    const requiredFields = document.querySelectorAll(".required");
    let missing = 0;

    for (const field of requiredFields) {
        if (field.value.trim() === "") {
            missing++;
            field.setAttribute("aria-invalid", "true");
        } else {
            field.removeAttribute("aria-invalid");
        }
    }

    missingCount.textContent = "Required fields still incomplete: " + missing;
    return missing;
}

/* <p>validateEmail checks the email's length and address format.
It adds a red border for an invalid email and removes it for a valid one.</p> */
function validateEmail() {
    const email = emailInput.value.trim();
    const valid = email.length >= 8 && emailInput.validity.valid;

    if (valid) {
        emailInput.classList.remove("invalid-email");
        emailInput.removeAttribute("aria-invalid");
    } else {
        emailInput.classList.add("invalid-email");
        emailInput.setAttribute("aria-invalid", "true");
    }

    return valid;
}

/* <p>validateForm runs both validation checks. It stops the form's default
submission, shows an alert for errors, and reports when all checks pass.
This practice form validates data locally without sending it anywhere.</p> */
function validateForm(event) {
    event.preventDefault();
    const missing = checkMissing();
    const emailValid = validateEmail();

    if (missing > 0 || !emailValid) {
        validationResult.textContent = "Please correct the form and try again.";
        alert("Please complete all required fields and enter a valid email address with at least eight characters.");
        return;
    }

    validationResult.textContent = "All validation checks passed. This practice form does not send your information.";
}

submitButton.addEventListener("click", validateForm);
form.addEventListener("submit", validateForm);
missingCount.textContent = "Required fields still incomplete: 3";
