/* PIN script (unchanged) */
const CORRECT_PIN = '3120';
const overlay = document.getElementById('pinOverlay');
const pinDisplay = document.getElementById('pinDisplay');
const pinError = document.getElementById('pinError');
const keypad = document.getElementById('pinKeypad');
let entered = '';
function renderPin() { const masked = entered.split('').map(()=> '•').join(''); pinDisplay.textContent = (masked + '----').slice(0,4); pinError.textContent = ''; }
function unlock() { if (entered.length !== 4) { pinError.textContent = 'Voer 4 cijfers in'; return; } if (entered === CORRECT_PIN) { overlay.style.display = 'none'; overlay.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; document.body.focus(); } else { pinError.textContent = 'Onjuiste pincode'; setTimeout(()=> { entered=''; renderPin(); }, 600); } }
function tryAutoUnlockWhenFull() { if (entered.length === 4) { setTimeout(unlock, 150); } }
keypad.addEventListener('click', (ev)=>{ const t = ev.target; if (!t.classList.contains('pinKey')) return; const v = t.textContent.trim(); if (v === '←') { entered = entered.slice(0,-1); renderPin(); } else if (v === 'Ontgrendel') { unlock(); } else if (/^\d$/.test(v)) { if (entered.length < 4) { entered += v; renderPin(); tryAutoUnlockWhenFull(); } } });
window.addEventListener('keydown', (e)=>{ if (overlay.style.display === 'none') return; if (e.key >= '0' && e.key <= '9') { if (entered.length < 4) { entered += e.key; renderPin(); tryAutoUnlockWhenFull(); } e.preventDefault(); } else if (e.key === 'Backspace') { entered = entered.slice(0,-1); renderPin(); e.preventDefault(); } else if (e.key === 'Enter') { unlock(); e.preventDefault(); } });
renderPin();