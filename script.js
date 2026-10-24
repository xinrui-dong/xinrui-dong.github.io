'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const links = [...navigation.querySelectorAll('a')];
const sections = links.map(link => document.querySelector(link.getAttribute('href')));

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.dataset.open = 'false';
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.dataset.open = String(!isOpen);
});
links.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

let scheduled = false;
function markCurrentSection() {
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) current = section;
  }
  if (window.scrollY > 100 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    current = sections[sections.length - 1];
  }
  links.forEach(link => {
    if (link.hash === '#' + current.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(markCurrentSection);
  }
}, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
  markCurrentSection();
});
window.addEventListener('load', markCurrentSection);
markCurrentSection();
