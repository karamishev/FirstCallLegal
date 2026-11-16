# Lex Serdica – law firm website (demo template)

A one-page website for a law firm in Sofia, written in plain HTML, CSS and JavaScript. It has no frameworks, no build step and no tracking.

The firm, the six lawyers and the contact details are **sample content**. The page says so in two small lines, and one setting turns those lines off once the real details are in.

## What's in it

- **Three languages: English, Bulgarian and German.** The site opens in the visitor's browser language. The switcher remembers the visitor's choice, and you can link to one language with `?lang=bg` or `#de`.
- **Light and dark theme.** The site starts light, and the toggle in the header remembers the choice.
- **Free 15-minute first consultation** is the main message: the headline, the voucher picture, the steps, the fees section and the FAQ all say it.
- **Practice areas**: six of them, each with a lead lawyer.
- **Lawyer cards**: each shows years of experience in the field, education and languages. Each card has a "Book" button that fills in the form, and a full profile with focus areas, career and bar admission.
- **Booking form**: phone, video or in person; area, lawyer, language, preferred date and time. It checks the input (weekdays only, and email is required for video), warns when the chosen lawyer doesn't speak the chosen language, and has spam protection.
- **Also included**: an FAQ, a fees section with no fixed prices, a privacy notice, a legal notice, a mobile menu and a mobile call/book bar.
- **Accessibility**: keyboard friendly, screen-reader labels and a skip link. Automated checks (axe-core) report no issues in any language or theme.
- **Fonts are stored with the site**, so no visitor data goes to Google (this matters for the GDPR). Bulgarian text uses proper Bulgarian Cyrillic letterforms.

## Files

```
index.html           page structure (English text is the fallback without JavaScript)
css/styles.css       all styling; colours are at the top (:root)
js/config.js         ← firm name, phone, email, address, hours, languages, theme, booking settings
js/content.js        ← lawyers, practice areas, FAQ, privacy notice, legal notice (EN/BG/DE)
js/i18n.js           ← interface text: buttons, labels, messages (EN/BG/DE)
js/boot.js           applies theme and language before the page appears
js/app.js            site behaviour
fonts/               Source Serif 4 and Sofia Sans (self-hosted, with licences)
img/favicon.svg      the LS seal
```

## Preview it

Open `index.html` in a browser. For the closest match to a live site, serve the folder locally, for example with `python3 -m http.server` in this folder, then visit http://localhost:8000.

## Make it a real firm's site

1. **Firm details**: in `js/config.js`, set the name, tagline, phone (both `phoneDisplay` and `phoneLink`), email, address, opening hours and workdays.
2. **Lawyers**: edit `js/content.js`. Each lawyer has a `since` year, and the site works out years of experience, the "N lawyers, N years" heading and the form lists from it. To add a lawyer, copy one block.
3. **Photos**: put portraits in `img/lawyers/` (4:5, about 800×1000 px) and set `photo: 'img/lawyers/name.jpg'`. Without a photo, the card shows a monogram placeholder.
4. **Legal texts**: replace `000000000` (BULSTAT) and the VAT number in the legal notice, and have both texts reviewed by the firm.
5. **Demo mode**: set `demoMode: false` in `js/config.js` to remove the "sample content" notes.
6. **Free consultation length**: change `freeMinutes` and every text follows.

## Connect the booking form

The form sends nothing until you give it an address. In `js/config.js`, set:

```js
booking: { endpoint: 'https://formspree.io/f/your-form-id', … }
```

Any service or server that accepts a JSON `POST` works, such as Formspree, Basin, Getform or your own script. Each request contains `mode`, `area`, `areaTitle`, `lawyer`, `lawyerName`, `language`, `date`, `time`, `name`, `phone`, `email`, `message`, `consent`, `siteLanguage`, `sentAt` and `page`.

While `endpoint` is empty, the form shows the confirmation screen with a note that nothing was sent.

## Add a language

1. Copy the `en` block in `js/i18n.js` and translate it.
2. Add the language to every `{ en, bg, de }` text in `js/content.js`.
3. Add its code to `languages` in `js/config.js`.

## Before going live

- Replace every sample detail: lawyers, phone, email, address, BULSTAT and VAT.
- Check the copy against the Bulgarian bar's Code of Ethics for Lawyers. Art. 8 restricts advertising: no comparisons with other lawyers, no promised results and no client names. The firm should also confirm that a free first consultation fits the bar's fee rules.
- Connect the booking form and send a test request.
- Add the real domain to search tools such as Google Search Console.

## Credits

- Fonts: [Source Serif 4](https://github.com/adobe-fonts/source-serif) and [Sofia Sans](https://github.com/lettersoup/Sofia-Sans), both under the SIL Open Font License 1.1 (see `fonts/`).
- Icons: [Lucide](https://lucide.dev), ISC License, © Lucide Icons and Contributors.
