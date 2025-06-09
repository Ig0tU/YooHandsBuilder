import React from 'react'
import { ElementProperties } from '../properties/ElementProperties'
import { useBuilder } from '../../contexts/BuilderContext'

export function PropertiesPanel() {
  const { state } = useBuilder()
  
  const selectedElement = state.elements.find(el => el.id === state.selectedElement)
  
  if (state.ui.propertiesCollapsed) {
    return (
      <div className="w-12 bg-white border-l border-gray-200 flex flex-col items-center py-4">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_PROPERTIES' })}
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          title="Expand Properties Panel"
        >
          <span className="text-sm">🎯</span>
        </button>
      </div>
    )
  }
  
  return (
    <div className="yoo-properties">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
        <p className="text-sm text-gray-600">
          {selectedElement ? `Editing ${selectedElement.name}` : 'Select an element to edit'}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {selectedElement ? (
          <ElementProperties element={selectedElement} />
        ) : (
          <div className="p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Element Selected</h4>
            <p className="text-gray-600 mb-4">Click on an element in the canvas to edit its properties</p>
            <div className="text-sm text-gray-500 space-y-2">
              <p>💡 <strong>Quick Tips:</strong></p>
              <p>• Double-click elements to edit text</p>
              <p>• Use the AI Assistant for suggestions</p>
              <p>• Check the Structure panel for overview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}