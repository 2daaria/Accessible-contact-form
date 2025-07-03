const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitBtn = document.querySelector("#submit-btn");
const radioInputs = document.querySelectorAll('input[name="query-type"]');
const checkbox = document.querySelector('#consent');
const toast = document.querySelector("#toast");


// SHOW/HIDE ERROR-STATE
function showError(field, errorText) {
    document.querySelector(`#${field}-error`).textContent = `${errorText}`;
    document.querySelector(`#${field}-error`).classList.add('error-msg');
    document.querySelector(`#${field}`).classList.add('error');
}

function clearError(field) {
    document.querySelector(`#${field}-error`).textContent = "";
    document.querySelector(`#${field}-error`).classList.remove('error-msg');
    document.querySelector(`#${field}`).classList.remove('error');
}

// EMAIL VALIDATION
function isValidEmail(userEmail) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
}

// MAIN VALIDATION
function validateFields() {

    // TEXT-FIELDS
    const fields = [
        {id: 'first-name', value: firstName.value.trim()},
        {id: 'last-name', value: lastName.value.trim()},
        {id: 'email', value: email.value.trim()},
        {id: 'message', value: message.value.trim()}
    ];

    let hasError = false;

    fields.forEach(field => {
        if (field.value === "") {
            showError(field.id, "This field is required");
            hasError = true;
        }
    });

    // email validation
    if (email.value.trim() !== "" && !isValidEmail(email.value.trim())) {
        showError('email', "Please enter a valid email address");
        hasError = true;
    }

    // VALIDATION RADIO & CHECKBOX
    const radios = document.querySelectorAll('input[name="query-type"]');

    const isSelected = Array.from(radios).some(function (radio) {
        return radio.checked;
    });

    if (!isSelected) {
        document.querySelector(`#query-type-error`).textContent = 'Please select a query type';
        document.querySelector(`#query-type-error`).classList.add('error-msg');
        hasError = true;
    } else {
        document.querySelector(`#query-type-error`).textContent = "";
        document.querySelector(`#query-type-error`).classList.remove('error-msg');
    }

    //checkbox
    if (!checkbox.checked) {
        document.querySelector(`#consent-error`).textContent = 'To submit this form, please consent to being contacted';
        document.querySelector(`#consent-error`).classList.add('error-msg');
        hasError = true;
    } else {
        document.querySelector(`#consent-error`).textContent = "";
        document.querySelector(`#consent-error`).classList.remove('error-msg');
    }

    if (hasError) {
        return;
    }

    return !hasError;
}

//CLEAR INPUTS IF ERROR CORRECTED
firstName.addEventListener("input", () => {
    clearError("first-name")
});

lastName.addEventListener("input", () => {
    clearError("last-name")
})

email.addEventListener("input", () => {
    clearError("email")
})

message.addEventListener("input", () => {
    clearError("message")
})

radioInputs.forEach(radio => {
    radio.addEventListener("change", () => {
        document.querySelector(`#query-type-error`).textContent = "";
        document.querySelector(`#query-type-error`).classList.remove('error-msg');
    });
});

checkbox.addEventListener("change", () => {
    document.querySelector(`#consent-error`).textContent = "";
    document.querySelector(`#consent-error`).classList.remove('error-msg');
})

// TOAST
function showToast() {
    toast.classList.add('show');
    setTimeout(hideToast, 4000);
}

function hideToast() {
    toast.classList.remove('show');
}

// SUBMIT
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const isValid = validateFields();
    if (isValid) {
        showToast()
        document.querySelector('form').reset()
    }
});
