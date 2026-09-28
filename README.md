# Seven Sky Hotel — website

**Live preview:** https://sameer-hassan01.github.io/seven-sky-hotel/

Static HTML/CSS/JS — no build step. Open `index.html`, or serve the folder
(`python -m http.server 8000`) so the live weather and map embed work.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, booking bar, intro, rooms, The Glasshouse, explore Murree, live weather, reviews, map |
| `rooms.html` | All four room types |
| `room.html?room=<slug>` | Room detail — `deluxe`, `premium-deluxe`, `executive`, `premium-executive` |
| `book.html` | 4-step reservation: dates & room → guest details → advance payment + proof upload → confirmation |
| `dining.html` | The Glasshouse by Seven Sky — rooftop restaurant, chef's picks, menu, hours |
| `gallery.html` | Filterable gallery with lightbox |
| `reviews.html` | Google-style reviews + moderated submission form |
| `faqs.html` | Accordion FAQs |
| `about.html` | Story, facilities, directions, policies, contact |

All content lives in `assets/js/data.js` — rooms, menu, reviews, FAQs, gallery
and hotel details are edited there, in one place.

## Confirmed by the hotel

- **Tagline:** "More than a view."
- **Address:** Upper Jhika Gali, Mall Road, Murree (from the business registration)
- **Founded:** 13 January 2026
- **Rooms:** Deluxe · Premium Deluxe · Executive · Premium Executive
- **Restaurant:** The Glasshouse by Seven Sky (rooftop)
- **Facilities:** underground parking, central heating, rooftop dining
- **Distances:** Kashmir Point 10 min · Pindi Point 10 min · Bhurban 20 min ·
  Patriata 30 min · Nathiagali 45 min

## Still needed before launch

**Photography is the biggest gap.** Every tile marked with a camera icon is a
placeholder. The Glasshouse has no real photo at all, and only one of the four
room types does. A shoot covering the rooftop restaurant, all four room types,
the balconies and the underground parking would lift the whole site.

Also outstanding, all tagged `[PLACEHOLDER]` in `data.js`:

- Room sizes, occupancy and **nightly rates** (currently indicative)
- Advance percentage (set to 15%; brief said 10–15%)
- Bank / JazzCash / Easypaisa account details
- WhatsApp number and reservations email
- Check-out time (site says 11:00 AM; listings say 1:00 PM)
- Guest review texts and the 4.8 / 132 rating
- Logo vector file (the monogram is currently redrawn as SVG)
- High tea and dinner menu prices (breakfast prices are from the printed menu)

**One conflict to resolve:** the business registration gives *Upper Jhika Gali,
Mall Road*, while the printed menu gives *Abid Majeed Road, near GPO Chowk*. The
site currently uses the registered address — please confirm which one guests
should be given.

## Not yet wired (backend phase)

- Reservation submission, payment-proof storage, admin verification
- Reviews: either Google Places API (live) or a moderation queue
- AI concierge: currently keyword-matched answers, to be replaced with the RAG bot
- Contact and review form submissions

## Deployment

Hosted on GitHub Pages from `main`. Any push to `main` republishes automatically.
