/* =========================
   LOADING
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 600);

    }, 700);

});


/* =========================
   TYPING EFFECT
========================= */

const typing = document.getElementById("typing");

const texts = [
    "Developer",
    "Student",
    "Gamer",
    "Programmer",
    "Technology Lover"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentText = texts[textIndex];

    if (!deleting) {

        typing.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typing.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            textIndex++;

            if (textIndex >= texts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();


/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.querySelector("i").classList.remove("fa-xmark");
        menuBtn.querySelector("i").classList.add("fa-bars");

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* =========================
   SKILL PROGRESS
========================= */

const skillSection =
    document.getElementById("skills");

let skillAnimated = false;

window.addEventListener("scroll", () => {

    if (skillAnimated) return;

    const sectionTop =
        skillSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {

        document.querySelectorAll(".progress-bar")
            .forEach(bar => {

                bar.style.width =
                    bar.dataset.width;

            });

        skillAnimated = true;
    }

});


/* =========================
   PARTICLES
========================= */

const canvas =
    document.getElementById("particles");

const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() * canvas.width;

        this.y =
            Math.random() * canvas.height;

        this.size =
            Math.random() * 2 + 0.5;

        this.speedX =
            (Math.random() - 0.5) * 0.5;

        this.speedY =
            (Math.random() - 0.5) * 0.5;

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 ||
            this.x > canvas.width) {

            this.speedX *= -1;

        }

        if (this.y < 0 ||
            this.y > canvas.height) {

            this.speedY *= -1;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(124,58,237,0.6)";

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const amount =
        Math.min(
            100,
            Math.floor(
                window.innerWidth / 12
            )
        );

    for (let i = 0; i < amount; i++) {

        particles.push(
            new Particle()
        );

    }

}

createParticles();

window.addEventListener(
    "resize",
    createParticles
);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(particle => {

        particle.update();
        particle.draw();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow =
    document.createElement("div");

cursorGlow.style.position = "fixed";
cursorGlow.style.width = "250px";
cursorGlow.style.height = "250px";
cursorGlow.style.borderRadius = "50%";
cursorGlow.style.pointerEvents = "none";
cursorGlow.style.background =
    "radial-gradient(circle, rgba(124,58,237,.12), transparent 70%)";
cursorGlow.style.transform =
    "translate(-50%, -50%)";
cursorGlow.style.zIndex = "-1";

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", e => {

    cursorGlow.style.left =
        e.clientX + "px";

    cursorGlow.style.top =
        e.clientY + "px";

});
