const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.primary-nav');
const themeToggle = document.querySelector('.theme-toggle');

const setTheme = (theme) => {
  const isDark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  if (themeToggle) {
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
  }
};

setTheme(localStorage.getItem('portfolio-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', nextTheme);
  setTheme(nextTheme);
});

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('#year').forEach((year) => { year.textContent = new Date().getFullYear(); });

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const formMessage = document.querySelector('#form-message');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      formMessage.textContent = 'Please complete the required fields with a valid email address.';
      formMessage.classList.add('error');
      return;
    }
    formMessage.textContent = 'Thanks — your enquiry is ready to send. This demo form is not connected to a mailbox yet.';
    formMessage.classList.remove('error');
    contactForm.reset();
  });
}
