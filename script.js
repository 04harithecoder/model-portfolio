const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const sectionIds = ["about", "skills", "projects", "contact"];

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href?.startsWith("#")) return;

    event.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (navMenu?.classList.contains("open")) {
      navMenu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation menu");
    }
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

      const id = entry.target.getAttribute("id");
      if (!id || !sectionIds.includes(id) || !entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.25 }
);

revealItems.forEach((item) => sectionObserver.observe(item));

const footerYear = document.getElementById("year");
if (footerYear) footerYear.textContent = new Date().getFullYear();
