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


// Display Error
function showError(input, errorId, message) {
    input.classList.add("input-error");
    input.classList.remove("input-success");
    document.getElementById(errorId).textContent = message;
}


// Clear Error
function clearError(input, errorId) {
    input.classList.remove("input-error");
    input.classList.add("input-success");
    document.getElementById(errorId).textContent = "";
}


// Validate Name
function validateName() {

    if (nameInput.value.trim() === "") {
        showError(
            nameInput,
            "nameError",
            "Name is required."
        );
        return false;
    }

    if (!nameRegex.test(nameInput.value.trim())) {
        showError(
            nameInput,
            "nameError",
            "Enter a valid name using letters only."
        );
        return false;
    }

    clearError(nameInput, "nameError");
    return true;
}


// Validate Email
function validateEmail() {

    if (emailInput.value.trim() === "") {
        showError(
            emailInput,
            "emailError",
            "Email is required."
        );
        return false;
    }

    if (!emailRegex.test(emailInput.value.trim())) {
        showError(
            emailInput,
            "emailError",
            "Enter a valid email address."
        );
        return false;
    }

    clearError(emailInput, "emailError");
    return true;
}


// Validate Mobile
function validateMobile() {

    if (mobileInput.value.trim() === "") {
        showError(
            mobileInput,
            "mobileError",
            "Mobile number is required."
        );
        return false;
    }

    if (!mobileRegex.test(mobileInput.value.trim())) {
        showError(
            mobileInput,
            "mobileError",
            "Enter a valid 10-digit mobile number."
        );
        return false;
    }

    clearError(mobileInput, "mobileError");
    return true;
}


// Password Strength
function checkPasswordStrength() {

    const password = passwordInput.value;

    const strengthBar = document.getElementById("strengthBar");
    const strengthText = document.getElementById("strengthText");

    let score = 0;

    if (password.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (/[!@#$%^&*]/.test(password)) {
        score++;
    }


    if (password.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    }
    else if (score <= 2) {
        strengthBar.style.width = "33%";
        strengthText.textContent = "Weak Password";
    }
    else if (score <= 4) {
        strengthBar.style.width = "66%";
        strengthText.textContent = "Medium Password";
    }
    else {
        strengthBar.style.width = "100%";
        strengthText.textContent = "Strong Password";
    }
}


// Validate Password
function validatePassword() {

    const password = passwordInput.value;

    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (password === "") {
        showError(
            passwordInput,
            "passwordError",
            "Password is required."
        );
        return false;
    }

    if (!passwordRegex.test(password)) {
        showError(
            passwordInput,
            "passwordError",
            "Password must contain 8 characters, uppercase, lowercase, digit and special character."
        );
        return false;
    }

    clearError(passwordInput, "passwordError");
    return true;
}


// Validate Confirm Password
function validateConfirmPassword() {

    if (confirmPasswordInput.value === "") {
        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "Please confirm your password."
        );
        return false;
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "Passwords do not match."
        );
        return false;
    }

    clearError(
        confirmPasswordInput,
        "confirmPasswordError"
    );

    return true;
}


// Validate Course
function validateCourse() {

    if (courseInput.value === "") {
        showError(
            courseInput,
            "courseError",
            "Please select a course."
        );
        return false;
    }

    clearError(courseInput, "courseError");
    return true;
}


// Validate Year
function validateYear() {

    if (yearInput.value === "") {
        showError(
            yearInput,
            "yearError",
            "Please select your year."
        );
        return false;
    }

    clearError(yearInput, "yearError");
    return true;
}


// Validate Gender
function validateGender() {

    const gender =
        document.querySelector('input[name="gender"]:checked');

    const error = document.getElementById("genderError");

    if (!gender) {
        error.textContent = "Please select your gender.";
        return false;
    }

    error.textContent = "";
    return true;
}


// Validate Terms
function validateTerms() {

    if (!termsInput.checked) {
        document.getElementById("termsError").textContent =
            "You must accept the Terms and Conditions.";

        return false;
    }

    document.getElementById("termsError").textContent = "";

    return true;
}


// Password strength in real time
passwordInput.addEventListener(
    "input",
    checkPasswordStrength
);


// Real-time validation
nameInput.addEventListener("blur", validateName);
emailInput.addEventListener("blur", validateEmail);
mobileInput.addEventListener("blur", validateMobile);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener(
    "blur",
    validateConfirmPassword
);

courseInput.addEventListener("change", validateCourse);
yearInput.addEventListener("change", validateYear);


// Submit Form
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

        document.getElementById("successMessage").textContent =
            "Registration successful!";

        form.reset();

        document.getElementById("strengthBar").style.width = "0%";
        document.getElementById("strengthText").textContent = "";
    }
    else {

        document.getElementById("successMessage").textContent = "";
    }

});