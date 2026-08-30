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
├── announcements.js    # 休診日・お知らせの唯一のデータ源（全ページで読み込み）
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
- Images: re-encode new photos at JPEG q82 / max 1280px before committing (see below)
- When updating dated announcements or closure notices, first get the current date.
  Remove only entries whose entire date range has already passed; keep any current
  or upcoming dates, including mixed lists where one old item is being replaced.

## Updating announcements (休診日・検査制限)
**Edit `announcements.js` only — never the HTML.** The `CLINIC_NOTICES` array is the
single source for three places: the top bar on all 8 pages, the
「休診日•検査制限のお知らせ」card on `index.html` (`#notice-list`), and the
受付時間 notes on `contact-lens.html` (`#lens-notices`).

```js
{ end: '2026-09-07', date: '9/3(木)・9/7(月)', text: '…' }
```
`end` is the last day the notice is shown; it disappears on its own the next day,
so stale entries never need manual deletion (tidy them up when they pile up).

`announcements.js` is loaded synchronously as the first element in `<body>` so the
bar paints without a layout jump; the other two targets render on `DOMContentLoaded`.

## SEO / social
- `index.html` carries a `MedicalClinic` JSON-LD block (address, geo, opening hours, 院長)
- Every page has canonical + Open Graph + `twitter:card`; OG image is `imgs/ogp.jpg` (1200×630)
- Absolute URLs in those tags are hard-coded to `https://rainbow-ganka.com/`

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

## Known Issues (re-audited 2026-08-29)
Most of the 2026-02-27 audit list is now fixed (careers form removed, dead slideshow /
`.main-header` JS gone, duplicate CSS blocks, `.page-header` padding, `<h1>` on every
page, favicon, meta descriptions, inline `<style>` blocks, dropdown `<button>`s).
Still open:

1. **Broken image `imgs/staff.jpg`** (`doctor.html`, スタッフ紹介 section) — the file does
   not exist, so the page shows a broken-image icon. Either add the photo or remove the
   `.staff-team-photo` block.
2. **FAQ heading levels** (`faq.html`) — section labels and individual questions are both
   `<h3>`; section labels should be `<h2>`.
3. **Unused images in `imgs/`** — `building.jpg`, `catch.jpg`, `doctor.png`, `doctor1.jpg`,
   `entrance.jpg`, `horikawa.png`, `kids.jpg`, `logo.jpg`, `icon/` are referenced nowhere.
   ~5MB of dead weight in the repo (not served, so no visitor impact).
4. **No Google Analytics, `sitemap.xml`, or `robots.txt`.**

## Key Contacts
- Site owner: The doctor (aunt) — provides content change requests
- Previous developer: Kashiwagi-san (ディーアイ・ネクスト) — handling .jp domain transfer
