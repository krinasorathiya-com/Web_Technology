const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const courseInput = document.getElementById("course");
const yearInput = document.getElementById("year");
const termsInput = document.getElementById("terms");


// ================= REGULAR EXPRESSIONS =================

const nameRegex = /^[A-Za-z ]{3,50}$/;

const emailRegex =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const mobileRegex =
    /^[6-9][0-9]{9}$/;

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%&*]).{8,}$/;


// ================= NAME =================

function validateName(showAlert = true) {

    let value = nameInput.value.trim();

    if (value === "") {

        nameInput.classList.add("invalid");

        if (showAlert) {
            alert("Please enter your full name.");
        }

        return false;
    }

    if (!nameRegex.test(value)) {

        nameInput.classList.add("invalid");

        if (showAlert) {
            alert(
                "Invalid Name!\n\nOnly letters and spaces are allowed."
            );
        }

        return false;
    }

    nameInput.classList.remove("invalid");
    nameInput.classList.add("valid");

    return true;
}


// ================= EMAIL =================

function validateEmail(showAlert = true) {

    let value = emailInput.value.trim();

    if (value === "") {

        emailInput.classList.add("invalid");

        if (showAlert) {
            alert("Please enter your email address.");
        }

        return false;
    }

    if (!emailRegex.test(value)) {

        emailInput.classList.add("invalid");

        if (showAlert) {
            alert(
                "Invalid Email!\n\nExample of valid email:\nstudent@gmail.com"
            );
        }

        return false;
    }

    emailInput.classList.remove("invalid");
    emailInput.classList.add("valid");

    return true;
}


// ================= MOBILE =================

function validateMobile(showAlert = true) {

    let value = mobileInput.value.trim();

    if (value === "") {

        mobileInput.classList.add("invalid");

        if (showAlert) {
            alert("Please enter your mobile number.");
        }

        return false;
    }

    if (!mobileRegex.test(value)) {

        mobileInput.classList.add("invalid");

        if (showAlert) {
            alert(
                "Invalid Mobile Number!\n\nEnter a valid 10-digit number starting with 6, 7, 8 or 9."
            );
        }

        return false;
    }

    mobileInput.classList.remove("invalid");
    mobileInput.classList.add("valid");

    return true;
}


// ================= PASSWORD =================

function validatePassword(showAlert = true) {

    let value = passwordInput.value;

    if (value === "") {

        passwordInput.classList.add("invalid");

        if (showAlert) {
            alert("Please enter your password.");
        }

        return false;
    }

    if (!passwordRegex.test(value)) {

        passwordInput.classList.add("invalid");

        if (showAlert) {
            alert(
                "Invalid Password!\n\nPassword must contain:\n" +
                "• Minimum 8 characters\n" +
                "• At least one uppercase letter\n" +
                "• At least one lowercase letter\n" +
                "• At least one number\n" +
                "• At least one special character (@ # $ ! % & *)"
            );
        }

        return false;
    }

    passwordInput.classList.remove("invalid");
    passwordInput.classList.add("valid");

    return true;
}


// ================= CONFIRM PASSWORD =================

function validateConfirmPassword(showAlert = true) {

    let password = passwordInput.value;
    let confirmPassword = confirmPasswordInput.value;

    if (confirmPassword === "") {

        confirmPasswordInput.classList.add("invalid");

        if (showAlert) {
            alert("Please confirm your password.");
        }

        return false;
    }

    if (password !== confirmPassword) {

        confirmPasswordInput.classList.add("invalid");

        if (showAlert) {
            alert("Passwords do not match!");
        }

        return false;
    }

    confirmPasswordInput.classList.remove("invalid");
    confirmPasswordInput.classList.add("valid");

    return true;
}


// ================= COURSE =================

function validateCourse(showAlert = true) {

    if (courseInput.value === "") {

        courseInput.classList.add("invalid");

        if (showAlert) {
            alert("Please select your course.");
        }

        return false;
    }

    courseInput.classList.remove("invalid");
    courseInput.classList.add("valid");

    return true;
}


// ================= YEAR =================

function validateYear(showAlert = true) {

    if (yearInput.value === "") {

        yearInput.classList.add("invalid");

        if (showAlert) {
            alert("Please select your year.");
        }

        return false;
    }

    yearInput.classList.remove("invalid");
    yearInput.classList.add("valid");

    return true;
}


// ================= GENDER =================

function validateGender(showAlert = true) {

    let gender =
        document.querySelector(
            'input[name="gender"]:checked'
        );

    if (!gender) {

        if (showAlert) {
            alert("Please select your gender.");
        }

        return false;
    }

    return true;
}


// ================= TERMS =================

function validateTerms(showAlert = true) {

    if (!termsInput.checked) {

        if (showAlert) {
            alert(
                "Please accept the Terms and Conditions."
            );
        }

        return false;
    }

    return true;
}


// =====================================================
// ALERT WHEN USER LEAVES THE INPUT FIELD
// =====================================================

nameInput.addEventListener("blur", function () {
    validateName(true);
});

emailInput.addEventListener("blur", function () {
    validateEmail(true);
});

mobileInput.addEventListener("blur", function () {
    validateMobile(true);
});

passwordInput.addEventListener("blur", function () {
    validatePassword(true);
});

confirmPasswordInput.addEventListener("blur", function () {
    validateConfirmPassword(true);
});

courseInput.addEventListener("change", function () {
    validateCourse(true);
});

yearInput.addEventListener("change", function () {
    validateYear(true);
});

document
    .querySelectorAll('input[name="gender"]')
    .forEach(function (radio) {

        radio.addEventListener("change", function () {
            validateGender(false);
        });

    });

termsInput.addEventListener("change", function () {
    validateTerms(false);
});


// =====================================================
// FORM SUBMIT
// =====================================================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    if (!validateName(true)) {
        nameInput.focus();
        return;
    }


    if (!validateEmail(true)) {
        emailInput.focus();
        return;
    }


    if (!validateMobile(true)) {
        mobileInput.focus();
        return;
    }


    if (!validatePassword(true)) {
        passwordInput.focus();
        return;
    }


    if (!validateConfirmPassword(true)) {
        confirmPasswordInput.focus();
        return;
    }


    if (!validateCourse(true)) {
        courseInput.focus();
        return;
    }


    if (!validateYear(true)) {
        yearInput.focus();
        return;
    }


    if (!validateGender(true)) {
        return;
    }


    if (!validateTerms(true)) {
        termsInput.focus();
        return;
    }


    // ================= SUCCESS =================

    alert("Registration Successful!");

    document.getElementById("successMessage").textContent =
        "Registration successful!";

    document.getElementById("successMessage").style.display =
        "block";

});