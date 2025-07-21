import Lenis from 'https://unpkg.com/@studio-freight/lenis@1.0.35/dist/lenis.mjs';
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';

// Smooth scroll
const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Fade/slide in title
anime({
  targets: '.title',
  translateY: [-50, 0],
  opacity: [0, 1],
  duration: 1200,
  easing: 'easeOutExpo'
});

// Vanta.js GLOBE background (lighter, interactive)
let vantaEffect = null;
window.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA && window.VANTA.GLOBE) {
    vantaEffect = window.VANTA.GLOBE({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: true,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x4f8cff,
      color2: 0x38c6d9,
      backgroundColor: 0xf7f9fb,
      size: 1.2,
      points: 14.0,
      maxDistance: 22.0,
      spacing: 18.0,
      showLines: true
    });
  }
});

// Helper: Typewriter effect for SweetAlert2
function typeWriterEffect(element, text, speed = 30) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Button click → API call + click animation + SweetAlert2 with Lottie rocket, glassmorphism, animated border, bounce/zoom, and typewriter
const btn = document.getElementById('fetchBtn');
if (btn) {
  btn.addEventListener('click', () => {
    fetch('/api/hello')
      .then(r => r.json())
      .then(data => {
        anime({ targets: '#fetchBtn', scale: [1, 1.1, 1], duration: 800, easing: 'easeInOutSine' });
        window.Swal.fire({
          title: '<span style="font-size:2rem;font-weight:700;">Backend says:</span>',
          html: `
            <div style='width:120px;height:120px;margin:0 auto 1.2rem auto;'>
              <svg width="100" height="100" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="20" width="40" height="28" rx="10" fill="#4f8cff" stroke="#222" stroke-width="2"/>
                <rect x="24" y="44" width="16" height="8" rx="4" fill="#fff" stroke="#222" stroke-width="2"/>
                <circle cx="22" cy="34" r="4" fill="#fff" stroke="#222" stroke-width="2"/>
                <circle cx="42" cy="34" r="4" fill="#fff" stroke="#222" stroke-width="2"/>
                <rect x="28" y="12" width="8" height="8" rx="4" fill="#38c6d9" stroke="#222" stroke-width="2"/>
                <rect x="30" y="4" width="4" height="10" rx="2" fill="#222"/>
                <rect x="8" y="28" width="4" height="12" rx="2" fill="#b3c6e0" stroke="#222" stroke-width="2"/>
                <rect x="52" y="28" width="4" height="12" rx="2" fill="#b3c6e0" stroke="#222" stroke-width="2"/>
              </svg>
            </div>
            <div id='swal-backend-message' style='font-size:1.2rem;min-height:2.5em;margin-bottom:1.2em;color:#1a1a1a;'>${data.message}</div>
            <div style='font-size:1rem;opacity:0.92;line-height:1.5;color:#222;margin-bottom:1.2em;'>
              <b>About this project:</b><br/>
              This project demonstrates a modern DevOps pipeline: a Node.js backend and interactive frontend, deployed on <b>GCP</b> using <b>Jenkins</b> for CI/CD, <b>Docker</b> for containerization, and <b>Kubernetes</b> for orchestration.
            </div>
            <div style='font-size:0.98rem;opacity:0.7;margin-top:1.5em;text-align:center;'>
              <span style='font-weight:600;'>Aditya Chauhan</span>
            </div>
          `,
          background: 'rgba(255,255,255,0.85)',
          color: '#1a1a1a',
          showConfirmButton: true,
          confirmButtonColor: '#4f8cff',
          customClass: {
            popup: 'swal2-backend-popup glassmorph-border',
            title: 'swal2-backend-title',
            htmlContainer: 'swal2-backend-html',
          },
          didOpen: () => {
            // No Lottie animation needed for SVG icon
          },
          showClass: {
            popup: 'animate__animated animate__zoomInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      });
  });
}

// Add glassmorphism and animated border styles for SweetAlert2 popup
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .glassmorph-border {
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border-radius: 24px !important;
      border: 2.5px solid rgba(79, 140, 255, 0.25) !important;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18);
      animation: borderGlow 2.5s linear infinite alternate;
    }
    @keyframes borderGlow {
      0% { border-color: #4f8cff; box-shadow: 0 0 16px #4f8cff44; }
      100% { border-color: #38c6d9; box-shadow: 0 0 32px #38c6d988; }
    }
  `;
  document.head.appendChild(style);
}); 