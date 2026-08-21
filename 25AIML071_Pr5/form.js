const name = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const course = document.getElementById("course");
const year = document.getElementById("year");
const terms = document.getElementById("terms");


// ERROR FUNCTION
function error(input, message, errorId) {

    input.classList.add("error-input");
    input.classList.remove("valid-input");

    const errorMessage = document.getElementById(errorId);

    errorMessage.innerHTML = "❌ " + message;
    errorMessage.className = "error";
}


// SUCCESS FUNCTION
function success(input, message, errorId) {

    input.classList.remove("error-input");
    input.classList.add("valid-input");

    const errorMessage = document.getElementById(errorId);

    errorMessage.innerHTML = "✓ " + message;
    errorMessage.className = "success";
}


// NAME
name.addEventListener("input", function () {

    const value = name.value;

    if (value.length === 0) {
        name.classList.remove("error-input", "valid-input");
        document.getElementById("nameError").innerHTML = "";
    }

    else if (!/^[A-Za-z ]+$/.test(value)) {

        error(
            name,
            "Name must contain only letters.",
            "nameError"
        );

    }

    else if (value.trim().length < 2) {

        error(
            name,
            "Name must have at least 2 characters.",
            "nameError"
        );

    }

    else {

        success(
            name,
            "Valid name",
            "nameError"
        );

    }

});


// EMAIL
email.addEventListener("input", function () {

    const value = email.value;

    if (value.length === 0) {

        email.classList.remove("error-input", "valid-input");
        document.getElementById("emailError").innerHTML = "";

    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

        error(
            email,
            "Enter a valid email address.",
            "emailError"
        );

    }

    else {

        success(
            email,
            "Valid email",
            "emailError"
        );

    }

});


// MOBILE
mobile.addEventListener("input", function () {

    const value = mobile.value;

    if (value.length === 0) {

        mobile.classList.remove("error-input", "valid-input");
        document.getElementById("mobileError").innerHTML = "";

    }

    else if (!/^[0-9]+$/.test(value)) {

        error(
            mobile,
            "Mobile number must contain only numbers.",
            "mobileError"
        );

    }

    else if (value.length < 10) {

        error(
            mobile,
            "Mobile number must contain 10 digits.",
            "mobileError"
        );

    }

    else if (!/^[6-9][0-9]{9}$/.test(value)) {

        error(
            mobile,
            "Mobile number must start with 6, 7, 8 or 9.",
            "mobileError"
        );

    }

    else {

        success(
            mobile,
            "Valid mobile number",
            "mobileError"
        );

    }

});


// PASSWORD
password.addEventListener("input", function () {

    const value = password.value;

    if (value.length === 0) {

        password.classList.remove("error-input", "valid-input");
        document.getElementById("passwordError").innerHTML = "";

    }

    else if (value.length < 8) {

        error(
            password,
            "Password must contain at least 8 characters.",
            "passwordError"
        );

    }

    else if (!/[A-Z]/.test(value)) {

        error(
            password,
            "Add at least one uppercase letter.",
            "passwordError"
        );

    }

    else if (!/[a-z]/.test(value)) {

        error(
            password,
            "Add at least one lowercase letter.",
            "passwordError"
        );

    }

    else if (!/[0-9]/.test(value)) {

        error(
            password,
            "Add at least one number.",
            "passwordError"
        );

    }

    else if (!/[@#$!%]/.test(value)) {

        error(
            password,
            "Add at least one special character.",
            "passwordError"
        );

    }

    else {

        success(
            password,
            "Strong password",
            "passwordError"
        );

    }

});


// CONFIRM PASSWORD
confirmPassword.addEventListener("input", function () {

    if (confirmPassword.value.length === 0) {

        confirmPassword.classList.remove(
            "error-input",
            "valid-input"
        );

        document.getElementById("confirmError").innerHTML = "";

    }

    else if (confirmPassword.value !== password.value) {

        error(
            confirmPassword,
            "Passwords do not match.",
            "confirmError"
        );

    }

    else {

        success(
            confirmPassword,
            "Passwords match",
            "confirmError"
        );

    }

});


// COURSE
course.addEventListener("change", function () {

    if (course.value === "") {

        error(
            course,
            "Please select a course.",
            "courseError"
        );

    }

    else {

        success(
            course,
            "Course selected",
            "courseError"
        );

    }

});


// YEAR
year.addEventListener("change", function () {

    if (year.value === "") {

        error(
            year,
            "Please select your year.",
            "yearError"
        );

    }

    else {

        success(
            year,
            "Year selected",
            "yearError"
        );

    }

});


// GENDER
document.querySelectorAll(
    'input[name="gender"]'
).forEach(function (radio) {

    radio.addEventListener("change", function () {

        document.getElementById("genderError").innerHTML =
            "✓ Gender selected";

        document.getElementById("genderError").className =
            "success";

    });

});


// TERMS
terms.addEventListener("change", function () {

    if (!terms.checked) {

        document.getElementById("termsError").innerHTML =
            "❌ Please accept Terms and Conditions.";

        document.getElementById("termsError").className =
            "error";

    }

    else {

        document.getElementById("termsError").innerHTML =
            "✓ Terms accepted";

        document.getElementById("termsError").className =
            "success";

    }

});


// SUBMIT
document.getElementById("form").addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (
            document.querySelectorAll(".error").length === 0 &&
            name.value !== "" &&
            email.value !== "" &&
            mobile.value !== "" &&
            password.value !== "" &&
            confirmPassword.value !== "" &&
            course.value !== "" &&
            year.value !== "" &&
            document.querySelector(
                'input[name="gender"]:checked'
            ) &&
            terms.checked
        ) {

            alert("Registration Successful!");

        } else {

            alert("Please correct all errors.");

        }

    }
);