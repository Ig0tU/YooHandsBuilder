import React from 'react'
import { CanvasElement } from '../canvas/CanvasElement'
import { DropZone } from '../canvas/DropZone'
import { useBuilder } from '../../contexts/BuilderContext'

export function Canvas() {
  const { state } = useBuilder()
  
  if (state.previewMode) {
    return (
      <div className="yoo-canvas">
        <div className="max-w-full mx-auto bg-white min-h-full">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview Mode</h2>
            <div className="space-y-4">
              {state.elements.map((element) => (
                <CanvasElement key={element.id} element={element} preview />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="yoo-canvas">
      <div className="max-w-full mx-auto bg-white min-h-full shadow-sm">
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Page Canvas</h2>
            <p className="text-sm text-gray-600">Drag elements from the sidebar to build your page</p>
          </div>
          
          <DropZone>
            <div className="space-y-4 min-h-96">
              {state.elements.length === 0 ? (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎨</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building</h3>
                    <p className="text-gray-600">Drag elements from the sidebar to get started</p>
                  </div>
                </div>
              ) : (
                state.elements.map((element) => (
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