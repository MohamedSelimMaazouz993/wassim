document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const navToggle = document.querySelector('.navbar-toggle');
  const navCollapse = document.querySelector('.navbar-collapse');
  if (navToggle && navCollapse) {
    navToggle.addEventListener('click', function () {
      navCollapse.classList.toggle('show');
    });
  }

  // Close mobile menu when clicking on links
  document.querySelectorAll('.navbar-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapse) {
        navCollapse.classList.remove('show');
      }
    });
  });

  // Initialize carousel with autoplay and animations
  const carousel = document.querySelector('#home-carousel');
  if (carousel) {
     new bootstrap.Carousel(carousel, {
      interval: 5000, 
      wrap: true,
    });

    // Handle slide animations
    carousel.addEventListener('slide.bs.carousel', function (e) {
      const currentSlide = e.from;
      const nextSlide = e.to;

      // Remove animations from current slide
      const currentItems = document.querySelectorAll(
        `.carousel-item:nth-child(${
          currentSlide + 1
        }) h1, .carousel-item:nth-child(${currentSlide + 1}) p`
      );
      currentItems.forEach((item) => {
        item.classList.remove('animated', 'fadeInDown', 'fadeInUp');
      });

      // Add animations to next slide after short delay
      setTimeout(() => {
        const nextItems = document.querySelectorAll(
          `.carousel-item:nth-child(${
            nextSlide + 1
          }) h1, .carousel-item:nth-child(${nextSlide + 1}) p`
        );
        nextItems[0].classList.add('animated', 'fadeInDown');
        nextItems[1].classList.add('animated', 'fadeInUp');
      }, 300); // Reduced delay for animations
    });

    // Initialize first slide animations
    document
      .querySelector('.carousel-item.active h1')
      .classList.add('animated', 'fadeInDown');
    document
      .querySelector('.carousel-item.active p')
      .classList.add('animated', 'fadeInUp');
  }
  // Smooth scrolling for all navigation links
  document.querySelectorAll('a.scroll').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Contact form validation
  const contactForm = document.getElementById('main-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = this.elements['name'].value;
      const email = this.elements['email'].value;
      const subject = this.elements['subject'].value;
      const message = this.elements['message'].value;

      // Validation
      if (!name || !email || !subject || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
      }

      // Form submission (simulated)
      alert('Merci pour votre message. Nous vous contacterons bientôt.');
      this.reset();
    });
  }

  // Handle send button click
  const sendButton = document.querySelector('.btn-send');
  if (sendButton) {
    sendButton.addEventListener('click', function (e) {
      e.preventDefault();
      const form = document.getElementById('main-contact-form');
      if (form) {
        form.dispatchEvent(new Event('submit'));
      }
    });
  }
});

// Counter Animation
function animateCounter() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Lower number = faster animation
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounter, 1);
    } else {
      counter.innerText = target.toLocaleString(); // Adds comma formatting
    }
  });
}

// Trigger counter when section is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter();
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.5});

const funFactsSection = document.getElementById('fun-facts');
if (funFactsSection) {
  observer.observe(funFactsSection);
}


// Active Nav Link and Section Animation
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  // Set first section as active
  sections[0].classList.add('active');
  
  // Intersection Observer for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add active class to section
        entry.target.classList.add('active');
        
        // Update active nav link
        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });
  
  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Smooth scroll with offset for fixed navbar
  document.querySelectorAll('a.scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse.classList.contains('show')) {
          navCollapse.classList.remove('show');
        }
      }
    });
  });
  
  // Faster counter animation
  function animateCounter() {
    const counter = document.querySelector('.counter');
    if (!counter) return;
    
    const target = +counter.getAttribute('data-target');
    const speed = 50; // Lower = faster
    let count = 0;
    
    const updateCount = () => {
      const increment = target / speed;
      count += increment;
      
      if (count < target) {
        counter.textContent = Math.floor(count).toLocaleString();
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    updateCount();
  }
  
  // Trigger counter when fun-facts section is visible
  const funFactsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter();
        funFactsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const funFactsSection = document.getElementById('fun-facts');
  if (funFactsSection) {
    funFactsObserver.observe(funFactsSection);
  }
});


// Mobile Menu Fix
document.addEventListener('DOMContentLoaded', function() {
  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992) { // Bootstrap's lg breakpoint
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
          toggle: false
        });
        bsCollapse.hide();
      }
    });
  });

  // Carousel height adjustment for mobile
  function adjustCarouselHeight() {
    const carousel = document.querySelector('#home-carousel');
    if (carousel) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const windowHeight = window.innerHeight;
      carousel.style.height = (windowHeight - navbarHeight) + 'px';
    }
  }

  // Initial adjustment
  adjustCarouselHeight();
  
  // Adjust on resize
  window.addEventListener('resize', adjustCarouselHeight);
});





// PWA Installation Prompt
let deferredPrompt;
let installButton = null;
let installModal = null;
let dontInstallButton = null;
let installLaterButton = null;

// Create the install modal HTML dynamically
function createInstallModal() {
  const modalHTML = `
    <div class="modal fade" id="installModal" tabindex="-1" aria-labelledby="installModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="installModalLabel">Installer l'application</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Installez l'application Cabinet Wassim Majdi sur votre appareil pour un accès plus rapide et une meilleure expérience.</p>
            <div class="text-center mb-3">
              <img src="./public/images/wassim_logo-.png" alt="App Icon" style="width: 80px; height: 80px;">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" id="dontInstallBtn">Ne pas installer</button>
            <button type="button" class="btn btn-primary" id="installBtn">Installer</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
  
  // Initialize modal elements
  installModal = new bootstrap.Modal(document.getElementById('installModal'));
  installButton = document.getElementById('installBtn');
  dontInstallButton = document.getElementById('dontInstallBtn');
  
  // Event listeners
  installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    installModal.hide();
  });
  
  dontInstallButton.addEventListener('click', () => {
    localStorage.setItem('dontShowInstallPrompt', 'true');
    installModal.hide();
  });
}

// Check if PWA is already installed
function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone ||
         document.referrer.includes('android-app://');
}

// Show the install prompt
function showInstallPrompt() {
  if (!isAppInstalled() && !localStorage.getItem('dontShowInstallPrompt')) {
    createInstallModal();
    installModal.show();
    
    // Hide the modal after 3 seconds if user doesn't interact
    setTimeout(() => {
      if (installModal && installModal._isShown) {
        installModal.hide();
      }
    }, 5000);
  }
}

// Register service worker and handle installation prompt
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  // Show our install UI
  showInstallPrompt();
});

// Track successful installation
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  localStorage.setItem('dontShowInstallPrompt', 'true');
});