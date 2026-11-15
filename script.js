'use strict';
/* =============================================================
  CHỈNH SỬA VIDEO Ở ĐÂY:
  Dán liên kết *một tệp video*, KHÔNG phải liên kết thư mục.
  VD Google Drive: https://drive.google.com/file/d/ID_VIDEO/view?usp=sharing
  VD YouTube:      https://www.youtube.com/watch?v=ID_VIDEO
  VD file GitHub:  videos/video-cua-toi.mp4
  Để trống nếu chưa chọn video.
============================================================= */
const VIDEO_LINK = '';

const $ = (sel) => document.querySelector(sel);
const menuToggle = $('#menuToggle');
const navigation = $('#navigation');
menuToggle?.addEventListener('click', () => {
  const opened = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.textContent = opened ? '✕' : '☰';
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));

const themeToggle = $('#themeToggle');
let dark = false;
try { dark = localStorage.getItem('pdmanh-theme') === 'dark'; } catch (e) {}
const applyTheme = () => { document.body.classList.toggle('dark', dark); if(themeToggle) themeToggle.textContent = dark ? '☀' : '☾'; };
applyTheme();
themeToggle?.addEventListener('click', () => {
  dark = !dark; applyTheme();
  try { localStorage.setItem('pdmanh-theme', dark ? 'dark' : 'light'); } catch (e) {}
});

const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !prefersLessMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
} else document.querySelectorAll('.reveal').forEach(item => item.classList.add('is-visible'));

const links = [...document.querySelectorAll('.navigation a')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  document.querySelectorAll('main>section[id]').forEach(section => sectionObserver.observe(section));
}
$('#helloBtn')?.addEventListener('click', () => {
  const message = $('#helloMessage');
  if(message) message.textContent = 'Cảm ơn bạn đã ghé thăm. Chúc bạn có một ngày thật đẹp! 💙';
});

