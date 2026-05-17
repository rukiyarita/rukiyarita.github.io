document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  const scrollTop = document.getElementById('scrollTop');
  const navLinks = Array.from(document.querySelectorAll('.nav-link, .mobile-link'));
  const sections = Array.from(document.querySelectorAll('main section, footer#contact'));
  const revealItems = document.querySelectorAll('.reveal');
  const skillCards = document.querySelectorAll('.skill-card');

  menuButton.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-bars text-lg" aria-hidden="true"></i>'
      : '<i class="fa-solid fa-xmark text-lg" aria-hidden="true"></i>';
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.innerHTML = '<i class="fa-solid fa-bars text-lg" aria-hidden="true"></i>';
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        if (entry.target.classList.contains('skill-card')) {
          const level = entry.target.dataset.level || '80';
          const bar = entry.target.querySelector('b');
          window.setTimeout(() => {
            bar.style.width = `${level}%`;
          }, 120);
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => revealObserver.observe(item));
  skillCards.forEach((card) => revealObserver.observe(card));

  const setActiveLink = () => {
    const scrollPosition = window.scrollY + 130;
    let currentId = 'home';

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPosition) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });

    scrollTop.classList.toggle('show', window.scrollY > 600);
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
