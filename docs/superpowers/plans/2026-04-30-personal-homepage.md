# GitHub Pages 个人主页 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 基于 Astro 5.x + Tailwind CSS 构建一个温暖奶油色系的响应式个人主页，部署到 GitHub Pages。

**Architecture:** 从 Astro `basics` 空白模板起步，手写所有组件。内容通过 JSON 数据文件驱动（profile, skills, timeline, socials）。支持自动暗色模式（`prefers-color-scheme`）。部署通过 GitHub Actions 构建后推送到 `gh-pages` 分支。

**Tech Stack:** Astro 5.x, Tailwind CSS v4, Phosphor Icons, Google Fonts (Noto Sans SC)

---

## 文件结构总览

```
/
├── .github/workflows/deploy.yml      # GitHub Actions 部署
├── public/
│   ├── avatar.jpg                    # 头像（用户提供或占位图）
│   └── favicon.ico                   # 站点图标（复用现有）
├── src/
│   ├── components/
│   │   ├── Navbar.astro              # 响应式导航栏
│   │   ├── SocialIcons.astro         # 可复用社交图标行
│   │   ├── SkillTags.astro           # 技能标签云
│   │   ├── Timeline.astro            # 垂直时间线
│   │   ├── SocialCard.astro          # 联系页社交卡片
│   │   └── Footer.astro              # 页脚
│   ├── layouts/
│   │   └── Layout.astro              # 统一页面布局
│   ├── pages/
│   │   ├── index.astro               # 首页
│   │   ├── about.astro               # 关于我
│   │   └── contact.astro             # 联系方式
│   ├── data/
│   │   ├── profile.json              # 个人信息
│   │   ├── skills.json               # 技能列表
│   │   ├── timeline.json             # 时间线事件
│   │   └── socials.json              # 社交平台链接
│   └── styles/
│       └── global.css                # Tailwind 导入 + CSS 变量
├── astro.config.mjs                  # Astro 配置
├── tailwind.config.mjs               # Tailwind 配置
├── package.json                      # 依赖
└── .gitignore                        # 忽略 dist/, node_modules/ 等
```

---

## Task 1: 初始化 Astro 项目并清理旧文件

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tailwind.config.mjs`, `.gitignore`
- Delete: `index.html`, `src/style.css`, `src/main.js`, `src/plugins-manager.js`, `src/font/`, `src/img/`, `src/plugins/`, `src/sample/`
- Keep: `icon.ico`, `LICENSE`, `README.md`, `version.txt`, `setting.json`

- [ ] **Step 1: 初始化 Astro 项目**

Run:
```bash
npm create astro@latest . -- --template basics --no-install --no-git
```
Expected: 创建 `package.json`、`astro.config.mjs`、`src/` 等文件。

- [ ] **Step 2: 安装依赖**

Run:
```bash
npm install
npm install -D @astrojs/tailwind tailwindcss @tailwindcss/vite
```
Expected: `node_modules/` 生成，`package.json` 更新。

- [ ] **Step 3: 删除旧的静态主页文件**

Run:
```bash
rm -f index.html src/style.css src/main.js src/plugins-manager.js
rm -rf src/font src/img src/plugins src/sample
```
Expected: 旧文件被删除，只保留 `icon.ico` 等需要保留的文件。

- [ ] **Step 4: 更新 `.gitignore`**

Create/Modify `.gitignore`:
```gitignore
# Astro / Node
dist/
node_modules/
.astro/

# OS
.DS_Store

# IDE
.vscode/
.idea/
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: init Astro project and remove old static site"
```

---

## Task 2: 配置 Tailwind CSS 和基础样式

**Files:**
- Create: `src/styles/global.css`, `tailwind.config.mjs`
- Modify: `astro.config.mjs`

- [ ] **Step 1: 配置 `astro.config.mjs`**

Create `astro.config.mjs`:
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://xiaokaiyyy.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 2: 配置 `tailwind.config.mjs`**

Create `tailwind.config.mjs`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdf6e3',
          100: '#eee8d5',
          200: '#d4c5a9',
        },
        coffee: {
          500: '#8b7355',
          700: '#5b4636',
        },
        accent: {
          DEFAULT: '#d97706',
          dark: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: 创建全局样式 `src/styles/global.css`**

Create `src/styles/global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

@layer base {
  :root {
    --bg-primary: #fdf6e3;
    --bg-card: #eee8d5;
    --text-primary: #5b4636;
    --text-secondary: #8b7355;
    --accent: #d97706;
    --border: #d4c5a9;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --bg-primary: #1c1917;
      --bg-card: #292524;
      --text-primary: #e7e5e4;
      --text-secondary: #a8a29e;
      --accent: #f59e0b;
      --border: #44403c;
    }
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    line-height: 1.75;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
}
```

- [ ] **Step 4: 验证构建**

Run:
```bash
npm run build
```
Expected: 构建成功，无报错。`dist/` 目录生成。

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: configure Tailwind CSS and global styles"
```

---

## Task 3: 创建数据配置文件

**Files:**
- Create: `src/data/profile.json`, `src/data/skills.json`, `src/data/timeline.json`, `src/data/socials.json`

- [ ] **Step 1: 创建 `src/data/profile.json`**

```json
{
  "name": "你的名字",
  "bio": "热爱技术的开发者，专注于前端与全栈开发",
  "avatar": "/avatar.jpg",
  "email": "your@email.com"
}
```

- [ ] **Step 2: 创建 `src/data/skills.json`**

```json
[
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Vue",
  "Node.js",
  "Docker",
  "Git",
  "Linux",
  "Astro"
]
```

- [ ] **Step 3: 创建 `src/data/timeline.json`**

```json
[
  {
    "date": "2026-04",
    "title": "开始设计个人主页",
    "description": "基于 Astro 构建全新的 GitHub Pages 个人站点"
  },
  {
    "date": "2025-12",
    "title": "学习 Astro 框架",
    "description": "深入探索 Astro 的 Islands 架构和静态生成能力"
  },
  {
    "date": "2025-06",
    "title": "加入开源社区",
    "description": "开始为开源项目贡献代码，参与技术社区讨论"
  }
]
```

- [ ] **Step 4: 创建 `src/data/socials.json`**

```json
[
  {
    "platform": "GitHub",
    "icon": "github-logo",
    "url": "https://github.com/xiaokaiyyy",
    "username": "xiaokaiyyy"
  },
  {
    "platform": "Twitter",
    "icon": "twitter-logo",
    "url": "https://twitter.com/yourname",
    "username": "@yourname"
  },
  {
    "platform": "Email",
    "icon": "envelope",
    "url": "mailto:your@email.com",
    "username": "your@email.com"
  }
]
```

- [ ] **Step 5: Commit**

```bash
git add src/data/
git commit -m "feat: add JSON data configs for profile, skills, timeline, and socials"
```

---

## Task 4: 创建 Layout 布局组件

**Files:**
- Create: `src/layouts/Layout.astro`

- [ ] **Step 1: 创建 `src/layouts/Layout.astro`**

```astro
---
export interface Props {
  title: string;
  description?: string;
}
const { title, description = '个人主页' } = Astro.props;
---

<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <link rel="icon" type="image/x-icon" href="/icon.ico" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen flex flex-col">
    <slot />
  </body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout component with meta tags and global styles"
```

---

## Task 5: 创建 Navbar 导航栏组件

**Files:**
- Create: `src/components/Navbar.astro`

- [ ] **Step 1: 创建 `src/components/Navbar.astro`**

```astro
---
const navLinks = [
  { href: '/', label: '首页' },
  { href: '/about', label: '关于我' },
  { href: '/contact', label: '联系方式' },
];

const currentPath = Astro.url.pathname;
---

<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
  <div class="max-w-[800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
    <a href="/" class="text-lg font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
      JK
    </a>

    <!-- Desktop nav -->
    <div class="hidden sm:flex items-center gap-8">
      {navLinks.map(link => (
        <a
          href={link.href}
          class={`text-sm font-medium transition-colors hover:text-[var(--accent)] ${
            currentPath === link.href ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>

    <!-- Mobile hamburger -->
    <button
      id="menu-toggle"
      class="sm:hidden p-2 text-[var(--text-primary)]"
      aria-label="Toggle menu"
    >
      <svg id="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
  </div>

  <!-- Mobile drawer -->
  <div
    id="mobile-menu"
    class="sm:hidden fixed inset-0 top-16 bg-[var(--bg-primary)] transform translate-x-full transition-transform duration-200"
  >
    <div class="flex flex-col items-center gap-8 pt-12">
      {navLinks.map(link => (
        <a
          href={link.href}
          class={`text-lg font-medium transition-colors hover:text-[var(--accent)] ${
            currentPath === link.href ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
          }`}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</nav>

<script>
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let isOpen = false;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('bg-[var(--bg-primary)]/80', 'backdrop-blur-xl', 'shadow-sm');
    } else {
      navbar?.classList.remove('bg-[var(--bg-primary)]/80', 'backdrop-blur-xl', 'shadow-sm');
    }
  });

  menuToggle?.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      mobileMenu?.classList.remove('translate-x-full');
    } else {
      mobileMenu?.classList.add('translate-x-full');
    }
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.astro
git commit -m "feat: add responsive Navbar with scroll effect and mobile drawer"
```

---

## Task 6: 创建 Footer 和 SocialIcons 组件

**Files:**
- Create: `src/components/Footer.astro`, `src/components/SocialIcons.astro`

- [ ] **Step 1: 创建 `src/components/SocialIcons.astro`**

```astro
---
import socials from '../data/socials.json';

export interface Props {
  size?: number;
  showLabels?: boolean;
}
const { size = 24, showLabels = false } = Astro.props;

const iconMap: Record<string, string> = {
  'github-logo': `<svg width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24h-24A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.88,43.88,0,0,1,32.32-20.06,43.81,43.81,0,0,1,.79,33.58,8.05,8.05,0,0,0,1,7.69A41.72,41.72,0,0,1,200,104Z"/></svg>`,
  'twitter-logo': `<svg width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,50.79,63.55,28.79,29.74a8,8,0,0,0-14.63,4.06C18.91,85.33,43.52,120.49,65.91,141.31c-18.83,5.43-37.28,6.91-55.38.4a8,8,0,0,0-9.46,11.08C22.64,186.67,52,216,97.64,216c0,0,21.64-.25,36.14-4.36a8,8,0,0,0,5.22-5.81,97.83,97.83,0,0,0,3.23-27.68c0-1.06,0-2.11-.06-3.16l28.66-24.41A39.88,39.88,0,0,0,200,160V88A48.15,48.15,0,0,0,247.39,68.94ZM184,160a23.89,23.89,0,0,1-10.86,20.14L144,204.23V184a8,8,0,0,0-8-8c-15.59,0-28.69-4.32-39.56-13A95.79,95.79,0,0,0,126.38,160H184ZM184,80H168V88a8,8,0,0,0,16,0ZM88,88a31.88,31.88,0,0,1,9.28-22.63A30.82,30.82,0,0,1,120,56V80H88Z"/></svg>`,
  'envelope': `<svg width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"/></svg>`,
};
---

<div class={`flex items-center gap-4 ${showLabels ? 'flex-col' : ''}`}>
  {socials.map(social => (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      class="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150 flex items-center gap-2"
      title={social.platform}
    >
      <span set:html={iconMap[social.icon] || iconMap['envelope']} />
      {showLabels && <span class="text-sm">{social.platform}</span>}
    </a>
  ))}
</div>
```

- [ ] **Step 2: 创建 `src/components/Footer.astro`**

```astro
---
import SocialIcons from './SocialIcons.astro';
---

<footer class="mt-auto py-8 border-t border-[var(--border)]">
  <div class="max-w-[800px] mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
    <SocialIcons size={20} />
    <p class="text-sm text-[var(--text-secondary)]">
      © 2026 你的名字. All rights reserved.
    </p>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SocialIcons.astro src/components/Footer.astro
git commit -m "feat: add SocialIcons and Footer components"
```

---

## Task 7: 创建 SkillTags 和 Timeline 组件

**Files:**
- Create: `src/components/SkillTags.astro`, `src/components/Timeline.astro`

- [ ] **Step 1: 创建 `src/components/SkillTags.astro`**

```astro
---
import skills from '../data/skills.json';
---

<section class="max-w-[800px] mx-auto px-4 sm:px-6 py-16">
  <h2 class="text-2xl font-semibold text-center mb-8 text-[var(--text-primary)]">技术栈</h2>
  <div class="flex flex-wrap justify-center gap-3">
    {skills.map(skill => (
      <span
        class="px-4 py-1.5 text-sm font-medium border border-[var(--border)] rounded-full text-[var(--text-primary)]
        hover:bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-150 cursor-default"
      >
        {skill}
      </span>
    ))}
  </div>
</section>
```

- [ ] **Step 2: 创建 `src/components/Timeline.astro`**

```astro
---
import timeline from '../data/timeline.json';
---

<section class="max-w-[600px] mx-auto px-4 sm:px-6 py-16">
  <h2 class="text-2xl font-semibold text-center mb-12 text-[var(--text-primary)]">动态</h2>
  <div class="relative">
    <!-- Vertical line -->
    <div class="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[var(--border)]"></div>

    <div class="space-y-8">
      {timeline.map(event => (
        <div class="relative pl-8 group">
          <!-- Dot -->
          <div class="absolute left-0 top-2 w-4 h-4 rounded-full border-2 border-[var(--border)] bg-[var(--bg-primary)]
            group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] transition-colors duration-150">
          </div>

          <div class="space-y-1">
            <span class="text-[13px] text-[var(--text-secondary)] font-medium">{event.date}</span>
            <h3 class="text-base font-semibold text-[var(--text-primary)]">{event.title}</h3>
            <p class="text-sm text-[var(--text-secondary)] leading-relaxed">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/SkillTags.astro src/components/Timeline.astro
git commit -m "feat: add SkillTags and Timeline components"
```

---

## Task 8: 创建 SocialCard 组件

**Files:**
- Create: `src/components/SocialCard.astro`

- [ ] **Step 1: 创建 `src/components/SocialCard.astro`**

```astro
---
export interface Props {
  platform: string;
  icon: string;
  url: string;
  username: string;
}

const { platform, icon, url, username } = Astro.props;

const iconMap: Record<string, string> = {
  'github-logo': `<svg width="40" height="40" viewBox="0 0 256 256" fill="currentColor"><path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24h-24A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.88,43.88,0,0,1,32.32-20.06,43.81,43.81,0,0,1,.79,33.58,8.05,8.05,0,0,0,1,7.69A41.72,41.72,0,0,1,200,104Z"/></svg>`,
  'twitter-logo': `<svg width="40" height="40" viewBox="0 0 256 256" fill="currentColor"><path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,50.79,63.55,28.79,29.74a8,8,0,0,0-14.63,4.06C18.91,85.33,43.52,120.49,65.91,141.31c-18.83,5.43-37.28,6.91-55.38.4a8,8,0,0,0-9.46,11.08C22.64,186.67,52,216,97.64,216c0,0,21.64-.25,36.14-4.36a8,8,0,0,0,5.22-5.81,97.83,97.83,0,0,0,3.23-27.68c0-1.06,0-2.11-.06-3.16l28.66-24.41A39.88,39.88,0,0,0,200,160V88A48.15,48.15,0,0,0,247.39,68.94ZM184,160a23.89,23.89,0,0,1-10.86,20.14L144,204.23V184a8,8,0,0,0-8-8c-15.59,0-28.69-4.32-39.56-13A95.79,95.79,0,0,0,126.38,160H184ZM184,80H168V88a8,8,0,0,0,16,0ZM88,88a31.88,31.88,0,0,1,9.28-22.63A30.82,30.82,0,0,1,120,56V80H88Z"/></svg>`,
  'envelope': `<svg width="40" height="40" viewBox="0 0 256 256" fill="currentColor"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"/></svg>`,
};
---

<div class="bg-[var(--bg-card)] rounded-xl p-6 flex flex-col items-center text-center gap-3
  hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
  <div class="text-[var(--text-primary)]" set:html={iconMap[icon] || iconMap['envelope']} />
  <h3 class="text-base font-semibold text-[var(--text-primary)]">{platform}</h3>
  <p class="text-sm text-[var(--text-secondary)]">{username}</p>
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    class="mt-2 px-4 py-1.5 text-sm font-medium border border-[var(--border)] rounded-lg
      text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-150"
  >
    访问
  </a>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SocialCard.astro
git commit -m "feat: add SocialCard component"
```

---

## Task 9: 构建首页 `/`

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: 创建 `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import SocialIcons from '../components/SocialIcons.astro';
import SkillTags from '../components/SkillTags.astro';
import Timeline from '../components/Timeline.astro';
import Footer from '../components/Footer.astro';
import profile from '../data/profile.json';
---

<Layout title={`${profile.name} - 个人主页`} description={profile.bio}>
  <Navbar />

  <main class="flex-1 pt-16">
    <!-- Hero -->
    <section class="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 text-center">
      <img
        src={profile.avatar}
        alt={profile.name}
        class="w-[120px] h-[120px] rounded-full object-cover shadow-lg mb-6"
        loading="eager"
      />
      <h1 class="text-[32px] font-bold text-[var(--text-primary)] tracking-tight mb-3">
        {profile.name}
      </h1>
      <p class="text-lg text-[var(--text-secondary)] mb-8 max-w-md">
        {profile.bio}
      </p>
      <SocialIcons size={24} />
    </section>

    <!-- Skills -->
    <SkillTags />

    <!-- Timeline -->
    <Timeline />
  </main>

  <Footer />
</Layout>
```

- [ ] **Step 2: 添加页面加载动画**

在 `src/styles/global.css` 末尾追加：
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}
```

在 `src/pages/index.astro` 的 `<section>` 上添加 `class="animate-fade-in-up"`。

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro src/styles/global.css
git commit -m "feat: add homepage with Hero, Skills, and Timeline"
```

---

## Task 10: 构建关于我页面 `/about`

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: 创建 `src/pages/about.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import profile from '../data/profile.json';
import skills from '../data/skills.json';
---

<Layout title={`关于我 - ${profile.name}`} description={`了解 ${profile.name} 的背景和技能`}>
  <Navbar />

  <main class="flex-1 pt-16">
    <div class="max-w-[800px] mx-auto px-4 sm:px-6 py-16 space-y-16">
      <!-- 个人故事 -->
      <section>
        <h1 class="text-2xl font-semibold text-[var(--text-primary)] mb-6">关于我</h1>
        <div class="space-y-4 text-[var(--text-primary)] leading-relaxed">
          <p>
            你好！我是 {profile.name}，一名热爱技术的开发者。我对前端开发和全栈技术有着浓厚的兴趣，
            喜欢探索新的工具和框架，致力于构建简洁、高效且用户友好的应用。
          </p>
          <p>
            在空闲时间，我喜欢阅读技术博客、参与开源项目，以及尝试各种新奇的编程语言。
            我相信持续学习和分享是技术成长的最佳方式。
          </p>
          <p>
            如果你对我的项目感兴趣，或者想聊聊技术，欢迎通过联系方式页面与我取得联系。
          </p>
        </div>
      </section>

      <!-- 技能详情 -->
      <section>
        <h2 class="text-xl font-semibold text-[var(--text-primary)] mb-6">技能</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-[var(--bg-card)] rounded-xl p-5">
            <h3 class="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wide">前端</h3>
            <div class="flex flex-wrap gap-2">
              {['JavaScript', 'TypeScript', 'React', 'Vue', 'Astro'].map(s => (
                <span class="text-sm text-[var(--text-primary)]">{s}</span>
              ))}
            </div>
          </div>
          <div class="bg-[var(--bg-card)] rounded-xl p-5">
            <h3 class="text-sm font-semibold text-[var(--text-secondary)] mb-3 uppercase tracking-wide">后端 & 工具</h3>
            <div class="flex flex-wrap gap-2">
              {['Node.js', 'Python', 'Docker', 'Git', 'Linux'].map(s => (
                <span class="text-sm text-[var(--text-primary)]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <Footer />
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add About page with story and categorized skills"
```

---

## Task 11: 构建联系方式页面 `/contact`

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: 创建 `src/pages/contact.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
import SocialCard from '../components/SocialCard.astro';
import profile from '../data/profile.json';
import socials from '../data/socials.json';
---

<Layout title={`联系方式 - ${profile.name}`} description={`与 ${profile.name} 取得联系`}>
  <Navbar />

  <main class="flex-1 pt-16">
    <div class="max-w-[800px] mx-auto px-4 sm:px-6 py-16">
      <h1 class="text-2xl font-semibold text-[var(--text-primary)] text-center mb-12">联系我</h1>

      <!-- 社交卡片网格 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {socials.map(social => (
          <SocialCard
            platform={social.platform}
            icon={social.icon}
            url={social.url}
            username={social.username}
          />
        ))}
      </div>

      <!-- 邮箱区域 -->
      <div class="text-center">
        <h2 class="text-lg font-medium text-[var(--text-primary)] mb-4">或者直接发邮件</h2>
        <div class="inline-flex items-center gap-3 bg-[var(--bg-card)] rounded-xl px-6 py-3">
          <span class="text-[var(--text-primary)] font-medium">{profile.email}</span>
          <button
            id="copy-email"
            class="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150"
            aria-label="复制邮箱地址"
          >
            <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="48" y="48" width="128" height="128" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
              <path d="M176,80h24a8,8,0,0,1,8,8V200a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>

  <!-- Toast -->
  <div
    id="toast"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white px-6 py-3 rounded-lg shadow-lg
      opacity-0 pointer-events-none transition-opacity duration-200"
  >
    已复制到剪贴板
  </div>

  <Footer />
</Layout>

<script>
  const copyBtn = document.getElementById('copy-email');
  const toast = document.getElementById('toast');

  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.previousElementSibling?.textContent;
    if (email) {
      await navigator.clipboard.writeText(email.trim());
      toast?.classList.remove('opacity-0', 'pointer-events-none');
      setTimeout(() => {
        toast?.classList.add('opacity-0', 'pointer-events-none');
      }, 2000);
    }
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Contact page with social cards and email copy"
```

---

## Task 12: SEO 优化与 Sitemap

**Files:**
- Create: `public/robots.txt`
- Modify: `astro.config.mjs`, `src/layouts/Layout.astro`

- [ ] **Step 1: 安装 sitemap 插件**

Run:
```bash
npm install -D @astrojs/sitemap
```

- [ ] **Step 2: 更新 `astro.config.mjs`**

```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://xiaokaiyyy.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: 创建 `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://xiaokaiyyy.github.io/sitemap-index.xml
```

- [ ] **Step 4: 更新 `src/layouts/Layout.astro` 添加更多 meta 标签**

在 `<head>` 内添加：
```astro
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add SEO meta tags, sitemap, and robots.txt"
```

---

## Task 13: GitHub Actions 部署配置

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建 `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for Pages deployment"
```

---

## Task 14: 构建验证与最终检查

**Files:**
- Modify: 如需修复的任何文件

- [ ] **Step 1: 本地构建验证**

Run:
```bash
npm run build
```
Expected: 构建成功，输出到 `dist/` 目录。检查 `dist/index.html`、`dist/about/index.html`、`dist/contact/index.html` 是否存在。

- [ ] **Step 2: 本地预览（可选）**

Run:
```bash
npm run preview
```
Open `http://localhost:4321` and verify:
- 首页 Hero 区域居中，头像、姓名、简介、社交图标正常显示
- 技能标签可换行，hover 有效果
- 时间线垂直排列，圆点和竖线可见
- 导航栏在桌面端显示完整链接，移动端隐藏为汉堡菜单
- 点击汉堡菜单展开移动端抽屉
- 滚动后导航栏添加背景和模糊效果
- 暗色模式随系统切换（在 macOS 系统偏好设置中切换外观测试）
- 关于我页面文字正常，技能分类卡片两列布局
- 联系方式页面社交卡片网格正确，点击复制邮箱显示 toast

- [ ] **Step 3: 清理并提交最终更改**

```bash
git add -A
git commit -m "chore: final build verification and adjustments"
```

---

## Spec Coverage Check

| 设计要求 | 实现任务 |
|---|---|
| Astro 5.x + Tailwind CSS | Task 1, 2 |
| 温暖奶油色系 + 暗色模式 | Task 2 (global.css CSS variables) |
| 响应式布局 | Task 2 (Tailwind breakpoints), Task 5 (Navbar mobile drawer) |
| 首页：Hero + 技能 + 时间线 | Task 9 |
| 关于我：个人故事 + 技能详情 | Task 10 |
| 联系方式：社交卡片 + 邮箱复制 | Task 11 |
| JSON 数据驱动 | Task 3 |
| 导航栏滚动效果 | Task 5 |
| 页面加载动画 | Task 9 |
| SEO + Sitemap | Task 12 |
| GitHub Actions 部署 | Task 13 |

**无遗漏。**

---

## Placeholder Scan

- 无 `TBD`、`TODO`、`implement later` 等占位符
- 所有代码块包含完整可运行代码
- 所有命令包含预期输出
- 数据文件使用占位内容，用户后续替换即可

---

## Type Consistency Check

- `SocialIcons.astro` Props: `size?: number`, `showLabels?: boolean` — 一致
- `SocialCard.astro` Props: `platform`, `icon`, `url`, `username` — 一致
- `Layout.astro` Props: `title`, `description?` — 一致
- JSON 数据字段与组件引用一致

---

*Plan created on 2026-04-30*
