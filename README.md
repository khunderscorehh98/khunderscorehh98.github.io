# Haziq Halidi — Portfolio

Personal portfolio site built from `design/portfolio-design.pdf`.
Plain HTML, CSS and JavaScript with Bootstrap 5.3.8 from a CDN. There's no build step: what's in this folder is exactly what gets published.

## Files

```
index.html          Home: hero, Marketer/Developer toggle, portrait card, facts strip
about.html          01 About + Education
experience.html     02 Experience timeline + filter
skills.html         03 Skills + Certifications
contact.html        04 Contact details + message form
css/style.css       All custom styles and colour tokens (loaded after Bootstrap)
js/main.js          Theme toggle, headline toggle, experience filter, form validation, scroll reveal
assets/             favicon.svg, haziq-portrait.jpg (to add), document/ (CV + certificates)
design/             The source design PDF (local only; listed in .gitignore)
.nojekyll           Tells GitHub Pages to serve files as-is
.gitignore          Keeps design/ and OS/editor clutter out of the repo
```

## Preview locally

From this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000/. Opening the HTML files directly also works, but a local server is closer to how GitHub Pages behaves.

## Deploy on GitHub Pages

1. Create a repository on GitHub, for example `portfolio`.
2. Push this folder to the `main` branch:
   ```
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/khunderscorehh98/portfolio.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose **main** and **/ (root)**, and click **Save**.
5. After a minute or two the site is live at `https://khunderscorehh98.github.io/portfolio/`. The address is also shown at the top of the Pages settings.

To update the site later, commit and push to `main`; GitHub Pages redeploys automatically.

All links are relative (`./css/style.css`, `about.html`, …), so the site works under the `/portfolio/` sub-path without changes.

> **Everything in the repository is public**, even files nothing links to. That includes everything in `assets/document/` (your CV includes your phone number and your referees' contact details). Remove anything you don't want online before pushing. `design/` is listed in `.gitignore`, so it stays on your computer.

## Editing content

### Header and footer appear on every page

There's no build step, so the navbar and footer are copied into all five HTML files. If you change a nav label, add a page or edit the footer, make the same change in each file. Each page marks its own nav link as current with `class="nav-link active"` and `aria-current="page"`; keep that on the right link when you copy the header.

### Portrait

Save the photo as `assets/haziq-portrait.jpg`. A portrait-ish crop works best; it fills the navy box (`object-fit: cover`). Until the file exists, the navy placeholder from the design is shown.

### CV and certificates

The three download buttons in `index.html` point to:

```
assets/document/Haziq Halidi_CV.pdf
assets/document/Haziq Halidi_Academic Certificate.pdf
assets/document/Haziq Halidi_Professional Certificate.pdf
```

To update one, replace the file and keep the same name. If you rename a file, update its `href` in `index.html`; spaces are written as `%20`. The `download="…"` attribute sets the file name people get when they save it.

### Experience (`experience.html`)

Each role is an `<li class="role">` inside `<ol class="timeline">`. Copy an existing one and edit it. Two attributes control the filter and the timeline dot:

- `data-tags="business"`, `data-tags="code"` or `data-tags="business code"`: which filter buttons show the role.
- Add `is-business` to the class (`class="role reveal is-business"`) when the role is tagged Business; that makes its dot solid saffron. Code-only roles get a hollow dot.

The visible tags are the `<span class="tag tag-business">Business</span>` and `<span class="tag tag-code">Code</span>` pills. Keep them in step with `data-tags`. If you add or remove roles, update the "Six roles…" sentence at the top too.

### Skills and certifications (`skills.html`)

- Skills are list items in `<ul class="chips">`; add or remove `<li>` lines. A new group needs an `<h3 class="chip-group-label">` followed by its own `<ul class="chips">`.
- Each certification is an `<li class="cert">`. Use `cert-icon cert-business` for a saffron icon and `cert-icon cert-code` for a navy one.

### About (`about.html`) and home page (`index.html`)

Edit the text directly. The facts strip under the hero is the `<dl class="facts-grid">` near the bottom of `index.html`.

The hero intro has two versions that follow the "Read me as" toggle: `<p class="hero-lead lead-marketer">` and `<p class="hero-lead lead-developer">`, inside `<div class="hero-lead-wrap">`. Edit either one; they share the same space, so keep them roughly the same length to avoid a gap under the shorter one.

### Contact (`contact.html`)

- **GitHub / LinkedIn:** the two link rows point to `https://github.com/khunderscorehh98` and `https://www.linkedin.com/in/haziq-halidi/`; edit the `href` to change them.
- **Message form:** messages are sent through [FormSubmit](https://formsubmit.co/), which emails them to the address in the form's `action` (`https://formsubmit.co/haziqimac@gmail.com`).
  - **First use:** after the site is live, send yourself one test message. FormSubmit replies with an activation email; click the link in it. Messages sent before activation are not delivered, and the form shows "This form needs Activation" in its error message.
  - **Hide your address (optional):** the activation email also gives you a random alias. Replace `haziqimac@gmail.com` in the `action` with that alias.
  - **How it sends:** with JavaScript on, `js/main.js` checks the fields and posts them to FormSubmit's `/ajax/` address, so visitors stay on the page and see a success or error note. Without JavaScript, it's a plain form post and FormSubmit shows its own pages.
  - **Hidden fields:** `_subject` (the email subject), `_template` (`table` layout) and `_honey` (a spam trap; messages that fill it in are dropped).

## Styling

Colours come from the style tile on page 7 of the design PDF and are defined once at the top of `css/style.css`:

- light mode under `[data-bs-theme="light"]`: Paper `#F6F7F9`, Track `#E9EDF4`, Navy ink `#12284A`, Slate `#4A5873`, Saffron `#F4B23E`, Saffron ink `#8C5300`;
- dark mode under `[data-bs-theme="dark"]`: Midnight `#010736`, Surface `#0D1C42`, Indigo `#22396F`, White, Cool grey `#B4BCD0`, Saffron.

These tokens feed Bootstrap's own CSS variables, so changing a token updates both custom and Bootstrap styles. Sizes (display 44/68/92px, body 17/19/20px) live in the `:root` block just below the tokens.

Light/dark mode follows the visitor's system setting until they press the moon/sun button; their choice is then remembered in the browser.

Fonts are Google Sans and Google Sans Code from Google Fonts, linked in each page's `<head>`.

## Upgrading Bootstrap

Bootstrap is pinned to 5.3.8 with integrity (SRI) hashes in each page's `<head>` and before `</body>`. To upgrade, copy the new `<link>` and `<script>` tags, hashes included, from https://getbootstrap.com/ into all five pages.
