const menuToggle = document.getElementById('menu-toggle');
const mobileDropdown = document.getElementById('mobile-dropdown');

menuToggle.addEventListener('click', () => {
  mobileDropdown.classList.toggle('active');
});