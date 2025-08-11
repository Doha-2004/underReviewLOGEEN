document.addEventListener("DOMContentLoaded", () => {
  // --- Variables for filtering and loading projects ---
  const filterButtons = document.querySelectorAll(".filter-btn"); // All filter buttons
  const loadMoreBtn = document.getElementById("loadMore"); // "Load More" button
  const projectsGrid = document.getElementById("projectsContainer"); // Project container

  // Array containing extra projects that can be loaded dynamically
  const extraProjects = [
    { id: "project6", img: "./Images/project7.jpg", title: "E-commerce Website", description: "Full-featured online store", category: "web" },
    { id: "project7", img: "./Images/project8.jpg", title: "Social Media Campaign", description: "Engaging social media content", category: "marketing" },
    { id: "project8", img: "./Images/project9.jpg", title: "Corporate Branding", description: "Comprehensive branding strategy", category: "branding" },
    { id: "project9", img: "./Images/project10.jpg", title: "Mobile Game", description: "Fun and addictive mobile game", category: "game" },
    { id: "project10", img: "./Images/project11.jpg", title: "Data Analytics Dashboard", description: "Insights and analytics at a glance", category: "data" },
    { id: "project11", img: "./Images/project12.jpg", title: "AI Chatbot", description: "Intelligent chatbot for customer support", category: "ai" }
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
          <button onclick="location.href='project-details.html?id=${p.id}'" class="view-project-btn">View Project</button>`;
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

document.addEventListener("DOMContentLoaded", () => {
  // --- Project Details Page ---
  const params = new URLSearchParams(window.location.search); // Get URL parameters
  const projectId = params.get('id'); // Get "id" parameter from URL

  // Data for all projects (used to dynamically populate details page)
  const projectsData = {
    project1: { img: './Images/project1.jpg', title: 'Web Project 1', description: 'Custom website design with modern UI/UX.' },
    project2: { img: './Images/project2.jpg', title: 'Mobile App 1', description: 'iOS and Android application for e-commerce.' },
    project3: { img: './Images/project3.jpg', title: 'Marketing Campaign 1', description: 'Social media strategy and advertising.' },
    project4: { img: './Images/project4.jpg', title: 'Web Project 2', description: 'Responsive website for a corporate client.' },
    project5: { img: './Images/project5.jpg', title: 'Mobile App 2', description: 'Mobile app for booking and reservations.' },
    project6: { img: './Images/project6.jpg', title: 'E-commerce Website', description: 'Full-featured online store' },
    project7: { img: './Images/project7.jpg', title: 'Social Media Campaign', description: 'Engaging social media content' },
    project8: { img: './Images/project8.jpg', title: 'Corporate Branding', description: 'Comprehensive branding strategy' },
    project9: { img: './Images/project9.jpg', title: 'Mobile Game', description: 'Fun and addictive mobile game' },
    project10: { img: './Images/project10.jpg', title: 'Data Analytics Dashboard', description: 'Insights and analytics at a glance' },
    project11: { img: './Images/project11.jpg', title: 'AI Chatbot', description: 'Intelligent chatbot for customer support' }
  };

  // If a valid project ID is found, update the page with project details
  if (projectId && projectsData[projectId]) {
    document.getElementById('projectImage').src = projectsData[projectId].img;
    document.getElementById('projectImage').alt = projectsData[projectId].title;
    document.getElementById('projectTitle').textContent = projectsData[projectId].title;
    document.getElementById('projectDescription').textContent = projectsData[projectId].description;
  } else {
    // If project not found, show a "not found" message
    document.getElementById('projectTitle').textContent = 'Project Not Found';
    document.getElementById('projectDescription').textContent = 'Sorry, we couldn\'t find the project you are looking for.';
    document.getElementById('projectImage').style.display = 'none';
  }
});
