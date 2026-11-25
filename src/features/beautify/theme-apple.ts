/**
 * SCU+ 教务系统 · Apple 风格主题 (Clean / Glass)
 *
 * 设计原则
 * - 直接基于教务系统（ACE Admin + Bootstrap）原始 DOM 重写，与杂志风主题互相独立。
 * - 留白、柔和圆角、细分隔线、系统字体、克制的点缀色（默认系统蓝）。
 * - 毛玻璃（backdrop-filter）只用在「悬浮于内容之上、面积小」的层上：
 *   顶部导航栏、下拉菜单、侧栏收起后的飞出菜单、Bootstrap 模态框。
 *   表格、卡片、列表、侧栏主体一律使用实色，绝不对大面积/滚动内容使用模糊。
 *   - 不使用 will-change / 动画化的 blur，模糊半径 ≤ 24px。
 *   - 玻璃参数全部走 --scu-glass-* 变量：不支持 backdrop-filter 或用户要求减少透明度时，回落到高不透明度的实色。
 *   - 尊重 prefers-reduced-transparency 与 prefers-reduced-motion。
 * - 与杂志风共用同一套 --scu-* 变量名，其他功能模块（成绩分析、选课筛选等）
 *   用 var(--scu-*, fallback) 即可自动适配。--scu-serif 在此主题下就是无衬线。
 */
export const APPLE_THEME_CSS = `
/* ============================================================
   变量 —— 浅色
   ============================================================ */
:root {
  color-scheme: light;
  --scu-paper: #f5f5f7;
  --scu-surface: #ffffff;
  --scu-ink: #1d1d1f;
  --scu-ink-soft: #515154;
  --scu-ink-faint: #86868b;
  --scu-line: #e8e8ed;
  --scu-line-strong: #d2d2d7;
  --scu-accent: #0071e3;             /* 系统蓝 —— 可通过设置更改 */
  --scu-accent-soft: rgba(0, 113, 227, 0.08);
  --scu-accent-fill: #0071e3;
  --scu-accent-line: rgba(0, 113, 227, 0.28);
  --scu-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro SC", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Segoe UI", "Microsoft YaHei", sans-serif;
  --scu-serif: var(--scu-sans);
  /* 语义色 */
  --scu-c1: #0071e3;
  --scu-c2: #248a3d;
  --scu-c3: #0071e3;
  --scu-c4: #c93400;
  --scu-c5: #8944ab;
  --scu-c6: #5e5ce6;
  --scu-danger: #d70015;
  --scu-danger-soft: rgba(215, 0, 21, 0.08);
  --scu-danger-line: rgba(215, 0, 21, 0.26);
  /* 组件级配色 */
  --scu-sidebar-bg: #fbfbfd;
  --scu-rowhead-bg: #fafafc;
  --scu-surface-dim: #f5f5f7;
  --scu-row-hover: rgba(0, 0, 0, 0.03);
  --scu-tools-bg: rgba(255, 255, 255, 0.92);
  --scu-selection-bg: rgba(0, 113, 227, 0.2);
  --scu-shadow-rgb: 0, 0, 0;
  --scu-label-success-bg: rgba(36, 138, 61, 0.1);
  --scu-label-success-border: rgba(36, 138, 61, 0.2);
  --scu-label-warning-bg: rgba(201, 52, 0, 0.09);
  --scu-label-warning-border: rgba(201, 52, 0, 0.2);
  --scu-label-info-bg: rgba(0, 113, 227, 0.09);
  --scu-label-info-border: rgba(0, 113, 227, 0.2);
  --scu-label-default-bg: rgba(60, 60, 67, 0.08);
  --scu-label-purple-bg: rgba(137, 68, 171, 0.1);
  /* 玻璃层：默认实色（不支持 backdrop-filter / 降低透明度时的回落） */
  --scu-glass-bg: rgba(255, 255, 255, 0.94);
  --scu-glass-menu-bg: rgba(255, 255, 255, 0.96);
  --scu-glass-border: rgba(0, 0, 0, 0.08);
  --scu-glass-blur: none;
  /* 圆角阶梯 */
  --scu-r-sm: 8px;
  --scu-r-md: 12px;
  --scu-r-lg: 18px;
}

/* ============================================================
   变量 —— 深色（JS 在 <html> 上设置 data-scu-theme="dark"）
   ============================================================ */
:root[data-scu-theme="dark"] {
  color-scheme: dark;
  --scu-paper: #000000;
  --scu-surface: #1c1c1e;
  --scu-ink: #f5f5f7;
  --scu-ink-soft: #c7c7cc;
  --scu-ink-faint: #8e8e93;
  --scu-line: #2c2c2e;
  --scu-line-strong: #3a3a3c;
  --scu-c2: #30d158;
  --scu-c3: #0a84ff;
  --scu-c4: #ff9f0a;
  --scu-c5: #bf5af2;
  --scu-c6: #7d7aff;
  --scu-danger: #ff453a;
  --scu-danger-soft: rgba(255, 69, 58, 0.16);
  --scu-danger-line: rgba(255, 69, 58, 0.36);
  --scu-sidebar-bg: #121214;
  --scu-rowhead-bg: #232325;
  --scu-surface-dim: #2c2c2e;
  --scu-row-hover: rgba(255, 255, 255, 0.06);
  --scu-tools-bg: rgba(44, 44, 46, 0.94);
  --scu-selection-bg: rgba(10, 132, 255, 0.4);
  --scu-label-success-bg: rgba(48, 209, 88, 0.16);
  --scu-label-success-border: rgba(48, 209, 88, 0.3);
  --scu-label-warning-bg: rgba(255, 159, 10, 0.16);
  --scu-label-warning-border: rgba(255, 159, 10, 0.3);
  --scu-label-info-bg: rgba(10, 132, 255, 0.18);
  --scu-label-info-border: rgba(10, 132, 255, 0.34);
  --scu-label-default-bg: rgba(235, 235, 245, 0.12);
  --scu-label-purple-bg: rgba(191, 90, 242, 0.18);
  --scu-glass-bg: rgba(28, 28, 30, 0.95);
  --scu-glass-menu-bg: rgba(40, 40, 42, 0.97);
  --scu-glass-border: rgba(255, 255, 255, 0.1);
}

/* 毛玻璃：仅当浏览器支持 backdrop-filter 时启用 */
@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  :root {
    --scu-glass-bg: rgba(255, 255, 255, 0.72);
    --scu-glass-menu-bg: rgba(255, 255, 255, 0.8);
    --scu-glass-blur: saturate(180%) blur(20px);
  }
  :root[data-scu-theme="dark"] {
    --scu-glass-bg: rgba(28, 28, 30, 0.72);
    --scu-glass-menu-bg: rgba(44, 44, 46, 0.78);
  }
  /* 用户要求减少透明度：回到实色、关闭模糊（写在启用块之后以覆盖） */
  @media (prefers-reduced-transparency: reduce) {
    :root {
      --scu-glass-bg: rgba(255, 255, 255, 0.94);
      --scu-glass-menu-bg: rgba(255, 255, 255, 0.96);
      --scu-glass-blur: none;
    }
    :root[data-scu-theme="dark"] {
      --scu-glass-bg: rgba(28, 28, 30, 0.95);
      --scu-glass-menu-bg: rgba(40, 40, 42, 0.97);
    }
  }
}

/* ============================================================
   全局基调
   ============================================================ */
html, body {
  background: var(--scu-paper) !important;
}
body {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
::selection { background: var(--scu-selection-bg); }
a { color: var(--scu-accent); text-decoration: none; }
a:hover, a:focus { color: var(--scu-accent); text-decoration: underline; }
h1, h2, h3, h4, h5, h6 {
  font-family: var(--scu-sans) !important;
  letter-spacing: -0.01em;
}
:focus-visible {
  outline: 2px solid var(--scu-accent);
  outline-offset: 2px;
}
input:focus-visible, select:focus-visible, textarea:focus-visible { outline: none; }

/* 细滚动条 */
::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: rgba(134, 134, 139, 0.42);
  border: 3px solid transparent;
  border-radius: 8px;
  background-clip: content-box;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(134, 134, 139, 0.7);
  background-clip: content-box;
}
@supports not selector(::-webkit-scrollbar) {
  * { scrollbar-width: thin; scrollbar-color: rgba(134, 134, 139, 0.5) transparent; }
}

/* ============================================================
   顶部导航栏 —— 毛玻璃（全站唯一常驻的玻璃层，高度仅 45px）
   高度保持 45px 不变：ACE 的侧栏/主容器偏移依赖它。
   ============================================================ */
#navbar {
  background: var(--scu-glass-bg) !important;
  background-image: none !important;
  -webkit-backdrop-filter: var(--scu-glass-blur);
  backdrop-filter: var(--scu-glass-blur);
  border: none !important;
  border-bottom: 1px solid var(--scu-glass-border) !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  min-height: 45px !important;
}
/* 未固定的导航栏改为吸顶，滚动时内容从玻璃下方穿过；已固定的保持原状 */
#navbar:not(.navbar-fixed-top) {
  position: sticky;
  top: 0;
  z-index: 1030;
}
#navbar .navbar-container { padding: 0 16px; }
#navbar .navbar-header { margin-top: 0 !important; }
#navbar .navbar-header a.navbar-brand {
  line-height: 45px !important;
  height: 45px !important;
  padding: 0 !important;
}
#navbar .navbar-header.pull-left a,
#navbar .navbar-header.pull-left a small,
#navbar .navbar-header a.navbar-brand {
  color: var(--scu-ink) !important;
  font-family: var(--scu-sans) !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em !important;
  text-shadow: none !important;
  text-decoration: none !important;
}

/* 右侧导航：去色块、去分隔线 */
#navbar .ace-nav { margin: 0 !important; }
#navbar .ace-nav > li {
  background: transparent !important;
  border: none !important;
  height: 45px !important;
  line-height: 45px !important;
  overflow: visible !important;
}
#navbar .ace-nav > li > a {
  background: transparent !important;
  color: var(--scu-ink-soft) !important;
  font-size: 12.5px !important;
  padding: 0 12px !important;
  height: 45px !important;
  line-height: 45px !important;
  display: block !important;
  white-space: nowrap !important;
  text-decoration: none !important;
  transition: color .2s ease, background-color .2s ease;
  overflow: visible !important;
}
#navbar .ace-nav > li > a:hover,
#navbar .ace-nav > li > a:focus,
#navbar .ace-nav > li.open > a {
  background: var(--scu-row-hover) !important;
  color: var(--scu-ink) !important;
}
#navbar .ace-nav > li > a > .ace-icon { color: var(--scu-ink-faint) !important; }
#navbar .ace-nav > li > a:hover > .ace-icon { color: var(--scu-accent) !important; }
#navbar .ace-nav .badge { display: none; }

/* 智能搜索按钮 —— 复位为普通图标 */
#navbar .ace-nav > li:first-child { width: 40px !important; }
#navbar #intellegenceUDiv { position: static !important; width: 40px; height: 45px; }
#navbar #clickdiv {
  position: static !important;
  background: transparent !important;
  background-color: transparent !important;
  width: 40px !important;
  height: 45px !important;
  line-height: 45px !important;
  display: block !important;
  text-align: center;
}
#navbar #clickdiv #clicki,
#navbar #clickdiv .fa-search {
  color: var(--scu-ink-faint) !important;
  margin: 0 !important;
  font-size: 15px;
}
#navbar #clickdiv:hover #clicki { color: var(--scu-accent) !important; }
#navbar #form-search[style*="width: 0px"] { visibility: hidden !important; }
#navbar #form-search .nav-search-input {
  border: 1px solid var(--scu-line-strong) !important;
  background: var(--scu-surface) !important;
  color: var(--scu-ink) !important;
  border-radius: 980px !important;
  box-shadow: none !important;
}

/* 用户区：flex 垂直居中，欢迎语小字 + 姓名 */
#navbar .ace-nav > li.light-blue > a,
#navbar .ace-nav > li.light-blue > a > span { color: var(--scu-ink) !important; }
#navbar .ace-nav > li.light-blue > a {
  display: flex !important;
  align-items: center !important;
  line-height: 1.2 !important;
}
#navbar .ace-nav img.nav-user-photo {
  border: none !important;
  border-radius: 50% !important;
  width: 28px !important;
  height: 28px !important;
  margin-right: 8px;
  box-shadow: 0 0 0 1px var(--scu-line);
}
#navbar .ace-nav .user-info {
  display: inline-block !important;
  vertical-align: middle !important;
  line-height: 1.15 !important;
  text-align: left;
  font-family: var(--scu-sans) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  color: var(--scu-ink) !important;
  overflow: visible !important;
}
#navbar .ace-nav .user-info small {
  display: block !important;
  font-family: var(--scu-sans) !important;
  font-size: 10px !important;
  font-weight: 400 !important;
  color: var(--scu-ink-faint) !important;
  margin-bottom: 1px;
}

/* ============================================================
   面包屑
   ============================================================ */
.breadcrumbs {
  background: transparent !important;
  border-bottom: 1px solid var(--scu-line) !important;
  min-height: 38px !important;
  padding-left: 20px !important;
}
.breadcrumbs .breadcrumb,
.breadcrumbs .breadcrumb a,
.breadcrumbs .breadcrumb i {
  color: var(--scu-ink-faint) !important;
  font-size: 12px !important;
  background: transparent !important;
  text-decoration: none !important;
}
.breadcrumbs .breadcrumb a:hover { color: var(--scu-accent) !important; }
.breadcrumbs .breadcrumb .active { color: var(--scu-ink-soft) !important; }

/* ============================================================
   侧边栏 —— 实色（内容不会从它下方滚过，无需模糊）
   选中项为圆角高亮块，而不是 ACE 原版的缺口三角。
   ============================================================ */
#sidebar {
  background: var(--scu-sidebar-bg) !important;
  border-right: 1px solid var(--scu-line) !important;
}
#sidebar::before { display: none !important; }
#sidebar .nav-list { background: transparent !important; }
#sidebar .nav-list > li { background: transparent !important; border: none !important; }
/* ACE 原版的左侧高亮条 / 右侧竖条 / 缺口三角，一律不用 */
#sidebar .nav-list > li::before,
#sidebar .nav-list > li.active::after,
#sidebar .nav-list li.active > a::before,
#sidebar .nav-list li.active > a::after,
#sidebar .submenu::before,
#sidebar .submenu > li::before { display: none !important; }

#sidebar .nav-list > li > a {
  background: transparent !important;
  color: var(--scu-ink-soft) !important;
  font-size: 13px !important;
  padding: 9px 14px !important;
  text-shadow: none !important;
  border: none !important;
  text-decoration: none !important;
  transition: background-color .2s ease, color .2s ease;
}
#sidebar:not(.menu-min) .nav-list > li { margin: 2px 8px; }
#sidebar:not(.menu-min) .nav-list > li > a { border-radius: var(--scu-r-sm); }
#sidebar .nav-list > li > a:hover {
  background: var(--scu-row-hover) !important;
  color: var(--scu-ink) !important;
}
#sidebar .nav-list > li.active > a,
#sidebar .nav-list > li.open > a {
  background: var(--scu-accent-soft) !important;
  color: var(--scu-accent) !important;
  font-weight: 600;
}
#sidebar .nav-list .menu-icon { color: var(--scu-ink-faint) !important; }
#sidebar .nav-list > li.active > a .menu-icon,
#sidebar .nav-list > li > a:hover .menu-icon { color: var(--scu-accent) !important; }
#sidebar .nav-list .arrow { color: var(--scu-ink-faint) !important; }

/* 子菜单 */
#sidebar .submenu {
  background: transparent !important;
  border: none !important;
}
#sidebar .submenu > li > a {
  color: var(--scu-ink-soft) !important;
  font-size: 12.5px !important;
  background: transparent !important;
  border: none !important;
  padding: 8px 14px 8px 30px !important;
  text-decoration: none !important;
  transition: background-color .2s ease, color .2s ease;
}
#sidebar:not(.menu-min) .submenu > li > a { border-radius: var(--scu-r-sm); margin: 1px 0; }
#sidebar .submenu > li > a:hover {
  color: var(--scu-ink) !important;
  background: var(--scu-row-hover) !important;
}
#sidebar .submenu > li.active > a {
  color: var(--scu-accent) !important;
  font-weight: 600;
  background: var(--scu-accent-soft) !important;
}
#sidebar .submenu .menu-icon { color: var(--scu-ink-faint) !important; }

/* 收起按钮 */
#sidebar .sidebar-collapse,
#sidebar .sidebar-collapse > [class*="fa-"] {
  background: transparent !important;
  color: var(--scu-ink-faint) !important;
  border-color: var(--scu-line-strong) !important;
}

/* ---- 收起状态 (menu-min) ---- */
#sidebar.menu-min .nav-list > li > a {
  padding: 6px 0 !important;
  text-align: center !important;
  line-height: 24px !important;
}
#sidebar.menu-min .nav-list > li > a .menu-icon {
  display: block !important;
  margin: 0 auto !important;
  float: none !important;
  width: auto !important;
  font-size: 13px !important;
}
#sidebar.menu-min .nav-list > li > a .menu-text,
#sidebar.menu-min .nav-list > li > a .arrow { display: none !important; }

/* 悬停飞出菜单：小面积、仅悬停时出现，使用玻璃 */
#sidebar.menu-min .nav-list > li > .submenu {
  background: var(--scu-glass-menu-bg) !important;
  -webkit-backdrop-filter: var(--scu-glass-blur);
  backdrop-filter: var(--scu-glass-blur);
  border: 1px solid var(--scu-glass-border) !important;
  border-radius: var(--scu-r-md) !important;
  box-shadow: 0 8px 30px rgba(var(--scu-shadow-rgb), 0.14) !important;
  padding: 6px !important;
  min-width: 160px !important;
  position: absolute;
  left: 100%;
  z-index: 999;
  /* 强制顶部对齐，覆盖 Ace Admin JS 可能设置的错误 inline top */
  top: -42px !important;
}
#sidebar.menu-min .nav-list > li > .submenu > li > a {
  padding: 8px 14px !important;
  background: transparent !important;
  color: var(--scu-ink-soft) !important;
  white-space: nowrap !important;
  border-radius: var(--scu-r-sm);
}
#sidebar.menu-min .nav-list > li > .submenu > li > a:hover {
  color: var(--scu-ink) !important;
  background: var(--scu-row-hover) !important;
}
#sidebar.menu-min .nav-list > li > .submenu > li.active > a {
  color: var(--scu-accent) !important;
  background: var(--scu-accent-soft) !important;
  font-weight: 600;
}
/* 无子菜单项的 tooltip / 兼容 Ace 可能生成的独立弹窗元素 */
#sidebar.menu-min [class*="popup"],
#sidebar.menu-min [class*="flyout"],
#sidebar.menu-min .popover,
#sidebar.menu-min .tooltip,
#sidebar.menu-min .nav-list > li > .tooltip,
#sidebar.menu-min .nav-list > li > .popover {
  background: var(--scu-glass-menu-bg) !important;
  border: 1px solid var(--scu-glass-border) !important;
  border-radius: var(--scu-r-md) !important;
  box-shadow: 0 8px 30px rgba(var(--scu-shadow-rgb), 0.14) !important;
}
#sidebar.menu-min .nav-list > li > .tooltip .tooltip-inner {
  background: transparent !important;
  color: var(--scu-ink) !important;
  border-radius: var(--scu-r-sm) !important;
}

/* ============================================================
   页面主体
   ============================================================ */
.main-content, .main-content-inner, .page-content {
  background: var(--scu-paper) !important;
}
/* ACE 主容器背景伪元素（z-index:-2 铺满全高的白底）—— 内容不足一屏时露出的白块即源于此 */
.main-container::before {
  background: var(--scu-paper) !important;
}
#page-content-template {
  background: transparent !important;
  border: none !important;
}

/* 页面标题区：大标题 + 细分隔线 */
.page-header {
  border-bottom: 1px solid var(--scu-line) !important;
  padding-bottom: 10px !important;
  margin: 14px 20px 18px !important;
}
.page-header h1, .page-header .h1,
.page-header h1 small {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  font-weight: 700 !important;
  letter-spacing: -0.02em;
}
.page-header h1 small { color: var(--scu-ink-faint) !important; font-weight: 400 !important; }

/* ACE .header 区块标题 */
h1.header, h2.header, h3.header, h4.header, h5.header, .header {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  font-weight: 600 !important;
  letter-spacing: -0.01em;
  text-shadow: none !important;
  border-bottom: none !important;
}
.header .ace-icon, .header i { color: var(--scu-accent) !important; }
.header small, .header .smaller { color: var(--scu-ink-faint) !important; font-weight: 400 !important; }

/* 内容区裸标题（奖惩信息、学籍异动信息等） */
.main-content h3:not(.header):not(.modal-title) {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  font-weight: 600 !important;
  font-size: 17px !important;
  margin: 22px 0 10px !important;
}

/* ============================================================
   卡片 / Widget —— 实色白卡，无模糊
   ============================================================ */
.widget-box {
  background: var(--scu-surface) !important;
  border: none !important;
  border-radius: var(--scu-r-md) !important;
  box-shadow: 0 0 0 1px var(--scu-line), 0 1px 3px rgba(var(--scu-shadow-rgb), 0.04) !important;
  margin-bottom: 18px !important;
}
.widget-box > .widget-header,
.widget-box .widget-header {
  background: transparent !important;
  background-image: none !important;
  border: none !important;
  border-bottom: 1px solid var(--scu-line) !important;
  min-height: 44px !important;
  padding: 10px 16px !important;
  color: var(--scu-ink) !important;
}
.widget-box .widget-header .widget-title,
.widget-box .widget-header h5 {
  font-family: var(--scu-sans) !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  color: var(--scu-ink) !important;
  letter-spacing: -0.01em;
  text-shadow: none !important;
  line-height: 24px !important;
}
.widget-box .widget-toolbar,
.widget-box .widget-toolbar > a,
.widget-box .widget-toolbar [data-action] {
  color: var(--scu-ink-faint) !important;
  background: transparent !important;
  border: none !important;
}
.widget-box .widget-toolbar > a:hover { color: var(--scu-accent) !important; }
.widget-box .widget-toolbar::before { display: none !important; }
.widget-box .widget-body { background: transparent !important; }
/* 独立 widget-body（不在 .widget-box 内，如方案完成情况页的树容器） */
.widget-body { background: var(--scu-surface) !important; }

/* ============================================================
   首页信息块 (infobox)
   ============================================================ */
.infobox {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid var(--scu-line) !important;
  box-shadow: none !important;
  width: 100% !important;
  padding: 10px 4px !important;
}
.infobox .infobox-icon .ace-icon,
.infobox > .infobox-icon > .ace-icon {
  background: transparent !important;
  color: var(--scu-accent) !important;
  border: none !important;
}
.infobox .infobox-icon .ace-icon::before { color: var(--scu-accent) !important; }
.infobox-data-number {
  font-family: var(--scu-sans) !important;
  font-size: 28px !important;
  font-weight: 600 !important;
  letter-spacing: -0.02em;
  color: var(--scu-ink) !important;
}
.infobox-content {
  color: var(--scu-ink-faint) !important;
  font-size: 12px !important;
}
.infobox-red .infobox-data-number,
.infobox-red .infobox-icon .ace-icon::before { color: var(--scu-danger) !important; }

/* 通知列表 */
.tabContent h3.click-item,
#notices h3 {
  background: transparent !important;
  border-bottom: 1px solid var(--scu-line) !important;
  padding: 8px 0 !important;
  height: auto !important;
}
.tabContent h3.click-item a, #notices h3 a {
  color: var(--scu-ink) !important;
  font-size: 14px !important;
  text-decoration: none !important;
}
.tabContent h3.click-item a:hover { color: var(--scu-accent) !important; }
.tabContent h3.click-item label { color: var(--scu-ink-faint) !important; font-weight: 400 !important; font-size: 12px !important; }
.tabContent h3.click-item label.hide_note { color: var(--scu-ink) !important; font-size: 14px !important; }
#notices h3.click-item::before,
.tabContent h3.click-item::before {
  background: transparent !important;
  color: var(--scu-accent) !important;
  font-family: var(--scu-sans) !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  text-shadow: none !important;
  width: 32px !important;
  text-align: left !important;
  padding: 0 !important;
}

/* ============================================================
   表格 —— 白色分组列表：无竖线，仅细横线
   ============================================================ */
.table {
  background: var(--scu-surface) !important;
  border: none !important;
  margin-bottom: 20px !important;
}
.table > thead > tr > th,
.table > thead > tr > td {
  background: var(--scu-surface) !important;
  border: none !important;
  border-bottom: 1px solid var(--scu-line-strong) !important;
  color: var(--scu-ink-faint) !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  padding: 10px 12px !important;
  vertical-align: bottom !important;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td {
  border: none !important;
  border-bottom: 1px solid var(--scu-line) !important;
  color: var(--scu-ink) !important;
  font-size: 13px !important;
  padding: 10px 12px !important;
  font-variant-numeric: tabular-nums;
}
.table > tbody > tr:last-child > td { border-bottom: none !important; }
.table-striped > tbody > tr:nth-child(odd) > td,
.table-striped > tbody > tr:nth-child(odd) > th { background: transparent !important; }
.table-hover > tbody > tr:hover > td,
.table-hover > tbody > tr:hover > th { background: var(--scu-row-hover) !important; }
.table-bordered, .table-bordered > thead > tr > th, .table-bordered > tbody > tr > td {
  border: none !important;
}
.table-bordered > thead > tr > th { border-bottom: 1px solid var(--scu-line-strong) !important; }
.table-bordered > tbody > tr > td { border-bottom: 1px solid var(--scu-line) !important; }
.table-bordered > tbody > tr:last-child > td { border-bottom: none !important; }
.table > thead > tr { background: transparent !important; background-image: none !important; }
.table-striped > tbody > tr, .table-striped > tbody > tr:nth-of-type(odd) { background: transparent !important; background-image: none !important; }
/* 选中/高亮行（评教列表等）—— 站点浅绿底 #E4EFC9 带 !important */
table .highlight td, table .highlight th {
  background: var(--scu-accent-soft) !important;
}
.table-header {
  background: transparent !important;
  color: var(--scu-ink-soft) !important;
  border: none !important;
  font-size: 13px !important;
}

/* 档案信息栅格（ACE profile）—— 去蓝底 */
.profile-user-info { border: none !important; }
.profile-info-row {
  border: none !important;
  border-bottom: 1px solid var(--scu-line) !important;
}
.profile-user-info .profile-info-row:first-child { border-top: none !important; }
.profile-user-info .profile-info-name {
  background: transparent !important;
  border: none !important;
  color: var(--scu-ink-faint) !important;
  font-size: 12px !important;
  font-weight: 400 !important;
  padding: 9px 12px !important;
}
.profile-user-info .profile-info-value {
  background: transparent !important;
  border: none !important;
  color: var(--scu-ink) !important;
  font-size: 13px !important;
  padding: 9px 12px !important;
}
.profile-info-value span { color: var(--scu-ink) !important; }
.profile-info-value a { color: var(--scu-accent) !important; }

/* 标题栏蓝色图片图标 —— 去色 */
h4.header img, .page-header img { filter: grayscale(1) !important; opacity: .7 !important; }
.xc_02 { filter: grayscale(1) !important; opacity: .78 !important; }

/* 成绩色块 —— 去底色，不及格标红 */
.green_background { background: transparent !important; }
.red_background { background: transparent !important; }
td.red_background, td.red_background a, td.red_background span { color: var(--scu-danger) !important; font-weight: 600 !important; }
td.green_background, td.green_background a, td.green_background span { color: var(--scu-ink) !important; }

/* ============================================================
   按钮
   ============================================================ */
.btn, .btn.btn-default {
  background: var(--scu-surface) !important;
  background-image: none !important;
  border: 1px solid var(--scu-line-strong) !important;
  color: var(--scu-ink) !important;
  border-radius: var(--scu-r-sm) !important;
  box-shadow: none !important;
  text-shadow: none !important;
  font-size: 12.5px !important;
  text-decoration: none !important;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, opacity .2s ease;
}
.btn:hover, .btn:focus {
  background: var(--scu-surface-dim) !important;
  border-color: var(--scu-line-strong) !important;
  color: var(--scu-ink) !important;
}
.btn:active, .btn.active { box-shadow: none !important; }
.btn-primary, .btn.btn-primary {
  background: var(--scu-accent-fill) !important;
  border-color: var(--scu-accent-fill) !important;
  color: #fff !important;
}
.btn-primary:hover, .btn-primary:focus {
  background: var(--scu-accent-fill) !important;
  border-color: var(--scu-accent-fill) !important;
  color: #fff !important;
  opacity: .88 !important;
}
.btn-success, .btn.btn-success {
  background: var(--scu-accent-fill) !important;
  border-color: var(--scu-accent-fill) !important;
  color: #fff !important;
}
.btn-success:hover, .btn-success:focus {
  background: var(--scu-accent-fill) !important;
  border-color: var(--scu-accent-fill) !important;
  color: #fff !important;
  opacity: .88 !important;
}
/* 次级强调：淡色底 + 点缀色文字（类似 Apple 的“了解更多”） */
.btn-info, .btn.btn-info {
  background: var(--scu-accent-soft) !important;
  border-color: transparent !important;
  color: var(--scu-accent) !important;
}
.btn-info:hover, .btn-info:focus {
  background: var(--scu-accent-line) !important;
  border-color: transparent !important;
  color: var(--scu-accent) !important;
}
.btn-danger, .btn.btn-danger {
  background: var(--scu-danger-soft) !important;
  border-color: transparent !important;
  color: var(--scu-danger) !important;
}
.btn-danger:hover, .btn-danger:focus {
  background: var(--scu-danger) !important;
  border-color: var(--scu-danger) !important;
  color: #fff !important;
}
.btn-warning, .btn.btn-warning {
  background: var(--scu-label-warning-bg) !important;
  border-color: transparent !important;
  color: var(--scu-c4) !important;
}
.btn-warning:hover, .btn-warning:focus {
  background: var(--scu-c4) !important;
  border-color: var(--scu-c4) !important;
  color: #fff !important;
}
.btn.btn-white { background: var(--scu-surface) !important; border-color: var(--scu-line-strong) !important; color: var(--scu-ink) !important; }
.btn.btn-white:hover, .btn.btn-white:focus { background: var(--scu-surface-dim) !important; color: var(--scu-ink) !important; }
.btn.btn-white.btn-primary:hover, .btn.btn-white.btn-primary:focus { color: #fff !important; }
.btn-link, .btn.btn-link { background: transparent !important; border: none !important; color: var(--scu-accent) !important; }
.btn.disabled, .btn[disabled] { opacity: .45 !important; }
.btn-group > .btn { border-radius: 0 !important; }
.btn-group > .btn:first-child { border-top-left-radius: var(--scu-r-sm) !important; border-bottom-left-radius: var(--scu-r-sm) !important; }
.btn-group > .btn:last-child { border-top-right-radius: var(--scu-r-sm) !important; border-bottom-right-radius: var(--scu-r-sm) !important; }

/* 评教列表 —— 非 btn-info 的按钮（即“评估”）用主题色填充 */
#codeTable .btn:not(.btn-info) {
  background: var(--scu-accent-fill) !important;
  border-color: var(--scu-accent-fill) !important;
  color: #fff !important;
}

/* ============================================================
   标签 / 徽章 —— 胶囊 + 淡色底
   body 前缀提高优先级：站点在 h4/.header 等上下文中用 (0,1,1) 级
   !important 规则把标签文字设成深色，深色模式下会压过本节规则。
   ============================================================ */
body .label, body .badge {
  border-radius: 980px !important;
  font-size: 11px !important;
  font-weight: 500 !important;
  padding: 3px 9px !important;
  text-shadow: none !important;
  border: 1px solid transparent !important;
}
body .label-success, body .badge-success { background: var(--scu-label-success-bg) !important; color: var(--scu-c2) !important; border-color: var(--scu-label-success-border) !important; }
body .label-danger, body .label-pink, body .badge-danger { background: var(--scu-danger-soft) !important; color: var(--scu-danger) !important; border-color: var(--scu-danger-line) !important; }
/* 站点在部分标签上写死行内 background-color: pink !important（如方案成绩页），
   行内 !important 无法被样式表覆盖 —— 深色模式下文字随全局变浅会浅字粉底不可读，
   这里强制改回深色文字。标签内部常嵌 <font style="color:black">，需更高特定性。 */
:root[data-scu-theme="dark"] .label[style*="background-color: pink"],
:root[data-scu-theme="dark"] .label[style*="background-color:pink"] { color: #4a2430 !important; }
:root[data-scu-theme="dark"] .label[style*="background-color: pink"] font,
:root[data-scu-theme="dark"] .label[style*="background-color:pink"] font { color: #4a2430 !important; }
body .label-warning, body .badge-warning, body .label-yellow { background: var(--scu-label-warning-bg) !important; color: var(--scu-c4) !important; border-color: var(--scu-label-warning-border) !important; }
body .label-info, body .badge-info { background: var(--scu-label-info-bg) !important; color: var(--scu-c3) !important; border-color: var(--scu-label-info-border) !important; }
body .label-default { background: var(--scu-label-default-bg) !important; color: var(--scu-ink-soft) !important; border-color: transparent !important; }
body .label-grey { background: var(--scu-label-default-bg) !important; color: var(--scu-ink-soft) !important; }
body .label-purple { background: var(--scu-label-purple-bg) !important; color: var(--scu-c5) !important; }
/* 站点在标签内嵌 <font style="color:black">，行内黑色在深色模式下不可读 —— 继承标签色 */
body .label font, body .badge font { color: inherit !important; }
/* 兜底：深色模式下任何内联黑色 <font> 一律提升为主题文字色 */
:root[data-scu-theme="dark"] font[style*="color:black"],
:root[data-scu-theme="dark"] font[style*="color: black"],
:root[data-scu-theme="dark"] font[color="black"] {
  color: var(--scu-ink) !important;
}

/* ============================================================
   选项卡 —— 文字 + 点缀色下划线
   ============================================================ */
.nav-tabs {
  border-bottom: 1px solid var(--scu-line) !important;
  background: transparent !important;
}
/* 容纳浮动选项卡，避免挤压后续 overflow 容器 */
.navbar-example::after { content: ""; display: table; clear: both; }
.scrollspy-example { clear: both !important; }
.nav-tabs > li > a {
  background: transparent !important;
  border: none !important;
  color: var(--scu-ink-soft) !important;
  font-size: 13px !important;
  padding: 9px 16px !important;
  margin: 0 !important;
  border-radius: 0 !important;
  text-decoration: none !important;
  transition: color .2s ease;
}
.nav-tabs > li > a:hover { color: var(--scu-ink) !important; background: transparent !important; }
.nav-tabs > li.active > a,
.nav-tabs > li.active > a:hover,
.nav-tabs > li.active > a:focus {
  background: transparent !important;
  border: none !important;
  border-bottom: 2px solid var(--scu-accent) !important;
  color: var(--scu-accent) !important;
  font-weight: 600 !important;
  box-shadow: none !important;
}
.tab-content { background: transparent !important; border: none !important; }

/* 学期选项卡容器（全部及格成绩等页面）—— #navbarExample 带行内 background:#ffffff */
#navbarExample, .navbar-static {
  background: var(--scu-surface) !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
}
.navbar-inner {
  background: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  min-height: 0 !important;
  padding: 0 !important;
}

/* ============================================================
   警告条 —— 淡色底圆角
   ============================================================ */
.alert {
  background: var(--scu-surface-dim) !important;
  border: none !important;
  border-radius: var(--scu-r-md) !important;
  color: var(--scu-ink) !important;
  text-shadow: none !important;
  box-shadow: none !important;
}
.alert-danger, .alert-error { background: var(--scu-danger-soft) !important; }
.alert-warning { background: var(--scu-label-warning-bg) !important; }
.alert-success { background: var(--scu-label-success-bg) !important; }
.alert-info { background: var(--scu-label-info-bg) !important; }
.alert .close { color: var(--scu-ink-faint) !important; text-shadow: none !important; opacity: .6; }

/* ============================================================
   弹窗 —— 模态框使用玻璃（同一时刻只有一个，面积有限）
   遮罩只做压暗，不对整页做模糊。
   ============================================================ */
.modal-backdrop, .modal-backdrop.in { background: #000 !important; opacity: .32 !important; }
.modal-content {
  border: 1px solid var(--scu-glass-border) !important;
  border-radius: var(--scu-r-lg) !important;
  box-shadow: 0 24px 64px rgba(var(--scu-shadow-rgb), 0.24) !important;
  background: var(--scu-glass-menu-bg) !important;
  -webkit-backdrop-filter: var(--scu-glass-blur);
  backdrop-filter: var(--scu-glass-blur);
}
.modal-header { border-bottom: 1px solid var(--scu-line) !important; background: transparent !important; }
.modal-header .modal-title, .modal-header h4 {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  font-weight: 600 !important;
}
.modal-footer { border-top: 1px solid var(--scu-line) !important; background: transparent !important; }
.modal-header .close { color: var(--scu-ink-faint) !important; text-shadow: none !important; opacity: .7; }

/* layer.js 弹层：常含 iframe 且可拖动，保持实色以免拖动时反复重绘模糊 */
.layui-layer {
  border: 1px solid var(--scu-line) !important;
  border-radius: var(--scu-r-md) !important;
  box-shadow: 0 16px 48px rgba(var(--scu-shadow-rgb), 0.2) !important;
  background: var(--scu-surface) !important;
}
.layui-layer-title {
  background: var(--scu-surface) !important;
  color: var(--scu-ink) !important;
  border-bottom: 1px solid var(--scu-line) !important;
  font-family: var(--scu-sans) !important;
  font-weight: 600 !important;
  border-radius: var(--scu-r-md) var(--scu-r-md) 0 0;
}
.layui-layer-setwin a { color: var(--scu-ink-faint) !important; }
.layui-layer-content { color: var(--scu-ink) !important; }
.layui-layer-btn a {
  background: var(--scu-accent-fill) !important;
  border: 1px solid var(--scu-accent-fill) !important;
  color: #fff !important;
  border-radius: var(--scu-r-sm) !important;
}
.layui-layer-btn .layui-layer-btn1 {
  background: var(--scu-surface-dim) !important;
  color: var(--scu-ink) !important;
  border-color: var(--scu-line-strong) !important;
}

/* ============================================================
   加载动画（替换 layer.js 的三点 GIF）：细环转圈
   ============================================================ */
.layui-layer-loading {
  border-radius: var(--scu-r-md) !important;
}
.layui-layer-loading .layui-layer-content {
  background: none !important;
  width: 64px !important;
  height: 64px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
}
.layui-layer-loading .layui-layer-content::before {
  content: "";
  width: 26px;
  height: 26px;
  box-sizing: border-box;
  border: 2.5px solid var(--scu-line-strong);
  border-top-color: var(--scu-accent);
  border-radius: 50%;
  animation: scu-apple-spin 0.8s linear infinite;
}
/* 视图内的行内加载占位（原 pageloading.gif） */
.view-pre-loading {
  background: none !important;
  width: 22px !important;
  height: 22px !important;
  border: 2.5px solid var(--scu-line-strong);
  border-top-color: var(--scu-accent);
  border-radius: 50%;
  box-sizing: border-box;
  animation: scu-apple-spin 0.8s linear infinite;
}
@keyframes scu-apple-spin {
  to { transform: rotate(360deg); }
}

/* ============================================================
   下拉菜单 —— 玻璃（小面积，仅展开时出现）
   ============================================================ */
.dropdown-menu {
  background: var(--scu-glass-menu-bg) !important;
  -webkit-backdrop-filter: var(--scu-glass-blur);
  backdrop-filter: var(--scu-glass-blur);
  border: 1px solid var(--scu-glass-border) !important;
  border-radius: var(--scu-r-md) !important;
  box-shadow: 0 8px 30px rgba(var(--scu-shadow-rgb), 0.14) !important;
  padding: 6px !important;
}
.dropdown-menu > li > a {
  color: var(--scu-ink-soft) !important;
  font-size: 12.5px !important;
  padding: 7px 12px !important;
  border-radius: var(--scu-r-sm);
  text-decoration: none !important;
}
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus {
  background: var(--scu-accent-soft) !important;
  color: var(--scu-accent) !important;
}
.dropdown-menu .divider { background: var(--scu-line) !important; margin: 5px 0 !important; }

/* ============================================================
   表单
   ============================================================ */
input[type="text"], input[type="password"], input[type="email"],
input[type="number"], input[type="search"], input[type="tel"], input[type="url"],
input:not([type]), select, textarea, .form-control {
  background: var(--scu-surface) !important;
  border: 1px solid var(--scu-line-strong) !important;
  border-radius: var(--scu-r-sm) !important;
  color: var(--scu-ink) !important;
  box-shadow: none !important;
  transition: border-color .2s ease, box-shadow .2s ease;
}
input:focus, select:focus, textarea:focus, .form-control:focus {
  border-color: var(--scu-accent) !important;
  box-shadow: 0 0 0 3px var(--scu-accent-soft) !important;
  outline: none !important;
}
::placeholder { color: var(--scu-ink-faint) !important; opacity: 1; }
/* ACE 自定义复选框 / 单选框 */
input.ace + .lbl::before {
  border-color: var(--scu-line-strong) !important;
  background: var(--scu-surface) !important;
  border-radius: 5px !important;
  box-shadow: none !important;
}
input[type="radio"].ace + .lbl::before { border-radius: 50% !important; }
input.ace:checked + .lbl::before {
  border-color: var(--scu-accent) !important;
  color: var(--scu-accent) !important;
}
.chosen-single, .chosen-container-single .chosen-single {
  background: var(--scu-surface) !important;
  background-image: none !important;
  border: 1px solid var(--scu-line-strong) !important;
  border-radius: var(--scu-r-sm) !important;
  box-shadow: none !important;
  color: var(--scu-ink) !important;
}
.chosen-drop, .chosen-container .chosen-drop {
  border: 1px solid var(--scu-glass-border) !important;
  border-radius: 0 0 var(--scu-r-sm) var(--scu-r-sm) !important;
  box-shadow: 0 8px 30px rgba(var(--scu-shadow-rgb), 0.14) !important;
  background: var(--scu-surface) !important;
}
.chosen-results li.highlighted {
  background: var(--scu-accent-soft) !important;
  color: var(--scu-accent) !important;
}

/* ============================================================
   分页 —— 圆形页码
   ============================================================ */
.pagination > li > a, .pagination > li > span {
  background: transparent !important;
  border: none !important;
  color: var(--scu-ink-soft) !important;
  border-radius: var(--scu-r-sm) !important;
  margin: 0 2px !important;
  text-decoration: none !important;
}
.pagination > li > a:hover { background: var(--scu-row-hover) !important; color: var(--scu-ink) !important; }
.pagination > li.active > a, .pagination > li.active > span {
  background: var(--scu-accent-fill) !important;
  color: #fff !important;
}
.pagination > li.disabled > a, .pagination > li.disabled > span { opacity: .4; }

/* ============================================================
   课表页 —— 网格 + 淡色课程块
   ============================================================ */
#courseTable {
  background: var(--scu-surface) !important;
}
/* 清除所有时段底色（薄荷绿/蜜桃粉/淡蓝） */
#courseTable td[style*="background"],
#courseTable th[style*="background"] {
  background-color: transparent !important;
}
#courseTable > thead > tr > th,
#courseTable > thead > tr > td,
#courseTable > tbody > tr > td,
#courseTable > tbody > tr > th {
  border: 1px solid var(--scu-line) !important;
}
#courseTable > thead > tr > th,
#courseTable > thead > tr > td {
  border-bottom: 1px solid var(--scu-line-strong) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  color: var(--scu-ink-soft) !important;
}
/* 大节 / 节次 标签列 */
#courseTable > tbody > tr > th[rowspan],
#courseTable > tbody > tr > th {
  background: var(--scu-rowhead-bg) !important;
  color: var(--scu-ink-faint) !important;
  font-weight: 500 !important;
}

/* 课程块 —— 白卡 + 左侧色条；支持 color-mix 的浏览器额外给淡色底 */
.class_div.div_style, .class_div[class*="div-kcb"] {
  --scu-block: var(--scu-c1);
  background: var(--scu-surface) !important;
  background-image: none !important;
  border: 1px solid var(--scu-line) !important;
  border-left: 3px solid var(--scu-block) !important;
  border-radius: var(--scu-r-sm) !important;
  box-shadow: 0 1px 3px rgba(var(--scu-shadow-rgb), 0.06) !important;
  padding: 6px 8px !important;
  overflow: hidden;
}
.class_div.div-kcb-1 { --scu-block: var(--scu-c1); }
.class_div.div-kcb-2 { --scu-block: var(--scu-c2); }
.class_div.div-kcb-3 { --scu-block: var(--scu-c3); }
.class_div.div-kcb-4 { --scu-block: var(--scu-c4); }
.class_div.div-kcb-5 { --scu-block: var(--scu-c5); }
.class_div.div-kcb-6 { --scu-block: var(--scu-c6); }
@supports (color: color-mix(in srgb, red 10%, white)) {
  .class_div.div_style, .class_div[class*="div-kcb"] {
    background: color-mix(in srgb, var(--scu-block) 10%, var(--scu-surface)) !important;
  }
}
.class_div p[class*="p-kcm"], .class_div .p-kcm-1, .class_div .p-kcm-2,
.class_div .p-kcm-3, .class_div .p-kcm-4, .class_div .p-kcm-5, .class_div .p-kcm-6 {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  font-size: 12.5px !important;
  font-weight: 600 !important;
  text-shadow: none !important;
  line-height: 1.35 !important;
}
.class_div .kcb_p_gray, .class_div p.kcb_p_gray {
  color: var(--scu-ink-faint) !important;
  font-size: 11px !important;
  text-shadow: none !important;
  line-height: 1.4 !important;
}
.class_div p[class*="p-jxl"] {
  color: var(--scu-ink-soft) !important;
  font-size: 11px !important;
  text-shadow: none !important;
}
.class_div .tools { background: var(--scu-tools-bg) !important; }
.class_div .tools a { color: var(--scu-ink-soft) !important; }
.class_div .tools a:hover { color: var(--scu-accent) !important; }
#kbPrint, .kb-toolbar { background: transparent !important; }

/* ============================================================
   FullCalendar 日程
   ============================================================ */
.fc-widget-header, .fc-widget-content { border-color: var(--scu-line) !important; }
.fc-day-header, .fc-widget-header { background: transparent !important; color: var(--scu-ink-soft) !important; font-size: 12px !important; }
.fc-today, .fc-day.fc-today { background: var(--scu-accent-soft) !important; }
.fc-axis { color: var(--scu-ink-faint) !important; font-size: 11px !important; }
.fc-toolbar h2, .fc-toolbar .fc-center h2 {
  font-family: var(--scu-sans) !important;
  color: var(--scu-ink) !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}
.fc-button {
  background: var(--scu-surface) !important;
  background-image: none !important;
  border: 1px solid var(--scu-line-strong) !important;
  color: var(--scu-ink) !important;
  border-radius: var(--scu-r-sm) !important;
  box-shadow: none !important;
  text-shadow: none !important;
}
.fc-button:hover { background: var(--scu-surface-dim) !important; }
.fc-state-active, .fc-button.fc-state-active {
  background: var(--scu-accent-fill) !important;
  color: #fff !important;
  border-color: var(--scu-accent-fill) !important;
}
.fc-event { background: var(--scu-accent-soft) !important; border-color: var(--scu-accent) !important; color: var(--scu-ink) !important; border-radius: 6px !important; }

/* ============================================================
   zTree 树控件 —— 节点 <a> 带行内 color:#333，zTreeStyle.css 默认白底
   ============================================================ */
.ztree { background: var(--scu-surface) !important; }
.ztree li a, .ztree li a:visited, .ztree li a span {
  color: var(--scu-ink) !important;
  text-shadow: none !important;
  text-decoration: none !important;
}
.ztree li a:hover { color: var(--scu-accent) !important; background: transparent !important; }
.ztree li a.curSelectedNode {
  color: var(--scu-accent) !important;
  background: var(--scu-accent-soft) !important;
  border: none !important;
  border-radius: 6px;
}

/* ============================================================
   其他 ACE 杂项
   ============================================================ */
.well {
  background: var(--scu-surface) !important;
  border: none !important;
  border-radius: var(--scu-r-md) !important;
  box-shadow: 0 0 0 1px var(--scu-line) !important;
}
.panel-default > .panel-heading {
  background: var(--scu-surface) !important;
  border-bottom: 1px solid var(--scu-line) !important;
  color: var(--scu-ink) !important;
}
.panel { border-color: var(--scu-line) !important; box-shadow: none !important; border-radius: var(--scu-r-md) !important; }
hr { border-top-color: var(--scu-line) !important; }
.progress { border-radius: 980px !important; box-shadow: none !important; background: var(--scu-line) !important; }
.progress-bar { background: var(--scu-accent-fill) !important; box-shadow: none !important; }
.progress-bar-success { background: var(--scu-c2) !important; }
.progress-bar-danger { background: var(--scu-danger) !important; }
.list-group-item { border-color: var(--scu-line) !important; background: var(--scu-surface) !important; color: var(--scu-ink) !important; }
.badge-transparent { background: transparent !important; }
.apply-item, .ywsl-item {
  background: var(--scu-surface) !important;
  border: none !important;
  box-shadow: 0 0 0 1px var(--scu-line) !important;
  border-radius: var(--scu-r-md) !important;
}

/* ============================================================
   无障碍：减少动效 / 减少透明度
   ============================================================ */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
  }
  .layui-layer-loading .layui-layer-content::before,
  .view-pre-loading { animation-duration: 2.4s; }
}
`;
