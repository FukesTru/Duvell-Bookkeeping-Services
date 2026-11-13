# Operator notes for the Duvell build (not for the client)

## Fix in GoHighLevel before review
1. **Form layout.** The form embed is set to Sticky Sidebar with trigger "always show". It opens by
   itself over the left side of every page on load (525px wide on desktop, the full screen width on
   phones) until the visitor minimises it. The site uses the code exactly as given. Every Contact us
   button on the site opens this sidebar. To stop it covering the page, change the trigger in
   GoHighLevel (or switch the layout to Inline and send the new embed code).
2. **Chat greeting.** The chat widget's pop-up message reads "Hey this is (Person), shoot me a quick
   text here (I respond in 2 minutes)". Replace "(Person)" with the owner's name and drop the
   2-minute promise.
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
