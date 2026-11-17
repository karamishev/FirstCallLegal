# Lex Serdica – law firm website (demo template)

A website for a law firm in Sofia: a home page plus a full page for each practice area. It is written in plain HTML, CSS and JavaScript, with no frameworks, no build step and no tracking.

The firm, the twelve lawyers and the contact details are **sample content**. The site says so in a few small lines, and one setting turns those lines off once the real details are in.

## What's in it

- **Three languages: English, Bulgarian and German.** The site opens in the visitor's browser language. The switcher remembers the visitor's choice, and you can link to one language with `?lang=bg` or `#de`.
- **Light and dark theme.** The site starts light, and the toggle in the header remembers the choice.
- **Free 15-minute first consultation** is the main message: the headline, the voucher picture, the steps, the fees section and the FAQ all say it.
- **Six practice areas as tiles.** Each tile opens a full page for that area, with its own address that can be bookmarked or sent:

  | Area | Page |
  | --- | --- |
  | Family & Inheritance | `index.html#family-law` |
  | Criminal Defence | `index.html#criminal-defence` |
  | Real Estate & Property | `index.html#real-estate` |
  | Employment Law | `index.html#employment-law` |
  | Corporate & Commercial | `index.html#business-law` |
  | Immigration & Residency | `index.html#immigration` |

- **Each area page** has:
  - three key facts and deadlines on a "Worth knowing" sheet
  - four common situations
  - a "Before you call" guide: first steps, and a checklist of documents to have ready that visitors can tick off
  - the area's two lawyers with full profiles
  - five questions and answers for that area
  - links to the other areas

  Criminal Defence also opens with a "Has someone just been detained?" box and a call button. The booking buttons on an area page fill in that area in the form.
- **Twelve lawyers, two per area.** Each card shows years of experience in the field, education and languages, with a "Book" button that fills in the form and a full profile (focus areas, career, bar admission). The home page can filter the lawyers by area.
- **Booking form**: phone, video or in person; area, lawyer, language, preferred date and time. It checks the input (weekdays only, and email is required for video), warns when the chosen lawyer doesn't speak the chosen language, and has spam protection.
- **Also included**: a general FAQ, a fees section with no fixed prices, a privacy notice, a legal notice, a mobile menu and a mobile call/book bar.
- **Browser Back and Forward work between pages** and return visitors to the place they left, for example the tile they opened.
- **Accessibility**: keyboard friendly, screen-reader labels, a skip link, and focus moves to the title when a new page opens. Automated checks (axe-core) report no issues on the home page or the area pages, in any language or theme, on desktop or phone.
- **Fonts are stored with the site**, so no visitor data goes to Google (this matters for the GDPR). Bulgarian text uses proper Bulgarian Cyrillic letterforms.

## Files

```
index.html           page structure (English text is the fallback without JavaScript)
css/styles.css       all styling; colours are at the top (:root)
js/config.js         ← firm name, phone, email, address, hours, languages, theme, booking settings
js/content.js        ← practice areas and their guides, lawyers, FAQ, privacy notice, legal notice (EN/BG/DE)
js/i18n.js           ← interface text: buttons, labels, headings, messages (EN/BG/DE)
js/boot.js           applies theme and language before the page appears
js/app.js            site behaviour, including the area pages
fonts/               Source Serif 4 and Sofia Sans (self-hosted, with licences)
img/favicon.svg      the LS seal
```

## Preview it

Open `index.html` in a browser. For the closest match to a live site, serve the folder locally, for example with `python3 -m http.server` in this folder, then visit http://localhost:8000.

## Make it a real firm's site

1. **Firm details**: in `js/config.js`, set the name, tagline, phone (both `phoneDisplay` and `phoneLink`), email, address, opening hours and workdays.
2. **Lawyers**: edit `js/content.js`. Each lawyer has an `area` and a `since` year. The site works out years of experience, the "N lawyers, N years" heading, the tiles, the area pages and the form lists from them. The first lawyer listed for an area is shown first. To add a lawyer, copy one block.
3. **Photos**: put portraits in `img/lawyers/` (4:5, about 800×1000 px) and set `photo: 'img/lawyers/name.jpg'`. Without a photo, the card shows a monogram placeholder.
4. **Area guides**: each area in `js/content.js` has its texts in one place: `intro`, `facts`, `situations`, `steps`, `documents`, `faq` and the optional `urgent` box. The guides are sample texts based on Bulgarian law as of November 2026, and the firm's lawyers should review them.
5. **Legal texts**: replace `000000000` (BULSTAT) and the VAT number in the legal notice, and have both texts reviewed by the firm.
6. **Demo mode**: set `demoMode: false` in `js/config.js` to remove the "sample content" notes.
7. **Free consultation length**: change `freeMinutes` and every text follows.

### Add or rename a practice area

Copy an area block in `js/content.js` and give it a new `id` and `slug`. The slug is the page address after the `#`. Use only lowercase letters, digits and hyphens, and avoid the names of the home page sections: `top`, `main`, `areas`, `lawyers`, `process`, `fees`, `faq`, `contact` and `book`. Then set `area` to the new `id` for its lawyers.

## Connect the booking form

The form sends nothing until you give it an address. In `js/config.js`, set:

```js
booking: { endpoint: 'https://formspree.io/f/your-form-id', … }
```

Any service or server that accepts a JSON `POST` works, such as Formspree, Basin, Getform or your own script. Each request contains `mode`, `area`, `areaTitle`, `lawyer`, `lawyerName`, `language`, `date`, `time`, `name`, `phone`, `email`, `message`, `consent`, `siteLanguage`, `sentAt` and `page`. `page` includes the area page the visitor booked from, for example `…#criminal-defence`.

While `endpoint` is empty, the form shows the confirmation screen with a note that nothing was sent.

## Add a language

1. Copy the `en` block in `js/i18n.js` and translate it.
2. Add the language to every `{ en, bg, de }` text in `js/content.js`.
3. Add its code to `languages` in `js/config.js`.

## Before going live

- Replace every sample detail: lawyers, phone, email, address, BULSTAT and VAT.
- Have the firm's lawyers review the area guides and the FAQ. Laws and figures change: for example, the minimum child maintenance follows the national minimum wage.
- Check the copy against the Bulgarian bar's Code of Ethics for Lawyers. Art. 8 restricts advertising: no comparisons with other lawyers, no promised results and no client names. The firm should also confirm that a free first consultation fits the bar's fee rules.
- Connect the booking form and send a test request.
- Add the real domain to search tools such as Google Search Console. The area pages are drawn in the browser; if search ranking for each area matters, they can later be exported as separate HTML files.

## Credits

- Fonts: [Source Serif 4](https://github.com/adobe-fonts/source-serif) and [Sofia Sans](https://github.com/lettersoup/Sofia-Sans), both under the SIL Open Font License 1.1 (see `fonts/`).
- Icons: [Lucide](https://lucide.dev), ISC License, © Lucide Icons and Contributors.
