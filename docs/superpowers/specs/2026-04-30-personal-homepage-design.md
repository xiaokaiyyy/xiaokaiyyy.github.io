# GitHub Pages 个人主页设计方案

## 项目概述

基于 Astro 构建的静态个人主页，部署于 GitHub Pages。站点包含个人简介、技能展示、时间线和社交媒体链接，采用温暖奶油色系视觉风格，支持响应式布局和自动暗色模式。

---

## 1. 技术架构

| 层级 | 技术选型 | 说明 |
|---|---|---|
| 框架 | Astro 5.x | 从 `basics` 空白模板起步，完全手写 |
| 样式 | Tailwind CSS v4 | 通过 Astro 官方集成配置 |
| 字体 | 系统字体栈 + Noto Sans SC | 中文回退，Google Fonts CDN 加载 |
| 图标 | Phosphor Icons | 轻量、风格统一的 SVG 图标库 |
| 部署 | GitHub Actions | 构建后推送到 `gh-pages` 分支 |

**目录结构：**
```
/
├── .github/workflows/deploy.yml   # GitHub Actions 部署配置
├── public/
│   ├── avatar.jpg                 # 头像
│   └── favicon.ico                # 站点图标
├── src/
│   ├── components/                # 可复用 Astro 组件
│   │   ├── Navbar.astro
│   │   ├── SocialIcons.astro
│   │   ├── SkillTags.astro
│   │   ├── Timeline.astro
│   │   ├── SocialCard.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro           # 统一页面布局
│   ├── pages/
│   │   ├── index.astro            # 首页
│   │   ├── about.astro            # 关于我
│   │   └── contact.astro          # 联系方式
│   ├── data/                      # JSON 数据配置
│   │   ├── profile.json
│   │   ├── skills.json
│   │   ├── timeline.json
│   │   └── socials.json
│   └── styles/
│       └── global.css             # Tailwind 导入 + 自定义变量
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 2. 视觉设计系统

### 2.1 色彩

**浅色模式（默认）：**
| 变量名 | 色值 | 用途 |
|---|---|---|
| `--bg-primary` | `#fdf6e3` | 页面整体背景 |
| `--bg-card` | `#eee8d5` | 卡片、标签背景 |
| `--text-primary` | `#5b4636` | 正文、标题 |
| `--text-secondary` | `#8b7355` | 辅助说明、时间线日期 |
| `--accent` | `#d97706` | 链接 hover、标签、按钮 |
| `--border` | `#d4c5a9` | 卡片边框、分割线 |

**暗色模式（跟随系统 `prefers-color-scheme`）：**
| 变量名 | 色值 |
|---|---|
| `--bg-primary` | `#1c1917` |
| `--bg-card` | `#292524` |
| `--text-primary` | `#e7e5e4` |
| `--text-secondary` | `#a8a29e` |
| `--accent` | `#f59e0b` |
| `--border` | `#44403c` |

### 2.2 排版

- **系统字体栈**：`'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif`
- **H1（姓名）**：`32px`, `font-weight: 700`, `letter-spacing: -0.02em`
- **H2（板块标题）**：`24px`, `font-weight: 600`
- **正文**：`16px`, `line-height: 1.75`
- **辅助文字**：`14px`, `color: var(--text-secondary)`

### 2.3 间距

- 页面最大内容宽度：`800px`，水平居中
- 板块间垂直间距：`80px`（移动端 `48px`）
- 卡片内边距：`24px`
- 圆角：卡片 `12px`，标签 `9999px`（pill），头像 `50%`

---

## 3. 页面设计

### 3.1 首页 `/`

**1. 导航栏（Navbar）**
- 固定在顶部，初始透明背景
- 滚动超过 `50px` 后添加 `backdrop-blur` + 半透明背景 + 底部阴影
- 左侧：Logo（姓名缩写或文字）
- 右侧：首页、关于我、联系方式（桌面端）
- 移动端：汉堡图标，点击展开全屏抽屉菜单

**2. Hero 区域**
- 占满首屏（`min-height: 100vh`），内容垂直水平居中
- 圆形头像 `120px × 120px`，带 `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`
- 姓名（H1）
- 一句话简介（H2 样式，次要文字色）
- 社交图标行：`24px` 图标，间距 `16px`，hover 颜色变为 `--accent`

**3. 技能标签（Skills）**
- 标题居中："技术栈"
- 标签云：flex 换行布局，每个标签为 pill 形状
- 标签样式：`border: 1px solid var(--border)`，`padding: 6px 16px`，`font-size: 14px`
- Hover：`background: var(--bg-card)`，`border-color: var(--accent)`，`transition: 150ms`
- 数据来源：`src/data/skills.json`

**4. 时间线（Timeline）**
- 垂直布局，`max-width: 600px`，居中
- 左侧竖线：`2px` 宽，`background: var(--border)`
- 每个事件：圆点标记 + 日期 + 标题 + 描述
- 圆点：`12px` 圆形，默认 `var(--border)`，hover `var(--accent)`
- 日期：`font-size: 13px`，`color: var(--text-secondary)`
- 数据来源：`src/data/timeline.json`

**5. 页脚（Footer）**
- 简洁单行或双行，居中
- 版权信息：`© 2026 你的名字`
- 底部社交图标（与 Hero 一致，尺寸 `20px`）

### 3.2 关于我 `/about`

**1. 个人故事**
- 页面标题："关于我"
- 2-3 段文字，讲述背景、兴趣、职业方向
- 可选：一张非头像的个人照片，圆角 `12px`，最大宽度 `400px`

**2. 技能详情**
- 分类展示（如：前端、后端、工具、语言）
- 每个分类一个小卡片（`background: var(--bg-card)`，`border-radius: 12px`）
- 每项技能：名称 + 简短说明（如"3 年使用经验"）
- **不使用进度条或星级评分**，避免视觉噪音

### 3.3 联系方式 `/contact`

**1. 社交链接卡片**
- 页面标题："联系我"
- 网格布局：桌面 3 列，平板 2 列，手机 1 列
- 每张卡片：
  - 平台图标（`40px`）
  - 平台名称
  - 用户名/链接文字
  - "访问" 按钮（小尺寸，outlined 样式）
- 卡片样式：`background: var(--bg-card)`，`border-radius: 12px`，`padding: 24px`
- Hover：`transform: translateY(-4px)`，`box-shadow` 加深，`transition: 200ms`
- 数据来源：`src/data/socials.json`

**2. 邮箱区域**
- 独立区块，居中
- 邮箱地址 + 复制按钮
- 点击复制：`navigator.clipboard.writeText(email)`
- 复制成功：显示 toast 提示（`position: fixed, bottom: 24px`，`background: var(--accent)`，`color: white`，`border-radius: 8px`，`padding: 12px 24px`，自动消失 `2s`）

---

## 4. 组件接口

### Layout.astro
```astro
---
export interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---
```
- 统一包裹所有页面
- 包含 `<html lang="zh-CN">`、`<head>`、Navbar、`<main>`、Footer
- 接受 `title`（页面标题）和可选 `description`（SEO）

### SocialIcons.astro
```astro
---
export interface Props {
  size?: number;        // 默认 24
  showLabels?: boolean; // 默认 false
}
---
```
- 从 `src/data/socials.json` 读取链接列表
- 渲染为图标行

### SkillTags.astro
- 从 `src/data/skills.json` 读取技能数组
- 渲染为 flex 换行的 pill 标签

### Timeline.astro
- 从 `src/data/timeline.json` 读取事件数组
- 按时间倒序渲染垂直时间线

### SocialCard.astro
```astro
---
export interface Props {
  platform: string;
  icon: string;
  url: string;
  username: string;
}
---
```

---

## 5. 数据配置

### profile.json
```json
{
  "name": "你的名字",
  "bio": "一句话个人介绍",
  "avatar": "/avatar.jpg",
  "email": "your@email.com"
}
```

### skills.json
```json
[
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Node.js",
  "Docker"
]
```

### timeline.json
```json
[
  {
    "date": "2026-04",
    "title": "事件标题",
    "description": "简短描述"
  }
]
```

### socials.json
```json
[
  {
    "platform": "GitHub",
    "icon": "github-logo",
    "url": "https://github.com/username",
    "username": "username"
  }
]
```

---

## 6. 响应式断点

| 断点名 | 宽度 | 关键调整 |
|---|---|---|
| Mobile | < 640px | 单列布局、汉堡菜单、`16px` 页面边距、缩小标题字号 |
| Tablet | 640px - 1024px | 两列卡片网格、`24px` 页面边距 |
| Desktop | > 1024px | 最大内容宽度 `800px` 居中、完整导航栏 |

---

## 7. 交互与动画

| 场景 | 效果 | 参数 |
|---|---|---|
| 页面加载 | 内容淡入 + 上移 | `opacity: 0 → 1`, `translateY: 20px → 0`, `duration: 600ms`, `easing: ease-out` |
| 导航栏滚动 | 添加背景 + 阴影 | `backdrop-filter: blur(12px)`, `background: rgba(--bg-primary, 0.8)`, `transition: 200ms` |
| 链接/按钮 hover | 颜色/背景过渡 | `transition: 150ms` |
| 卡片 hover | 上浮 + 阴影加深 | `transform: translateY(-4px)`, `transition: 200ms` |
| 邮箱复制成功 | Toast 提示 | 底部弹出，`duration: 2s` 后自动消失 |

**原则**：动画服务于引导注意力，不喧宾夺主。不使用复杂或长时间的动画效果。

---

## 8. SEO 与性能

- 每个页面设置独立的 `<title>` 和 `<meta name="description">`
- 头像和照片使用 WebP 格式，配合 `loading="lazy"`
- 字体使用 `font-display: swap`
- 生成 `sitemap.xml`（通过 `@astrojs/sitemap`）
- 目标 Lighthouse 评分：Performance ≥ 95, Accessibility ≥ 95

---

## 9. 部署流程

1. 代码推送到 `main` 分支
2. GitHub Actions 触发：
   - `actions/checkout@v4`
   - `actions/setup-node@v4`（Node 20）
   - `npm ci`
   - `npm run build`
   - 推送到 `gh-pages` 分支
3. GitHub Pages 从 `gh-pages` 分支自动部署

---

## 10. 扩展预留

- **博客系统**：未来如需添加博客，可在 `src/pages/blog/` 下创建 `[slug].astro`，使用 `Astro.glob()` 或 `getCollection()` 读取 Markdown 文件
- **国际化**：如需多语言，可引入 `astro-i18n` 或类似方案，数据文件按语言拆分
- **评论系统**：博客页面可集成 Giscus（GitHub Discussions 驱动）

---

*Design finalized on 2026-04-30*
