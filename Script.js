// ── NAV: set active link on click ──
function setActive(el) {
  document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
  document.querySelectorAll('.nav li').forEach(li => li.classList.remove('active'));
  el.classList.add('active');
  el.closest('li').classList.add('active');
}

// ── NAV: scroll spy ──
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.remove('active');
        a.closest('li').classList.remove('active');
      });
      const active = document.querySelector(`.nav a[href="#${id}"]`);
      if (active) {
        active.classList.add('active');
        active.closest('li').classList.add('active');
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ── THEME TOGGLE ──
const themeBtn = document.getElementById('themeBtn');
const html = document.documentElement;
const saved = localStorage.getItem('theme');

if (saved === 'light') {
  html.classList.add('light');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  html.classList.toggle('light');
  const isLight = html.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  glow.style.background = isLight
    ? 'radial-gradient(circle, rgba(192,82,122,0.07) 0%, rgba(192,82,122,0.03) 30%, transparent 70%)'
    : 'radial-gradient(circle, rgba(242,168,196,0.08) 0%, rgba(242,168,196,0.04) 30%, transparent 70%)';
});

// ── CURSOR GLOW ──
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(242,168,196,0.08) 0%, rgba(242,168,196,0.04) 30%, transparent 70%);
  transition: opacity 0.3s ease;
  opacity: 0;
`;
document.body.appendChild(glow);

let glowX = 0, glowY = 0;
let targetX = 0, targetY = 0;
let visible = false;

document.addEventListener('mousemove', e => {
  targetX = e.clientX;
  targetY = e.clientY;
  if (!visible) { glow.style.opacity = '1'; visible = true; }
});

document.addEventListener('mouseleave', () => {
  glow.style.opacity = '0';
  visible = false;
});

function animateGlow() {
  glowX += (targetX - glowX) * 0.08;
  glowY += (targetY - glowY) * 0.08;
  glow.style.left = glowX + 'px';
  glow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();