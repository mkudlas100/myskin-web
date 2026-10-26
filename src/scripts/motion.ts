// Pohyb na celém webu. Vše se zapíná jen s třídou .motion (JS zapnutý, bez prefers-reduced-motion).
// [data-reveal]       prvek vyjede při vstupu do obrazovky (--i = pořadí ve skupině)
// [data-reveal=clip]  fotka se odkryje zespodu
// .split              slova nadpisu vyjedou zpod linky
// .prose > *          bloky textu článků a služeb se odhalují automaticky
// [data-parallax]     fotka se při scrollu posouvá proti rámu (hodnota = síla)
// [data-depth-root]   vrstvy [data-depth] uvnitř reagují na myš
// .peek-list a        náhled fotky (.peek) sleduje kurzor
// .js-progress        svislá linka se plní podle scrollu (--tp), položky li dostanou .on
// #motto              motto se rozsvěcuje slovo po slovu

const root = document.documentElement;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

function splitWords(el: Element) {
  if (el.querySelector('.w')) return;
  let i = 0;
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) {
        const parts = (child.textContent || '').split(/([ \n\t]+)/);
        const frag = document.createDocumentFragment();
        for (const part of parts) {
          if (!part) continue;
          if (/^[ \n\t]+$/.test(part)) { frag.append(' '); continue; }
          const w = document.createElement('span'); w.className = 'w';
          const inner = document.createElement('span'); inner.textContent = part;
          inner.style.setProperty('--i', String(i++));
          w.append(inner); frag.append(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === 1) walk(child);
    }
  };
  walk(el);
}

if (root.classList.contains('motion')) {
  (window as any).__rv = true;

  // texty článků a služeb: každý blok se odhalí sám, v rámci obrazovky postupně
  document.querySelectorAll('.prose').forEach((p) => {
    Array.from(p.children).forEach((el, n) => {
      if (!el.hasAttribute('data-reveal')) { el.setAttribute('data-reveal', ''); (el as HTMLElement).style.setProperty('--i', String(n % 3)); }
    });
  });
  document.querySelectorAll('.split').forEach(splitWords);
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('[data-reveal], .split').forEach((el) => io.observe(el));

  // vrstvy za myší
  if (fine) {
    document.querySelectorAll<HTMLElement>('[data-depth-root]').forEach((box) => {
      const layers = Array.from(box.querySelectorAll<HTMLElement>('[data-depth]'));
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const step = () => {
        cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
        layers.forEach((l) => { const d = Number(l.dataset.depth); l.style.translate = `${(cx * d).toFixed(2)}px ${(cy * d).toFixed(2)}px`; });
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(step) : 0;
      };
      box.addEventListener('pointermove', (e) => {
        const r = box.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
        if (!raf) raf = requestAnimationFrame(step);
      });
      box.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!raf) raf = requestAnimationFrame(step); });
    });

    // náhled fotky u řádků seznamu
    document.querySelectorAll<HTMLElement>('.peek-list a').forEach((a) => {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
      const step = () => {
        cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
        a.style.setProperty('--mx', `${cx.toFixed(1)}px`); a.style.setProperty('--my', `${cy.toFixed(1)}px`);
        raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(step) : 0;
      };
      a.addEventListener('pointerenter', (e) => { const r = a.getBoundingClientRect(); cx = tx = e.clientX - r.left; cy = ty = e.clientY - r.top; step(); });
      a.addEventListener('pointermove', (e) => { const r = a.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; if (!raf) raf = requestAnimationFrame(step); });
    });
  }

  // scroll: paralaxa, linky průběhu, motto
  const par = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const progress = Array.from(document.querySelectorAll<HTMLElement>('.js-progress'));
  const motto = document.getElementById('motto');
  let words: HTMLElement[] = [];
  if (motto) {
    const text = motto.textContent || '';
    motto.textContent = '';
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    text.split(' ').forEach((w, i) => { if (i) vis.append(' '); const s = document.createElement('span'); s.className = 'mw'; s.textContent = w; vis.append(s); });
    motto.append(sr, vis);
    words = Array.from(motto.querySelectorAll<HTMLElement>('.mw'));
  }
  let ticking = false;
  const onScroll = () => {
    const vh = innerHeight;
    par.forEach((el) => {
      const r = el.parentElement!.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.translate = `0 ${(p * Number(el.dataset.parallax) * -100).toFixed(2)}%`;
    });
    progress.forEach((tl) => {
      const r = tl.getBoundingClientRect();
      const tp = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
      tl.style.setProperty('--tp', tp.toFixed(3));
      tl.querySelectorAll(':scope > li').forEach((li, i, all) => li.classList.toggle('on', tp >= (i + 0.5) / all.length));
    });
    if (motto && words.length) {
      const r = motto.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.5)));
      const lit = Math.round(prog * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();
}

// Rozbalovací otázky: plynulé otevření a zavření (bez JS fungují jako běžné <details>).
document.querySelectorAll<HTMLDetailsElement>('details.qa').forEach((d) => {
  const sum = d.querySelector('summary');
  const body = d.querySelector<HTMLElement>('.qa__a');
  if (!sum || !body || !root.classList.contains('motion')) return;
  sum.addEventListener('click', (e) => {
    e.preventDefault();
    if (d.open) {
      const h = body.scrollHeight;
      body.animate([{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => { d.open = false; };
    } else {
      d.open = true;
      const h = body.scrollHeight;
      body.animate([{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  });
});
