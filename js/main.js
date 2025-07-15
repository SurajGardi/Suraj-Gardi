/*
 * Main JavaScript File
 * Author: Suraj Gardi
 */

// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader")
  setTimeout(() => {
    preloader.style.display = "none"
  }, 500)
})

// Initialize AOS
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
    offset: 100,
    easing: "ease-in-out",
  })

  // Initialize Particles.js for hero background
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#0563bb",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#0563bb",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    })
  }

  // Typed.js for hero section
const typed = document.querySelector(".typed-text");

if (typed) {
  new Typed(".typed-text", {
    strings: ["Developer", "Programmer"],
    typeSpeed: 60,       // Slower typing speed
    backSpeed: 40,       // Smooth backspacing
    backDelay: 2500,     // Pause before deleting
    startDelay: 500,     // Initial delay for better appearance
    loop: true,
    showCursor: true,
    cursorChar: "|",     // You can change cursor style if you want
  });
}


  // Circle Progress for skills
  $(".skill-circle").each(function () {
    const percentage = $(this).data("percent")
    $(this).circleProgress({
      value: percentage / 100,
      size: $(this).width(),
      fill: {
        gradient: ["#0563bb", "#045299"],
      },
      emptyFill: "rgba(5, 99, 187, 0.1)",
      animation: {
        duration: 2000,
      },
    })
  })

  // Navbar scroll
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Back to top button
  const backToTop = document.querySelector(".back-to-top")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("active")
    } else {
      backToTop.classList.remove("active")
    }
  })

  backToTop.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth",
        })
      }
    })
  })

  // Active nav link on scroll
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Project filtering with Isotope
  const $grid = $(".projects-container").isotope({
    itemSelector: ".project-item",
    layoutMode: "fitRows",
  })

  $(".filter-list li").on("click", function () {
    $(".filter-list li").removeClass("active")
    $(this).addClass("active")

    const filterValue = $(this).attr("data-filter")
    $grid.isotope({ filter: filterValue })
  })

  // Form submission
  
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("form-message");

function isValidEmail(email) {
  // Basic but solid email regex pattern
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email").value.trim();

    if (!isValidEmail(emailInput)) {
      formMessage.textContent = "❌ Please enter a valid email address.";
      formMessage.style.color = "red";
      return;
    }

    const data = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        formMessage.textContent = "✅ Your message has been sent successfully!";
        formMessage.style.color = "green";
        contactForm.reset();
      } else {
        formMessage.textContent = "❌ Oops! Something went wrong.";
        formMessage.style.color = "red";
      }
    }).catch(error => {
      formMessage.textContent = "❌ Network error. Please try again later.";
      formMessage.style.color = "red";
    }).finally(() => {
      formMessage.style.opacity = 1;
      setTimeout(() => {
        formMessage.style.opacity = 0;
        formMessage.textContent = "";
      }, 10000); // 10 seconds
    });
  });
}



  // Dark mode toggle
  const themeToggle = document.getElementById("theme-toggle")
  const htmlElement = document.documentElement

  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    htmlElement.classList.add("dark-mode")
  }

  themeToggle.addEventListener("click", () => {
    htmlElement.classList.toggle("dark-mode")

    // Save preference
    if (htmlElement.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  })
})
