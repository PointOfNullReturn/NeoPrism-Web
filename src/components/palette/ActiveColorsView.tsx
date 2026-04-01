import { memo } from 'react'

import { usePalette } from '../../state/store'
import type { PaletteColor } from '../../state/documentTypes'

import '../../styles/palette/ActiveColorsView.css'

const toCssColor = (color: PaletteColor): string =>
  `rgba(${String(color.r)}, ${String(color.g)}, ${String(color.b)}, ${String(color.a / 255)})`

export const ActiveColorsView = memo(() => {
  const palette = usePalette()
  const foregroundColor = palette.colors[palette.foregroundIndex]
  const backgroundColor = palette.colors[palette.backgroundIndex]

  return (
    <div
      className="active-colors-view"
      aria-label="Active colors"
      style={{ backgroundColor: toCssColor(backgroundColor) }}
    >
      <div
        className="active-colors-view__circle"
        style={{ backgroundColor: toCssColor(foregroundColor) }}
        aria-label={`Foreground: r ${String(foregroundColor.r)}, g ${String(foregroundColor.g)}, b ${String(foregroundColor.b)}`}
      />
    </div>
  )
})
