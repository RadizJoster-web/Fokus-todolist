# Focus — Task Manager 🎯

A clean glassmorphism Todo app built for portfolio. Features light/dark mode, task priorities, animations, skeleton loaders, and persistent storage.

---

## 📦 Library yang Harus Diinstall

```bash
npm install framer-motion react-icons
```

Dependencies lengkap (sudah ada di package.json):
| Package | Kegunaan |
|---|---|
| `framer-motion` | Animasi add/delete/layout task |
| `react-icons` | Icon set (Remix Icons) |
| `vite` | Build tool modern & cepat |

---

## 🗂 Struktur Folder

```
focus-todo/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── TodoInput/
│   │   │   ├── TodoInput.jsx
│   │   │   └── TodoInput.css
│   │   ├── TodoFilter/
│   │   │   ├── TodoFilter.jsx
│   │   │   └── TodoFilter.css
│   │   ├── TodoList/
│   │   │   ├── TodoList.jsx
│   │   │   └── TodoList.css
│   │   ├── TodoItem/
│   │   │   ├── TodoItem.jsx
│   │   │   └── TodoItem.css
│   │   ├── TodoStats/
│   │   │   ├── TodoStats.jsx
│   │   │   └── TodoStats.css
│   │   ├── EmptyState/
│   │   │   ├── EmptyState.jsx
│   │   │   └── EmptyState.css
│   │   └── LoadingSkeleton/
│   │       ├── LoadingSkeleton.jsx
│   │       └── LoadingSkeleton.css
│   ├── hooks/
│   │   ├── useTodos.js
│   │   ├── useTheme.js
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── helpers.js
│   ├── styles/
│   │   └── global.css       ← :root CSS variables + layout
│   ├── App.jsx
│   └── main.jsx
├── index.html               ← SEO meta tags
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start

```bash
# 1. Clone / copy folder ini
# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev

# 4. Build untuk production
npm run build
```

---

## ✨ Fitur

- ✅ Add, edit, delete, complete tasks
- 🎨 Light & Dark mode (auto-detect system preference)
- 🏷️ Priority level: High / Medium / Low
- 📊 Stats panel: progress bar + 4 stat cards
- 🔍 Filter: All / Active / Done
- 💾 Persistent via localStorage
- 💀 Loading skeleton animation
- 📱 Fully responsive (mobile center, desktop flex-row)
- ♿ Accessible (aria-label, aria-live, focus-visible)
- 🔎 SEO-friendly HTML meta tags

---

## 🎨 Design Decisions

- **Font**: Syne (display/headings) + DM Sans (body) — modern, readable
- **Tema**: Glassmorphism dengan animated background orbs
- **Warna**: Primary biru `#3b82f6` → indigo `#6366f1` gradient
- **Animasi**: Framer Motion `AnimatePresence` untuk enter/exit tasks, spring physics untuk filter tab indicator
