const form = document.getElementById("registrationForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const canvas = document.getElementById("captchaCanvas");
const ctx = canvas.getContext("2d");

let captcha = "";

/* ---------- CAPTCHA ---------- */

function generateCaptcha() {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    captcha = "";

    for (let i = 0; i < 5; i++) {
        captcha += characters[
            Math.floor(Math.random() * characters.length)
        ];
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold 27px Arial";
    ctx.fillStyle = "#333333";
    ctx.fillText(captcha, 35, 35);
}

generateCaptcha();

document.getElementById("refreshCaptcha")
    .addEventListener("click", generateCaptcha);


/* ---------- PASSWORD STRENGTH ---------- */

password.addEventListener("keyup", function () {

    let score = 0;

    if (password.value.length >= 8) score++;
    if (/[A-Z]/.test(password.value)) score++;
    if (/[a-z]/.test(password.value)) score++;
    if (/[0-9]/.test(password.value)) score++;
    if (/[^A-Za-z0-9]/.test(password.value)) score++;

    strengthBar.style.width = (score * 20) + "%";

    if (score <= 2) {
        strengthText.textContent = "Weak Password";
    }
    else if (score <= 4) {
        strengthText.textContent = "Medium Password";
    }
    else {
        strengthText.textContent = "Strong Password";
    }
});


/* ---------- VALIDATION FUNCTIONS ---------- */

function validateName() {

    const regex = /^[A-Za-z ]{3,40}$/;

    if (!regex.test(name.value.trim())) {
        document.getElementById("nameError").textContent =
            "Enter a valid name.";
        return false;
    }

    document.getElementById("nameError").textContent = "";
    return true;
}


function validateEmail() {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value)) {
        document.getElementById("emailError").textContent =
            "Enter a valid email.";
        return false;
    }

    document.getElementById("emailError").textContent = "";
    return true;
}


function validateMobile() {

    const regex = /^[6-9][0-9]{9}$/;

    if (!regex.test(mobile.value)) {
        document.getElementById("mobileError").textContent =
            "Enter a valid 10-digit mobile number.";
        return false;
    }

    document.getElementById("mobileError").textContent = "";
    return true;
}


function validatePassword() {

    const regex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!regex.test(password.value)) {
        document.getElementById("passwordError").textContent =
            "Password needs 8 characters, uppercase, lowercase, number and symbol.";
        return false;
    }

    document.getElementById("passwordError").textContent = "";
    return true;
}


function validateConfirmPassword() {

    if (password.value !== confirmPassword.value) {
        document.getElementById("confirmError").textContent =
            "Passwords do not match.";
        return false;
    }

    document.getElementById("confirmError").textContent = "";
    return true;
}


/* ---------- REAL-TIME VALIDATION ---------- */

name.addEventListener("keyup", validateName);
email.addEventListener("keyup", validateEmail);
mobile.addEventListener("keyup", validateMobile);
password.addEventListener("keyup", validatePassword);
confirmPassword.addEventListener("keyup", validateConfirmPassword);


/* ---------- FORM SUBMISSION ---------- */

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let valid = true;

    if (!validateName()) valid = false;
    if (!validateEmail()) valid = false;
    if (!validateMobile()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validateConfirmPassword()) valid = false;


    /* Course */
    const course = document.getElementById("course");

    if (course.value === "") {
        document.getElementById("courseError").textContent =
            "Please select your course.";
        valid = false;
    }
    else {
        document.getElementById("courseError").textContent = "";
    }


    /* Year */
    const year = document.getElementById("year");

    if (year.value === "") {
        document.getElementById("yearError").textContent =
            "Please select your year.";
        valid = false;
    }
    else {
        document.getElementById("yearError").textContent = "";
    }


    /* Gender */
    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!gender) {
        document.getElementById("genderError").textContent =
            "Please select your gender.";
        valid = false;
    }
    else {
        document.getElementById("genderError").textContent = "";
    }


    /* CAPTCHA */
    const captchaInput =
        document.getElementById("captchaInput");

    if (captchaInput.value.toUpperCase() !== captcha) {

        document.getElementById("captchaError").textContent =
            "Incorrect CAPTCHA.";

        valid = false;
    }
    else {
        document.getElementById("captchaError").textContent = "";
    }


    /* Terms */
    const terms = document.getElementById("terms");

    if (!terms.checked) {

        document.getElementById("termsError").textContent =
            "Please accept the Terms and Conditions.";

        valid = false;
    }
    else {
        document.getElementById("termsError").textContent = "";
    }


    /* ALERT NOTIFICATION */

    if (valid) {

        alert(
            "Registration Successful!\n\n" +
            "Welcome to the AIML Student Portal."
        );

        form.reset();
        strengthBar.style.width = "0";
        strengthText.textContent = "Password strength";

        generateCaptcha();

    }
    else {

        alert(
            "Registration Failed!\n\n" +
            "Please correct the errors shown in the form."
        );
    }

});