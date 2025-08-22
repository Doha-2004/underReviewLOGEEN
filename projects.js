document.addEventListener("DOMContentLoaded", () => {
  // --- Variables for filtering and loading projects ---
  const filterButtons = document.querySelectorAll(".filter-btn"); // All filter buttons
  const loadMoreBtn = document.getElementById("loadMore"); // "Load More" button
  const projectsGrid = document.getElementById("projectsContainer"); // Project container

  // Array containing extra projects that can be loaded dynamically
  const extraProjects = [
    { id: "project6", img: "./Images/project7.jpg", title: "E-commerce Website", description: "Full-featured online store", category: "web"  , link:"https://example.com/project6"},
    { id: "project7", img: "./Images/project8.jpg", title: "Social Media Campaign", description: "Engaging social media content", category: "marketing" , link:"https://example.com/project7"},
    { id: "project8", img: "./Images/project9.jpg", title: "Corporate Branding", description: "Comprehensive branding strategy", category: "branding" , link:"https://example.com/project8"},
    { id: "project9", img: "./Images/project10.jpg", title: "Mobile Game", description: "Fun and addictive mobile game", category: "game" , link:"https://example.com/project9"},
    { id: "project10", img: "./Images/project11.jpg", title: "Data Analytics Dashboard", description: "Insights and analytics at a glance", category: "data" , link:"https://example.com/project10"},
    { id: "project11", img: "./Images/project12.jpg", title: "AI Chatbot", description: "Intelligent chatbot for customer support", category: "ai"  , link:"https://example.com/project11"}
  ];

  let loaded = false; // Tracks whether extra projects are loaded or not

  // --- Filter projects based on category ---
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove "active" class from all filter buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add "active" class to clicked filter button
      button.classList.add("active");

      const category = button.getAttribute("data-filter");

      // Show "Load More" button only when category is "all"
      if (category === "all") {
        loadMoreBtn.style.display = "inline-block";
      } else {
        loadMoreBtn.style.display = "none";
      }

      // Get all project cards (including newly loaded ones)
      const projectCards = document.querySelectorAll(".project-card");

      // Show/hide projects based on selected category
      projectCards.forEach(card => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- Load More / Show Less functionality ---
  loadMoreBtn.addEventListener("click", () => {
    if (!loaded) {
      // If extra projects are not loaded, create and append them
      extraProjects.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("project-card", "extra-project");
        card.dataset.category = p.category;  
        card.innerHTML = `
          <img src="${p.img}" alt="${p.title}">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <button href="${p.link}" class="view-project-btn">View Project</button>`;
        projectsGrid.appendChild(card);
      });
      loaded = true;
      loadMoreBtn.innerText = "Less Projects"; // Change button text
    } else {
      // If already loaded, remove extra projects
      const extraCards = projectsGrid.querySelectorAll(".extra-project");
      extraCards.forEach(card => card.remove());
      loaded = false;
      loadMoreBtn.innerText = "Load More Projects"; // Change button text back
    }
  });

  // --- Footer newsletter form validation ---
  const form = document.querySelector(".footer-newsletter form");
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const emailInput = form.querySelector("input[type='email']");
    const emailValue = emailInput.value.trim();

    // Validate email format
    if (!validateEmail(emailValue)) {
      alert("❌ Please enter a valid email address.");
      emailInput.focus();
    } else {
      alert("✅ Thank you! We'll contact you soon.");
      form.reset();
    }
  });

  // Simple regex email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});


  
// ================= Dark Mode Toggle =================
// Get the dark mode toggle button
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

