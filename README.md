# Maison Harth

Maison Harth is a responsive, single-page menswear style guide and storefront concept focused on relaxed old-money looks. It presents outfit inspiration, curated shirt-and-trouser color pairings, and a small client-side product collection.

## Features

- Four-slide hero, including a static coastal-linen opening image and an animated menswear lookbook.
- Six outfit cards with Beach & resort, Smart casual, and Tailoring filters.
- Mix-and-match color guide with seven shirt colors and seven trouser colors.
- All 49 shirt-and-trouser combinations, shown as individual selectable pairings.
- Outfit preview that updates from either palette, a combination card, or the random outfit button.
- Responsive navigation, shopping-bag drawer, wishlist controls, and newsletter form feedback.
- Local photography in `assets/`; Google Fonts are loaded from Google Fonts.
- Reduced-motion support and accessible labels and live status where appropriate.

## Architecture

This is a static front-end project. It has no server-side application, database, package manager, or build step.

```text
Browser
├── index.html       Page structure, content, image references, and controls
├── style.css        Design system, layout, responsive rules, and animations
├── script.js        Interactions and dynamically generated color pairings
└── assets/          Locally stored menswear photographs
```

The browser loads `index.html`, which references the stylesheet, JavaScript, and local images. `script.js` attaches event handlers to the page: it controls the hero slides, filters collection cards, updates the shopping bag and wishlist, and builds the color guide from shirt and trouser data arrays. The cross-product of those arrays generates the 49 pairing cards. `style.css` controls their presentation, the rest of the site, responsive behavior, and motion preferences.

## Run locally

The project can be opened directly by opening `index.html` in a browser. Alternatively, serve the folder with any static file server. For example, if Python is installed:

```powershell
python -m http.server 8000
```
There are no dependencies to install and no build command.

## Project files

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page content, hero slides, collection, color guide, journal, and newsletter markup |
| `style.css` | Colors, typography, layouts, responsive breakpoints, and animations |
| `script.js` | Hero controls, product filters, 7 × 7 outfit guide, bag, wishlist, and form interactions |
| `assets/` | Locally stored photos used in the hero, lookbook, collection, and journal |

## Updating the color guide

Edit the `shirtColors` and `trouserColors` arrays near the start of `script.js`. Each entry has a display `name`, a color `hex` value, and a `family` used to choose the outfit-tip copy. The guide creates every shirt/trouser pairing automatically, so seven entries in each list produce 49 combinations. Keep the visible heading and combination count in `index.html` in sync if you change the list sizes.

## Current demo limitations

- The shopping bag is held in browser memory and clears on page refresh. It does not submit an order or connect to a payment provider.
- Wishlist selections are not persisted.
- The newsletter form displays a local confirmation only; it does not send or store an email address.
- The page has no backend, product inventory, authentication, or automated test suite.

## Manual checks

After changing the site, check the page at desktop and mobile widths. Verify the hero controls, collection filters, add/remove bag actions, color selection, random outfit button, and newsletter feedback. The color guide should show seven shirt choices, seven trouser choices, and 49 pairing cards.