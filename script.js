// Website tiểu sử của Khá — JavaScript tương tác
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
const helloButton = document.getElementById('hello-button');
const helloResponse = document.getElementById('hello-response');

// Lưu lựa chọn sáng / tối trên thiết bị người truy cập.
try {
  if (localStorage.getItem('kha-theme') === 'dark') root.classList.remove('light');
} catch (_) {}
function updateThemeButton() {
  const isLight = root.classList.contains('light');
  themeToggle.textContent = isLight ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', isLight ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng');
}
updateThemeButton();
themeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  try { localStorage.setItem('kha-theme', root.classList.contains('light') ? 'light' : 'dark'); } catch (_) {}
  updateThemeButton();
});

// Menu điều hướng trên điện thoại.
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  menuToggle.textContent = open ? '✕' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Hiệu ứng hiện nội dung khi cuộn; nếu trình duyệt cũ, vẫn hiển thị tất cả.
const items = document.querySelectorAll('.appear');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(el => observer.observe(el));
} else {
  items.forEach(el => el.classList.add('visible'));
}

// Một chút tương tác vui: lời chào thay đổi khi nhấn nút.
const greetings = [
  'Cảm ơn m đã ghé qua! Chúc m một ngày thật đẹp ✨',
  'Một lời chào nhỏ, một niềm vui lớn. Hẹn gặp lại nhé 🌷',
  'Cứ tò mò, cứ trải nghiệm và đừng ngừng trưởng thành 🌟',
  'Mỗi cuộc gặp gỡ đều là một phần của hành trình 💛'
];
let greetingIndex = 0;
helloButton.addEventListener('click', () => {
  helloResponse.textContent = greetings[greetingIndex % greetings.length];
  greetingIndex++;
});

document.getElementById('year').textContent = new Date().getFullYear();
