const form = document.getElementById("registrationForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const course = document.getElementById("course");
const year = document.getElementById("year");
const terms = document.getElementById("terms");


// Regular Expressions
const namePattern = /^[A-Za-z ]{3,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[6-9][0-9]{9}$/;
const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$!%&*]).{8,}$/;


// Form Submit
form.addEventListener("submit", function(event) {

    event.preventDefault();


    // Name
    if (name.value.trim() === "") {
        alert("❌ Please enter your name.");
        name.focus();
        return;
    }

    if (!namePattern.test(name.value.trim())) {
        alert("❌ Invalid Name!\nOnly letters and spaces are allowed.");
        name.focus();
        return;
    }


    // Email
    if (email.value.trim() === "") {
        alert("❌ Please enter your email.");
        email.focus();
        return;
    }

    if (!emailPattern.test(email.value.trim())) {
        alert("❌ Invalid Email!\nExample: student@gmail.com");
        email.focus();
        return;
    }


    // Mobile
    if (mobile.value.trim() === "") {
        alert("❌ Please enter your mobile number.");
        mobile.focus();
        return;
    }

    if (!mobilePattern.test(mobile.value.trim())) {
        alert(
            "❌ Invalid Mobile Number!\n" +
            "Enter a valid 10-digit number starting with 6-9."
        );
        mobile.focus();
        return;
    }


    // Password
    if (password.value === "") {
        alert("❌ Please enter your password.");
        password.focus();
        return;
    }

    if (!passwordPattern.test(password.value)) {
        alert(
            "❌ Invalid Password!\n\n" +
            "Password must contain:\n" +
            "• Minimum 8 characters\n" +
            "• One uppercase letter\n" +
            "• One lowercase letter\n" +
            "• One number\n" +
            "• One special character (@ # $ ! % & *)"
        );

        password.focus();
        return;
    }


    // Confirm Password
    if (confirmPassword.value === "") {
        alert("❌ Please confirm your password.");
        confirmPassword.focus();
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("❌ Passwords do not match!");
        confirmPassword.focus();
        return;
    }


    // Course
    if (course.value === "") {
        alert("❌ Please select your course.");
        course.focus();
        return;
    }


    // Year
    if (year.value === "") {
        alert("❌ Please select your year.");
        year.focus();
        return;
    }


    // Gender
    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    if (!gender) {
        alert("❌ Please select your gender.");
        return;
    }


    // Terms
    if (!terms.checked) {
        alert("❌ Please accept the Terms and Conditions.");
        terms.focus();
        return;
    }


    // Success
    alert("✅ Registration Successful!");

    form.reset();

});