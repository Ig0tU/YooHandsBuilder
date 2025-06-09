import React, { useEffect } from 'react'
import { Header } from './layout/Header'
import { Sidebar } from './layout/Sidebar'
import { Canvas } from './layout/Canvas'
import { PropertiesPanel } from './layout/PropertiesPanel'
import { AIAssistant } from './ai/AIAssistant'
import { useBuilder } from '../contexts/BuilderContext'

export function YooHandsBuilder() {
  const { state, dispatch } = useBuilder()
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default browser shortcuts when builder is focused
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              dispatch({ type: 'REDO' })
            } else {
              dispatch({ type: 'UNDO' })
            }
            break
          case 'y':
            e.preventDefault()
            dispatch({ type: 'REDO' })
            break
          case 'p':
            e.preventDefault()
            dispatch({ type: 'TOGGLE_PREVIEW' })
            break
          case 's':
            e.preventDefault()
            // Save functionality would go here
            console.log('Save triggered')
            break
          case 'g':
            e.preventDefault()
            dispatch({ type: 'TOGGLE_GRID' })
            break
          case 'b':
            e.preventDefault()
            dispatch({ type: 'TOGGLE_AI_ASSISTANT' })
            break
        }
      }
      
      // Delete selected element
      if (e.key === 'Delete' && state.selectedElement) {
        dispatch({ type: 'DELETE_ELEMENT', payload: state.selectedElement })
      }
      
      // Escape to deselect
      if (e.key === 'Escape') {
        dispatch({ type: 'SELECT_ELEMENT', payload: null })
        if (state.aiAssistant.isOpen) {
          dispatch({ type: 'TOGGLE_AI_ASSISTANT' })
        }
      }
      
      // Number keys for device switching
      if (e.key >= '1' && e.key <= '3' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        const devices = ['desktop', 'tablet', 'mobile'] as const
        dispatch({ type: 'SET_DEVICE_VIEW', payload: devices[parseInt(e.key) - 1] })
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.selectedElement, state.aiAssistant.isOpen, dispatch])
  
  // Auto-save functionality
  useEffect(() => {
    const autoSave = setInterval(() => {
      // Auto-save logic would go here
      console.log('Auto-saving project...', state.project.name)
    }, 30000) // Auto-save every 30 seconds
    
    return () => clearInterval(autoSave)
  }, [state.project])
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
      
      {state.aiAssistant.isOpen && <AIAssistant />}
      
      {/* Status bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 text-xs text-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span>Elements: {state.elements.length}</span>
          <span>Selected: {state.selectedElement ? 'Yes' : 'None'}</span>
          <span>Device: {state.deviceView}</span>
          {state.ui.showGrid && <span className="text-blue-600">Grid: On</span>}
        </div>
        <div className="flex items-center space-x-4">
          <span>Project: {state.project.name}</span>
          <span>Type: {state.project.type}</span>
          <span className="text-green-600">● Ready</span>
        </div>
      </div>
    </div>
  )
}