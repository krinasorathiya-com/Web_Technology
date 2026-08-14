const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.getElementById("navbar");

const themeBtn =
    document.getElementById("themeBtn");

const notification =
    document.getElementById("notification");

const closeNotification =
    document.getElementById("closeNotification");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");

const modal =
    document.getElementById("modal");

const modalDone =
    document.getElementById("modalDone");

const contactBtn =
    document.getElementById("contactBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const slides =
    document.querySelectorAll(".slide");

const dotsContainer =
    document.getElementById("dots");

const faqQuestions =
    document.querySelectorAll(".faq-question");

const navLinks =
    document.querySelectorAll(".navbar a");

const cardButtons =
    document.querySelectorAll(".card-btn");


/* =====================================================
   HAMBURGER MENU
===================================================== */

menuBtn.addEventListener("click", function () {

    navbar.classList.toggle("open");

    const isOpen =
        navbar.classList.contains("open");

    menuBtn.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuBtn.textContent =
        isOpen ? "✕" : "☰";

});


/* Close menu after clicking a link */

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =====================================================
   LIGHT / DARK MODE
===================================================== */


/*
    Apply selected theme
*/

function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

        themeBtn.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        document.body.classList.remove("dark");

        themeBtn.textContent = "🌙";

        themeBtn.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


/*
    Get saved theme.

    localStorage stores:
    "dark"
    or
    "light"
*/

const savedTheme =
    localStorage.getItem(
        "studentHubTheme"
    );


/*
    Restore saved theme when
    website opens.
*/

if (savedTheme === "dark") {

    applyTheme("dark");

} else {

    applyTheme("light");

}


/*
    Change theme when button
    is clicked.
*/

themeBtn.addEventListener(
    "click",
    function () {

        const isDark =
            document.body.classList.contains("dark");


        if (isDark) {

            /*
                Change to light mode
            */

            applyTheme("light");

            localStorage.setItem(
                "studentHubTheme",
                "light"
            );

        } else {

            /*
                Change to dark mode
            */

            applyTheme("dark");

            localStorage.setItem(
                "studentHubTheme",
                "dark"
            );

        }

    }
);


/* =====================================================
   NOTIFICATION BANNER
===================================================== */

closeNotification.addEventListener(
    "click",
    function () {

        notification.style.opacity = "0";

        notification.style.transform =
            "translateY(-100%)";


        setTimeout(function () {

            notification.style.display =
                "none";

        }, 400);

    }
);


/* =====================================================
   MODAL POPUP
===================================================== */


/* Open modal */

function showModal() {

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

    closeModal.focus();

}


/* Close modal */

function hideModal() {

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

    openModal.focus();

}


/* Open modal button */

openModal.addEventListener(
    "click",
    showModal
);


/* Close button */

closeModal.addEventListener(
    "click",
    hideModal
);


/* Get Started button */

modalDone.addEventListener(
    "click",
    hideModal
);


/* Close by clicking outside */

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            hideModal();

        }

    }
);


/* Close with Escape */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("show")
        ) {

            hideModal();

        }

    }
);


/* =====================================================
   FAQ ACCORDION
===================================================== */

faqQuestions.forEach(
    function (question) {

        question.addEventListener(
            "click",
            function () {

                const answer =
                    question.nextElementSibling;


                const isOpen =
                    question.getAttribute(
                        "aria-expanded"
                    ) === "true";


                /*
                    Close all other FAQs
                */

                faqQuestions.forEach(
                    function (otherQuestion) {

                        if (
                            otherQuestion !== question
                        ) {

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            otherQuestion
                                .nextElementSibling
                                .style.maxHeight = null;

                        }

                    }
                );


                /*
                    Open selected FAQ
                */

                if (!isOpen) {

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight + "px";

                } else {

                    question.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    answer.style.maxHeight =
                        null;

                }

            }
        );

    }
);


/* =====================================================
   IMAGE / CONTENT SLIDER
===================================================== */

let currentSlide = 0;


/*
    Create dots dynamically
    using DOM manipulation.
*/

slides.forEach(
    function (slide, index) {

        const dot =
            document.createElement("button");

        dot.classList.add("dot");

        dot.setAttribute(
            "type",
            "button"
        );

        dot.setAttribute(
            "aria-label",
            "Go to slide " + (index + 1)
        );


        dot.addEventListener(
            "click",
            function () {

                currentSlide = index;

                showSlide(currentSlide);

            }
        );


        dotsContainer.appendChild(dot);

    }
);


/*
    Select newly created dots
*/

const dots =
    document.querySelectorAll(".dot");


/*
    Display selected slide
*/

function showSlide(index) {

    slides.forEach(
        function (slide, i) {

            if (i === index) {

                slide.classList.add("active");

            } else {

                slide.classList.remove("active");

            }

        }
    );


    dots.forEach(
        function (dot, i) {

            if (i === index) {

                dot.classList.add("active");

            } else {

                dot.classList.remove("active");

            }

        }
    );

}


/*
    Next button
*/

nextBtn.addEventListener(
    "click",
    function () {

        currentSlide++;

        if (
            currentSlide >= slides.length
        ) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }
);


/*
    Previous button
*/

prevBtn.addEventListener(
    "click",
    function () {

        currentSlide--;

        if (currentSlide < 0) {

            currentSlide =
                slides.length - 1;

        }

        showSlide(currentSlide);

    }
);


/*
    Automatic slider

    Changes every 5 seconds.
*/

setInterval(
    function () {

        currentSlide++;

        if (
            currentSlide >= slides.length
        ) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    },
    5000
);


/*
    Show first slide
*/

showSlide(currentSlide);


/* =====================================================
   CONTACT BUTTON
===================================================== */

contactBtn.addEventListener(
    "click",
    function () {

        alert(
            "Thank you for contacting StudentHub!\n\n" +
            "Our support team will contact you soon."
        );

    }
);


/* =====================================================
   FEATURE CARD BUTTONS
===================================================== */

cardButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(".feature-card");

                const title =
                    card.querySelector("h3")
                        .textContent;

                alert(
                    "You selected the " +
                    title +
                    " feature."
                );

            }
        );

    }
);


/* =====================================================
   KEYBOARD ACCESSIBILITY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        /*
            Left arrow = previous slide
        */

        if (
            event.key === "ArrowLeft"
        ) {

            currentSlide--;

            if (currentSlide < 0) {

                currentSlide =
                    slides.length - 1;

            }

            showSlide(currentSlide);

        }


        /*
            Right arrow = next slide
        */

        if (
            event.key === "ArrowRight"
        ) {

            currentSlide++;

            if (
                currentSlide >= slides.length
            ) {

                currentSlide = 0;

            }

            showSlide(currentSlide);

        }

    }
);


/* =====================================================
   CONSOLE TEST
===================================================== */

console.log(
    "StudentHub Practical 4 loaded successfully!"
);

console.log(
    "Dark mode + localStorage enabled."
);

console.log(
    "Slides:",
    slides.length
);

console.log(
    "FAQ Questions:",
    faqQuestions.length
);
