# Operator notes for the Duvell build (not for the client)

## Fix in GoHighLevel before review
1. **Form layout (done on the site).** The form now uses the INLINE layout (same form ID
   P3fIlMHnjh2t0tnhACOz, `data-layout="{'id':'INLINE'}"`, trigger alwaysShow, no sidebar, popup or
   activation attributes). It sits inside the #contact section on every page and never floats or
   opens by itself. This replaces the Sticky Sidebar code given in ADDONS-duvell.md; the exact code in
   use is `integrations.form_embed` in `site.json`. Nothing needs changing in GoHighLevel for this.
2. **Chat greeting.** The chat widget's pop-up message reads "Hey this is (Person), shoot me a quick
   text here (I respond in 2 minutes)". Replace "(Person)" with the owner's name and drop the
   2-minute promise. On phones this pop-up also sits over the bottom of the contact form until the
   visitor closes it, so consider turning the pop-up message off.
3. **Chat colour.** The chat button is GoHighLevel's default blue (#155EEF). Set it to navy #051531 so
   it matches the call and contact buttons beside it on phones.
4. **Review link.** `integrations.review_link` in `site.json` is empty, so the site has no "leave us a
   review" link yet.

## Decisions made in this build
- Hosting follows MASTER-PROMPT.md: Cloudflare Pages, project `duvellbookkeeping`, output directory
  `public`, no build command. `preview_url` is https://duvellbookkeeping.pages.dev. `vercel.json` and
  CLAUDE.md from the template are unchanged.
- `public/_headers` sends `X-Robots-Tag: noindex, nofollow` and `robots.txt` blocks everything until
  launch. At go-live, remove the X-Robots-Tag line and replace `robots.txt` with the version written
  in its comments (it allows the AI crawlers BRIEF.md lists).
- The pricing page lives at `/pricing/` (not `/fees/`) to match the client's current URL. A
  `/resources/` questions page also keeps that current URL alive.
- The current site books through Calendly (`booking_system_current` in `site.json`). Raise with the
  agency owner; the new site does not link to it.
- Pages: 19 (home, services overview, 10 service pages, about, pricing, questions, contact, privacy,
  terms, 404).
- `site.json` brand values come from the logo and current website because the form left them blank.

## Revision (bold headlines, natural images, old-site home page, verbatim pricing)
- All 8 photos were regenerated with Higgsfield GPT Image 2.6 (high, 2K, 16:9) and replaced the
  earlier set everywhere. The reconciliation photo was regenerated once because the first version had
  pseudo-readable numbers and fake handwriting. See `public/images/README.md`.
- The environment `duvell-bookkeeping-services` now also allows `d8j0ntlcm91z4.cloudfront.net`
  (Higgsfield's image host) so generated images can be downloaded.
- Old-site copy is used word for word, except that its em dashes were turned into commas or full
  stops, because `tools/check.mjs` fails any page with an em or en dash.
- The "Prefer to talk it through?" band was in the shared footer, so removing it from the home page
  removed it from every page (the footer must be identical everywhere). Phone, email and the form
  stay in each page's #contact section.
- Business tax preparation is now shown on the Pricing page (old-site content), so VERIFY.md asks the
  client to confirm it.
- The phone home page is about 10,800px tall (was 17,300px). Getting to 9,000px would mean cutting
  the client's verbatim copy or the form, so it was left there.

## Revision 3 (Antonio name fix, one photo per page, service areas)
- Owner name corrected to Antonio D. Sullivan everywhere (a search for the misspelling finds nothing). The chat
  greeting in GoHighLevel already says "Antonio" but still promises a 2-minute reply.
- 21 new photos generated with Higgsfield GPT Image 2.6; three were regenerated after inspection
  (a notebook with fake-looking words, a garage with a readable tool brand). `bookkeeper-at-work`,
  `payroll-support` and `financial-reports` are deleted. `node tools/image-dupes.mjs public` proves
  every photo appears on one page only; `public/images/README.md` maps each file to its page.
- New pages: `/service-areas/` plus Jamaica, Queens, Brooklyn and Nassau County. "Service areas" is in
  the main menu (the header stays on one line from 1024px up), a footer column on every page, and the
  sitemap. The DUVELL wordmark beside the logo now shows from 1280px wide so the menu fits.
- `tools/check.mjs` was changed so BreadcrumbList structured data (JSON-LD, never visible) no longer
  counts as a breadcrumb. Visible breadcrumbs still fail the check.
- On phones the site's round call and contact buttons stay hidden until the visitor scrolls past the
  hero, and the hero buttons come straight after the headline, so the chat greeting never covers them.

## Revision 3b (chat bubble clearance)
- Every hero now fills the first screen. On phones the headline, buttons and photo sit above a 210px
  band left empty for the chat widget's welcome bubble; the hero paragraph follows below. On desktop
  the hero reaches the bottom of the first screen, copy stays on the left and the photo stops above
  the bubble's corner.
- The alternating service heroes no longer put the photo on the left (that pushed the copy and the
  Contact us button under the bubble on desktop). They alternate by crop instead: a square photo in
  a gold frame.
- Contact links land the form above the bubble's band, the "keep account numbers out" note and the
  call/email lines now sit above the form, and on phones there is room under the form so the bubble
  never covers the footer.
- The chat widget snippet and its welcome message are unchanged.

## Revision 4 (Service areas dropdown, restyle)
- "Service areas" in the header is now a dropdown like Services on every page (overview, Jamaica,
  Queens, Brooklyn, Nassau County). Desktop: opens on hover, click and keyboard focus; Enter or Space
  toggles; Escape closes and returns focus. Phone menu: an accordion. The chat widget is hidden while
  the phone menu is open.
- The desktop navigation now starts at 1240px wide (the full bar, wordmark included, fits on one line
  from there); below that the hamburger menu and the round phone buttons are used.
- Restyle: white sticky header, League Spartan headings (self-hosted, OFL licence in
  public/assets/fonts), cool mist bands, white headlines on navy, gold only as an accent, plain photo
  frames, white cards with hairlines, split section layouts on desktop, deeper navy footer. The circular
  logo mark sits on a small navy disc in the white header so its white lettering stays visible.
- Content, URLs, pricing wording, photos, the form embed and the chat snippet are unchanged. The
  chat-bubble clearance from revision 3b is kept (210px band on phones, 200px on desktop).
- The contact section is always on a mist band; bands above it alternate white and mist.

## Revision 4b (heroes hug their content)
- Desktop (960px and wider): the empty navy band under every hero is gone. Heroes no longer fill the
  screen; the space under the buttons and photo equals the space above (96px at 1280 and 1440, 104px
  on the home page, 72 to 80px at 1024). The copy is centred against the photo beside it. The photo
  is 320 to 560px tall, depending on the screen height, so the next section starts at about the fold
  and its text stays clear of the chat greeting in the bottom-right corner.
- No full-width chat band is left on desktop. Clearance only where the greeting actually sits: the
  privacy and terms text lines up on the left, and on the 404 page at 960 to 1079px wide the two
  link lists stack.
- Phones: a hero with a photo runs the photo down to the fold, so the greeting opens over the photo.
  The privacy, terms and 404 heroes have no photo, so their text is centred between the header and
  the greeting, with even space above and below it (about 110 to 140px on a 390 x 844 phone) rather
  than one band at the bottom.
- Checked at 1440, 1280, 1024 and 390 wide on all 24 pages: the greeting covers no copy or buttons,
  either on first load or after pressing a Contact button.
- Content, photos, the dropdowns, the form embed and the chat snippet are unchanged. Only
  `public/assets/site.css` changed.
