# Seven Sky Hotel — front-end prototype

Static HTML/CSS/JS. No build step: open `index.html` in a browser, or serve the folder
(`python -m http.server 8000` inside `site/`) — serving is needed for the live weather
fetch and the Google Maps embed to work in some browsers.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, booking bar, intro, rooms, dining, explore Murree, live weather, reviews, map, CTA |
| `rooms.html` | All room types |
| `room.html?room=<slug>` | Room detail (slugs: `standard`, `deluxe`, `executive`, `family`) |
| `book.html` | 4-step reservation: dates & room → guest details → advance payment + proof upload → confirmation. Accepts `?room=&checkin=&checkout=&adults=&children=` |
| `dining.html` | Restaurant, chef's picks, menu highlights, hours, private dining |
| `gallery.html` | Filterable gallery with lightbox |
| `reviews.html` | Google-style reviews + moderated "write a review" form (both options shown) |
| `faqs.html` | Accordion FAQs |
| `about.html` | Story, facilities, directions/map, policies, contact form |

Shared: `assets/css/style.css` (design tokens + all components), `assets/js/data.js`
(all content — rooms, menu, reviews, FAQs, gallery), `assets/js/main.js` (nav/footer,
weather via Open-Meteo, chat widget, page renderers, booking wizard).

## What is real vs placeholder

**Real (from the hotel's own material / listings):** name, tagline "Above the Ordinary.",
7S monogram (approximated in SVG — needs the vector file), address, reception phone,
Instagram handle, domain, 3 photos (entrance, reception, deluxe room), breakfast menu
prices, chef's recommendations, 10% service charge, palette + fonts from the brand board,
live Murree weather.

**Placeholder — confirm with the hotel:** everything tagged `[PLACEHOLDER]` in `data.js`,
`book.html` and `about.html`:

- WhatsApp number, reservations email
- Room types, sizes, bed configs, occupancy, nightly rates (currently 12k / 16k / 22k / 28k PKR)
- Advance percentage (set to 15%; requirement says 10–15%)
- Bank / JazzCash / Easypaisa account details
- Check-out time (listings say 1:00 PM; site says 11:00 AM)
- High tea and dinner prices; restaurant hours
- Review texts and the 4.8 / 132 rating
- Opening year, "family-run"
- Exact Google Maps pin (two Tripadvisor listings give different roads)

**Photos needed:** every tile marked with a camera icon — restaurant (hall, dishes),
standard room, executive suite, family suite, balcony view / mist, snowfall, rooftop, Mall
Road at night, Patriata. Ideally a proper shoot: blue-hour exterior, morning rooms, dinner service.

## Not yet wired (backend phase)

- Reservation submission + payment-proof storage + admin verification
- Reviews: either Google Places API pull (option 1) or moderation queue (option 2)
- AI assistant: currently keyword-matched canned answers; to be replaced with the RAG bot
- Contact form and review form submissions
