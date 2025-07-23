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