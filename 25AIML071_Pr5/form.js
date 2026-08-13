const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const termsInput = document.getElementById("terms");

// Regular Expressions
const nameRegex = /^[A-Za-z ]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9][0-9]{9}$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;


// Show error
function showError(input, errorId, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");

    document.getElementById(errorId).textContent = message;
}


// Clear error
function clearError(input, errorId) {
    input.classList.remove("input-error");
    input.classList.add("input-success");

    document.getElementById(errorId).textContent = "";
}


// NAME VALIDATION
function validateName() {

    const name = nameInput.value.trim();

    if (name === "") {
        showError(
            nameInput,
            "nameError",
            "❌ Name is required."
        );
        return false;
    }

    if (!nameRegex.test(name)) {
        showError(
            nameInput,
            "nameError",
            "❌ Name must contain only letters and spaces."
        );
        return false;
    }

    clearError(nameInput, "nameError");
    return true;
}


// EMAIL VALIDATION
function validateEmail() {

    const email = emailInput.value.trim();

    if (email === "") {
        showError(
            emailInput,
            "emailError",
            "❌ Email address is required."
        );
        return false;
    }

    if (!emailRegex.test(email)) {
        showError(
            emailInput,
            "emailError",
            "❌ Please enter a valid email address."
        );
        return false;
    }

    clearError(emailInput, "emailError");
    return true;
}


// MOBILE VALIDATION
function validateMobile() {

    const mobile = mobileInput.value.trim();

    if (mobile === "") {
        showError(
            mobileInput,
            "mobileError",
            "❌ Mobile number is required."
        );
        return false;
    }

    if (!mobileRegex.test(mobile)) {
        showError(
            mobileInput,
            "mobileError",
            "❌ Enter a valid 10-digit Indian mobile number."
        );
        return false;
    }

    clearError(mobileInput, "mobileError");
    return true;
}


// PASSWORD STRENGTH
function checkPasswordStrength() {

    const password = passwordInput.value;

    const strengthBar =
        document.getElementById("strengthBar");

    const strengthText =
        document.getElementById("strengthText");

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    if (password.length === 0) {

        strengthBar.style.width = "0%";
        strengthText.textContent = "";

    } else if (score <= 2) {

        strengthBar.style.width = "33%";
        strengthText.textContent = "Weak Password";

    } else if (score <= 4) {

        strengthBar.style.width = "66%";
        strengthText.textContent = "Medium Password";

    } else {

        strengthBar.style.width = "100%";
        strengthText.textContent = "Strong Password";
    }
}


// PASSWORD VALIDATION
function validatePassword() {

    const password = passwordInput.value;

    if (password === "") {

        showError(
            passwordInput,
            "passwordError",
            "❌ Password is required."
        );

        return false;
    }

    if (!passwordRegex.test(password)) {

        showError(
            passwordInput,
            "passwordError",
            "❌ Password must have 8+ characters, uppercase, lowercase, number and special character."
        );

        return false;
    }

    clearError(passwordInput, "passwordError");
    return true;
}


// CONFIRM PASSWORD
function validateConfirmPassword() {

    const confirmPassword =
        confirmPasswordInput.value;

    if (confirmPassword === "") {

        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "❌ Please confirm your password."
        );

        return false;
    }

    if (confirmPassword !== passwordInput.value) {

        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "❌ Passwords do not match."
        );

        return false;
    }

    clearError(
        confirmPasswordInput,
        "confirmPasswordError"
    );

    return true;
}


// COURSE
function validateCourse() {

    if (courseInput.value === "") {

        showError(
            courseInput,
            "courseError",
            "❌ Please select a course."
        );

        return false;
    }

    clearError(courseInput, "courseError");
    return true;
}


// YEAR
function validateYear() {

    if (yearInput.value === "") {

        showError(
            yearInput,
            "yearError",
            "❌ Please select your year."
        );

        return false;
    }

    clearError(yearInput, "yearError");
    return true;
}


// GENDER
function validateGender() {

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    const error =
        document.getElementById("genderError");

    if (!gender) {

        error.textContent =
            "❌ Please select your gender.";

        return false;
    }

    error.textContent = "";
    return true;
}


// TERMS
function validateTerms() {

    const error =
        document.getElementById("termsError");

    if (!termsInput.checked) {

        error.textContent =
            "❌ You must accept the Terms and Conditions.";

        return false;
    }

    error.textContent = "";
    return true;
}


// REAL-TIME VALIDATION

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

mobileInput.addEventListener("input", validateMobile);

passwordInput.addEventListener(
    "input",
    function () {
        checkPasswordStrength();
        validatePassword();
    }
);

confirmPasswordInput.addEventListener(
    "input",
    validateConfirmPassword
);

courseInput.addEventListener(
    "change",
    validateCourse
);

yearInput.addEventListener(
    "change",
    validateYear
);

termsInput.addEventListener(
    "change",
    validateTerms
);


// SUBMIT VALIDATION

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validMobile = validateMobile();
    const validPassword = validatePassword();
    const validConfirmPassword =
        validateConfirmPassword();
    const validCourse = validateCourse();
    const validYear = validateYear();
    const validGender = validateGender();
    const validTerms = validateTerms();

    if (
        validName &&
        validEmail &&
        validMobile &&
        validPassword &&
        validConfirmPassword &&
        validCourse &&
        validYear &&
        validGender &&
        validTerms
    ) {

        document.getElementById(
            "successMessage"
        ).textContent =
            "Registration successful!";

        form.reset();

        document.getElementById(
            "strengthBar"
        ).style.width = "0%";

        document.getElementById(
            "strengthText"
        ).textContent = "";

    } else {

        document.getElementById(
            "successMessage"
        ).textContent = "";
    }
});