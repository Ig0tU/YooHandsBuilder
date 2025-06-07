import React from 'react'
import { ElementProperties } from '../properties/ElementProperties'
import { useBuilder } from '../../contexts/BuilderContext'

export function PropertiesPanel() {
  const { state } = useBuilder()
  
  const selectedElement = state.elements.find(el => el.id === state.selectedElement)
  
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
            <p className="text-gray-600">Click on an element in the canvas to edit its properties</p>
          </div>
        )}
      </div>
    </div>
  )
}