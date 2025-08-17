
// action.js

// Show loader animation on page load
window.addEventListener("load", function(){
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1000); // Hide loader after 1 second
});



// Get references to menu toggle button, navigation menu, and language toggle button
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector("nav ul");
const langBtn = document.getElementById("langToggle");

// Get references for modal elements
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

// Toggle the mobile navigation menu when menu button is clicked
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Highlight the active navigation link when clicked
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("nav a.active")?.classList.remove("active");
    link.classList.add("active");
  });
});


// Toggle between English and Arabic language
langBtn.addEventListener("click", () => {
  if (langBtn.textContent === "EN") {
    langBtn.textContent = "AR";
    document.body.setAttribute("dir", "rtl"); // Change text direction to Right-to-Left
    langBtn.classList.add("active");
  } else {
    langBtn.textContent = "EN";
    document.body.setAttribute("dir", "ltr"); // Change text direction to Left-to-Right
    langBtn.classList.remove("active");
  }
});

// Add a 'scrolled' class to the navbar when scrolling down
window.addEventListener("scroll", () => {
  document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// Smooth scrolling to sections when clicking anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Reveal the "About Us" section when it's in view
document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-us");

  function handleScroll() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight * 0.8;

    if (sectionTop < triggerPoint) {
      aboutSection.classList.add("visible");
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Check on page load
});

// ================= vision and goals tabs =================//

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
  });
});



// Contact form validation and submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const subject = this.subject.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !subject || !message) {
    showModal('Please fill in all fields.');
    return;
  }

  const successMsg = `Message sent successfully!<br><br>`;
  showModal(successMsg);
  this.reset();
});

// Close modal when clicking the close button
modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Function to display modal with a message
function showModal(message) {
  modalMessage.innerHTML = message;
  modal.style.display = 'flex';
}

// testimonial slider functionality
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showTestimonial(i) {
    testimonials.forEach((t, idx) => {
      t.classList.remove("active");
      dots[idx].classList.remove("active");
    });
    testimonials[i].classList.add("active");
    dots[i].classList.add("active");
  }

  function nextTestimonial() {
    index = (index + 1) % testimonials.length;
    showTestimonial(index);
  }

  setInterval(nextTestimonial, 5000);

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      index = idx;
      showTestimonial(index);
    });
  });

  showTestimonial(index);

  // --- Add New Review ---
  const reviewForm = document.getElementById("reviewForm");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const image = document.getElementById("image").value;
    const quote = document.getElementById("quote").value;
    const rating = document.getElementById("rating").value;

    // create new testimonial
    const newTestimonial = document.createElement("div");
    newTestimonial.classList.add("testimonial");
    newTestimonial.innerHTML = `
      <img src="${image}" alt="${name}">
      <h3>${name}</h3>
      <span class="role">${role}</span>
      <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
      <p class="quote">${quote}</p>
    `;

    document.querySelector(".testimonial-container").appendChild(newTestimonial);

    // add new dot
    const newDot = document.createElement("span");
    newDot.classList.add("dot");
    document.querySelector(".dots").appendChild(newDot);

    newDot.addEventListener("click", () => {
      index = document.querySelectorAll(".testimonial").length - 1;
      showTestimonial(index);
    });
    newDot.addEventListener("mouseenter", () => {
      index = document.querySelectorAll(".testimonial").length - 1;
      showTestimonial(index);
    });

    // reset form


    reviewForm.reset();
    alert("✅ Review added successfully!");
  });
});



// ================= Animated Counters =================
// Animated counters in the facts section
// This code runs when the facts section is in view

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const speed = 200;
  let counted = false; // To prevent multiple triggers

  const runCounters = () => {
    counters.forEach(counter => {
      counter.innerText = "0";
      const target = +counter.getAttribute("data-target");

      const updateCount = () => {
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
    counted = true;
  };
  // Function to check if an element is in the viewport

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const factsSection = document.querySelector(".facts");
  // Check if the facts section is in viewport on page load
  if (isInViewport(factsSection)) {
    runCounters();
  }

  // Add scroll event listener to check if the facts section comes into view
  window.addEventListener("scroll", () => {
    if (!counted && isInViewport(factsSection)) {
      runCounters();
    }
  });
});

  

// Scroll to top button functionality
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// FAQ Toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    faqItem.classList.toggle("active");
  });
});


// ================= Footer Newsletter Form Validation =================
document.addEventListener("DOMContentLoaded", function () {
  // Handle newsletter form submission
  const form = document.querySelector(".footer-newsletter form");
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector("input[type='email']");
      const emailValue = emailInput.value.trim();

      if (!validateEmail(emailValue)) {
        alert("❌ Please enter a valid email address.");
        emailInput.focus();
      } else {
        alert("✅ Thank you! We'll contact you soon.");
        form.reset();
      }
    });

  // Function to validate email format
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
// ================= Dark Mode Toggle =================
// Get the dark mode toggle button
const darkToggle = document.getElementById("darkToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.innerHTML = "☀️";
}

// Toggle theme
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    darkToggle.innerHTML = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    darkToggle.innerHTML = "🌙";
  }
});

