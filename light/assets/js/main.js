(function () {
  'use strict';

  // ===== Scroll Animations =====
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.anim').forEach(function (el) {
    observer.observe(el);
  });

  // ===== Header Auto-hide =====
  var header = document.getElementById('header');
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var current = window.pageYOffset;
    if (current > 80) {
      header.classList.toggle('hidden', current > lastScroll);
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = current;
  });

  // ===== Mobile Menu =====
  var toggle = document.getElementById('mobileToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // ===== Stat Counter Animation =====
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'));
        var duration = 1500;
        var start = 0;
        var startTime = null;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
    statObserver.observe(el);
  });

  // ===== Project Gallery Slideshow =====
  document.querySelectorAll('.project-gallery').forEach(function (gallery) {
    var slides = gallery.querySelectorAll('.project-slide');
    var dotsContainer = gallery.querySelector('.project-dots');
    var prevBtn = gallery.querySelector('.project-prev');
    var nextBtn = gallery.querySelector('.project-next');
    var counterCurrent = gallery.querySelector('.counter-current');
    var currentIndex = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'project-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', function () { goToSlide(i); });
      dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      var dots = dotsContainer.querySelectorAll('.project-dot');
      if (dots[currentIndex]) dots[currentIndex].classList.remove('active');
      currentIndex = index;
      if (currentIndex >= slides.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = slides.length - 1;
      slides[currentIndex].classList.add('active');
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
      if (counterCurrent) counterCurrent.textContent = currentIndex + 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(currentIndex + 1); });

    // Auto-advance
    var interval;
    function startAuto() {
      interval = setInterval(function () { goToSlide(currentIndex + 1); }, 5000);
    }
    function stopAuto() { clearInterval(interval); }
    startAuto();
    gallery.addEventListener('mouseenter', stopAuto);
    gallery.addEventListener('mouseleave', startAuto);
  });

  // ===== Lightbox =====
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  var lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  document.querySelectorAll('.project-slide').forEach(function (slide) {
    slide.addEventListener('click', function () {
      if (lightbox && lightboxImg) {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id && id.length > 1) {
        var target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ===== Contact Form =====
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.btn-submit');
      btn.textContent = 'Message Sent!';
      btn.style.background = '#059669';
      setTimeout(function () {
        btn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
        btn.style.background = '';
        form.reset();
      }, 2000);
    });
  }

  // ===== Scroll Progress =====
  var progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });

})();
