import React from 'react'
import { CanvasElement } from '../canvas/CanvasElement'
import { DropZone } from '../canvas/DropZone'
import { useBuilder } from '../../contexts/BuilderContext'

export function Canvas() {
  const { state } = useBuilder()
  
  const getCanvasStyles = () => {
    const baseStyles = {
      maxWidth: '100%',
      margin: '0 auto',
      backgroundColor: state.project.settings.backgroundColor,
      minHeight: '100%',
      transition: 'all 0.3s ease'
    }
    
    switch (state.deviceView) {
      case 'mobile':
        return { ...baseStyles, width: '375px' }
      case 'tablet':
        return { ...baseStyles, width: '768px' }
      case 'desktop':
      default:
        return { ...baseStyles, width: state.project.settings.canvasWidth === 'auto' ? '100%' : state.project.settings.canvasWidth }
    }
  }
  
  const getCanvasClasses = () => {
    let classes = 'yoo-canvas relative'
    
    if (state.ui.showGrid) {
      classes += ' bg-grid'
    }
    
    return classes
  }
  
  if (state.previewMode) {
    return (
      <div className={getCanvasClasses()}>
        <div style={getCanvasStyles()} className="shadow-sm">
          <div className="p-8">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Preview Mode</h2>
              <p className="text-gray-600">Viewing in {state.deviceView} mode</p>
            </div>
            <div className="space-y-4">
              {state.elements
                .filter(element => element.visible !== false)
                .map((element) => (
                  <CanvasElement key={element.id} element={element} preview />
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={getCanvasClasses()}>
      <div style={getCanvasStyles()} className="shadow-sm">
        <div className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Page Canvas</h2>
                <p className="text-sm text-gray-600">
                  {state.deviceView.charAt(0).toUpperCase() + state.deviceView.slice(1)} view • 
                  {state.elements.length} element{state.elements.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                {state.ui.showGrid && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">Grid On</span>
                )}
                {state.ui.snapToGrid && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Snap to Grid</span>
                )}
              </div>
            </div>
          </div>
          
          <DropZone>
            <div className="space-y-4 min-h-96">
              {state.elements.length === 0 ? (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                    <p className="text-gray-600 mb-4">Drag elements from the sidebar or click to add</p>
                    <div className="text-sm text-gray-500">
                      <p>💡 Try asking the AI Assistant to add elements for you!</p>
                    </div>
                  </div>
                </div>
              ) : (
                state.elements
                  .filter(element => element.visible !== false)
                  .map((element) => (
                    <CanvasElement key={element.id} element={element} />
                  ))
              )}
            </div>
          </DropZone>
        </div>
      </div>
    </div>
  )
}