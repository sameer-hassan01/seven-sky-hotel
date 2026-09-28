/* ==========================================================================
   Seven Sky Hotel — shared behaviour
   ========================================================================== */
(function () {
  'use strict';
  const H = SS.HOTEL;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const PKR = n => 'PKR ' + n.toLocaleString('en-PK');
  const page = document.body.dataset.page || '';

  /* ---------- logo mark (approximation of the 7S monogram — replace with vector) ---------- */
  const MARK = `<svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="47" fill="none" stroke="#C9A96E" stroke-width="2"/>
    <circle cx="50" cy="50" r="41" fill="none" stroke="#C9A96E" stroke-width=".8" opacity=".6"/>
    <text x="44" y="70" font-family="Cormorant Garamond, serif" font-weight="600" font-size="58" fill="#C9A96E" text-anchor="middle">S</text>
    <text x="57" y="62" font-family="Cormorant Garamond, serif" font-weight="600" font-size="46" fill="#C9A96E" text-anchor="middle">7</text>
  </svg>`;
  SS.MARK = MARK;

  /* ---------- nav + menu ---------- */
  const NAV = [
    ['rooms.html', 'Rooms', 'rooms'],
    ['dining.html', 'Dining', 'dining'],
    ['gallery.html', 'Gallery', 'gallery'],
    ['reviews.html', 'Reviews', 'reviews'],
    ['faqs.html', 'FAQs', 'faqs'],
    ['about.html', 'Hotel', 'about']
  ];
  function renderNav() {
    const el = $('#nav');
    if (!el) return;
    const links = NAV.map(([h, t, k]) => `<a href="${h}" class="${page === k ? 'active' : ''}">${t}</a>`).join('');
    el.className = 'nav' + (el.dataset.solid !== undefined ? ' always-solid' : '');
    el.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html" aria-label="Seven Sky Hotel home"><span class="mark">${MARK}</span><span class="word">Seven Sky<small>— HOTEL · MURREE —</small></span></a>
      <nav class="nav-links">${links}</nav>
      <div class="nav-right">
        <a class="btn btn-gold" href="book.html">Book now</a>
        <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>`;
    const menu = document.createElement('div');
    menu.className = 'menu';
    menu.innerHTML = `${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
      <a class="btn btn-gold" href="book.html">Book now</a>
      <div class="meta"><span>${H.address}</span><span>${H.phone}</span></div>`;
    document.body.appendChild(menu);
    const burger = $('.burger', el);
    burger.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.classList.toggle('no-scroll', open);
      el.classList.toggle('solid', open || window.scrollY > 40);
    });
    const onScroll = () => el.classList.toggle('solid', window.scrollY > 40 || menu.classList.contains('open'));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    const el = $('#footer');
    if (!el) return;
    el.innerHTML = `<div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="brand" href="index.html"><span class="mark">${MARK}</span><span class="word">Seven Sky<small>— HOTEL · MURREE —</small></span></a>
          <div class="tag">${H.tagline}</div>
          <p>A new hotel on Mall Road — balcony rooms, central heating, underground parking, and The Glasshouse on the roof.</p>
        </div>
        <div><h5>Explore</h5><ul>${NAV.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}<li><a href="book.html">Book a stay</a></li></ul></div>
        <div><h5>Guests</h5><ul>
          <li><a href="faqs.html">Booking & payment</a></li>
          <li><a href="about.html#policies">Hotel policies</a></li>
          <li><a href="about.html#location">Getting here</a></li>
          <li><a href="index.html#weather">Murree weather</a></li>
          <li><a href="reviews.html#write">Leave a review</a></li>
        </ul></div>
        <div><h5>Contact</h5><ul class="contact">
          <li><span>Address</span>${H.address}</li>
          <li><span>Reception</span><a href="${H.phoneHref}">${H.phone}</a></li>
          <li><span>WhatsApp</span><a href="https://wa.me/${H.whatsapp}" target="_blank" rel="noopener">Chat with reservations</a></li>
          <li><span>Email</span><a href="mailto:${H.email}">${H.email}</a></li>
        </ul></div>
      </div>
      <div class="foot-bottom">
        <span>© ${new Date().getFullYear()} Seven Sky Hotel, Murree. All rights reserved.</span>
        <div class="socials"><a href="${H.instagram}" target="_blank" rel="noopener">Instagram</a><a href="${H.facebook}" target="_blank" rel="noopener">Facebook</a><a href="https://wa.me/${H.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></div>
      </div>
    </div>`;
  }

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    $$('.rv').forEach(el => io.observe(el));
  }

  /* ---------- placeholder helper ---------- */
  const ph = (label, cls = '') => `<div class="ph ${cls}"><span>${label}</span></div>`;
  const media = (img, cls = '') => img.src ? `<img src="${img.src}" alt="${img.alt || ''}" loading="lazy" class="${cls}">` : ph(img.ph, cls);
  SS.ph = ph; SS.media = media; SS.PKR = PKR;

  /* ---------- weather (Open-Meteo, free, no key) ---------- */
  const WX = {
    0: ['Clear sky', '☀️'], 1: ['Mainly clear', '🌤️'], 2: ['Partly cloudy', '⛅'], 3: ['Overcast', '☁️'],
    45: ['Fog', '🌫️'], 48: ['Freezing fog', '🌫️'], 51: ['Light drizzle', '🌦️'], 53: ['Drizzle', '🌦️'], 55: ['Heavy drizzle', '🌧️'],
    56: ['Freezing drizzle', '🌧️'], 57: ['Freezing drizzle', '🌧️'], 61: ['Light rain', '🌦️'], 63: ['Rain', '🌧️'], 65: ['Heavy rain', '🌧️'],
    66: ['Freezing rain', '🌧️'], 67: ['Freezing rain', '🌧️'], 71: ['Light snow', '🌨️'], 73: ['Snow', '❄️'], 75: ['Heavy snow', '❄️'], 77: ['Snow grains', '🌨️'],
    80: ['Rain showers', '🌦️'], 81: ['Rain showers', '🌧️'], 82: ['Violent showers', '⛈️'], 85: ['Snow showers', '🌨️'], 86: ['Heavy snow showers', '❄️'],
    95: ['Thunderstorm', '⛈️'], 96: ['Thunderstorm, hail', '⛈️'], 99: ['Thunderstorm, hail', '⛈️']
  };
  const wx = c => WX[c] || ['—', '🌡️'];
  async function weather() {
    const chip = $('#wx-chip'), now = $('#wx-now'), days = $('#wx-days'), alert = $('#wx-alert');
    if (!chip && !now) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${H.lat}&longitude=${H.lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,rain_sum,snowfall_sum&timezone=Asia%2FKarachi&forecast_days=7`;
    try {
      const d = await (await fetch(url)).json();
      const c = d.current, [label, ico] = wx(c.weather_code);
      if (chip) chip.innerHTML = `<span class="ico">${ico}</span><span class="t">${Math.round(c.temperature_2m)}°</span><span class="d"><b>Murree now</b>${label}</span>`;
      if (now) {
        now.innerHTML = `<div><div class="eyebrow">Live · Murree</div><div class="big">${Math.round(c.temperature_2m)}<sup>°C</sup></div><div class="cond"><span class="ico">${ico}</span>${label}</div></div>
          <div class="meta"><div>Feels like<b>${Math.round(c.apparent_temperature)}°C</b></div><div>Humidity<b>${c.relative_humidity_2m}%</b></div><div>Wind<b>${Math.round(c.wind_speed_10m)} km/h</b></div></div>`;
      }
      if (days) {
        const D = d.daily, out = [];
        let snowDays = 0, rainDays = 0;
        for (let i = 0; i < D.time.length; i++) {
          const dt = new Date(D.time[i] + 'T00:00:00');
          const name = i === 0 ? 'Today' : dt.toLocaleDateString('en-GB', { weekday: 'short' });
          const [, ic] = wx(D.weather_code[i]);
          const snow = D.snowfall_sum[i] || 0, rain = D.rain_sum[i] || 0, pp = D.precipitation_probability_max[i] || 0;
          let p = '';
          if (snow > 0) { p = `<div class="p snow">Snow ${snow.toFixed(1)} cm</div>`; snowDays++; }
          else if (rain > 0.5) { p = `<div class="p rain">Rain ${Math.round(rain)} mm · ${pp}%</div>`; rainDays++; }
          else if (pp >= 40) { p = `<div class="p rain">Rain ${pp}% chance</div>`; }
          else p = `<div class="p">Dry · ${pp}%</div>`;
          out.push(`<div class="wx-day"><div class="n">${name}</div><div class="ico">${ic}</div><div class="t">${Math.round(D.temperature_2m_max[i])}°<small>${Math.round(D.temperature_2m_min[i])}°</small></div>${p}</div>`);
        }
        days.innerHTML = out.join('');
        if (alert) {
          if (snowDays) alert.innerHTML = `<span class="i">❄️</span><span>Snow is forecast on ${snowDays} of the next 7 days. Roads from Islamabad can be slow — allow extra time, carry chains in heavy snow, and message us on WhatsApp for live road updates.</span>`;
          else if (rainDays) alert.innerHTML = `<span class="i">🌧️</span><span>Rain expected on ${rainDays} of the next 7 days. Pack a light jacket — the hills are at their greenest after rain.</span>`;
          else alert.innerHTML = `<span class="i">☀️</span><span>A dry week ahead — ideal for the chairlift at Pindi Point and evening walks on the Mall.</span>`;
        }
      }
    } catch (e) {
      if (chip) chip.innerHTML = `<span class="ico">🌡️</span><span class="d"><b>Murree weather</b>unavailable offline</span>`;
      if (now) now.innerHTML = `<div class="eyebrow">Live · Murree</div><p style="margin-top:20px">Weather data needs an internet connection.</p>`;
    }
  }

  /* ---------- chat widget (mock — to be wired to the RAG assistant) ---------- */
  function chat() {
    if (document.body.dataset.nochat !== undefined) return;
    const fab = document.createElement('button');
    fab.className = 'chat-fab'; fab.innerHTML = `<span class="dot"></span>Ask Seven Sky`;
    const box = document.createElement('div');
    box.className = 'chat';
    box.innerHTML = `<div class="hd"><span class="mark">${MARK}</span><div><b>Seven Sky Concierge</b><span>AI assistant · replies instantly</span></div><button aria-label="Close">×</button></div>
      <div class="log"></div>
      <div class="chips"></div>
      <form><input placeholder="Ask about rooms, weather, directions…" autocomplete="off"><button type="submit">Send</button></form>
      <div class="foot">Prefer a person? <a href="https://wa.me/${H.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a></div>`;
    document.body.append(fab, box);
    const log = $('.log', box), chips = $('.chips', box), form = $('form', box), input = $('input', box);
    const add = (t, who) => { const m = document.createElement('div'); m.className = 'msg ' + who; m.innerHTML = t; log.appendChild(m); log.scrollTop = log.scrollHeight; };
    const QUICK = ['Check-in time?', 'Is parking free?', 'How do I book?', 'Where are you exactly?', 'Do you have heating?', 'Restaurant timings?'];
    chips.innerHTML = QUICK.map(q => `<button type="button">${q}</button>`).join('');
    const KB = [
      [/check.?in|check.?out|time/i, `Check-in is from <b>${H.checkIn}</b> and check-out is by <b>${H.checkOut}</b>. Early check-in or late check-out can be requested — just mention it when booking.`],
      [/park/i, 'Yes — free <b>underground parking</b> for all guests, so your car stays out of the snow. It fills up on peak weekends, so arriving before evening is a good idea.'],
      [/book|reserv|advance|pay/i, `You can book on our <a href="book.html">Book page</a>. A ${H.advancePct}% advance secures the room — pay by bank transfer, JazzCash or Easypaisa, upload the screenshot, and we confirm on WhatsApp.`],
      [/mall|distance|far|location|where|address/i, `We're on <b>Mall Road</b> at Upper Jhika Gali — the promenade is on our doorstep, and Kashmir Point is about 10 minutes away. <a href="about.html#location">Directions here.</a>`],
      [/heat|cold|warm|winter|blanket/i, 'The hotel has <b>central heating</b> throughout, and extra blankets are always available. Murree can drop below 0°C in December–February.'],
      [/restaurant|food|dining|breakfast|eat|menu|glasshouse|rooftop/i, `<b>The Glasshouse</b>, our rooftop restaurant, serves breakfast from 7:30 am, high tea from 4 pm and dinner till 11 pm. Chef's picks: BBQ Platter, Special Makhni Karahi and Shahi Tukda. <a href="dining.html">See the menu.</a>`],
      [/weather|snow|rain|temperature/i, `Live Murree weather with rain and snow forecasts is on our <a href="index.html#weather">homepage</a>. Snow usually falls between late December and February.`],
      [/price|rate|cost|how much|room/i, `Rooms start from ${PKR(SS.ROOMS[0].price.from)} per night. <a href="rooms.html">Browse rooms & rates.</a>`],
      [/refund|cancel/i, 'Advance payments are non-refundable, but you can move your dates once, subject to availability, with at least 48 hours notice.'],
      [/pet|dog|cat/i, 'Sorry — pets are not permitted at the hotel.'],
      [/lift|elevator|stairs/i, 'Yes, there is a lift to all floors.'],
      [/wifi|internet/i, 'Free high-speed Wi-Fi throughout the hotel.'],
      [/hello|hi|salam|assalam/i, 'Assalam o Alaikum! 👋 How can I help with your stay in Murree?']
    ];
    const answer = q => { const hit = KB.find(([r]) => r.test(q)); return hit ? hit[1] : `I'm not sure about that yet — I'm a preview of the assistant. Our team can answer on <a href="https://wa.me/${H.whatsapp}" target="_blank" rel="noopener">WhatsApp</a> or ${H.phone}.`; };
    const ask = q => { if (!q.trim()) return; add(q, 'me'); input.value = ''; setTimeout(() => add(answer(q), 'bot'), 500 + Math.random() * 500); };
    chips.addEventListener('click', e => { if (e.target.tagName === 'BUTTON') ask(e.target.textContent); });
    form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); });
    let opened = false;
    const toggle = () => { const o = box.classList.toggle('open'); if (o && !opened) { opened = true; add(`Assalam o Alaikum, welcome to Seven Sky. I can help with rooms, booking, directions and the weather in Murree. What would you like to know?`, 'bot'); } if (o) input.focus(); };
    fab.addEventListener('click', toggle);
    $('.hd button', box).addEventListener('click', toggle);
    // show the button once the visitor has scrolled past the hero (or immediately on inner pages)
    const hero = $('.hero:not(.inner)');
    const showFab = () => fab.classList.toggle('show', !hero || window.scrollY > hero.offsetHeight * .6);
    window.addEventListener('scroll', showFab, { passive: true }); showFab();
  }

  /* ---------- toast ---------- */
  SS.toast = t => { let el = $('.toast'); if (!el) { el = document.createElement('div'); el.className = 'toast'; document.body.appendChild(el); } el.textContent = t; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); };

  /* ---------- home ---------- */
  function home() {
    const rooms = $('#home-rooms');
    if (rooms) rooms.innerHTML = SS.ROOMS.map((r, i) => `<a class="room-card rv d${i + 1}" href="room.html?room=${r.slug}">
      <div class="media">${media(r.images[0])}${r.eyebrow === 'Most popular' ? `<span class="tag">${r.eyebrow}</span>` : ''}</div>
      <div class="info"><h3>${r.name}</h3><div class="meta"><span>${r.size}</span><span>${r.guests} guests</span><span>${r.view}</span></div>
      <div class="price"><span><b>${PKR(r.price.from)}<small>/ night</small></b></span><span class="arr">→</span></div></div></a>`).join('');
    const ex = $('#explore');
    if (ex) ex.innerHTML = SS.EXPLORE.map(e => `<div class="cell"><span>${e.dist}</span><h3>${e.name}</h3><p>${e.text}</p></div>`).join('');
    const rv = $('#home-reviews');
    if (rv) rv.innerHTML = SS.REVIEWS.slice(0, 3).map((r, i) => reviewCard(r, i)).join('');
    const menu = $('#home-menu');
    if (menu) menu.innerHTML = SS.MENU.sections[2].items.slice(0, 3).map(([n, , p]) => `<li><b>${n}</b><span class="dots"></span><span>${p.toLocaleString()}</span></li>`).join('');
    // booking bar defaults + submit
    const bb = $('#book-bar');
    if (bb) {
      const ci = $('[name=checkin]', bb), co = $('[name=checkout]', bb);
      const t = new Date(), t2 = new Date(Date.now() + 864e5 * 2);
      ci.min = iso(t); ci.value = iso(new Date(Date.now() + 864e5)); co.value = iso(t2); co.min = ci.value;
      ci.addEventListener('change', () => { co.min = ci.value; if (co.value <= ci.value) co.value = iso(new Date(new Date(ci.value).getTime() + 864e5)); });
    }
  }
  const iso = d => d.toISOString().slice(0, 10);
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  function reviewCard(r, i = 0) {
    return `<div class="review rv d${(i % 3) + 1}"><div class="q">“</div><div class="stars">${stars(r.rating)}</div><p>${r.text}</p>
      <div class="who"><div><b>${r.name}</b><span>${r.date}</span></div><span class="gbadge"><i>G</i>${r.source}</span></div></div>`;
  }
  SS.reviewCard = reviewCard;

  /* ---------- rooms list ---------- */
  function rooms() {
    const el = $('#rooms-list'); if (!el) return;
    el.innerHTML = SS.ROOMS.map((r, i) => `<div class="room-row rv">
      <div class="media">${media(r.images[0])}</div>
      <div><div class="eyebrow">${r.eyebrow}</div><h3>${r.name}</h3><p class="lead">${r.short}</p>
        <div class="specs"><span><b>${r.size}</b></span><span><b>${r.beds}</b></span><span>Up to <b>${r.guests}</b></span><span><b>${r.view}</b></span></div>
        <ul class="amen">${r.amenities.slice(0, 6).map(a => `<li>${a}</li>`).join('')}</ul>
        <div class="foot"><div class="price-tag">From<b>${PKR(r.price.from)}<small>/ night</small></b></div>
          <div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn-ink btn-sm" href="room.html?room=${r.slug}">Details</a><a class="btn btn-gold btn-sm" href="book.html?room=${r.slug}">Book</a></div></div>
      </div></div>`).join('');
  }

  /* ---------- room detail ---------- */
  function room() {
    const el = $('#room-detail'); if (!el) return;
    const slug = new URLSearchParams(location.search).get('room') || 'deluxe';
    const r = SS.ROOMS.find(x => x.slug === slug) || SS.ROOMS[1];
    document.title = `${r.name} — Seven Sky Hotel, Murree`;
    const others = SS.ROOMS.filter(x => x.slug !== r.slug);
    el.innerHTML = `
      <div class="room-hero">${r.images.map(im => `<div>${media(im)}</div>`).join('')}</div>
      <div class="sec"><div class="wrap">
        <div class="detail-grid">
          <div>
            <div class="eyebrow">${r.eyebrow} · ${r.view}</div>
            <h1>${r.name}</h1>
            <div class="desc">${r.desc.map(p => `<p>${p}</p>`).join('')}</div>
            <div class="spec-row"><div><span>Size</span><b>${r.size}</b></div><div><span>Beds</span><b>${r.beds}</b></div><div><span>Guests</span><b>Up to ${r.guests}</b></div><div><span>View</span><b>${r.view}</b></div></div>
            <div class="eyebrow">In the room</div>
            <ul class="amen">${r.amenities.map(a => `<li>${a}</li>`).join('')}</ul>
            <div class="notice">Rates vary by season and day of the week. The price shown is a range — the exact rate for your dates is confirmed at booking. [PLACEHOLDER RATES]</div>
          </div>
          <aside class="sticky-card">
            <div class="price-tag">Nightly rate<b>${PKR(r.price.from)} – ${r.price.to.toLocaleString()}<small>/ night</small></b></div>
            <a class="btn btn-gold" href="book.html?room=${r.slug}">Book this room <span class="arr">→</span></a>
            <div class="note">Secure with a ${H.advancePct}% advance. Balance payable at check-in.</div>
            <ul><li><span>Check-in</span>${H.checkIn}</li><li><span>Check-out</span>${H.checkOut}</li><li><span>Breakfast</span>At The Glasshouse</li><li><span>Cancellation</span>Advance non-refundable</li></ul>
          </aside>
        </div>
      </div></div>
      <div class="mist sec tight"><div class="wrap"><div class="sec-head split"><div><div class="eyebrow">Other rooms</div><h2 style="font-size:clamp(30px,3.6vw,44px)">You may also like</h2></div><a class="link" href="rooms.html">All rooms</a></div>
        <div class="rooms-grid" style="grid-template-columns:repeat(3,1fr)">${others.map(o => `<a class="room-card" href="room.html?room=${o.slug}"><div class="media">${media(o.images[0])}</div><div class="info"><h3>${o.name}</h3><div class="meta"><span>${o.size}</span><span>${o.guests} guests</span></div><div class="price"><span><b>${PKR(o.price.from)}<small>/ night</small></b></span><span class="arr">→</span></div></div></a>`).join('')}</div></div></div>`;
  }

  /* ---------- gallery ---------- */
  function gallery() {
    const el = $('#gallery'); if (!el) return;
    el.innerHTML = SS.GALLERY.map((g, i) => `<div class="g ${g.tall ? 'tall' : ''}" data-cat="${g.cat}" data-i="${i}">${media(g)}</div>`).join('');
    const filters = $('#filters');
    filters.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      $$('button', filters).forEach(b => b.classList.toggle('on', b === e.target));
      const c = e.target.dataset.cat;
      $$('.g', el).forEach(g => g.classList.toggle('hide', c !== 'all' && g.dataset.cat !== c));
    });
    const lb = document.createElement('div'); lb.className = 'lightbox'; lb.innerHTML = `<button class="x" aria-label="Close">×</button><img alt=""><div class="cap"></div>`; document.body.appendChild(lb);
    el.addEventListener('click', e => {
      const g = e.target.closest('.g'); if (!g) return;
      const item = SS.GALLERY[g.dataset.i];
      if (!item.src) { SS.toast('Photo to be supplied: ' + item.ph); return; }
      $('img', lb).src = item.src; $('.cap', lb).textContent = item.alt || ''; lb.classList.add('open');
    });
    lb.addEventListener('click', () => lb.classList.remove('open'));
  }

  /* ---------- faqs ---------- */
  function faqs() {
    const el = $('#faqs'); if (!el) return;
    const groups = [...new Set(SS.FAQS.map(f => f.g))];
    el.innerHTML = groups.map(g => `<div class="faq-group"><h3>${g}</h3>${SS.FAQS.filter(f => f.g === g).map(f => `<div class="faq"><button aria-expanded="false">${f.q}<span class="pm">+</span></button><div class="a"><p>${f.a}</p></div></div>`).join('')}</div>`).join('');
    el.addEventListener('click', e => {
      const b = e.target.closest('.faq > button'); if (!b) return;
      const f = b.parentElement, a = $('.a', f), open = f.classList.toggle('open');
      b.setAttribute('aria-expanded', open); a.style.maxHeight = open ? a.scrollHeight + 'px' : 0;
    });
    $('.faq', el)?.querySelector('button').click();
  }

  /* ---------- reviews page ---------- */
  function reviews() {
    const el = $('#reviews-all'); if (!el) return;
    el.innerHTML = SS.REVIEWS.map((r, i) => reviewCard(r, i)).join('');
    const form = $('#review-form');
    form?.addEventListener('submit', e => { e.preventDefault(); form.innerHTML = `<div class="confirm" style="padding:20px 0"><div class="ok">✓</div><h3>Thank you</h3><p style="margin-top:10px">Your review has been submitted and will appear once the hotel approves it.</p></div>`; });
    $$('.star-pick button').forEach((b, i, all) => b.addEventListener('click', () => { all.forEach((x, j) => x.textContent = j <= i ? '★' : '☆'); $('#rating').value = i + 1; }));
  }

  /* ---------- dining ---------- */
  function dining() {
    const el = $('#menu'); if (!el) return;
    el.innerHTML = SS.MENU.sections.map(s => `<div class="menu-sec rv"><div class="eyebrow">${s.note}</div><h3>${s.name}</h3><ul class="menu-list">${s.items.map(([n, d, p]) => `<li><div><b>${n}</b><div style="font-size:12.5px;color:var(--ink-2);font-style:italic">${d}</div></div><span class="dots"></span><span>${p.toLocaleString()}</span></li>`).join('')}</ul></div>`).join('');
  }

  /* ---------- booking wizard ---------- */
  function booking() {
    const w = $('#wizard'); if (!w) return;
    const q = new URLSearchParams(location.search);
    const S = { step: 1, room: q.get('room') || 'deluxe', checkin: q.get('checkin') || iso(new Date(Date.now() + 864e5)), checkout: q.get('checkout') || iso(new Date(Date.now() + 864e5 * 3)), adults: +q.get('adults') || 2, children: +q.get('children') || 0, name: '', phone: '', email: '', requests: '', method: 'bank', proof: null };
    const roomOf = () => SS.ROOMS.find(r => r.slug === S.room);
    const nights = () => Math.max(1, Math.round((new Date(S.checkout) - new Date(S.checkin)) / 864e5));
    const fmt = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const ref = 'SSH-' + Math.random().toString(36).slice(2, 6).toUpperCase() + '-' + String(Date.now()).slice(-4);

    // room picker
    $('#room-pick').innerHTML = SS.ROOMS.map(r => `<label class="${r.slug === S.room ? 'on' : ''}"><input type="radio" name="room" value="${r.slug}" ${r.slug === S.room ? 'checked' : ''}><div class="th">${media(r.images[0])}</div><div><b>${r.name}</b><small>${r.size} · up to ${r.guests} guests</small><span class="pr">From ${PKR(r.price.from)} / night</span></div></label>`).join('');
    $('#room-pick').addEventListener('change', e => { S.room = e.target.value; $$('#room-pick label').forEach(l => l.classList.toggle('on', $('input', l).checked)); summary(); });
    const ci = $('[name=checkin]', w), co = $('[name=checkout]', w);
    ci.value = S.checkin; co.value = S.checkout; ci.min = iso(new Date()); co.min = S.checkin;
    $('[name=adults]', w).value = S.adults; $('[name=children]', w).value = S.children;
    w.addEventListener('input', e => {
      const n = e.target.name; if (!n || !(n in S)) return;
      S[n] = e.target.type === 'number' ? +e.target.value : e.target.value;
      if (n === 'checkin') { co.min = S.checkin; if (S.checkout <= S.checkin) { S.checkout = iso(new Date(new Date(S.checkin).getTime() + 864e5)); co.value = S.checkout; } }
      summary();
    });

    function summary() {
      const r = roomOf(), n = nights(), total = r.price.from * n, adv = Math.round(total * H.advancePct / 100);
      $('#summary').innerHTML = `<h4>Your stay</h4><div class="room">${r.name}</div><div class="dates">${fmt(S.checkin)} → ${fmt(S.checkout)}<br>${n} night${n > 1 ? 's' : ''} · ${S.adults} adult${S.adults > 1 ? 's' : ''}${S.children ? ` · ${S.children} child${S.children > 1 ? 'ren' : ''}` : ''}</div>
        <dl><dt>${PKR(r.price.from)} × ${n} night${n > 1 ? 's' : ''}</dt><dd>${PKR(total)}</dd><dt>Taxes</dt><dd>At check-in</dd><dt>Estimated total</dt><dd>${PKR(total)}</dd></dl>
        <div class="adv"><span>Advance to pay now (${H.advancePct}%)</span><b>${PKR(adv)}</b><small>Balance of ${PKR(total - adv)} at check-in. Advance is non-refundable.</small></div>`;
      $('#pay-amount') && ($('#pay-amount').textContent = PKR(adv));
      $('#pay-ref') && ($('#pay-ref').textContent = ref);
    }
    function go(n) {
      S.step = n;
      $$('.step', w).forEach(s => s.classList.toggle('on', +s.dataset.step === n));
      $$('.steps li').forEach(li => { const i = +li.dataset.step; li.classList.toggle('on', i === n); li.classList.toggle('done', i < n); });
      window.scrollTo({ top: w.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      if (n === 4) $('#summary').style.display = 'none';
    }
    w.addEventListener('click', e => {
      const b = e.target.closest('[data-go]'); if (!b) return;
      const to = +b.dataset.go;
      if (to === 3) { // validate guest details
        const f = $('.step[data-step="2"] form', w); if (!f.reportValidity()) return;
      }
      if (to === 4) {
        if (!S.proof) { SS.toast('Please upload a screenshot of your payment.'); return; }
        if (!$('#agree').checked) { SS.toast('Please accept the advance payment policy.'); return; }
        $('#conf-ref').textContent = ref; $('#conf-email').textContent = S.email || 'your email';
      }
      go(to);
    });
    // payment tabs
    $('.pay-tabs').addEventListener('click', e => { if (e.target.tagName !== 'BUTTON') return; S.method = e.target.dataset.m; $$('.pay-tabs button').forEach(b => b.classList.toggle('on', b === e.target)); $$('.pay-pane').forEach(p => p.classList.toggle('on', p.dataset.m === S.method)); });
    // upload preview
    $('#proof').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return; S.proof = f;
      const up = $('.upload');
      if (f.type.startsWith('image/')) { const rd = new FileReader(); rd.onload = () => { up.innerHTML = `<img src="${rd.result}" alt="Payment proof"><b>${f.name}</b><span>Click to replace</span><input type="file" id="proof" accept="image/*,.pdf">`; rebind(); }; rd.readAsDataURL(f); }
      else { up.innerHTML = `<b>${f.name}</b><span>Click to replace</span><input type="file" id="proof" accept="image/*,.pdf">`; rebind(); }
    });
    function rebind() { $('#proof').addEventListener('change', e => { S.proof = e.target.files[0]; }); }
    summary(); go(1);
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderNav(); renderFooter(); chat();
    home(); rooms(); room(); gallery(); faqs(); reviews(); dining(); booking();
    weather(); reveal();
  });
})();
