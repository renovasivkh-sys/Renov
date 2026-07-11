// ==================== SMOOTH SCROLL & ACTIVE NAV ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==================== NAVBAR ACTIVE STATE ==================== 
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ==================== MOBILE MENU TOGGLE ==================== 
const createMobileMenu = () => {
  const header = document.querySelector('.header');
  const navbar = document.querySelector('.navbar');
  
  // Jika sudah ada hamburger button, jangan buat lagi
  if (document.querySelector('.hamburger')) return;
  
  const hamburger = document.createElement('button');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '☰';
  hamburger.setAttribute('aria-label', 'Toggle menu');
  
  header.insertBefore(hamburger, navbar);
  
  hamburger.addEventListener('click', () => {
    navbar.classList.toggle('mobile-open');
    hamburger.classList.toggle('active');
  });

  // Close menu when link clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('mobile-open');
      hamburger.classList.remove('active');
    });
  });
};

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.keunggulan-card, .card, .proses-step, .faq-item, .testimoni-card').forEach(el => {
  observer.observe(el);
});

// ==================== COUNTER ANIMATION ==================== 
const animateCounters = () => {
  const counters = document.querySelectorAll('[data-count]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          counterObserver.unobserve(entry.target);
        }
      });
    });

    counterObserver.observe(counter);
  });
};

// ==================== LAZY LOADING IMAGES ==================== 
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback untuk browser lama
    images.forEach(img => {
      img.src = img.getAttribute('data-src');
    });
  }
};

// ==================== FORM VALIDATION ==================== 
const validateForm = (form) => {
  const inputs = form.querySelectorAll('input, textarea');
  let isValid = true;

  inputs.forEach(input => {
    if (input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        input.classList.add('error');
        isValid = false;
      } else {
        input.classList.remove('error');
      }
    } else if (input.value.trim() === '') {
      input.classList.add('error');
      isValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  return isValid;
};

// ==================== WHATSAPP SHARE FUNCTIONALITY ==================== 
const whatsappShare = (productName, productPrice) => {
  const message = `Halo RENOV, saya ingin bertanya tentang ${productName} dengan harga ${productPrice}. Bisa konsultasi gratis?`;
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/6289646910477?text=${encodedMessage}`, '_blank');
};

// ==================== SCROLL TO TOP BUTTON ==================== 
const createScrollTopButton = () => {
  const button = document.createElement('button');
  button.classList.add('scroll-top');
  button.innerHTML = '↑';
  button.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

// ==================== TESTIMONIAL CAROUSEL ==================== 
const createTestimonialCarousel = () => {
  const container = document.querySelector('.testimoni-grid');
  if (!container) return;

  let currentIndex = 0;
  const cards = container.querySelectorAll('.testimoni-card');
  const cardsToShow = window.innerWidth < 768 ? 1 : 3;

  const showSlide = (index) => {
    cards.forEach((card, i) => {
      card.style.display = i >= index && i < index + cardsToShow ? 'block' : 'none';
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % (cards.length - cardsToShow + 1);
    showSlide(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + (cards.length - cardsToShow + 1)) % (cards.length - cardsToShow + 1);
    showSlide(currentIndex);
  };

  showSlide(currentIndex);

  // Auto-rotate every 5 seconds
  setInterval(() => {
    nextSlide();
  }, 5000);

  // Optional: Add navigation buttons if needed
  return { nextSlide, prevSlide };
};

// ==================== CLICK EFFECTS ==================== 
const addClickEffects = () => {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const button = e.target.closest('.btn');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    }
  });
};

// ==================== PRICE FORMATTING ==================== 
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

// ==================== NOTIFICATION SYSTEM ==================== 
const showNotification = (message, type = 'success') => {
  const notification = document.createElement('div');
  notification.classList.add('notification', `notification-${type}`);
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
};

// ==================== PERFORMANCE: DEBOUNCE & THROTTLE ==================== 
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ==================== INIT FUNCTION ==================== 
const init = () => {
  // Initialize features based on screen size
  if (window.innerWidth <= 768) {
    createMobileMenu();
  }

  // General initialization
  lazyLoadImages();
  animateCounters();
  createScrollTopButton();
  createTestimonialCarousel();
  addClickEffects();

  // Re-create mobile menu on resize
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
      createMobileMenu();
    } else if (window.innerWidth > 768 && document.querySelector('.hamburger')) {
      const hamburger = document.querySelector('.hamburger');
      hamburger.remove();
      const navbar = document.querySelector('.navbar');
      navbar.classList.remove('mobile-open');
    }
  }, 250));

  // Log initialization
  console.log('RENOV Website initialized successfully! 🎉');
};

// ==================== DOM READY ==================== 
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ==================== GOOGLE ANALYTICS (Optional) ==================== 
// Uncomment dan ganti dengan GA ID Anda
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GA_ID');
*/

// ==================== ERROR HANDLING ==================== 
window.addEventListener('error', (event) => {
  console.error('Error:', event.error);
  // Optionally send to error tracking service
});

// ==================== PERFORMANCE MONITORING ==================== 
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}

// ==================== EXPORT UTILITIES ==================== 
window.RenovUtils = {
  formatPrice,
  whatsappShare,
  showNotification,
  debounce,
  throttle
};
