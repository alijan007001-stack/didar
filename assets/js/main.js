(function () {
  'use strict';

  // Scroll-triggered animations
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });

  // Animated counter for stats
  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function animate(time) {
          if (!startTime) startTime = time;
          var progress = Math.min((time - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        }
        requestAnimationFrame(animate);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
    statsObserver.observe(el);
  });

  // Mobile menu toggle
  var toggle = document.getElementById('mobileToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Header background on scroll
  var header = document.getElementById('header');
  var lastScroll = 0;

  function onScroll() {
    var scrollY = window.scrollY;
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      if (scrollY > lastScroll && scrollY > 300) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
    }
    lastScroll = scrollY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 100;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Staggered animation for service cards
  var cards = document.querySelectorAll('.service-card');
  cards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

  // Project Gallery Slideshow
  document.querySelectorAll('.project-gallery').forEach(function (gallery) {
    var slides = gallery.querySelectorAll('.project-slide');
    var dotsContainer = gallery.querySelector('.project-dots');
    var prevBtn = gallery.querySelector('.project-prev');
    var nextBtn = gallery.querySelector('.project-next');
    var counterCurrent = gallery.querySelector('.counter-current');
    var currentIndex = 0;

    // Create dots
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'project-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function () { goToSlide(i); });
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.project-dot');

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      currentIndex = index;
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
      if (counterCurrent) counterCurrent.textContent = currentIndex + 1;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
      });
    }

    // Auto-advance every 5 seconds
    var autoTimer = setInterval(function () {
      goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    }, 5000);

    gallery.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    gallery.addEventListener('mouseleave', function () {
      autoTimer = setInterval(function () {
        goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
      }, 5000);
    });
  });

  // Staggered animation for project showcases
  var showcases = document.querySelectorAll('.project-showcase');
  showcases.forEach(function (item, i) {
    item.style.transitionDelay = (i * 0.15) + 's';
  });

  // Staggered animation for process steps
  var steps = document.querySelectorAll('.process-step');
  steps.forEach(function (step, i) {
    step.style.transitionDelay = (i * 0.15) + 's';
  });

  // Staggered animation for skill tags
  document.querySelectorAll('.skill-tag').forEach(function (tag, i) {
    tag.style.transitionDelay = (i * 0.03) + 's';
  });

  // Parallax effect on hero image
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
      }
    }, { passive: true });
  }

  // Contact form handling
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value;
      var email = form.querySelector('#email').value;
      var message = form.querySelector('#message').value;

      var subject = encodeURIComponent('Project Inquiry from ' + name);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = 'mailto:Murtazarezai1000@proton.me?subject=' + subject + '&body=' + body;
    });
  }

  // Lightbox for project images
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = '<button class="lightbox-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg></button><img src="" alt="">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('img');
  var lightboxClose = lightbox.querySelector('.lightbox-close');

  document.querySelectorAll('.project-slide').forEach(function (slide) {
    slide.style.cursor = 'zoom-in';
    slide.addEventListener('click', function () {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  // Cursor glow effect (subtle)
  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  var glowX = 0, glowY = 0, currentX = 0, currentY = 0;

  document.addEventListener('mousemove', function (e) {
    glowX = e.clientX;
    glowY = e.clientY;
  });

  function animateGlow() {
    currentX += (glowX - currentX) * 0.08;
    currentY += (glowY - currentY) * 0.08;
    glow.style.left = currentX + 'px';
    glow.style.top = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

})();
