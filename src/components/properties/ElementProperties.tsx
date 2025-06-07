import React from 'react'
import { useBuilder } from '../../contexts/BuilderContext'

interface ElementPropertiesProps {
  element: {
    id: string
    type: string
    name: string
    properties: Record<string, any>
  }
}

export function ElementProperties({ element }: ElementPropertiesProps) {
  const { dispatch } = useBuilder()
  
  const handlePropertyChange = (property: string, value: any) => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        id: element.id,
        properties: { [property]: value }
      }
    })
  }
  
  const renderPropertyInput = (key: string, value: any) => {
    const commonProps = {
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => 
        handlePropertyChange(key, e.target.value)
    }
    
    switch (key) {
      case 'text':
        if (element.type === 'paragraph') {
          return (
            <textarea
              {...commonProps}
              className="yoo-input min-h-20"
              placeholder="Enter your text..."
            />
          )
        }
        return (
          <input
            {...commonProps}
            type="text"
            className="yoo-input"
            placeholder="Enter text..."
          />
        )
      
      case 'backgroundColor':
      case 'color':
        return (
          <div className="flex space-x-2">
            <input
              type="color"
              value={value || '#ffffff'}
              onChange={(e) => handlePropertyChange(key, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-md"
            />
            <input
              {...commonProps}
              type="text"
              className="flex-1 yoo-input"
              placeholder="#ffffff"
            />
          </div>
        )
      
      case 'fontSize':
      case 'padding':
      case 'borderRadius':
      case 'width':
      case 'height':
        return (
          <input
            {...commonProps}
            type="text"
            className="yoo-input"
            placeholder="e.g., 16px, 100%, auto"
          />
        )
      
      case 'level':
        return (
          <select {...commonProps} className="yoo-input">
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        )
      
      case 'textAlign':
        return (
          <select {...commonProps} className="yoo-input">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        )
      
      case 'fontWeight':
        return (
          <select {...commonProps} className="yoo-input">
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
            <option value="lighter">Lighter</option>
            <option value="bolder">Bolder</option>
          </select>
        )
      
      case 'src':
        return (
          <input
            {...commonProps}
            type="url"
            className="yoo-input"
            placeholder="https://example.com/image.jpg"
          />
        )
      
      case 'alt':
        return (
          <input
            {...commonProps}
            type="text"
            className="yoo-input"
            placeholder="Image description"
          />
        )
      
      case 'showTitle':
      case 'controls':
      case 'autoplay':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handlePropertyChange(key, e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">
              {key === 'showTitle' ? 'Show Title' : 
               key === 'controls' ? 'Show Controls' : 
               'Autoplay'}
            </span>
          </label>
        )
      
      default:
        return (
          <input
            {...commonProps}
            type="text"
            className="yoo-input"
          />
        )
    }
  }
  
  return (
    <div className="p-4 space-y-4">
      <div className="pb-4 border-b border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-1">
          {element.name} Properties
        </h4>
        <p className="text-xs text-gray-600 capitalize">
          {element.type} element
        </p>
      </div>
      
      {Object.entries(element.properties).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          {renderPropertyInput(key, value)}
        </div>
      ))}
      
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => dispatch({ type: 'DELETE_ELEMENT', payload: element.id })}
          className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
        >
          Delete Element
        </button>
      </div>
    </div>
  )
}