
document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════════
  // 1. ANIMAZIONE HERO (Effetto retrò/tecnologico)
  // ═══════════════════════════════════════════
  (function initHeroGlitch() {
    const label    = document.querySelector('.hero-label');
    const title    = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const divider  = document.querySelector('.hero-divider');
    const btnGold  = document.querySelector('.btn-gold');
    const btnGhost = document.querySelector('.btn-ghost');
    const corners  = document.querySelectorAll('.corner');
    const noise    = document.querySelector('.hero-noise');

    if (!title) return;

    // Nasconde inizialmente gli elementi
    [label, subtitle, divider, btnGold, btnGhost].forEach(el => {
      if (el) el.style.opacity = '0';
    });
    title.style.opacity = '0';
    title.setAttribute('data-text', title.innerText); // utile per effetti CSS glitch

    // Effetto rumore iniziale
    if (noise) setTimeout(() => noise.classList.add('active'), 50);

    // Appaiono le decorazioni agli angoli
    setTimeout(() => corners.forEach(c => c.classList.add('visible')), 200);

    // Label (XV-XVII Secolo)
    if (label) {
      setTimeout(() => {
        label.style.opacity = '';
        void label.offsetWidth;           // Forza reflow per riavviare l'animazione
        label.classList.add('glitch-in');
      }, 500);
    }

    // Titolo principale con effetto flash colorato
    setTimeout(() => {
      const flashColors = ['#FF003C', '#00FFE5', '#FFE600', '#FF003C', null];
      let i = 0;
      const flash = setInterval(() => {
        if (i < flashColors.length - 1) {
          title.style.opacity     = '1';
          title.style.color       = flashColors[i];
          title.style.textShadow  = `0 0 24px ${flashColors[i]}, 0 0 60px ${flashColors[i]}`;
          i++;
        } else {
          clearInterval(flash);
          title.style.color      = '';
          title.style.textShadow = '';
          void title.offsetWidth;
          title.classList.add('glitch-in');
          setTimeout(() => title.classList.add('glitch-active'), 150);
        }
      }, 60);
    }, 1000);

    // Subtitle
    if (subtitle) {
      setTimeout(() => {
        subtitle.style.opacity = '';
        void subtitle.offsetWidth;
        subtitle.classList.add('glitch-in');
      }, 1400);
    }

    // Divider dorato
    if (divider) {
      setTimeout(() => {
        divider.style.opacity = '';
        void divider.offsetWidth;
        divider.classList.add('glitch-in');
      }, 1700);
    }

    // Pulsanti
    if (btnGold) {
      setTimeout(() => {
        btnGold.style.opacity = '';
        void btnGold.offsetWidth;
        btnGold.classList.add('glitch-in');
      }, 2000);
    }
    if (btnGhost) {
      setTimeout(() => {
        btnGhost.style.opacity = '';
        void btnGhost.offsetWidth;
        btnGhost.classList.add('glitch-in');
      }, 2150);
    }

    // Effetto "shake" della hero section
    setTimeout(() => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      const shakes = [[2,-1],[-3,2],[1,-3],[-2,1],[3,-2],[0,0]];
      shakes.forEach(([x, y], idx) => {
        setTimeout(() => {
          hero.style.transform = idx < shakes.length - 1
            ? `translate(${x}px, ${y}px)`
            : 'none';
        }, idx * 50);
      });
    }, 2600);

  })();


  // ═══════════════════════════════════════════
  // 2. NAVBAR — Effetto al scroll
  // ═══════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }


  // ═══════════════════════════════════════════
  // 3. MENU HAMBURGER (Mobile)
  // ═══════════════════════════════════════════
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    
    // Chiude il menu quando si clicca su un link
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }


  // ═══════════════════════════════════════════
  // 4. BOTTONE "TORNA SU"
  // ═══════════════════════════════════════════
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    });

    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ═══════════════════════════════════════════
  // 5. ANIMAZIONE DEI NUMERI (Counter)
  // ═══════════════════════════════════════════
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const step   = target / (1800 / 16); // circa 1.8 secondi
    let current  = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString('it-IT');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current).toLocaleString('it-IT');
      }
    }, 16);
  }

  const counters = document.querySelectorAll('[data-target]');
  if (counters.length) {
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cObs.unobserve(e.target); // anima una sola volta
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => cObs.observe(c));
  }


  // ═══════════════════════════════════════════
  // 6. ANIMAZIONE TIMELINE
  // ═══════════════════════════════════════════
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const tlObs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 150);
        }
      });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => tlObs.observe(item));
  }


  // ═══════════════════════════════════════════
  // 7. SCROLL REVEAL (elementi con classe .reveal)
  // ═══════════════════════════════════════════
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const rObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          rObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => rObs.observe(el));
  }


  // ═══════════════════════════════════════════
  // 8. NAV LINK ATTIVO (evidenzia la pagina corrente)
  // ═══════════════════════════════════════════
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ═══════════════════════════════════════════
  // 9. FILTRO GALLERIA
  // ═══════════════════════════════════════════
    const filterBtns = document.querySelectorAll('.gf-btn');
    const galleryItems = document.querySelectorAll('.gal-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.cat === filter) {
            item.style.display = '';
            setTimeout(() => item.style.opacity = '1', 10);
          } else {
            item.style.opacity = '0';
            setTimeout(() => item.style.display = 'none', 300);
          }
        });
      });
    });

    /* ── LIGHTBOX ── */
    const lightbox     = document.getElementById('lightbox');
    const lightboxImg  = document.getElementById('lightboxImg');
    const lightboxCap  = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.gal-img-wrap').forEach(wrap => {
      wrap.addEventListener('click', () => {
        const img   = wrap.querySelector('img');
        const card  = wrap.closest('.gal-card');
        const title = card.querySelector('.gal-title')?.textContent || '';
        const year  = card.querySelector('.gal-year')?.textContent || '';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCap.textContent = title + (year ? ' — ' + year : '');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => { lightboxImg.src = ''; }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ═══════════════════════════════════════════
  // 10. MUSIC PLAYER
  // ═══════════════════════════════════════════
  (function initPlayer() {
    const audio        = document.getElementById('bgMusic');
    const playBtn      = document.getElementById('playBtn');
    const progressWrap = document.getElementById('progressWrap');
    const progressFill = document.getElementById('progressFill');
    const timeCurrent  = document.getElementById('timeCurrent');
    const timeTotal    = document.getElementById('timeTotal');
    const volumeSlider = document.getElementById('volumeSlider');
    const playerWave   = document.getElementById('playerWave');
    const playerDot    = document.getElementById('playerDot');
    const playerBox    = document.getElementById('musicPlayer');

    if (!audio || !playBtn) return;

    audio.volume = 0.7;

    function formatTime(s) {
      if (isNaN(s)) return '0:00';
      const m = Math.floor(s / 60);
      return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
    }

    function setPlaying(playing) {
      if (playing) {
        playBtn.innerHTML = '&#9646;&#9646;';           // Pause
        playerWave.classList.add('player-playing');
        playerDot.classList.remove('paused');
        playerBox.classList.add('playing');
      } else {
        playBtn.innerHTML = '&#9654;';                  // Play
        playerWave.classList.remove('player-playing');
        playerDot.classList.add('paused');
        playerBox.classList.remove('playing');
      }
    }

    // Play / Pause
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(err => console.warn('Riproduzione audio bloccata dal browser:', err));
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play',  () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));

    // Aggiorna barra di progresso e tempo
    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
      timeCurrent.textContent  = formatTime(audio.currentTime);
    });

    // Imposta durata totale quando il file è caricato
    audio.addEventListener('loadedmetadata', () => {
      timeTotal.textContent = formatTime(audio.duration);
    });

    // Clic sulla barra per cambiare posizione
    progressWrap.addEventListener('click', e => {
      const rect = progressWrap.getBoundingClientRect();
      audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
    });

    // Controllo volume
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value;
    });

    // Effetto flash sul player quando si cambia sezione
    let lastSection = '';
    window.addEventListener('scroll', () => {
      document.querySelectorAll('section[id]').forEach(sec => {
        const r = sec.getBoundingClientRect();
        if (r.top <= 100 && r.bottom >= 100 && sec.id !== lastSection) {
          lastSection = sec.id;
          playerBox.style.borderColor = 'rgba(255,0,60,0.6)';
          setTimeout(() => { playerBox.style.borderColor = ''; }, 300);
        }
      });
    });

  })();

}); // Fine DOMContentLoaded