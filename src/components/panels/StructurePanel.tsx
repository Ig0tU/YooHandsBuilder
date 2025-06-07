import React from 'react'
import { ChevronRight, ChevronDown, Eye, EyeOff, Trash2 } from 'lucide-react'
import { useBuilder } from '../../contexts/BuilderContext'

export function StructurePanel() {
  const { state, dispatch } = useBuilder()
  
  const handleSelectElement = (elementId: string) => {
    dispatch({ type: 'SELECT_ELEMENT', payload: elementId })
  }
  
  const handleDeleteElement = (elementId: string) => {
    dispatch({ type: 'DELETE_ELEMENT', payload: elementId })
  }
  
  return (
    <div className="p-4">
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Page Structure</h4>
        <p className="text-xs text-gray-600">Hierarchical view of your page elements</p>
      </div>
      
      {state.elements.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-3">🏗️</div>
          <p className="text-sm text-gray-600">No elements added yet</p>
        </div>
      ) : (
        <div className="space-y-1">
          {state.elements.map((element) => (
            <div
              key={element.id}
              className={`group flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors ${
                state.selectedElement === element.id ? 'bg-blue-50 border border-blue-200' : ''
              }`}
              onClick={() => handleSelectElement(element.id)}
            >
              <div className="flex items-center space-x-2 flex-1">
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <span className="text-lg">{getElementIcon(element.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {element.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{element.type}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Toggle visibility"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Eye className="w-3 h-3 text-gray-500" />
                </button>
                <button
                  className="p-1 hover:bg-red-100 rounded"
                  title="Delete element"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteElement(element.id)
                  }}
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getElementIcon(type: string): string {
  const icons: Record<string, string> = {
    container: '📦',
    section: '📄',
    grid: '⚏',
    flexbox: '📐',
    heading: '📝',
    paragraph: '📄',
    image: '🖼️',
    video: '🎥',
    button: '🔘',
    link: '🔗',
    form: '📋',
    input: '📝',
    textarea: '📄',
    select: '📋',
    checkbox: '☑️',
    radio: '🔘',
    module: '🧩',
    article: '📰',
    menu: '🍔',
    slider: '🎠',
    gallery: '🖼️',
    accordion: '📁'
  }
  return icons[type] || '📦'
}