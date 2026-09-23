# S.U.T.R.A. — PRD Compliance & Completion Plan

## Background

The S.U.T.R.A. frontend is already substantially complete. After a full codebase audit and live browser review, the core scaffold (9 pages, 7 format components, full CSS design system, sample data, mock transformation service) is in excellent shape with strong institutional visual quality. This plan identifies **gaps and improvements** needed to fully satisfy the PRD's success criteria and non-functional requirements.

---

## Current State Assessment

| Area | Status | Notes |
|---|---|---|
| All 9 pages implemented | ✅ Complete | Login, Dashboard, Create, Analysis, Outputs, History, Project Details, Settings, Profile |
| 7 output format views | ✅ Complete | Executive Summary, Advisory, LinkedIn, X Thread, Presentation, Infographic, Video Package |
| Navy/white/grey + saffron palette | ⚠️ Diverged | PRD calls for **deep navy/saffron**; current impl uses zinc-black + emerald green |
| Create New Transformation flow | ✅ Complete | 4 sections, stepper, mock generation works |
| Responsive layout | ⚠️ Partial | Desktop sidebar done; mobile bottom nav exists but needs verification |
| Help/Docs page (HelpCenter) | ⚠️ Extra | Not in PRD's defined IA — could be kept as-is |
| Font loading (Plus Jakarta Sans, Newsreader, JetBrains Mono) | ❌ Missing | Referenced in CSS but no `<link>` in index.html |
| `index.html` meta/SEO | ❌ Missing | No meta description, no title, no lang attribute |
| `services/api.js` backend call pattern | ❌ Missing | PRD §15.5 requires a documented frontend API service stub |
| Firebase readiness comments | ⚠️ Partial | store.js has comments; no dedicated `firebase.js` stub |
| `utils/exportUtils.js` download functionality | ✅ Exists | Present and functional |
| `CommentThread.jsx` (reviewer annotations) | ⚠️ Extra | Not in PRD spec; can be kept as enhancement |
| `AuditTrailPanel.jsx` | ⚠️ Extra | Not in PRD spec; keeps compliance story strong |
| Sample data clearly labeled | ✅ Done | "Sample Data" badges on all demo projects |
| No lorem ipsum | ✅ Done | All copy is domain-specific |
| Color palette alignment to PRD | ❌ Gap | PRD: deep navy + saffron/orange accent; app: zinc black + emerald |

---

## Open Questions

> [!IMPORTANT]
> **Color palette**: The PRD specifies "Deep navy/dark blue, white, light grey" as primary and "Saffron/orange (sparingly)" as the accent. The current implementation uses a zinc-black + emerald green palette (Vercel/Bloomberg inspired), which is polished but diverges from the brief. **Should we keep the existing zinc+emerald palette (which looks excellent and institutional), or fully migrate to the PRD's navy+saffron spec?**

> [!IMPORTANT]
> **Google Fonts loading**: The CSS references `Plus Jakarta Sans`, `Newsreader`, and `JetBrains Mono` but `index.html` has no `<link>` to Google Fonts — these fall back to system fonts. Should these be loaded from Google Fonts (requires internet) or kept as system fallbacks for offline demo?

---

## Proposed Changes

### 1. `index.html` — SEO, Fonts & Meta

#### [MODIFY] [index.html](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/index.html)
- Add `lang="en"` to `<html>`
- Add proper `<title>` tag: `S.U.T.R.A. — Government Information Transformation System`
- Add `<meta name="description">` with institutional description
- Add Google Fonts `<link>` tags for Plus Jakarta Sans, Newsreader, JetBrains Mono
- Add `<meta name="robots" content="noindex, nofollow">` (prototype — not for public indexing)

---

### 2. Color Palette — Navy/Saffron Alignment (Conditional)

#### [MODIFY] [variables.css](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/styles/variables.css)

If the user approves a palette shift, introduce the PRD's navy + saffron system:
- Dark mode: Deep navy canvas (`#0A0F1E`), surface (`#111827`), accent saffron/amber (`#F59E0B` → `#D97706`)
- Light mode: Clean white/light-grey with navy text and saffron accent
- Keep emerald strictly for success/status signals (per PRD)
- This is a significant visual change — needs user confirmation before executing

---

### 3. `services/api.js` — Backend Call Pattern Stub

#### [NEW] [api.js](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/services/api.js)
Per PRD §15.5 — a documented, ready-to-wire frontend API service that:
- Reads `idToken` from Firebase Auth (stubbed)
- Wraps `fetch` calls to `/api/sources`, `/api/sources/:id/analyze`, `/api/projects/:id/generate`, `/api/outputs/:id/regenerate`
- Returns structured JSON matching Firestore output schemas
- Is currently in "mock passthrough" mode — all calls resolve with mock data, ready to swap in real URLs

---

### 4. `services/firebase.js` — Firebase Readiness Stub

#### [NEW] [firebase.js](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/services/firebase.js)
A documented stub that shows exactly how to initialize Firebase SDK when credentials are available:
```js
// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
```
With the full config object shape and clear TODO comments.

---

### 5. Mobile Responsiveness Audit & Fixes

#### [MODIFY] [layout.css](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/styles/layout.css)
After a browser check of mobile breakpoints:
- Ensure no horizontal scroll on any page
- Fix any overflowing content on `CreateTransformationPage` (the 4-section form is complex)
- Ensure `tabs-nav` scrolls horizontally on mobile without overflow
- Verify BottomNav shows correctly at `< 768px`

---

### 6. `CreateTransformationPage.jsx` — Detail Level Segmented Control

#### [MODIFY] [CreateTransformationPage.jsx](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/pages/CreateTransformationPage.jsx)
The PRD specifies Level of Detail as a **segmented control** (Brief / Standard / Detailed), not a dropdown. Verify and implement the correct UI pattern if it's currently a `<select>`.

---

### 7. `GeneratedOutputsPage.jsx` — Output Card Actions

#### [MODIFY] [GeneratedOutputsPage.jsx](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/pages/GeneratedOutputsPage.jsx)
Ensure every format view exposes the full PRD-specified action set:
- **Copy** — copies content to clipboard
- **Edit** — inline edit mode (text area overlay)
- **Regenerate** — opens regen modal
- **Download** — downloads the format-specific artifact
- **Save** — saves to local/storage

---

### 8. `SettingsPage.jsx` — Settings Completeness

#### [MODIFY] [SettingsPage.jsx](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/pages/SettingsPage.jsx)
Verify all PRD-specified settings sections are present:
- Account: Name, Email, Organization ✅
- Preferences: Default language, tone, audience ✅
- Security: Password, Sessions, Login activity ✅
- Interface: Light/Dark mode toggle ✅

---

### 9. `SourceAnalysisPage.jsx` — "View Source" Option

#### [MODIFY] [SourceAnalysisPage.jsx](file:///c:/Users/harsh/.gemini/antigravity-ide/scratch/sutra-app/src/pages/SourceAnalysisPage.jsx)
Ensure the "View Source" modal shows the full original source text — verify this is wired correctly.

---

### 10. Accessibility Pass

#### [MODIFY] Multiple files
- Add `aria-label` to all icon-only buttons (sidebar collapse, theme toggle, copy button)
- Add `role="tablist"` / `role="tab"` / `aria-selected` to tabs in Generated Outputs page
- Add `for` attributes to all form labels in CreateTransformationPage
- Add `aria-live="polite"` to the progress stepper for screen-reader announcements
- Add `skip-to-content` link at top of authenticated layout

---

## Verification Plan

### Build Check
```
npm run build
```
No TypeScript/build errors.

### Manual Functional Testing
1. **Login flow** → Dashboard loads correctly with sample data
2. **Create New Transformation** → Full 4-section form → Generate button → stepper → outputs page
3. **All 7 output tabs** render with content from sample project
4. **Project History** → search filter → open project details
5. **Settings** → toggle theme, update preferences → persists on reload
6. **Mobile viewport** → no horizontal scroll, bottom nav visible, all pages usable

### Visual Spot-Check
- Run `npm run dev` and open in browser at `http://localhost:5173`
- Verify fonts load (Plus Jakarta Sans body, Newsreader for serif headings)
- Confirm dark/light mode switch works cleanly
