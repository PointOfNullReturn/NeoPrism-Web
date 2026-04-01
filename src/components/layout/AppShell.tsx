import { useEffect, useState, useCallback } from 'react'

import { PaletteView } from '../palette/PaletteView'
import { ActiveColorsView } from '../palette/ActiveColorsView'
import { PaletteEditor } from '../palette/PaletteEditor'
import { PaletteEditorDialog } from '../palette/PaletteEditorDialog'
import { StatusBar } from '../status/StatusBar'
import { EditorCanvas } from '../canvas/EditorCanvas'
import { Toolbar } from '../toolbar/Toolbar'
import { Menubar } from '../menubar/Menubar'
import { usePaletteCycler } from '../../hooks/usePaletteCycler'
import {
  registerCycleToggleShortcut,
  registerPaletteEditorShortcut,
} from '../../canvas/keyboardShortcuts'

import '../../styles/layout/AppShell.css'

export const AppShell = () => {
  const [paletteEditorOpen, setPaletteEditorOpen] = useState(false)

  const openPaletteEditor = useCallback(() => {
    setPaletteEditorOpen(true)
  }, [])

  usePaletteCycler()
  useEffect(() => {
    const dispose = registerCycleToggleShortcut()
    return dispose
  }, [])

  useEffect(() => {
    const dispose = registerPaletteEditorShortcut(openPaletteEditor)
    return dispose
  }, [openPaletteEditor])
  return (
    <div className="app-shell-grid">
      <header className="app-menubar" aria-label="Application menu">
        <Menubar onOpenPaletteEditor={openPaletteEditor} />
      </header>
      <aside className="app-toolbar" aria-label="Tools">
        <Toolbar />
      </aside>
      <main className="app-canvas-area" aria-label="Canvas area">
        <EditorCanvas />
      </main>
      <aside className="app-sidebar" aria-label="Palette sidebar">
        <PaletteView />
        <ActiveColorsView />
        <PaletteEditor />
      </aside>
      <StatusBar />
      <PaletteEditorDialog
        open={paletteEditorOpen}
        onClose={() => {
          setPaletteEditorOpen(false)
        }}
      />
    </div>
  )
}
