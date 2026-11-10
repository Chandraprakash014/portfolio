# Chandraprakash S — Java Backend Developer Portfolio

A **personal, story-driven portfolio website** built with pure HTML5, CSS3, and vanilla JavaScript.
Designed to showcase the engineering journey, academics, projects, and skills of **Chandraprakash S** (B.Tech IT, Class of 2026, Erode Sengunthar Engineering College) from Tamil Nadu, India — featuring an **Owner Account & Skills Management System**.

---

## 🌟 Key Features

1. **Personal Narrative & Story First**
   - **About Me**: Why backend engineering, curiosity about the engine under the hood, and first-principles learning.
   - **My Journey (Interactive Timeline)**: 5-phase evolution from logic foundations, Core Java, SQL & MySQL, Spring Boot REST APIs, to clean architecture.
   - **Engineering Philosophy**: 4 core pillars (*Learn by Doing*, *Clean Code Over Clever*, *Curiosity Under the Hood*, *Intellectual Honesty*) and personal interests beyond the terminal.
   - **Featured Projects**: Task Tracker REST API architectural breakdown with clean 3-tier layering, Postman verification, and roadmap milestones.

2. **👑 Owner Account & Live Skills Management**
   - **Public Visitor Mode**: Anyone visiting the site sees a clean, professional, read-only personal portfolio without any admin clutter.
   - **Owner Mode**: Log in as the owner to:
     - Add new skills with custom name, category, proficiency level, percentage slider, and description.
     - Edit existing skill cards in real time.
     - Delete skills with confirmation.
     - Reset to default starter skills anytime.
     - Export your skills as clean JSON so you can sync changes directly to your repository!
     - Change your owner password directly from the top banner.

---

## 🔐 Owner Account Credentials & Access

- **Discreet Login Button**: Located at the bottom of the sidebar (lock icon: *Owner Login*).
- **Global Keyboard Shortcut**: Press `Ctrl + Shift + O` (or `Ctrl + Shift + A`) from anywhere on the page to open the login modal.
- **Default Credentials**:
  - **Username**: `chandraprakash` (or `owner`)
  - **Password**: `admin123`
- **Change Password**: Once logged in, click **"Change Password"** in the top owner banner to set your own custom password. Passwords and updated skills persist securely in your browser's `localStorage`.

---

## 📂 File Structure

```
Portfolio/
├── index.html      ← Main HTML (narrative, timeline, dynamic skills, modals)
├── style.css       ← Design tokens, animations, timeline, and owner admin UI
├── script.js       ← Navigation, scrollspy, dynamic skills CRUD & owner auth
├── hero-bg.jpg     ← Hero section background texture
└── README.md       ← Documentation & guide
```

---

## 🚀 Running the Site Locally

### Option 1 — Open directly (quickest)
Double-click `index.html` in File Explorer to open it in your default browser.

### Option 2 — VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. Opens at `http://127.0.0.1:5500`.

### Option 3 — Python Server
```bash
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

---

## 🌐 Deploying to GitHub Pages (Free)

1. Push your changes to your GitHub repository:
   ```bash
   git add .
   git commit -m "Transform portfolio to personal story with owner skills management"
   git push origin main
   ```
2. In your GitHub repo, go to **Settings** → **Pages**.
3. Set **Source** to `Deploy from a branch` → select `main` → `/ (root)`.
4. Click **Save**. Your site will be live at:
   `https://<your-github-username>.github.io/<repo-name>/`

> **Note on Data Persistence**: Any skills you add or edit while in Owner Mode on your browser are saved in your browser's `localStorage`. When you want your changes to be permanent for *all* visitors on GitHub Pages, click **"Export JSON"** in the top Owner banner, and update the `DEFAULT_SKILLS` array in `script.js` before pushing!

---

## 📝 Sections Overview

| Section | Purpose |
|---|---|
| **Hero (`#home`)** | Personal welcome, role, Tamil Nadu location, and main tech badges |
| **About Me (`#about`)** | Personal journey, why backend/Java, mindset, and stats |
| **My Journey (`#journey`)** | Visual 5-step milestone timeline from first code to modern Spring Boot |
| **Skills (`#skills`)** | Dynamic toolkit cards with progress bars + Owner CRUD controls |
| **Projects (`#projects`)** | Task Tracker REST API story, architecture breakdown & code snippet |
| **Philosophy (`#philosophy`)** | Core developer values & "Beyond the Terminal" interests |
| **Contact (`#contact`)** | Direct Email, GitHub profile, and LinkedIn links |

---

*Built with HTML5, CSS3 & Vanilla JavaScript — no external dependencies.*
*Portfolio for Chandraprakash S — Java Backend Developer, Tamil Nadu, India.*
