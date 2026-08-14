const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const notification = document.getElementById("notification");
const closeNotice = document.getElementById("closeNotice");

const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const modalDone = document.getElementById("modalDone");

const slideContent = document.getElementById("slideContent");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots");

const contactBtn = document.getElementById("contactBtn");

// Theme using localStorage
function applyTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
        themeBtn.textContent = "☀️ Light";
    } else {
        body.classList.remove("dark");
        themeBtn.textContent = "🌙 Dark";
    }
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    themeBtn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
});

applyTheme();

// Hamburger menu
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
    });
});

// Notification
closeNotice.addEventListener("click", () => {
    notification.style.display = "none";
});

// Modal
function closeModalBox() {
    modal.classList.remove("show");
}

openModal.addEventListener("click", () => {
    modal.classList.add("show");
});

closeModal.addEventListener("click", closeModalBox);
modalDone.addEventListener("click", closeModalBox);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModalBox();
    }
});

// FAQ
document.querySelectorAll(".faq-question").forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.textContent = "+";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "−";
        }
    });
});

// Event slider
const events = [
    {
        icon: "💻",
        title: "AI Hackathon",
        text: "Build an intelligent solution in 24 hours.",
        date: "20 August 2026"
    },
    {
        icon: "🧠",
        title: "ML Workshop",
        text: "Learn machine learning from basic to advanced.",
        date: "25 August 2026"
    },
    {
        icon: "🚀",
        title: "Project Expo",
        text: "Present your innovative engineering projects.",
        date: "30 August 2026"
    }
];

let currentSlide = 0;

function showSlide() {
    const event = events[currentSlide];

    slideContent.innerHTML = `
        <div class="event-icon">${event.icon}</div>
        <h3>${event.title}</h3>
        <p>${event.text}</p>
        <small>${event.date}</small>
    `;

    document.querySelectorAll(".dot").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });
}

events.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "dot";

    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide();
    });

    dots.appendChild(dot);
});

nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % events.length;
    showSlide();
});

prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + events.length) % events.length;
    showSlide();
});

showSlide();

// Contact button
contactBtn.addEventListener("click", () => {
    alert("Thank you! StudentHub team will contact you soon.");
});