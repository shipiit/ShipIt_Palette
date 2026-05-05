// Contrast math: WCAG 2.1 ratios + APCA Lc approximation + helpers.
// Pure functions only. No imports beyond the local color helpers.

import { hexToRgb } from './color.js';

/* ---------- WCAG 2.1 ---------- */

function srgbChannelToLinear(c) {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const R = srgbChannelToLinear(r);
  const G = srgbChannelToLinear(g);
  const B = srgbChannelToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * WCAG 2.1 contrast ratio between two hex colors.
 * Returns a number in [1, 21].
 */
export function wcagRatio(hex1, hex2) {
  const L1 = relativeLuminance(hex1);
  const L2 = relativeLuminance(hex2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Given a WCAG ratio, return a badge descriptor.
 */
export function wcagBadge(ratio) {
  if (ratio >= 7) return { tag: 'AAA', color: '#16a34a' };       // green-600
  if (ratio >= 4.5) return { tag: 'AA', color: '#65a30d' };      // lime-600
  if (ratio >= 3) return { tag: 'AA Large', color: '#d97706' };  // amber-600
  return { tag: 'Fail', color: '#dc2626' };                      // red-600
}

/* ---------- APCA (approximation, gamma 2.4) ---------- */

function apcaY(hex) {
  const { r, g, b } = hexToRgb(hex);
  // Linearize sRGB with simple gamma 2.4 (APCA-style approximation).
  const R = Math.pow(r / 255, 2.4);
  const G = Math.pow(g / 255, 2.4);
  const B = Math.pow(b / 255, 2.4);
  // Y coefficients (APCA-aligned BT.709-ish weights).
  return 0.2126729 * R + 0.7151522 * G + 0.0721750 * B;
}

/**
 * APCA Lc value (signed), approximate.
 * Sign convention:
 *   - Positive Lc = dark text on light background.
 *   - Negative Lc = light text on dark background.
 * Magnitude roughly in [0, 108].
 */
export function apca(textHex, bgHex) {
  const Ytext = apcaY(textHex);
  const Ybg = apcaY(bgHex);
  let Lc;
  if (Ybg > Ytext) {
    // Dark text on light background -> positive Lc.
    Lc = (Math.pow(Ybg, 0.56) - Math.pow(Ytext, 0.57)) * 1.14;
  } else {
    // Light text on dark background -> negative Lc.
    Lc = (Math.pow(Ybg, 0.65) - Math.pow(Ytext, 0.62)) * 1.14;
    Lc = -Lc;
  }
  // Scale to ~percentage range used by APCA presentation.
  return Lc * 100;
}

/**
 * Given an absolute APCA Lc value, return a badge descriptor.
 */
export function apcaBadge(lc) {
  const v = Math.abs(lc);
  if (v >= 75) return { tag: 'Body Text', color: '#16a34a' };
  if (v >= 60) return { tag: 'Headlines', color: '#65a30d' };
  if (v >= 45) return { tag: 'Large UI', color: '#d97706' };
  if (v >= 30) return { tag: 'Spot Use', color: '#f59e0b' };
  return { tag: 'Fail', color: '#dc2626' };
}

/**
 * From an array of candidate text hexes, pick the one that has the highest
 * WCAG contrast ratio against the given background.
 */
export function bestTextOn(bgHex, candidates) {
  if (!Array.isArray(candidates) || candidates.length === 0) return '#000000';
  let best = candidates[0];
  let bestRatio = wcagRatio(bgHex, best);
  for (let i = 1; i < candidates.length; i++) {
    const r = wcagRatio(bgHex, candidates[i]);
    if (r > bestRatio) {
      bestRatio = r;
      best = candidates[i];
    }
  }
  return best;
}
