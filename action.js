// ================= Loader =================
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1000);
});

// ================= DOMContentLoaded =================
document.addEventListener("DOMContentLoaded", () => {
  // --- Navbar toggle ---
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

// ====== Menu Toggle ======
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");    
  menuToggle.classList.toggle("active"); 
});

  // --- Navbar active link ---
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
      document.querySelector("nav a.active")?.classList.remove("active");
      link.classList.add("active");
    });
  });

  
  // --- Lang toggle ---
  const langBtn = document.getElementById("langToggle");
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

  // --- Navbar scroll effect ---
  window.addEventListener("scroll", () => {
    document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
  });

  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // --- About-us reveal ---
  const aboutSection = document.querySelector(".about-us");
  function handleScroll() {
    if (aboutSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
      aboutSection.classList.add("visible");
    }
  }
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // --- Tabs ---
  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
    });
  });

  // --- Modal ---
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.getElementById("modal-close");
  function showModal(message) {
    modalMessage.innerHTML = message;
    modal.style.display = "flex";
  }
  modalClose.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // --- Contact form ---
  document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const { name, email, subject, message } = this;
    if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
      showModal('Please fill in all fields.');
      return;
    }
    showModal("Message sent successfully!<br><br>");
    this.reset();
  });

  // --- Testimonials slider ---
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function showTestimonial(i) {
    testimonials.forEach((t, idx) => {
      t.classList.remove("active");
      dots[idx]?.classList.remove("active");
    });
    testimonials[i]?.classList.add("active");
    dots[i]?.classList.add("active");
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
    const quote = document.getElementById("quote").value;
    const rating = document.getElementById("rating").value;
    const fileInput = document.getElementById("image");

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageURL = event.target.result;

        const newTestimonial = document.createElement("div");
        newTestimonial.classList.add("testimonial");
        newTestimonial.innerHTML = `
          <img src="${imageURL}" alt="${name}">
          <h3>${name}</h3>
          <span class="role">${role}</span>
          <div class="stars">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</div>
          <p class="quote">${quote}</p>
        `;

        document.querySelector(".testimonial-container").appendChild(newTestimonial);

        const newDot = document.createElement("span");
        newDot.classList.add("dot");
        document.querySelector(".dots").appendChild(newDot);

        const newIndex = document.querySelectorAll(".testimonial").length - 1;
        newDot.addEventListener("click", () => showTestimonial(newIndex));
        newDot.addEventListener("mouseenter", () => showTestimonial(newIndex));

        reviewForm.reset();
        alert("✅ Review added successfully!");
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });

  // --- Counters ---
  const counters = document.querySelectorAll(".counter");
  let counted = false;
  function runCounters() {
    counters.forEach(counter => {
      counter.innerText = "0";
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const count = +counter.innerText;
        const increment = Math.ceil(target / 200);
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
  }
  const factsSection = document.querySelector(".facts");
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }
  if (isInViewport(factsSection)) runCounters();
  window.addEventListener("scroll", () => {
    if (!counted && isInViewport(factsSection)) runCounters();
  });

  // --- Scroll to top ---
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.classList.toggle("show", window.scrollY > 300);
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // --- FAQ ---
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => btn.parentElement.classList.toggle("active"));
  });

  // --- Newsletter ---
  const newsletterForm = document.querySelector(".footer-newsletter form");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector("input[type='email']");
    const emailValue = emailInput.value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(emailValue)) {
      alert("❌ Please enter a valid email address.");
      emailInput.focus();
    } else {
      alert("✅ Thank you! We'll contact you soon.");
      newsletterForm.reset();
    }
  });

  // --- Dark Mode ---
  const darkToggle = document.getElementById("darkToggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkToggle.innerHTML = "☀️";
  }
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
});
