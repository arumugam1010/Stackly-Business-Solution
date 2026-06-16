// Scroll reveal animations
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// Counter animation
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);

    el.textContent = current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Typing effect
function initTypingEffect() {
  const typingElements = document.querySelectorAll('[data-typing]');

  typingElements.forEach(el => {
    const words = el.dataset.typing.split(',').map(w => w.trim());
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];

      if (currentWord === "Digital Transformation") {
        el.classList.add('typing-small');
      } else {
        el.classList.remove('typing-small');
      }

      if (isDeleting) {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentWord.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 300;
      }

      setTimeout(type, delay);
    }

    type();
  });
}

// Parallax effect
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.5;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = -(scrollY * speed);
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// Testimonials slider
function initTestimonials() {
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');

  if (!track) return;

  let current = 0;
  const total = track.children.length;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Auto-play
  setInterval(() => goTo(current + 1), 5000);
}

// Project filters
function initProjectFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.filter;

      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
          card.style.animation = 'slideUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Project modals
function initProjectModals() {
  const cards = document.querySelectorAll('.project-card');
  const modal = document.querySelector('.modal-overlay');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.dataset.title;
      const desc = card.dataset.description;
      const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
      const image = card.dataset.image;

      modal.querySelector('.modal-body h2').textContent = title;
      modal.querySelector('.modal-body p').textContent = desc;
      modal.querySelector('.modal-image').style.backgroundImage = `url(${image})`;

      const tagsContainer = modal.querySelector('.modal-tags');
      tagsContainer.innerHTML = tags.map(t => `<span class="modal-tag">${t.trim()}</span>`).join('');

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Blog search
function initBlogSearch() {
  const searchInput = document.querySelector('.blog-search input');
  const blogCards = document.querySelectorAll('.blog-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    blogCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const excerpt = card.querySelector('p').textContent.toLowerCase();

      if (title.includes(query) || excerpt.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// Blog category filter
function initBlogCategories() {
  const tabs = document.querySelectorAll('.blog-categories .filter-tab');
  const blogCards = document.querySelectorAll('.blog-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const category = tab.dataset.filter;

      blogCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Loading screen
function initLoadingScreen() {
  const loading = document.querySelector('.loading-screen');
  if (!loading) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.classList.add('hidden');
    }, 3000);
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Custom animated cursor
function initCustomCursor() {
  const dot = document.createElement('div');
  const outline = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  outline.className = 'custom-cursor-outline';
  
  // Set initial position offscreen
  dot.style.left = '-100px';
  dot.style.top = '-100px';
  outline.style.left = '-100px';
  outline.style.top = '-100px';
  
  document.body.appendChild(dot);
  document.body.appendChild(outline);

  let mouseX = -100, mouseY = -100;
  let outlineX = -100, outlineY = -100;
  let hasMoved = false;

  window.addEventListener('mousemove', (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position dot immediately
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    
    if (!hasMoved) {
      hasMoved = true;
      dot.style.opacity = '1';
      outline.style.opacity = '1';
      outlineX = mouseX;
      outlineY = mouseY;
    }
  });

  // Smooth lerp loop for outline trailing
  function animateCursor() {
    if (hasMoved && window.matchMedia('(pointer: fine)').matches) {
      // Linear interpolation: 15% follow speed for smooth lag
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.left = outlineX + 'px';
      outline.style.top = outlineY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Hover states on interactive components
  const interactives = 'a, button, .btn, input, textarea, select, .service-card, .solution-card, .team-card, .blog-card, .faq-question, .client-logo, .filter-tab, .testimonial-btn, .social-link, [role="button"]';
  
  document.addEventListener('mouseover', (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (e.target.closest(interactives)) {
      dot.classList.add('cursor-hover');
      outline.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (e.target.closest(interactives)) {
      dot.classList.remove('cursor-hover');
      outline.classList.remove('cursor-hover');
    }
  });

  // Click animations
  window.addEventListener('mousedown', () => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    dot.classList.add('cursor-click');
    outline.classList.add('cursor-click');
  });

  window.addEventListener('mouseup', () => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    dot.classList.remove('cursor-click');
    outline.classList.remove('cursor-click');
  });

  // Hide cursor on window exit
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (hasMoved && window.matchMedia('(pointer: fine)').matches) {
      dot.style.opacity = '1';
      outline.style.opacity = '1';
    }
  });
}

// Initialize all
document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initScrollReveal();
  initCounters();
  initTypingEffect();
  initParallax();
  initBackToTop();
  initFAQ();
  initTestimonials();
  initProjectFilters();
  initProjectModals();
  initBlogSearch();
  initBlogCategories();
  initSmoothScroll();
  initCustomCursor();
});

