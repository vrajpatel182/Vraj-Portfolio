// ==========================================
// NAVBAR SCROLL
// ==========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background =
            "rgba(8, 10, 14, 0.96)";

    } else {

        navbar.style.background =
            "rgba(8, 10, 14, 0.78)";

    }

});


// ==========================================
// MOBILE MENU
// ==========================================

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });


// ==========================================
// SMOOTH SCROLL
// ==========================================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            function (event) {

                const id =
                    this.getAttribute("href");

                if (id === "#") {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    });


// ==========================================
// SCROLL REVEAL
// ==========================================

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-content, " +
        ".about-point, " +
        ".skill-card, " +
        ".project-card, " +
        ".service-card, " +
        ".cta-box, " +
        ".contact-info, " +
        ".contact-form"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("show");

                    observer
                        .unobserve(
                            entry.target
                        );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


// ==========================================
// CURRENT YEAR
// ==========================================

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Vraj Patel. All rights reserved.`;

}


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        alert(
            "Thanks for your message! Contact form integration will be added soon."
        );

    }
);