# 🐴 Pony Party Website Template

**Website:** Pony Party & Mini Horse Therapy Visits  
**Version:** 1.0.0  
**Author:** Custom Build  

---

## Overview

A full-featured, responsive website template for a pony party and mini horse therapy business. Built with semantic HTML5, modern CSS (custom properties), and vanilla ES6+ JavaScript. No frameworks required.

---

## File Structure

```
pony-party/
├── assets/
│   ├── css/
│   │   ├── style.css        — Main styles, variables, components
│   │   ├── dark-mode.css    — Dark theme overrides
│   │   └── rtl.css          — Right-to-left layout support
│   └── js/
│       └── main.js          — All interactive functionality
├── pages/
│   ├── index.html           — Home (6 sections)
│   ├── home2.html           — Home 2 alternate (6 sections)
│   ├── about.html           — About Us (3 sections)
│   ├── services.html        — Services with tabs (3 sections)
│   ├── blog.html            — Blog listing (3 sections)
│   ├── contact.html         — Contact + Booking form (3 sections)
│   ├── login.html           — Login page
│   ├── register.html        — Register page
│   ├── 404.html             — Custom error page
│   └── coming-soon.html     — Pre-launch / maintenance page
└── README.md
```

---

## Pages

| Page | Sections | Description |
|------|----------|-------------|
| index.html | 6 | Hero, Features, Pony Profiles, Packages, Testimonials, CTA |
| home2.html | 6 | Hero 2, Stats Bar, Therapy Process, Grooming, Paddock Reqs, Gallery |
| about.html | 3 | Story + Mission, Team, CTA |
| services.html | 3 | Tabbed Services (Party/Therapy/Grooming/Corporate/Weddings), FAQ, CTA |
| blog.html | 3 | Featured Post, Blog Grid, Newsletter |
| contact.html | 3 | Contact Info + Form, Online Booking, Map |
| login.html | — | Auth page matching reference design |
| register.html | — | Auth page matching reference design |
| 404.html | — | Custom 404 with navigation |
| coming-soon.html | — | Countdown + notify form |

---

## Features

### Responsive Breakpoints
- **360px** – Mobile: Logo + name left, hamburger right
- **768px** – Tablet: Wider grids, improved layout
- **1024px** – Desktop: Full navigation visible in center
- **1440px** – Large: Max-width container expanded

### Header Behavior
- **Mobile (≤1023px):** Brand logo + name (left) | Hamburger (right)
- **Desktop (≥1024px):** Brand (left) | Nav links (center) | RTL + Theme + Login (right)
- Sticky on scroll with blur backdrop

### Dark / Light Mode
- Automatic system preference detection
- Manual toggle button on every page
- Persisted in localStorage
- Smooth transitions

### RTL Support
- Full right-to-left layout via `[dir="rtl"]` on `<html>`
- Toggle button on every page
- Persisted in localStorage

### Form Validation
- Real-time client-side validation
- Custom error messages
- Rules: required, email, min-length, password-match
- Booking form with full event details

### Animations
- Intersection Observer scroll reveals
- Floating blob backgrounds
- Float animation on pony cards and hero elements
- Counter animation for stats
- CSS spring transitions on cards/buttons

### Other Components
- FAQ accordion
- Service tabs with panels
- Grooming add-on selector with price calculator
- Countdown timer (coming-soon page)
- Back-to-top button
- Toast notifications
- Skeleton loader classes

---

## Customization

### Colors
Edit CSS variables in `assets/css/style.css` `:root`:
```css
--primary: #D4567A;      /* Hot pink — change to your brand color */
--secondary: #6B4FA0;    /* Purple accent */
--accent: #F7C59F;       /* Warm peach */
```

### Fonts
Currently using Google Fonts:
- **Display:** Playfair Display (headings)
- **Body:** DM Sans (body text)

Change imports at the top of `style.css` and update `--font-display` / `--font-body` variables.

### Images
All images use Unsplash URLs. Replace with your own:
```html
<img src="YOUR_IMAGE_URL" alt="Description" ...>
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Performance Notes

- Mobile-first CSS approach
- `loading="lazy"` on all non-critical images
- `loading="eager"` on hero image
- CSS custom properties for theming (no JavaScript theme switching overhead)
- Intersection Observer for scroll animations (no scroll event listeners)

---

## Accessibility

- Semantic HTML5 elements (`header`, `nav`, `main`, `footer`, `section`)
- ARIA labels on all interactive elements
- Keyboard-navigable forms
- Focus visible styles (browser defaults preserved)
- Color contrast meets WCAG 2.1 AA

---

© 2025 Pony Party. All rights reserved.
