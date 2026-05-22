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

  // Staggered animation for work items
  var workItems = document.querySelectorAll('.work-item');
  workItems.forEach(function (item, i) {
    item.style.transitionDelay = (i * 0.1) + 's';
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
