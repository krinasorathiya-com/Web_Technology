const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const course = document.getElementById("course");
const year = document.getElementById("year");
const terms = document.getElementById("terms");


// Show Error
function showError(input, errorId, message) {
    input.classList.add("invalid");
    input.classList.remove("valid");

    document.getElementById(errorId).textContent = message;
    document.getElementById(errorId).className = "error";
}


// Show Success
function showSuccess(input, errorId, message) {
    input.classList.remove("invalid");
    input.classList.add("valid");

    document.getElementById(errorId).textContent = message;
    document.getElementById(errorId).className = "success";
}


// 1. NAME VALIDATION
function validateName() {

    const value = nameInput.value.trim();

    const pattern = /^[A-Za-z ]{2,50}$/;

    if (value === "") {
        showError(
            nameInput,
            "nameError",
            "Name is required."
        );
        return false;
    }

    if (!pattern.test(value)) {
        showError(
            nameInput,
            "nameError",
            "Name must contain only letters."
        );
        return false;
    }

    showSuccess(
        nameInput,
        "nameError",
        "✓ Valid name"
    );

    return true;
}


// 2. EMAIL VALIDATION
function validateEmail() {

    const value = email.value.trim();

    const pattern =
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (value === "") {
        showError(
            email,
            "emailError",
            "Email is required."
        );
        return false;
    }

    if (!pattern.test(value)) {
        showError(
            email,
            "emailError",
            "Enter a valid email address."
        );
        return false;
    }

    showSuccess(
        email,
        "emailError",
        "✓ Valid email"
    );

    return true;
}


// 3. MOBILE VALIDATION
function validateMobile() {

    const value = mobile.value.trim();

    if (value === "") {
        showError(
            mobile,
            "mobileError",
            "Mobile number is required."
        );
        return false;
    }

    if (!/^[0-9]+$/.test(value)) {
        showError(
            mobile,
            "mobileError",
            "Mobile number must contain only numbers."
        );
        return false;
    }

    if (!/^[6-9][0-9]{9}$/.test(value)) {
        showError(
            mobile,
            "mobileError",
            "Enter a valid 10 digit mobile number."
        );
        return false;
    }

    showSuccess(
        mobile,
        "mobileError",
        "✓ Valid mobile number"
    );

    return true;
}


// 4. PASSWORD VALIDATION
function validatePassword() {

    const value = password.value;

    const pattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%]).{8,}$/;

    if (value === "") {

        showError(
            password,
            "passwordError",
            "Password is required."
        );

        updateStrength(0);

        return false;
    }

    if (!pattern.test(value)) {

        showError(
            password,
            "passwordError",
            "Use 8 characters, uppercase, lowercase, number and special character."
        );

        updateStrength(value.length);

        return false;
    }

    showSuccess(
        password,
        "passwordError",
        "✓ Strong password"
    );

    updateStrength(value.length);

    return true;
}


// PASSWORD STRENGTH
function updateStrength(length) {

    const bar = document.getElementById("strengthBar");

    if (length === 0) {
        bar.style.width = "0%";
    }
    else if (length < 5) {
        bar.style.width = "30%";
    }
    else if (length < 8) {
        bar.style.width = "60%";
    }
    else {
        bar.style.width = "100%";
    }
}


// 5. CONFIRM PASSWORD
function validateConfirmPassword() {

    if (confirmPassword.value === "") {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Please confirm your password."
        );

        return false;
    }

    if (confirmPassword.value !== password.value) {

        showError(
            confirmPassword,
            "confirmPasswordError",
            "Passwords do not match."
        );

        return false;
    }

    showSuccess(
        confirmPassword,
        "confirmPasswordError",
        "✓ Passwords match"
    );

    return true;
}


// 6. COURSE
function validateCourse() {

    if (course.value === "") {

        showError(
            course,
            "courseError",
            "Please select a course."
        );

        return false;
    }

    showSuccess(
        course,
        "courseError",
        "✓ Course selected"
    );

    return true;
}


// 7. YEAR
function validateYear() {

    if (year.value === "") {

        showError(
            year,
            "yearError",
            "Please select your year."
        );

        return false;
    }

    showSuccess(
        year,
        "yearError",
        "✓ Year selected"
    );

    return true;
}


// 8. GENDER
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

        error.className = "error";

        return false;
    }

    error.textContent =
        "✓ Gender selected";

    error.className = "success";

    return true;
}


// 9. TERMS
function validateTerms() {

    const error =
        document.getElementById("termsError");

    if (!terms.checked) {

        error.textContent =
            "Please accept Terms and Conditions.";

        error.className = "error";

        return false;
    }

    error.textContent =
        "✓ Terms accepted";

    error.className = "success";

    return true;
}


// REAL-TIME VALIDATION

nameInput.addEventListener(
    "input",
    validateName
);

email.addEventListener(
    "input",
    validateEmail
);

mobile.addEventListener(
    "input",
    validateMobile
);

password.addEventListener(
    "input",
    function () {

        validatePassword();

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }

    }
);

confirmPassword.addEventListener(
    "input",
    validateConfirmPassword
);

course.addEventListener(
    "change",
    validateCourse
);

year.addEventListener(
    "change",
    validateYear
);

document.querySelectorAll(
    'input[name="gender"]'
).forEach(function (radio) {

    radio.addEventListener(
        "change",
        validateGender
    );

});

terms.addEventListener(
    "change",
    validateTerms
);


// FORM SUBMIT

form.addEventListener(
    "submit",
    function (event) {

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

            alert("Registration Successful!");

            form.reset();

            document.querySelectorAll(
                "input, select"
            ).forEach(function (element) {

                element.classList.remove("valid");
                element.classList.remove("invalid");

            });

            document.querySelectorAll(
                "span"
            ).forEach(function (element) {

                element.textContent = "";

            });

            document.getElementById(
                "strengthBar"
            ).style.width = "0%";
        }

    }
);