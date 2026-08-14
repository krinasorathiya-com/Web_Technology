const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");

const notification = document.getElementById("notification");
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


const navLinks =
    document.querySelectorAll(".navbar a");

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



const savedTheme =
    localStorage.getItem("studentHubTheme");

if (savedTheme) {

    applyTheme(savedTheme);

} else {

    applyTheme("light");

}



themeBtn.addEventListener("click", function () {

    const isDark =
        document.body.classList.contains("dark");

    const newTheme =
        isDark ? "light" : "dark";

    applyTheme(newTheme);

    localStorage.setItem(
        "studentHubTheme",
        newTheme
    );

});


closeNotification.addEventListener(
    "click",
    function () {

        notification.style.transform =
            "translateY(-100%)";

        notification.style.opacity = "0";

        setTimeout(function () {

            notification.style.display =
                "none";

        }, 400);

    }
);


function showModal() {

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

    closeModal.focus();

}


function hideModal() {

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

    openModal.focus();

}


openModal.addEventListener(
    "click",
    showModal
);

closeModal.addEventListener(
    "click",
    hideModal
);

modalDone.addEventListener(
    "click",
    hideModal
);



modal.addEventListener("click", function (event) {

    if (event.target === modal) {

        hideModal();

    }

});


document.addEventListener("keydown", function (event) {

    if (
        event.key === "Escape" &&
        modal.classList.contains("show")
    ) {

        hideModal();

    }

});


faqQuestions.forEach(function (question) {

    question.addEventListener(
        "click",
        function () {

            const answer =
                question.nextElementSibling;

            const currentlyOpen =
                question.getAttribute(
                    "aria-expanded"
                ) === "true";


            

            faqQuestions.forEach(
                function (otherQuestion) {

                    if (otherQuestion !== question) {

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


            if (!currentlyOpen) {

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

                answer.style.maxHeight = null;

            }

        }
    );

});


let currentSlide = 0;


slides.forEach(function (_, index) {

    const dot =
        document.createElement("button");

    dot.classList.add("dot");

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

});


const dots =
    document.querySelectorAll(".dot");


function showSlide(index) {

    slides.forEach(function (slide, i) {

        slide.classList.toggle(
            "active",
            i === index
        );

    });


    dots.forEach(function (dot, i) {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}


nextBtn.addEventListener(
    "click",
    function () {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }
);


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


setInterval(function () {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}, 5000);


showSlide(currentSlide);


contactBtn.addEventListener(
    "click",
    function () {

        alert(
            "Thank you for contacting StudentHub! " +
            "Our support team will contact you soon."
        );

    }
);


const cardButtons =
    document.querySelectorAll(".card-btn");

cardButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const card =
                button.closest(".feature-card");

            const title =
                card.querySelector("h3").textContent;

            alert(
                "You selected the " +
                title +
                " feature."
            );

        }
    );

});


console.log(
    "StudentHub Practical 4 JavaScript loaded successfully!"
);

console.log(
    "DOM elements selected:",
    slides.length,
    "slides and",
    faqQuestions.length,
    "FAQ questions."
);
