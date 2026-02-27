# Rainbow Ganka (レインボー眼科) Website

## Project Overview
Static website for レインボー眼科 (Rainbow Eye Clinic), an ophthalmology clinic.
Migrated from paid hosting (スターサーバフリー + お名前.com managed by Kashiwagi-san) to GitHub Pages.

## Tech Stack
- Pure HTML/CSS/JS static site (no build step, no framework)
- Hosted on GitHub Pages, deploying from `main` branch
- Domain: `rainbow-ganka.com` (Namecheap) — live with HTTPS enabled
- `rainbow-ganka.jp` (お名前.com, ID: 72974911) — transfer from Kashiwagi-san pending
- Once transferred, .jp redirects to .com (primary). Both point to same GitHub Pages site.

## Repository Structure
```
├── index.html          # ホーム (Home)
├── about.html          # 診療内容 (Subjects)
├── access.html         # アクセス (Access / Directions)
├── careers.html        # 採用情報 (Careers)
├── contact-lens.html   # コンタクトレンズ (Contact Lens)
├── doctor.html         # 院長紹介 (Doctor Profile)
├── faq.html            # よくある質問 (FAQ)
├── rooms.html          # 当院のご案内 (Clinic Rooms)
├── script.js           # Shared JS
├── styles.css          # Shared CSS
├── imgs/               # Images
└── CNAME               # GitHub Pages custom domain (rainbow-ganka.com)
```

## Conventions
- All pages are standalone HTML files with shared `styles.css` and `script.js`
- Content is in Japanese; keep all user-facing text in Japanese
- No build process — edit HTML/CSS/JS directly and push to `main` to deploy
- Images go in `imgs/`

## DNS & Hosting
- GitHub Pages A records: 185.199.108.153, .109, .110, .111
- CNAME: www → taikilazos.github.io
- HTTPS enforced
- After .jp domain transfer, it will also point here

## Completed Content Changes (2026-02-16)
- [x] Home page お知らせ: updated to 「受診時はマイナ保険証または資格確認書〜」
- [x] Moved 医療DX推進 and 診療内容 sections from Home → about.html
- [x] 診療時間 table kept on Home page, removed from about.html
- [x] Renamed about.html from 診療内容・時間 to 診療内容
- [x] Reordered nav: ホーム → 診療内容 → 当院のご案内 → 患者様へ → 採用情報
- [x] Contact lens: 第一月曜 afternoon → △ with legend note
- [x] Updated top announcement bar on all pages (removed outdated summer 2025 休診)
- [x] Updated footer copyright to 2025

## Pending Infrastructure
- [x] Create お名前.com account (ID: 72974911)
- [ ] Send email to Kashiwagi-san with お名前ID to start .jp transfer
- [ ] After transfer: set up DNS on お名前.com (A records + CNAME) and add .jp in GitHub Pages settings
- [ ] Set up Google Analytics on new site
- [ ] Update business listings (Google Maps, EPark, Caloo) with new URL

## Known Issues (audited 2026-02-27)

### 🔴 High Priority — Broken Functionality
1. **Careers form is completely broken** (`careers.html:181`)
   - Form has `method="POST"` but no `action` attribute — submits nowhere
   - `script.js:84` catches any `<form>` on the page and intercepts submit with just an `alert()`, so real submission never fires
   - Applicants cannot actually apply. Needs a backend (e.g. Formspree) or remove the form
2. **`script.js` JS scroll behavior targets `.main-header` but HTML uses `.site-header`** (`script.js:95`)
   - `document.querySelector('.main-header')` never finds anything — scroll behavior is dead code

### 🟡 Medium Priority — Visual / UX Bugs
3. **`.page-header` top padding is 6rem** (`styles.css:835`) — leftover from when header was `position: fixed`. Now causes large unnecessary whitespace at top of every inner page
4. ~~**Nav says "施設案内" but rooms.html title/h2 says "医院案内"**~~ ✅ Fixed: nav updated to 医院案内 everywhere
5. ~~**`about.html` double "診療内容" heading**~~ ✅ Fixed: removed duplicate section h2
6. **Missing `<h1>` on every page** — all pages use `<h2>` as the top visible heading; bad for SEO
7. **FAQ section headings and question headings are both `<h3>`** (`faq.html`) — should be h2 for section labels, h3 for individual questions
8. ~~**Footer copyright says © 2025**~~ ✅ Fixed: updated to 2026 on all pages
9. ~~**`doctor.html` title says "院長の紹介"**~~ ✅ Fixed: now "院長紹介"

### 🟢 Low Priority — Code Quality / Maintenance
10. **CSS: `.dropdown`/`.dropdown-content`/`.dropbtn` defined twice** (`styles.css:333` and `styles.css:1486`) — exact duplicate blocks
11. **CSS: `.opening-hours` defined twice** (`styles.css:1093` and `styles.css:1302`) — conflicting definitions
12. **CSS: `.section-title` defined twice** (`styles.css:1293` and `styles.css:1468`)
13. **CSS: generic `header { position: fixed }` rule** (`styles.css:513`) — old rule overridden by `.site-header { position: relative }`, but creates confusion; should be removed
14. **CSS: `.bar-close` styles defined but no close button exists in any HTML** — dead CSS
15. **JS: Slideshow code is dead** (`script.js:4-68`) — `.slide` / `.slide-dot` elements don't exist in any page
16. **Inline `<style>` blocks in `careers.html` and `contact-lens.html`** — should be moved to `styles.css`
17. ~~**Missing `<meta name="description">`**~~ ✅ Fixed: added to about, access, faq, rooms, doctor
18. **No favicon** — no `<link rel="icon">` on any page
19. **Nav dropdown triggers use `<a href="javascript:void(0)">` instead of `<button>`** — bad for accessibility/keyboard nav

## Key Contacts
- Site owner: The doctor (aunt) — provides content change requests
- Previous developer: Kashiwagi-san (ディーアイ・ネクスト) — handling .jp domain transfer
