/* =============================================================================
   Lex Serdica · site settings
   -----------------------------------------------------------------------------
   Start here. These values are used all over the site: header, hero, booking
   form, footer, legal notices and the data search engines read.

   Lawyers, practice areas and FAQ ........ js/content.js
   Buttons, labels and other interface text  js/i18n.js
   ============================================================================= */

window.SITE_CONFIG = {
  firm: {
    name: 'Lex Serdica',
    // Short line shown under the logo, one per language
    tagline: { en: 'Legal services', bg: 'Правни услуги', de: 'Rechtsberatung' },
  },

  contact: {
    phoneDisplay: '+359 2 012 3456',   // as shown on the page (sample number)
    phoneLink: '+35920123456',         // the same number for tap-to-call links: + and digits only
    email: 'office@lexserdica.bg',
    address: {
      en: '25 Neofit Rilski St., 3rd floor, 1000 Sofia, Bulgaria',
      bg: 'ул. „Неофит Рилски“ 25, ет. 3, 1000 София',
      de: 'ul. Neofit Rilski 25, 3. Etage, 1000 Sofia, Bulgarien',
    },
    // Used for the structured data search engines read
    postal: { street: 'ul. Neofit Rilski 25', city: 'Sofia', zip: '1000', country: 'BG' },
    mapsQuery: 'ул. „Неофит Рилски“ 25, 1000 София',  // what "Get directions" searches for in Google Maps
    hours: { open: '9:00', close: '18:00' },
    workdays: [1, 2, 3, 4, 5],         // 1 = Monday … 7 = Sunday; the booking form only accepts these days
  },

  freeMinutes: 15,                     // length of the free first consultation; every text uses this number

  languages: ['en', 'bg', 'de'],       // offered in the language switcher, in this order
  defaultLanguage: 'en',               // used when the visitor's browser language is not offered
  theme: 'light',                      // starting theme: 'light', 'dark' or 'system' (follows the device)

  booking: {
    // Where booking requests are sent, as JSON (e.g. a Formspree, Basin or your own server URL).
    // Leave empty for demo mode: the form works, but nothing is sent anywhere.
    endpoint: '',
    maxDaysAhead: 60,                  // latest preferred date a visitor can pick
    timeSlots: [['9:00', '12:00'], ['12:00', '15:00'], ['15:00', '18:00']],
  },

  // Shows the small "sample content" lines and the template note in the legal texts.
  // Set to false once the real lawyers, phone, address and legal texts are in.
  demoMode: true,
};
