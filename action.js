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

// Hide loader animation after page load
window.addEventListener("load", () => {
  document.querySelector(".loader").classList.add("hidden");
  document.body.classList.remove("loading");
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