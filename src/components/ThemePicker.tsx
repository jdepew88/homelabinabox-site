import { UI_THEME_PRESETS, setThemePreset, type ThemePresetId } from '../themes/ui-themes'
import { useThemePreset } from '../hooks/useThemePreset'
import './ThemePicker.css'

type Props = {
  /** Compact swatch row for mobile menu */
  variant?: 'select' | 'swatches'
}

export function ThemePicker({ variant = 'select' }: Props) {
  const preset = useThemePreset()

  function choose(id: ThemePresetId) {
    setThemePreset(id)
  }

  if (variant === 'swatches') {
    return (
      <div className="theme-picker theme-picker--swatches" role="group" aria-label="Color theme">
        <span className="theme-picker__label">Color theme</span>
        <div className="theme-picker__swatches">
          {UI_THEME_PRESETS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`theme-swatch${preset === t.id ? ' theme-swatch--active' : ''}`}
              title={t.label}
              aria-label={t.label}
              aria-pressed={preset === t.id}
              onClick={() => choose(t.id)}
            >
              <span className="theme-swatch__bg" style={{ background: t.bg }} />
              <span className="theme-swatch__accent" style={{ background: t.accent }} />
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <label className="theme-picker theme-picker--select">
      <span className="theme-picker__label">Theme</span>
      <select
        value={preset}
        aria-label="Color theme"
        onChange={(e) => choose(e.target.value as ThemePresetId)}
      >
        {UI_THEME_PRESETS.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </label>
  )
}
