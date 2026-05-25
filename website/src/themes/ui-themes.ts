export const THEME_STORAGE_KEY = 'hiab-theme-preset'

export const UI_THEME_PRESETS = [
  { id: 'zinc', label: 'Zinc / lime', accent: '#84cc16', bg: '#09090b' },
  { id: 'emerald', label: 'Emerald mist', accent: '#34d399', bg: '#022c22' },
  { id: 'ocean', label: 'Ocean slate', accent: '#38bdf8', bg: '#0f172a' },
  { id: 'sunset', label: 'Sunset', accent: '#fb923c', bg: '#1c0a0f' },
  { id: 'crimson', label: 'Crimson noir', accent: '#f87171', bg: '#0a0505' },
] as const

export type ThemePresetId = (typeof UI_THEME_PRESETS)[number]['id']

const THEME_IDS = new Set<string>(UI_THEME_PRESETS.map((t) => t.id))

export const DEFAULT_THEME: ThemePresetId = 'zinc'

export function normalizeThemePreset(value: string | null | undefined): ThemePresetId {
  const v = String(value ?? '').trim()
  return THEME_IDS.has(v) ? (v as ThemePresetId) : DEFAULT_THEME
}

export function applyTheme(preset: ThemePresetId): ThemePresetId {
  const p = normalizeThemePreset(preset)
  document.documentElement.dataset.theme = p
  return p
}

export function readStoredTheme(): ThemePresetId {
  try {
    return normalizeThemePreset(localStorage.getItem(THEME_STORAGE_KEY))
  } catch {
    return DEFAULT_THEME
  }
}

export function storeTheme(preset: ThemePresetId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preset)
  } catch {
    /* private browsing */
  }
}

export function initThemeFromStorage(): ThemePresetId {
  const preset = readStoredTheme()
  applyTheme(preset)
  currentPreset = preset
  return preset
}

let currentPreset: ThemePresetId = DEFAULT_THEME
const listeners = new Set<() => void>()

export function getThemePreset(): ThemePresetId {
  return currentPreset
}

export function setThemePreset(preset: ThemePresetId): ThemePresetId {
  currentPreset = applyTheme(normalizeThemePreset(preset))
  storeTheme(currentPreset)
  listeners.forEach((fn) => fn())
  return currentPreset
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
