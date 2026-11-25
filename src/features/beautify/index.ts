import { MAGAZINE_THEME_CSS } from "./theme";
import { APPLE_THEME_CSS } from "./theme-apple";
import {
  APPLE_CANVAS,
  DARK_COLORS,
  LIGHT_COLORS,
  DEFAULT_ACCENT,
  isDarkModeEffective,
  mixWithWhite,
  normalizeDarkMode,
  normalizeTheme,
  resolveAccent,
  type DarkModeSetting,
  type ThemeName
} from "./palette";

/** 两套主题共用同一个 <style> id，切换主题时直接替换 */
const THEME_STYLE_ID = "scu-plus-theme";
/** 旧版本使用的 id —— 注入前顺手清理，避免重复叠加 */
const LEGACY_STYLE_ID = "scu-plus-magazine-theme";

const THEME_CSS: Record<ThemeName, string> = {
  magazine: MAGAZINE_THEME_CSS,
  apple: APPLE_THEME_CSS
};

/**
 * 将 #rrggbb 颜色转换为 rgba() 字符串
 */
function hexToRgba(hex: string, alpha: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return `rgba(158, 27, 50, ${alpha})`;
  const num = parseInt(m[1], 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 文档解析期间保持主题 <style> 位于 head 末尾。
 *
 * 主题在 document_start 注入时会排在站点自身样式表之前；
 * 部分同优先级的 !important 规则依赖“后定义者胜”，需要一直压着站点样式。
 */
let orderGuard: MutationObserver | null = null;

function keepStyleLast(style: HTMLStyleElement): void {
  orderGuard?.disconnect();
  orderGuard = null;
  if (document.readyState !== "loading") return;

  // 仅观察 <head> 的子节点变化（link、style、script 等被添加/移除），
  // 不再监视整棵 document 树，避免大量 DOM 变更触发无效样式重算。
  const guard = new MutationObserver(() => {
    const host = document.head;
    if (!host) return;
    if (style.parentElement !== host || host.lastElementChild !== style) {
      host.appendChild(style);
    }
  });

  // document_start 极早期 <head> 可能尚未创建，先观察 <html> 直子节点等它出现
  if (document.head) {
    guard.observe(document.head, { childList: true });
  } else {
    const headWaiter = new MutationObserver(() => {
      if (document.head) {
        headWaiter.disconnect();
        guard.observe(document.head, { childList: true });
      }
    });
    headWaiter.observe(document.documentElement, { childList: true });
  }

  orderGuard = guard;
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      guard.disconnect();
      if (orderGuard === guard) orderGuard = null;
    },
    { once: true }
  );
}

/** 当前注入参数 —— 系统主题变化时按相同参数重算深浅色 */
let currentAccent: string = DEFAULT_ACCENT;
let currentMode: DarkModeSetting = "auto";
let currentTheme: ThemeName = "magazine";

let mediaQuery: MediaQueryList | null = null;
let mediaListener: ((e: MediaQueryListEvent) => void) | null = null;

/** 各主题的画布背景、深色点缀色调亮比例（文字 / 按钮填充）与柔和底色透明度 */
function themeTuning(theme: ThemeName, dark: boolean) {
  if (theme === "apple") {
    return {
      canvas: dark ? APPLE_CANVAS.dark : APPLE_CANVAS.light,
      textMix: 0.22,
      fillMix: 0.06,
      softAlpha: dark ? 0.18 : 0.08,
      lineAlpha: dark ? 0.4 : 0.28
    };
  }
  return {
    canvas: dark ? DARK_COLORS.paper : LIGHT_COLORS.paper,
    textMix: 0.38,
    fillMix: 0.15,
    softAlpha: dark ? 0.16 : 0.06,
    lineAlpha: dark ? 0.4 : 0.22
  };
}

/**
 * 按当前模式计算深浅色并写入 <html>：
 * data-scu-theme 属性切换 CSS 变量覆盖块；深色模式下点缀色混合白色调亮。
 */
function applyThemeMode(): void {
  const dark = isDarkModeEffective(currentMode);
  const root = document.documentElement;
  if (dark) {
    root.setAttribute("data-scu-theme", "dark");
  } else {
    root.removeAttribute("data-scu-theme");
  }
  root.setAttribute("data-scu-style", currentTheme);

  const tune = themeTuning(currentTheme, dark);

  // 画布背景兜底：页面内容不足一屏时，可视区剩余部分的背景取自 <html>。
  // 行内 !important + 具体色值（而非 var()），即使站点在 DOMContentLoaded
  // 之后注入的样式压过主题表、或主题表被移除导致变量未解析，也不会露出白底。
  root.style.setProperty("background-color", tune.canvas, "important");

  const accentText = dark ? mixWithWhite(currentAccent, tune.textMix) : currentAccent;
  const accentFill = dark ? mixWithWhite(currentAccent, tune.fillMix) : currentAccent;
  root.style.setProperty("--scu-accent", accentText);
  root.style.setProperty("--scu-accent-soft", hexToRgba(accentText, tune.softAlpha));
  root.style.setProperty("--scu-accent-line", hexToRgba(accentText, tune.lineAlpha));
  root.style.setProperty("--scu-accent-fill", accentFill);
  root.style.setProperty("--scu-c1", accentText);
}

/** "auto" 模式下监听系统主题变化，实时切换深浅色 */
function bindMediaListener(): void {
  unbindMediaListener();
  if (currentMode !== "auto") return;
  try {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaListener = () => applyThemeMode();
    mediaQuery.addEventListener("change", mediaListener);
  } catch {
    // 极少数环境不支持 matchMedia 监听，保持当前解析结果即可
  }
}

function unbindMediaListener(): void {
  if (mediaQuery && mediaListener) {
    try {
      mediaQuery.removeEventListener("change", mediaListener);
    } catch {
      // 忽略解绑异常
    }
  }
  mediaQuery = null;
  mediaListener = null;
}

/**
 * 注入主题（杂志风 / Apple风）。
 *
 * - 全量 CSS 覆盖（!important），追加为文档中最后一个样式，
 *   后于站点自身样式表生效。
 * - 点缀色取自用户设置的 beautifyColor（Apple风下默认值换成系统蓝，见 resolveAccent），
 *   写入 :root 的 --scu-accent 变量，并同步生成柔和底色 --scu-accent-soft、
 *   边框 --scu-accent-line、填充按钮底色 --scu-accent-fill 与课表色块 --scu-c1。
 * - 深色模式（darkMode = "dark"，或 "auto" 且系统为深色）：
 *   在 <html> 上设置 data-scu-theme="dark" 切换 CSS 变量覆盖块，
 *   并将点缀色调亮以保证暗底可读性；"auto" 时监听系统主题实时切换。
 * - 同时在 <html> 行内写入具体背景色（!important），保证内容不足
 *   一屏时画布底色仍为主题底色，不随站点样式或变量缺失露出白底。
 * - 幂等：重复调用不会叠加多个 <style>。
 * - 可在 document_start 调用（<head> 尚未创建时挂到 documentElement 下，
 *   并由 orderGuard 保证解析过程中始终位于末尾）。
 */
export function injectBeautify(accentColor?: string, darkMode?: string, theme?: string): void {
  const host = document.head || document.documentElement;
  if (!host) return; // document_start 极早期根元素可能尚未创建，调用方负责重试

  currentTheme = normalizeTheme(theme);
  currentAccent = resolveAccent(currentTheme, accentColor);
  currentMode = normalizeDarkMode(darkMode);

  document.getElementById(THEME_STYLE_ID)?.remove();
  document.getElementById(LEGACY_STYLE_ID)?.remove();

  const style = document.createElement("style");
  style.id = THEME_STYLE_ID;
  style.textContent = THEME_CSS[currentTheme];
  host.appendChild(style);
  keepStyleLast(style);

  applyThemeMode();
  bindMediaListener();
}

/**
 * 移除主题（幂等）。
 */
export function removeBeautify(): void {
  orderGuard?.disconnect();
  orderGuard = null;
  unbindMediaListener();
  document.getElementById(THEME_STYLE_ID)?.remove();
  document.getElementById(LEGACY_STYLE_ID)?.remove();

  const root = document.documentElement;
  root.removeAttribute("data-scu-theme");
  root.removeAttribute("data-scu-style");
  root.style.removeProperty("background-color");
  root.style.removeProperty("--scu-accent");
  root.style.removeProperty("--scu-accent-soft");
  root.style.removeProperty("--scu-accent-line");
  root.style.removeProperty("--scu-accent-fill");
  root.style.removeProperty("--scu-c1");
}

/**
 * 根据开关应用或移除主题（幂等）。
 */
export function applyBeautify(
  enabled: boolean,
  accentColor?: string,
  darkMode?: string,
  theme?: string
): void {
  if (enabled) {
    injectBeautify(accentColor, darkMode, theme);
  } else {
    removeBeautify();
  }
}
