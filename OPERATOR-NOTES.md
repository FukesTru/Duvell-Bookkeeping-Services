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
