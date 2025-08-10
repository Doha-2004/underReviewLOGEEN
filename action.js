const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector("nav ul");
const langBtn = document.getElementById("langToggle");

const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector("nav a.active")?.classList.remove("active");
    link.classList.add("active");
  });
});

langBtn.addEventListener("click", () => {
  if (langBtn.textContent === "EN") {
    langBtn.textContent = "AR";
    document.body.setAttribute("dir", "rtl");
    langBtn.classList.add("active");
  } else {
    langBtn.textContent = "EN";
    document.body.setAttribute("dir", "ltr");
    langBtn.classList.remove("active");
  }
});

window.addEventListener("scroll", () => {
  document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth"
    });
  });
});
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
  handleScroll(); 
});

window.addEventListener("load", () => {
  document.querySelector(".loader").classList.add("hidden");
  document.body.classList.remove("loading");
});

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

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

function showModal(message) {
  modalMessage.innerHTML = message;
  modal.style.display = 'flex';
}
// Footer 
document.addEventListener("DOMContentLoaded", function () {

  // Animation on scroll
  const footer = document.querySelector(".footer");
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add("footer-visible");
      }
    });
  }, { threshold: 0.2 });

  footerObserver.observe(footer);

  // Form validation
  const form = document.querySelector(".footer-newsletter form");
  form.addEventListener("submit", function (e) {
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

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

});
