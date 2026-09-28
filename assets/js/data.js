/* ==========================================================================
   Seven Sky Hotel — site content
   Everything marked [PLACEHOLDER] needs confirmation from the hotel.
   ========================================================================== */

window.SS = window.SS || {};

SS.HOTEL = {
  name: 'Seven Sky Hotel',
  tagline: 'More than a view.',            // website tagline (client doc)
  brandLine: 'Above the Ordinary.',        // brand signature, from the brand board
  address: 'Upper Jhika Gali, Mall Road, Murree, Pakistan',
  // Registered address from the business record (formation 13-Jan-2026).
  // NOTE: the printed menu shows "Abid Majeed Road, Near GPO Chowk" — confirm which is the guest-facing address.
  phone: '+92 51 3411412',
  phoneHref: 'tel:+92513411412',
  whatsapp: '923001234567',              // [PLACEHOLDER] WhatsApp number, digits only with country code
  email: 'reservations@sevenskyhotel.com', // [PLACEHOLDER]
  instagram: 'https://instagram.com/seven_sky_hotel_pk',
  facebook: 'https://www.facebook.com/people/Seven-Sky-Hotel/61586043084923/',
  mapsQuery: 'Seven+Sky+Hotel+Upper+Jhika+Gali+Mall+Road+Murree',
  checkIn: '12:00 PM',
  checkOut: '11:00 AM',                  // [PLACEHOLDER] listings say 1:00 PM — confirm
  advancePct: 15,                        // [PLACEHOLDER] requirement says 10–15% — confirm exact figure
  founded: '13 January 2026',
  restaurant: "The Glasshouse by Seven Sky",
  lat: 33.9071, lon: 73.3943
};

/* ---------------- Rooms ----------------
   Four room types as named by the hotel. Sizes, occupancy and rates are still
   [PLACEHOLDER] — awaiting the hotel's rate card and floor plans.
   -------------------------------------------------------------------------- */
SS.ROOMS = [
  {
    slug: 'deluxe',
    name: 'Deluxe Room',
    eyebrow: 'Comfort',
    short: "A quiet, well-appointed room for couples or solo travellers, with everything you need and nothing you don't.",
    desc: [
      'Our Deluxe Rooms are designed around rest: a firm king or twin bed dressed in crisp white linen, blackout curtains, and a marble-finished bathroom with a rain shower.',
      'Each room opens onto a private balcony with views of the surrounding hills — the ideal spot for morning chai before stepping out onto the Mall.'
    ],
    price: { from: 12000, to: 15000 },
    size: '22 m²', beds: '1 King or 2 Twin', guests: 2, view: 'Hill view',
    amenities: ['Private balcony', 'Central heating', 'Free Wi-Fi', 'Flat-screen TV', 'Mini-fridge', 'Tea & coffee', 'Rain shower', 'Room service'],
    images: [
      { ph: 'Deluxe Room — bed & balcony' },
      { ph: 'Deluxe Room — bathroom' },
      { ph: 'Deluxe Room — balcony view' }
    ]
  },
  {
    slug: 'premium-deluxe',
    name: 'Premium Deluxe Room',
    eyebrow: 'Most popular',
    short: 'Generous space, a king bed and a wide balcony facing the pines — our signature room.',
    desc: [
      'The Premium Deluxe Room is the heart of Seven Sky. A spacious layout with a king bed, a seating corner by the window and a full-width balcony where the valley opens up in front of you.',
      'Warm wood floors, soft lighting and a marble bathroom make this a room you will want to linger in — especially when the mist rolls through in the early morning.'
    ],
    price: { from: 16000, to: 20000 },
    size: '30 m²', beds: '1 King', guests: 3, view: 'Valley & pine view',
    amenities: ['Wide private balcony', 'Central heating', 'Free Wi-Fi', 'Flat-screen TV', 'Mini-fridge', 'Seating area', 'Tea & coffee', 'Rain shower', 'Room service', 'Extra bed on request'],
    images: [
      { src: 'assets/img/room-deluxe.jpg', alt: 'Premium Deluxe Room with king bed and balcony' },
      { ph: 'Premium Deluxe Room — bathroom' },
      { ph: 'Premium Deluxe Room — balcony at dusk' }
    ]
  },
  {
    slug: 'executive',
    name: 'Executive Room',
    eyebrow: 'Executive',
    short: 'A larger room with a lounge corner and a corner balcony — room to work, or to do nothing at all.',
    desc: [
      'The Executive Room adds a proper lounge corner to the bedroom — a place to work, to share a pot of tea, or simply to spread out.',
      'A corner balcony catches light for most of the day and looks out across the hills toward Kashmir Point.'
    ],
    price: { from: 22000, to: 26000 },
    size: '38 m²', beds: '1 King + sofa', guests: 3, view: 'Corner hill view',
    amenities: ['Corner balcony', 'Lounge corner', 'Central heating', 'Free Wi-Fi', 'Flat-screen TV', 'Mini-fridge', 'Tea & coffee', 'Rain shower', 'Bathrobes & slippers', 'Room service'],
    images: [
      { ph: 'Executive Room — lounge corner' },
      { ph: 'Executive Room — bedroom' },
      { ph: 'Executive Room — corner balcony' }
    ]
  },
  {
    slug: 'premium-executive',
    name: 'Premium Executive Room',
    eyebrow: 'The best in the house',
    short: 'Our largest room, with a separate living area and the widest views Seven Sky has.',
    desc: [
      'The Premium Executive Room is the top of the house: a separate living area, a king bedroom, and a wrap-around balcony with the widest views in the hotel.',
      'Ideal for longer stays, honeymooners and guests who simply want the best room we have.'
    ],
    price: { from: 28000, to: 34000 },
    size: '48 m²', beds: '1 King + sofa bed', guests: 4, view: 'Panoramic valley view',
    amenities: ['Wrap-around balcony', 'Separate living area', 'Central heating', 'Free Wi-Fi', '2 flat-screen TVs', 'Mini-fridge', 'Tea & coffee', 'Rain shower', 'Bathrobes & slippers', 'Priority room service'],
    images: [
      { ph: 'Premium Executive Room — living area' },
      { ph: 'Premium Executive Room — bedroom' },
      { ph: 'Premium Executive Room — balcony' }
    ]
  }
];

/* ---------------- Dining ---------------- */
SS.RESTAURANT = {
  name: 'The Glasshouse',
  full: 'The Glasshouse by Seven Sky',
  blurb: 'Our rooftop restaurant — glass on three sides, the hills on every one of them.'
};

SS.MENU = {
  chef: ['B.B.Q Platter', 'Special Makhni Karahi', 'Shahi Tukda'],
  sections: [
    { name: 'Breakfast', note: 'Eggs · Parathas · Chana bowls · Tea & coffee', items: [
      ['Omelette (2 pcs)', 'Two eggs, pan-fried to order', 200],
      ['Aloo Paratha', 'Paratha stuffed with spiced mashed potato', 180],
      ['Murgh Chana', 'Chana bowl enriched with tender shredded chicken', 450],
      ['Halwa Puri', 'Sweet semolina with fluffy deep-fried bread', 400],
      ['Milk Tea', 'Classic tea brewed with milk', 200],
      ['Cream Coffee', 'Coffee whipped with fresh cream', 300]
    ]},
    { name: 'High Tea & Desserts', note: 'Afternoons, 4–7 pm', items: [
      ['High Tea for Two', 'Sandwiches, pakoras, samosas, cake & tea', 1800],   // [PLACEHOLDER]
      ['Shahi Tukda', 'Fried bread soaked in saffron milk, topped with nuts', 450],
      ['Gulab Jamun (2 pcs)', 'Warm, in rose syrup', 300]
    ]},
    { name: 'Dinner', note: 'Karahi · BBQ · Continental', items: [
      ['Special Makhni Karahi', 'Chicken in a rich butter and tomato gravy', 1600],  // [PLACEHOLDER]
      ['B.B.Q Platter', 'Malai boti, seekh kabab, tikka, naan & raita', 2400],       // [PLACEHOLDER]
      ['Grilled Trout', 'Local trout, lemon butter, seasonal vegetables', 1900],    // [PLACEHOLDER]
      ['Chicken Alfredo', 'Fettuccine in a parmesan cream sauce', 1200]             // [PLACEHOLDER]
    ]}
  ]
};

/* ---------------- Reviews (Google-style; placeholder text) ---------------- */
SS.REVIEWS = [
  { name: 'Ayesha K.', rating: 5, date: '2 weeks ago', source: 'Google', text: 'The balcony view in the morning was unreal — mist all over the valley. Staff were warm and helpful, and the Mall is literally a two-minute walk.' },
  { name: 'Hamza R.', rating: 5, date: '1 month ago', source: 'Google', text: 'Very clean, newly built hotel. Heating worked perfectly on a cold night. Breakfast parathas were excellent. Will be back with the family.' },
  { name: 'Sarah M.', rating: 4, date: '1 month ago', source: 'Google', text: 'Lovely modern interiors — the marble reception is beautiful. Parking is available but fills up on weekends, so arrive early.' },
  { name: 'Bilal A.', rating: 5, date: '2 months ago', source: 'Google', text: 'Stayed in the Deluxe room. Big balcony, comfortable bed, and the makhni karahi at the restaurant was the best we had in Murree.' },
  { name: 'Fatima Z.', rating: 5, date: '3 months ago', source: 'Google', text: 'Booked for our anniversary. The team arranged a cake and decorated the room. Thoughtful service from start to finish.' },
  { name: 'Usman T.', rating: 4, date: '3 months ago', source: 'Google', text: 'Great location and value. Rooms are spacious. Would love to see a lift to the rooftop — otherwise flawless.' }
];
SS.RATING = { avg: 4.8, count: 132 }; // [PLACEHOLDER]

/* ---------------- FAQs ---------------- */
SS.FAQS = [
  { g: 'Booking & payment', q: 'How do I confirm a booking?', a: 'Choose your room and dates on the Book page, then pay a ' + SS.HOTEL.advancePct + '% advance by bank transfer, JazzCash or Easypaisa and upload a screenshot of the payment. We verify it and send your confirmation on WhatsApp and email, usually within a few hours.' },
  { g: 'Booking & payment', q: 'Is the advance payment refundable?', a: 'Advance payments are non-refundable. You may, however, request to move your dates once, subject to availability, at least 48 hours before check-in.' },
  { g: 'Booking & payment', q: 'How do I pay the remaining balance?', a: 'The balance is paid at check-in — cash, bank transfer or card.' },
  { g: 'Booking & payment', q: 'Do prices include tax?', a: 'Room rates shown are per night. Applicable taxes and a 10% service charge on restaurant bills are added at checkout.' },
  { g: 'Your stay', q: 'What are check-in and check-out times?', a: 'Check-in is from ' + SS.HOTEL.checkIn + ' and check-out is by ' + SS.HOTEL.checkOut + '. Early check-in and late check-out can be requested and are subject to availability.' },
  { g: 'Your stay', q: 'Is parking available?', a: 'Yes — free underground parking for guests, so your car stays out of the snow and the sun. Spaces are limited on peak weekends, so we recommend arriving early.' },
  { g: 'Your stay', q: 'Are the rooms heated?', a: 'The hotel has central heating throughout, and extra blankets are available on request. Murree nights can drop below freezing from December to February.' },
  { g: 'Your stay', q: 'Is there a lift?', a: 'Yes, the hotel has a lift to all floors.' },
  { g: 'Your stay', q: 'Are pets allowed?', a: 'Unfortunately, pets are not permitted.' },
  { g: 'Getting here', q: 'Where exactly is the hotel?', a: 'On Mall Road itself, at Upper Jhika Gali — so the Mall is quite literally on your doorstep, and Kashmir Point is about ten minutes away.' },
  { g: 'Getting here', q: 'How do I reach Murree from Islamabad?', a: 'It is roughly 60 km / 1.5–2 hours by car via the Murree Expressway. In winter, check the weather section on our homepage for snow — chains may be required on some days.' },
  { g: 'Your stay', q: 'Where do you serve food?', a: 'At The Glasshouse by Seven Sky, our rooftop restaurant — breakfast, high tea and dinner, with the hills on three sides. Room service runs from the same kitchen.' },
  { g: 'Getting here', q: 'Can you arrange a pick-up?', a: 'Yes, airport and Islamabad pick-ups can be arranged at an additional charge. Mention it in the special requests when booking.' }
];

/* ---------------- Gallery ---------------- */
SS.GALLERY = [
  { src: 'assets/img/entrance.jpg', cat: 'hotel', alt: 'Hotel entrance lit up in the evening', tall: true },
  { src: 'assets/img/reception.jpg', cat: 'hotel', alt: 'Marble reception desk with the Seven Sky monogram' },
  { src: 'assets/img/room-deluxe.jpg', cat: 'rooms', alt: 'Deluxe Balcony Room' },
  { ph: 'The Glasshouse — dining room', cat: 'dining' },
  { ph: 'The Glasshouse — BBQ platter', cat: 'dining' },
  { ph: 'Executive Room — lounge corner', cat: 'rooms', tall: true },
  { ph: 'Balcony view — morning mist', cat: 'views' },
  { ph: 'Snowfall at the entrance', cat: 'views' },
  { ph: 'Premium Executive Room', cat: 'rooms' },
  { ph: 'The Glasshouse — rooftop dining', cat: 'dining' },
  { ph: 'Underground parking entrance', cat: 'hotel' },
  { ph: 'Mall Road at night', cat: 'murree', tall: true },
  { ph: 'Patriata chairlift', cat: 'murree' }
];

/* ---------------- Explore Murree ---------------- */
SS.EXPLORE = [
  { name: 'Mall Road', dist: 'On your doorstep', text: 'Cafés, shops and the evening promenade — the hotel sits right on it.' },
  { name: 'Kashmir Point', dist: '10 min', text: 'The classic viewpoint over the Kashmir valleys, best at sunrise.' },
  { name: 'Pindi Point & Chairlift', dist: '10 min', text: 'Ride the chairlift down the hillside for views back toward Islamabad.' },
  { name: 'Bhurban', dist: '20 min drive', text: 'Golf, forest walks and a lighter mountain air.' },
  { name: 'Patriata (New Murree)', dist: '30 min drive', text: 'The longest chairlift and cable car in Pakistan, through dense pine forest.' },
  { name: 'Nathiagali', dist: '45 min drive', text: 'The quieter hill station with walking trails and Mukshpuri Top.' }
];
