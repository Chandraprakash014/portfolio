/* ============================================================
   SCRIPT.JS — Portfolio JavaScript
   Handles: sidebar navigation (desktop & mobile drawer),
            collapse/expand mode, active scrollspy,
            smooth scrolling, code copy, particles, scroll reveal,
            dynamic skills rendering & Owner Account management
   ============================================================ */

'use strict';

/* ---- DOM References ---- */
const sidebar            = document.getElementById('sidebar');
const sidebarToggle      = document.getElementById('sidebar-toggle');
const sidebarBackdrop    = document.getElementById('sidebar-backdrop');
const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
const mobileTopbar       = document.getElementById('mobile-topbar');
const sidebarLinks       = document.querySelectorAll('.sidebar__link');
const copyCodeBtn        = document.getElementById('copy-code-btn');
const backToTop          = document.getElementById('back-to-top');
const footerYear         = document.getElementById('footer-year');
const sections           = document.querySelectorAll('section[id]');
const particles          = document.getElementById('particles');

/* ============================================================
   1. FOOTER YEAR
   ============================================================ */
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

/* ============================================================
   2. DESKTOP SIDEBAR COLLAPSE / EXPAND TOGGLE
   ============================================================ */
function initSidebarCollapse() {
  const isCollapsed = localStorage.getItem('portfolio_sidebar_collapsed') === 'true';
  if (isCollapsed && window.innerWidth >= 1024) {
    document.body.classList.add('sidebar--collapsed');
  }

  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener('click', () => {
      document.body.classList.toggle('sidebar--collapsed');
      const collapsedNow = document.body.classList.contains('sidebar--collapsed');
      localStorage.setItem('portfolio_sidebar_collapsed', collapsedNow);
    });
  }
}

initSidebarCollapse();

/* ============================================================
   3. MOBILE SIDEBAR DRAWER (Toggle, Backdrop, ESC)
   ============================================================ */
function openMobileSidebar() {
  if (!sidebar) return;
  sidebar.classList.add('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
  if (sidebarToggle) {
    sidebarToggle.classList.add('open');
    sidebarToggle.setAttribute('aria-expanded', 'true');
  }
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  if (!sidebar) return;
  sidebar.classList.remove('open');
  if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
  if (sidebarToggle) {
    sidebarToggle.classList.remove('open');
    sidebarToggle.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

function toggleMobileSidebar() {
  if (!sidebar) return;
  if (sidebar.classList.contains('open')) {
    closeMobileSidebar();
  } else {
    openMobileSidebar();
  }
}

if (sidebarToggle) {
  sidebarToggle.addEventListener('click', toggleMobileSidebar);
}

if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener('click', closeMobileSidebar);
}

// Close mobile sidebar on link click
document.querySelectorAll('.sidebar__link, .profile-card, #sidebar-hire-btn').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      closeMobileSidebar();
    }
  });
});

// Close mobile sidebar on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
    closeMobileSidebar();
    if (sidebarToggle) sidebarToggle.focus();
  }
});

/* ============================================================
   4. ACTIVE NAV LINK TRACKING (Scrollspy)
   ============================================================ */
function updateActiveNav() {
  let currentSectionId = '';
  const isMobile = window.innerWidth < 1024;
  const offset = isMobile ? (mobileTopbar ? mobileTopbar.offsetHeight + 60 : 120) : 180;
  const scrollY = window.scrollY + offset;

  const allSections = document.querySelectorAll('section[id]');
  allSections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute('id');
    }
  });

  // If at the very bottom of the page, set to last section (contact)
  if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50)) {
    currentSectionId = 'contact';
  }

  sidebarLinks.forEach(link => {
    const navTarget = link.getAttribute('data-nav') || link.getAttribute('href').replace('#', '');
    if (navTarget === currentSectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ============================================================
   5. BACK TO TOP BUTTON
   ============================================================ */
function handleBackToTop() {
  if (!backToTop) return;
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   6. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#' || targetId === '') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? (mobileTopbar ? mobileTopbar.offsetHeight + 14 : 74) : 24;
      const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ============================================================
   7. COPY CODE SNIPPET BUTTON
   ============================================================ */
if (copyCodeBtn) {
  copyCodeBtn.addEventListener('click', async () => {
    const codeEl = document.querySelector('.code-card__body code');
    if (!codeEl) return;

    const codeText = codeEl.textContent;
    try {
      await navigator.clipboard.writeText(codeText);
      const label = copyCodeBtn.querySelector('.copy-label');
      if (label) label.textContent = 'Copied!';
      copyCodeBtn.classList.add('copied');

      setTimeout(() => {
        if (label) label.textContent = 'Copy';
        copyCodeBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = codeText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      const label = copyCodeBtn.querySelector('.copy-label');
      if (label) label.textContent = 'Copied!';
      copyCodeBtn.classList.add('copied');
      setTimeout(() => {
        if (label) label.textContent = 'Copy';
        copyCodeBtn.classList.remove('copied');
      }, 2000);
    }
  });
}

/* ============================================================
   8. SCROLL REVEAL (Intersection Observer)
   ============================================================ */
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const ownDelay = el.style.getPropertyValue('--delay');
        if (ownDelay) {
          el.style.transitionDelay = ownDelay;
        } else {
          const parent = el.closest('[style]');
          if (parent) {
            const parentDelay = parent.style.getPropertyValue('--delay');
            if (parentDelay) el.style.transitionDelay = parentDelay;
          }
        }
        el.classList.add('visible');
        revealObserver.unobserve(el);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================================
   9. HERO PARTICLES (Floating Dots)
   ============================================================ */
function createParticles() {
  if (!particles) return;

  const count = Math.min(40, Math.floor(window.innerWidth / 30));

  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'particle';

    const size    = Math.random() * 3 + 1;
    const x       = Math.random() * 100;
    const y       = Math.random() * 100;
    const delay   = Math.random() * 8;
    const dur     = Math.random() * 12 + 8;
    const opacity = Math.random() * 0.4 + 0.05;

    Object.assign(dot.style, {
      position:               'absolute',
      width:                  `${size}px`,
      height:                 `${size}px`,
      left:                   `${x}%`,
      top:                    `${y}%`,
      borderRadius:           '50%',
      background:             `rgba(99, 155, 255, ${opacity})`,
      animationName:          'float-particle',
      animationDuration:      `${dur}s`,
      animationDelay:         `${delay}s`,
      animationIterationCount:'infinite',
      animationTimingFunction:'ease-in-out',
    });

    particles.appendChild(dot);
  }

  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes float-particle {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
        33%  { transform: translateY(-20px) translateX(8px);  opacity: 0.25; }
        66%  { transform: translateY(10px)  translateX(-8px); opacity: 0.1; }
      }
    `;
    document.head.appendChild(style);
  }
}

createParticles();

/* ============================================================
   10. SKILLS DATA & DYNAMIC RENDERING (Owner Management)
   ============================================================ */
const DEFAULT_SKILLS = [
  {
    id: "java",
    name: "Java",
    category: "Languages",
    level: "Learning",
    percent: 65,
    desc: "Core language, OOP concepts, Collections Framework, Exception Handling, Streams basics",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="currentColor"/></svg>`
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    category: "Frameworks",
    level: "Learning",
    percent: 55,
    desc: "Application setup, REST Controllers, Dependency Injection, Services, Spring Data JPA",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: "sql-mysql",
    name: "SQL & MySQL",
    category: "Databases",
    level: "Learning",
    percent: 60,
    desc: "SELECT queries, complex JOINs, Schema design, relational integrity, Workbench",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" fill="currentColor"/></svg>`
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Architecture",
    level: "Learning",
    percent: 60,
    desc: "CRUD endpoints, HTTP methods & status codes, JSON request/response design, Postman",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: "git-github",
    name: "Git & GitHub",
    category: "Tools",
    level: "Comfortable",
    percent: 70,
    desc: "Version control, commits, branching workflows, pull requests, repository management",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: "oop",
    name: "OOP & Clean Code",
    category: "Fundamentals",
    level: "Learning",
    percent: 65,
    desc: "Encapsulation, Polymorphism, Inheritance, Abstraction, modular design, SOLID basics",
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill="currentColor"/></svg>`
  }
];

function getSkills() {
  const stored = localStorage.getItem('portfolio_skills_data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing stored skills:', e);
    }
  }
  return [...DEFAULT_SKILLS];
}

function saveSkills(skills) {
  localStorage.setItem('portfolio_skills_data', JSON.stringify(skills));
  renderSkills();
}

function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const skills = getSkills();
  const isOwner = isOwnerLoggedIn();

  container.innerHTML = skills.map((skill, index) => {
    const delay = index * 70;
    return `
      <article class="skill-card reveal-up visible" style="--delay: ${delay}ms; position: relative;" data-skill-id="${escapeHtml(skill.id)}">
        ${isOwner ? `
          <div class="skill-card__owner-actions">
            <button class="skill-action-btn skill-action-btn--edit" onclick="openSkillModal('${escapeHtml(skill.id)}')" title="Edit Skill" aria-label="Edit Skill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="skill-action-btn skill-action-btn--delete" onclick="deleteSkill('${escapeHtml(skill.id)}')" title="Delete Skill" aria-label="Delete Skill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        ` : ''}
        <div class="skill-card__icon" aria-hidden="true">
          ${skill.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`}
        </div>
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 0.25rem;">
          <h3 class="skill-card__name">${escapeHtml(skill.name)}</h3>
          <span style="font-size:0.7rem; font-family:var(--font-mono); color:var(--color-accent-light);">${escapeHtml(skill.category || 'General')}</span>
        </div>
        <p class="skill-card__desc">${escapeHtml(skill.desc)}</p>
        <div class="skill-card__level" role="progressbar" aria-valuenow="${skill.percent}" aria-valuemin="0" aria-valuemax="100" aria-label="${escapeHtml(skill.name)} proficiency: ${escapeHtml(skill.level)}">
          <div class="level-bar"><div class="level-fill" style="--width: ${skill.percent}%"></div></div>
          <span class="level-label">${escapeHtml(skill.level)} (${skill.percent}%)</span>
        </div>
      </article>
    `;
  }).join('');
}

/* ============================================================
   11. OWNER AUTHENTICATION & MANAGEMENT
   ============================================================ */
const OWNER_STORAGE_KEY = 'portfolio_owner_auth';
const OWNER_PWD_KEY     = 'portfolio_owner_pwd';
const DEFAULT_USERNAME  = 'chandraprakash';
const ALT_USERNAME      = 'owner';
const DEFAULT_PASSWORD  = 'admin123';

function isOwnerLoggedIn() {
  return localStorage.getItem(OWNER_STORAGE_KEY) === 'true';
}

function initOwnerMode() {
  const loggedIn = isOwnerLoggedIn();
  setOwnerUIState(loggedIn);
}

function setOwnerUIState(isActive) {
  document.body.classList.toggle('owner-mode-active', isActive);
  const banner = document.getElementById('owner-banner');
  if (banner) {
    banner.classList.toggle('active', isActive);
  }
  renderSkills();
}

function handleLogin(username, password) {
  const storedPwd = localStorage.getItem(OWNER_PWD_KEY) || DEFAULT_PASSWORD;
  const normalizedUser = (username || '').trim().toLowerCase();
  const validUser = (normalizedUser === DEFAULT_USERNAME || normalizedUser === ALT_USERNAME);
  const validPwd = (password === storedPwd);

  if (validUser && validPwd) {
    localStorage.setItem(OWNER_STORAGE_KEY, 'true');
    setOwnerUIState(true);
    closeLoginModal();
    showToast('👋 Welcome back, Chandraprakash! Owner mode activated.');
    return true;
  } else {
    alert('Invalid credentials. (Default: username: chandraprakash or owner, password: admin123)');
    return false;
  }
}

function handleLogout() {
  localStorage.removeItem(OWNER_STORAGE_KEY);
  setOwnerUIState(false);
  showToast('Logged out of owner mode.');
}

function openLoginModal() {
  const modal = document.getElementById('owner-login-modal');
  if (!modal) return;
  modal.classList.add('active');
  const userField = document.getElementById('login-username');
  if (userField) {
    userField.value = '';
    userField.focus();
  }
  const pwdField = document.getElementById('login-password');
  if (pwdField) pwdField.value = '';
}

function closeLoginModal() {
  const modal = document.getElementById('owner-login-modal');
  if (modal) modal.classList.remove('active');
}

function changeOwnerPassword() {
  const current = prompt('Enter current owner password:');
  if (!current) return;
  const storedPwd = localStorage.getItem(OWNER_PWD_KEY) || DEFAULT_PASSWORD;
  if (current !== storedPwd) {
    alert('Incorrect current password.');
    return;
  }
  const newPwd = prompt('Enter your new owner password:');
  if (!newPwd || newPwd.trim().length < 4) {
    alert('Password must be at least 4 characters.');
    return;
  }
  localStorage.setItem(OWNER_PWD_KEY, newPwd.trim());
  showToast('✅ Owner password updated successfully!');
}

/* ============================================================
   12. SKILLS MODAL (Add / Edit / Delete)
   ============================================================ */
let currentEditingSkillId = null;

function openSkillModal(skillId = null) {
  if (!isOwnerLoggedIn()) {
    openLoginModal();
    return;
  }

  currentEditingSkillId = skillId;
  const modal = document.getElementById('skill-modal');
  const title = document.getElementById('skill-modal-title');
  const form  = document.getElementById('skill-form');
  if (!modal || !form) return;

  if (skillId) {
    const skills = getSkills();
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      title.textContent = 'Edit Skill';
      document.getElementById('skill-name').value = skill.name || '';
      document.getElementById('skill-category').value = skill.category || 'Languages';
      document.getElementById('skill-level').value = skill.level || 'Learning';
      document.getElementById('skill-percent').value = skill.percent || 50;
      document.getElementById('skill-percent-display').textContent = `${skill.percent || 50}%`;
      document.getElementById('skill-desc').value = skill.desc || '';
    }
  } else {
    title.textContent = 'Add New Skill';
    form.reset();
    document.getElementById('skill-percent').value = 50;
    document.getElementById('skill-percent-display').textContent = '50%';
  }

  modal.classList.add('active');
}

function closeSkillModal() {
  const modal = document.getElementById('skill-modal');
  if (modal) modal.classList.remove('active');
  currentEditingSkillId = null;
}

function deleteSkill(skillId) {
  if (!isOwnerLoggedIn()) return;
  const skills = getSkills();
  const skill = skills.find(s => s.id === skillId);
  if (!skill) return;

  if (confirm(`Are you sure you want to delete "${skill.name}"?`)) {
    const filtered = skills.filter(s => s.id !== skillId);
    saveSkills(filtered);
    showToast(`🗑️ Skill "${skill.name}" deleted.`);
  }
}

function resetSkillsToDefault() {
  if (!isOwnerLoggedIn()) return;
  if (confirm('Reset all skills to default starter list? Customized skills will be replaced.')) {
    localStorage.removeItem('portfolio_skills_data');
    renderSkills();
    showToast('🔄 Skills reset to defaults.');
  }
}

function exportSkillsJSON() {
  const skills = getSkills();
  const jsonStr = JSON.stringify(skills, null, 2);
  navigator.clipboard.writeText(jsonStr).then(() => {
    showToast('📋 Skills JSON copied to clipboard!');
  }).catch(() => {
    prompt('Copy your skills JSON below:', jsonStr);
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* Event listeners for forms & inputs */
const skillForm = document.getElementById('skill-form');
if (skillForm) {
  skillForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('skill-name').value.trim();
    const category = document.getElementById('skill-category').value.trim();
    const level = document.getElementById('skill-level').value;
    const percent = parseInt(document.getElementById('skill-percent').value, 10) || 50;
    const desc = document.getElementById('skill-desc').value.trim();

    if (!name) return;

    let skills = getSkills();

    if (currentEditingSkillId) {
      skills = skills.map(s => {
        if (s.id === currentEditingSkillId) {
          return { ...s, name, category, level, percent, desc };
        }
        return s;
      });
      showToast(`✅ Updated "${name}" successfully!`);
    } else {
      const newId = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
      skills.push({
        id: newId,
        name,
        category,
        level,
        percent,
        desc
      });
      showToast(`🎉 Added "${name}" successfully!`);
    }

    saveSkills(skills);
    closeSkillModal();
  });
}

const loginForm = document.getElementById('owner-login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('login-username').value;
    const p = document.getElementById('login-password').value;
    handleLogin(u, p);
  });
}

const percentInput = document.getElementById('skill-percent');
const percentDisplay = document.getElementById('skill-percent-display');
if (percentInput && percentDisplay) {
  percentInput.addEventListener('input', () => {
    percentDisplay.textContent = `${percentInput.value}%`;
  });
}

// Global keyboard shortcut: Ctrl + Shift + O or Ctrl + Shift + A to open Owner Login
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && (e.key === 'O' || e.key === 'o' || e.key === 'A' || e.key === 'a')) {
    e.preventDefault();
    if (isOwnerLoggedIn()) {
      showToast('You are already logged in as Owner!');
    } else {
      openLoginModal();
    }
  }
});

/* ============================================================
   13. SKILL & PROJECT PROGRESS FILL OBSERVER
   ============================================================ */
const progressCards = document.querySelectorAll('.project-card, .skill-card');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

progressCards.forEach(card => barObserver.observe(card));

/* ============================================================
   14. CONSOLIDATED SCROLL HANDLER
   ============================================================ */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleBackToTop();
      updateActiveNav();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

/* ============================================================
   15. INTERACTIVE LIVE API SIMULATOR
   ============================================================ */
function simulateApiCall() {
  const preview = document.getElementById('api-response-preview');
  const btn = document.getElementById('test-api-btn');
  if (!preview || !btn) return;

  btn.textContent = '⏳ Sending...';
  preview.innerHTML = `<code>// Connecting to TaskController.getTasks()...</code>`;

  setTimeout(() => {
    btn.textContent = '✔ 200 OK';
    preview.innerHTML = `<code>HTTP/1.1 200 OK
Content-Type: application/json

[
  {
    "id": 1,
    "title": "Design Task Entity & MySQL Schema",
    "status": "COMPLETED",
    "priority": "HIGH"
  },
  {
    "id": 2,
    "title": "Implement Centralized Error Envelope",
    "status": "IN_PROGRESS",
    "priority": "MEDIUM"
  },
  {
    "id": 3,
    "title": "OpenAPI / Swagger Documentation",
    "status": "TODO",
    "priority": "LOW"
  }
]</code>`;
    setTimeout(() => {
      btn.textContent = '▶ Send Request';
    }, 3500);
  }, 400);
}

// Initial run
handleBackToTop();
updateActiveNav();
initOwnerMode();

/* ============================================================
   16. CONSOLE EASTER EGG
   ============================================================ */
console.log(
  '%c🚀 Chandraprakash S — Java Backend Developer Portfolio\n%cIncludes Owner Mode (Ctrl+Shift+O) & Dynamic Skill Management\nReady to build robust backend solutions!',
  'color: #3b82f6; font-size: 15px; font-weight: bold;',
  'color: #94a3b8; font-size: 12px;'
);
