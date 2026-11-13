# Add-ons for this build (read after MASTER-PROMPT.md; these win where they differ)

## 0. This client is a bookkeeping firm, not a law firm
Duvell Bookkeeping Services (legal name Duvell Industries LLC) is a bookkeeping and accounting
services business built by Strain Systems. Wherever MASTER-PROMPT.md or BRIEF.md says attorney,
law firm, practice areas or legal, read it for a bookkeeping firm instead:
- "Practice areas" become **Services** (`/services/` overview + one page per service from the CSV).
- The owner, Antoni D Sullivan, is the business owner, not an attorney. No "Attorney advertising"
  line, no bar admissions, no LegalService/Attorney schema (use AccountingService / LocalBusiness).
- Keep the honesty rules: no invented credentials (never "CPA", "certified", "licensed", "expert"
  unless the CSV or the current site states it), no guaranteed savings or refunds, no fake reviews,
  results or years in business. Footer disclaimer: general information only, not tax, legal or
  investment advice.
- Areas served is "Remote" with primary city New York: present the business as serving clients
  remotely, based in Jamaica, Queens, New York. Build one "Areas we serve" page only if real towns
  are given; otherwise skip town pages and say so in VERIFY.md.
- Note the CSV's "Website Domain You Want to Use" says duvellbookkeping.com (likely a typo of
  duvellbookkeeping.com, their existing site). Use www.duvellbookkeeping.com and list it in VERIFY.md.

## 1. Opening animation
Show a short, elegant intro animation every time someone opens the website (logo/wordmark reveal
in the brand colours, about 1.5 to 2.5 seconds, then it fades away to the page). It must not block
the page if JavaScript fails, must be skippable by click/tap or keypress, and must be skipped
entirely when the visitor has prefers-reduced-motion set.

## 2. Logo
The client did not attach a logo. Get it from their current website, https://duvellbookkeeping.com
(header image, favicon or Open Graph image). Download the best quality version into
`public/images/` and use it. Only if no usable logo exists there, fall back to the typographic
wordmark, and note it in VERIFY.md.

## 3. Home button in the navbar
Add a "Home" link as the first item in the main menu (desktop and mobile) on every page.

## 4. Images
Images generated with Higgsfield for this site are in the attached duvell-images.zip (8 JPGs plus README.md). Unzip its images/ folder into `public/images/` (README.md describes each one
for what each one shows). Use them across the site where they fit. They are illustrative photos,
never present them as the real owner, staff, office or clients.

## 5. GoHighLevel embeds (use these exactly as given)
### Website contact form embed (use wherever the contact form goes)
```html
<iframe
    src="https://api.leadconnectorhq.com/widget/form/P3fIlMHnjh2t0tnhACOz"
    style="display:none;width:100%;height:100%;border:none;border-radius:10px"
    id="sticky-sidebar-left-P3fIlMHnjh2t0tnhACOz"
    data-layout="{'id':'STICKY_SIDEBAR','minimizedTitle':'Contact us','isLeftAligned':true,'isRightAligned':false,'allowMinimize':true,'buttonColor':'#101828','buttonType':'text','buttonSize':'medium','buttonIcon':'chat','cornerRadius':{'tl':8,'tr':8,'bl':8,'br':8},'fontSize':16}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Website Form (Duvell Bookkeeping Services)"
    data-height="483"
    data-layout-iframe-id="sticky-sidebar-left-P3fIlMHnjh2t0tnhACOz"
    data-form-id="P3fIlMHnjh2t0tnhACOz"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Website Form (Duvell Bookkeeping Services)"
        >
</iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```

### Chat widget embed (load once per page, before </body>, instead of the built-in chat)
```html
<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6af71d64f31f8c02e66a1dcd"></script>
```
