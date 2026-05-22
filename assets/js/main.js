/**
 * Atelier Studio - Main JavaScript
 */

(function () {
  'use strict';

  // ========================
  // Preloader
  // ========================
  window.addEventListener('load', function () {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('hidden');
        setTimeout(function () {
          preloader.style.display = 'none';
        }, 300);
      }, 400);
    }
  });

  // ========================
  // Scroll Progress Bar
  // ========================
  var scrollProgress = document.getElementById('scroll-progress');

  function updateScrollProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }
  }

  // ========================
  // Header Scroll Effect
  // ========================
  var header = document.getElementById('header');
  var lastScrollY = 0;

  function handleHeaderScroll() {
    var currentScrollY = window.scrollY;
    if (header) {
      if (currentScrollY > 50) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = 'none';
      }
    }
    lastScrollY = currentScrollY;
  }

  // ========================
  // Back to Top Button
  // ========================
  var backToTop = document.getElementById('backToTop');

  function handleBackToTop() {
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================
  // Combined Scroll Handler
  // ========================
  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateScrollProgress();
        handleHeaderScroll();
        handleBackToTop();
        handleScrollAnimations();
        handleCounterAnimation();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ========================
  // Dark Mode Toggle
  // ========================
  var themeToggle = document.getElementById('themeToggle');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var html = document.documentElement;
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.theme = 'light';
      } else {
        html.classList.add('dark');
        localStorage.theme = 'dark';
      }
    });
  }

  // ========================
  // Mobile Navigation
  // ========================
  var mobileToggle = document.getElementById('mobileToggle');
  var mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function () {
      mobileToggle.classList.toggle('active');
      mainNav.classList.toggle('mobile-open');
    });

    // Close on link click
    var navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mainNav.classList.remove('mobile-open');
      });
    });
  }

  // ========================
  // Scroll Animations (Intersection Observer)
  // ========================
  function handleScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    elements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('animated');
      }
    });
  }

  // Initial check
  handleScrollAnimations();

  // ========================
  // Counter Animation
  // ========================
  var countersAnimated = false;

  function handleCounterAnimation() {
    if (countersAnimated) return;

    var statsSection = document.getElementById('stats');
    if (!statsSection) return;

    var rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      countersAnimated = true;
      var counters = document.querySelectorAll('.stat-number[data-target]');
      counters.forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function animate(currentTime) {
          if (!startTime) startTime = currentTime;
          var elapsed = currentTime - startTime;
          var progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          var eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(eased * target);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(animate);
      });
    }
  }

  // ========================
  // Testimonial Slider
  // ========================
  var sliderTrack = document.querySelector('.testimonial-track');
  var sliderPrev = document.getElementById('sliderPrev');
  var sliderNext = document.getElementById('sliderNext');
  var sliderDotsContainer = document.getElementById('sliderDots');
  var currentSlide = 0;

  function getVisibleSlides() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getTotalSlides() {
    if (!sliderTrack) return 0;
    return sliderTrack.children.length;
  }

  function getMaxSlide() {
    return Math.max(0, getTotalSlides() - getVisibleSlides());
  }

  function updateSlider() {
    if (!sliderTrack) return;
    var visible = getVisibleSlides();
    var slideWidth = 100 / visible;
    sliderTrack.style.transform = 'translateX(-' + (currentSlide * slideWidth) + '%)';
    updateDots();
  }

  function createDots() {
    if (!sliderDotsContainer) return;
    sliderDotsContainer.innerHTML = '';
    var maxSlide = getMaxSlide();
    for (var i = 0; i <= maxSlide; i++) {
      var dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.setAttribute('data-index', i);
      dot.addEventListener('click', function () {
        currentSlide = parseInt(this.getAttribute('data-index'));
        updateSlider();
      });
      sliderDotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!sliderDotsContainer) return;
    var dots = sliderDotsContainer.querySelectorAll('.slider-dot');
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (sliderPrev) {
    sliderPrev.addEventListener('click', function () {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });
  }

  if (sliderNext) {
    sliderNext.addEventListener('click', function () {
      if (currentSlide < getMaxSlide()) {
        currentSlide++;
        updateSlider();
      }
    });
  }

  // Initialize slider
  createDots();
  updateSlider();

  // Recalculate on resize
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (currentSlide > getMaxSlide()) {
        currentSlide = getMaxSlide();
      }
      createDots();
      updateSlider();
    }, 250);
  });

  // Touch/swipe support for slider
  var touchStartX = 0;
  var touchEndX = 0;

  if (sliderTrack) {
    sliderTrack.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderTrack.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < getMaxSlide()) {
          currentSlide++;
        } else if (diff < 0 && currentSlide > 0) {
          currentSlide--;
        }
        updateSlider();
      }
    }, { passive: true });
  }

  // ========================
  // FAQ Accordion
  // ========================
  var faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (question) {
    question.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ========================
  // Hero Tags
  // ========================
  var heroTags = document.querySelectorAll('.hero-tags .tag');

  heroTags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      heroTags.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  // ========================
  // Contact Form
  // ========================
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = this.querySelector('button[type="submit"]');
      var originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      btn.disabled = true;

      setTimeout(function () {
        btn.innerHTML = 'Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';

        setTimeout(function () {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
          contactForm.reset();
        }, 2000);
      }, 1500);
    });
  }

  // ========================
  // Cookie Banner
  // ========================
  var cookieBanner = document.getElementById('cookieBanner');
  var cookieAccept = document.getElementById('cookieAccept');
  var cookieDecline = document.getElementById('cookieDecline');

  if (localStorage.getItem('cookies-accepted') !== null) {
    if (cookieBanner) cookieBanner.classList.add('hidden');
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('cookies-accepted', 'true');
      cookieBanner.classList.add('hidden');
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', function () {
      localStorage.setItem('cookies-accepted', 'false');
      cookieBanner.classList.add('hidden');
    });
  }

  // ========================
  // Smooth Scroll for Anchor Links
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

})();
