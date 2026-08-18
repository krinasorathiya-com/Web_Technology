const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const termsInput = document.getElementById("terms");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const successMessage = document.getElementById("successMessage");


// ================= REGULAR EXPRESSIONS =================

const nameRegex = /^[A-Za-z ]{3,50}$/;

const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const mobileRegex =
    /^[6-9][0-9]{9}$/;

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%&*]).{8,}$/;


// ================= ERROR FUNCTION =================

function showError(input, errorId, message) {

    input.classList.remove("valid");
    input.classList.add("invalid");

    document.getElementById(errorId).textContent = message;

    alert(message);
}


// ================= VALID FUNCTION =================

function showValid(input, errorId) {

    input.classList.remove("invalid");
    input.classList.add("valid");

    document.getElementById(errorId).textContent = "";
}


// ================= NAME VALIDATION =================

function validateName() {

    const value = nameInput.value.trim();

    if (value === "") {

        showError(
            nameInput,
            "nameError",
            "Please enter your full name."
        );

        return false;
    }

    if (!nameRegex.test(value)) {

        showError(
            nameInput,
            "nameError",
            "Invalid name! Name should contain only letters and spaces."
        );

        return false;
    }

    showValid(nameInput, "nameError");

    return true;
}


// ================= EMAIL VALIDATION =================

function validateEmail() {

    const value = emailInput.value.trim();

    if (value === "") {

        showError(
            emailInput,
            "emailError",
            "Please enter your email address."
        );

        return false;
    }

    if (!emailRegex.test(value)) {

        showError(
            emailInput,
            "emailError",
            "Invalid email! Please enter a valid email address."
        );

        return false;
    }

    showValid(emailInput, "emailError");

    return true;
}


// ================= MOBILE VALIDATION =================

function validateMobile() {

    const value = mobileInput.value.trim();

    if (value === "") {

        showError(
            mobileInput,
            "mobileError",
            "Please enter your mobile number."
        );

        return false;
    }

    if (!mobileRegex.test(value)) {

        showError(
            mobileInput,
            "mobileError",
            "Invalid mobile number! Enter a valid 10-digit number starting with 6-9."
        );

        return false;
    }

    showValid(mobileInput, "mobileError");

    return true;
}


// ================= PASSWORD STRENGTH =================

function checkPasswordStrength() {

    const password = passwordInput.value;

    let strength = 0;

    if (password.length >= 8) {
        strength++;
    }

    if (/[a-z]/.test(password)) {
        strength++;
    }

    if (/[A-Z]/.test(password)) {
        strength++;
    }

    if (/[0-9]/.test(password)) {
        strength++;
    }

    if (/[@#$!%&*]/.test(password)) {
        strength++;
    }

    if (password.length === 0) {

        strengthBar.style.width = "0%";
        strengthText.textContent = "Password strength";

        return;
    }

    if (strength <= 2) {

        strengthBar.style.width = "30%";
        strengthText.textContent = "Weak password";

    } else if (strength === 3 || strength === 4) {

        strengthBar.style.width = "70%";
        strengthText.textContent = "Medium password";

    } else {

        strengthBar.style.width = "100%";
        strengthText.textContent = "Strong password";
    }
}


// ================= PASSWORD VALIDATION =================

function validatePassword() {

    const value = passwordInput.value;

    checkPasswordStrength();

    if (value === "") {

        showError(
            passwordInput,
            "passwordError",
            "Please enter a password."
        );

        return false;
    }

    if (!passwordRegex.test(value)) {

        showError(
            passwordInput,
            "passwordError",
            "Invalid password! Password must contain at least 8 characters, uppercase letter, lowercase letter, number and special character."
        );

        return false;
    }

    showValid(passwordInput, "passwordError");

    return true;
}


// ================= CONFIRM PASSWORD =================

function validateConfirmPassword() {

    const password = passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;

    if (confirmPassword === "") {

        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "Please confirm your password."
        );

        return false;
    }

    if (password !== confirmPassword) {

        showError(
            confirmPasswordInput,
            "confirmPasswordError",
            "Passwords do not match!"
        );

        return false;
    }

    showValid(
        confirmPasswordInput,
        "confirmPasswordError"
    );

    return true;
}


// ================= COURSE =================

function validateCourse() {

    if (courseInput.value === "") {

        showError(
            courseInput,
            "courseError",
            "Please select your course."
        );

        return false;
    }

    showValid(courseInput, "courseError");

    return true;
}


// ================= YEAR =================

function validateYear() {

    if (yearInput.value === "") {

        showError(
            yearInput,
            "yearError",
            "Please select your year."
        );

        return false;
    }

    showValid(yearInput, "yearError");

    return true;
}


// ================= GENDER =================

function validateGender() {

    const gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    const error =
        document.getElementById("genderError");

    if (!gender) {

        error.textContent =
            "Please select your gender.";

        alert("Please select your gender.");

        return false;
    }

    error.textContent = "";

    return true;
}


// ================= TERMS =================

function validateTerms() {

    if (!termsInput.checked) {

        document.getElementById("termsError").textContent =
            "Please accept the Terms and Conditions.";

        alert("Please accept the Terms and Conditions.");

        return false;
    }

    document.getElementById("termsError").textContent = "";

    return true;
}


// ================= REAL-TIME PASSWORD STRENGTH =================

passwordInput.addEventListener(
    "input",
    checkPasswordStrength
);


// ================= FORM SUBMIT =================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    successMessage.style.display = "none";

    /*
       Validate one by one.
       If something is wrong,
       alert() will be displayed.
    */

    if (!validateName()) {
        nameInput.focus();
        return;
    }

    if (!validateEmail()) {
        emailInput.focus();
        return;
    }

    if (!validateMobile()) {
        mobileInput.focus();
        return;
    }

    if (!validatePassword()) {
        passwordInput.focus();
        return;
    }

    if (!validateConfirmPassword()) {
        confirmPasswordInput.focus();
        return;
    }

    if (!validateCourse()) {
        courseInput.focus();
        return;
    }

    if (!validateYear()) {
        yearInput.focus();
        return;
    }

    if (!validateGender()) {
        return;
    }

    if (!validateTerms()) {
        termsInput.focus();
        return;
    }


    // ================= SUCCESS =================

    alert("Registration Successful!");

    successMessage.textContent =
        "Registration successful! Your details have been submitted.";

    successMessage.style.display = "block";

    form.reset();

    document
        .querySelectorAll("input, select")
        .forEach(function(element) {

            element.classList.remove("valid");
            element.classList.remove("invalid");

        });

    strengthBar.style.width = "0%";

    strengthText.textContent =
        "Password strength";

});