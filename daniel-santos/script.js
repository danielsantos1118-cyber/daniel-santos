// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Smooth scroll with nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll-in animations
const revealItems = document.querySelectorAll(
  '.service-card, .gallery-item, .stat-item, .about-grid, .contact-grid'
);

revealItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 60 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

// Stagger cards
document.querySelectorAll('.service-card').forEach((el, i) => {
  el.dataset.delay = i;
});

document.querySelectorAll('.gallery-item').forEach((el, i) => {
  el.dataset.delay = i;
});

revealItems.forEach(el => observer.observe(el));

// Gallery video crossfade
const vidA = document.getElementById('vid-a');
const vidB = document.getElementById('vid-b');
const vidC = document.getElementById('vid-c');

if (vidA && vidB && vidC) {
  const clips = [vidA, vidB, vidC];
  let current = 0;

  function playClip(index) {
    const active = clips[index];
    clips.forEach((v, i) => {
      if (i !== index) v.classList.add('hidden');
    });
    active.classList.remove('hidden');
    active.currentTime = 0;
    active.play().catch(() => {});
    active.onended = () => {
      current = (current + 1) % clips.length;
      playClip(current);
    };
  }

  vidB.classList.add('hidden');
  vidC.classList.add('hidden');
  playClip(0);
}

// Services accordion (mobile only)
const mobileBreak = window.matchMedia('(max-width: 768px)');

document.querySelectorAll('.card-header').forEach(header => {
  header.addEventListener('click', () => {
    if (!mobileBreak.matches) return;
    const card = header.closest('.service-card');
    const isOpen = card.classList.contains('open');
    document.querySelectorAll('.service-card').forEach(c => c.classList.remove('open'));
    if (!isOpen) card.classList.add('open');
  });
});
