import { useEffect, useRef } from 'react'

import { PaletteView } from './PaletteView'
import { executeCommand } from '../../state/commands/Command'
import {
  PaletteChangeCommand,
  type PaletteChangeOperation,
} from '../../state/commands/PaletteChangeCommand'
import { usePalette, useEditorStore } from '../../state/store'
import type { PaletteColor } from '../../state/documentTypes'
import '../../styles/palette/PaletteEditorDialog.css'

interface PaletteEditorDialogProps {
  open: boolean
  onClose: () => void
}

const toCssColor = (color: PaletteColor): string =>
  `rgba(${String(color.r)}, ${String(color.g)}, ${String(color.b)}, ${String(color.a / 255)})`

const clampChannel = (value: number): number => Math.max(0, Math.min(255, value))

const channelLabels: Array<keyof PaletteColor> = ['r', 'g', 'b', 'a']

const MAX_COLORS = 256
const MIN_COLORS = 2

export const PaletteEditorDialog = ({ open, onClose }: PaletteEditorDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const palette = usePalette()
  const setForegroundIndex = useEditorStore((state) => state.setForegroundIndex)

  const selectedIndex = Math.min(palette.foregroundIndex, palette.colors.length - 1)
  const selectedColor = palette.colors[selectedIndex] ?? palette.colors[0]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (typeof dialog.showModal === 'function') {
        dialog.showModal()
      } else {
        dialog.setAttribute('open', '')
      }
    } else {
      if (typeof dialog.close === 'function') {
        dialog.close()
      } else {
        dialog.removeAttribute('open')
      }
    }
  }, [open])

  const handleClose = () => {
    onClose()
  }

  const updateColorChannel = (channel: keyof PaletteColor, value: number) => {
    const color: PaletteColor = { ...selectedColor, [channel]: clampChannel(value) }
    executeCommand(
      new PaletteChangeCommand([{ type: 'update', index: selectedIndex, color }], 'Update color'),
    )
  }

  const addColor = () => {
    if (palette.colors.length >= MAX_COLORS) return
    const insertIndex = selectedIndex + 1
    const operations: PaletteChangeOperation[] = [
      { type: 'insert', index: insertIndex, color: { ...selectedColor } },
    ]
    executeCommand(new PaletteChangeCommand(operations, 'Insert color'))
    setForegroundIndex(Math.min(insertIndex, palette.colors.length))
  }

  const removeColor = () => {
    if (palette.colors.length <= MIN_COLORS) return
    executeCommand(
      new PaletteChangeCommand([{ type: 'remove', index: selectedIndex }], 'Remove color'),
    )
    setForegroundIndex(Math.max(0, Math.min(selectedIndex, palette.colors.length - 2)))
  }

  return (
    <dialog ref={dialogRef} onClose={handleClose} className="palette-editor-dialog">
      <h2>Palette Editor</h2>
      <div className="palette-editor-dialog__content">
        <div className="palette-editor-dialog__left">
          <div
            className="palette-editor-dialog__color-preview"
            style={{ backgroundColor: toCssColor(selectedColor) }}
            aria-label={`Selected color: r ${String(selectedColor.r)}, g ${String(selectedColor.g)}, b ${String(selectedColor.b)}`}
          />
          <PaletteView disableBackgroundSelection />
        </div>
        <div className="palette-editor-dialog__right">
          <span className="palette-editor-dialog__color-index">Color #{selectedIndex}</span>
          <div className="palette-editor-dialog__channels">
            {channelLabels.map((channel) => (
              <label key={channel} className="palette-editor-dialog__channel">
                <span>{channel.toUpperCase()}</span>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={selectedColor[channel]}
                  onChange={(event) => {
                    updateColorChannel(channel, Number(event.target.value))
                  }}
                />
                <input
                  type="number"
                  min={0}
                  max={255}
                  value={selectedColor[channel]}
                  onChange={(event) => {
                    updateColorChannel(channel, Number(event.target.value))
                  }}
                />
              </label>
            ))}
          </div>
          <div className="palette-editor-dialog__palette-actions">
            <button
              type="button"
              onClick={addColor}
              disabled={palette.colors.length >= MAX_COLORS}
            >
              Add
            </button>
            <button
              type="button"
              onClick={removeColor}
              disabled={palette.colors.length <= MIN_COLORS}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="palette-editor-dialog__actions">
        <button type="button" onClick={handleClose}>
          Ok
        </button>
      </div>
    </dialog>
  )
}
