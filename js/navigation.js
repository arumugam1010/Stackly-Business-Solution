// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll behavior
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// Active nav link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Clear all active classes first
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  // Set active classes
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      
      // Highlight parent dropdown if active link is a sub-link
      const dropdown = link.closest('.nav-dropdown');
      if (dropdown) {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) {
          toggle.classList.add('active');
        }
      }
    }
  });
}

// Loading screen functionality
function initLoader() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
    
    // Add load listener to trigger 3s timeout
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.pointerEvents = 'none';
      }, 3000);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  setActiveNavLink();
  initLoader();
});

