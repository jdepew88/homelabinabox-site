import { useSyncExternalStore } from 'react'
import {
  getThemePreset,
  initThemeFromStorage,
  subscribeTheme,
  type ThemePresetId,
} from '../themes/ui-themes'

let booted = false

function ensureBoot() {
  if (!booted && typeof document !== 'undefined') {
    initThemeFromStorage()
    booted = true
  }
}

export function useThemePreset(): ThemePresetId {
  ensureBoot()
  return useSyncExternalStore(subscribeTheme, getThemePreset, () => 'zinc')
}
