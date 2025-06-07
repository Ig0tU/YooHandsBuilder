import React from 'react'
import { useBuilder } from '../../contexts/BuilderContext'

interface CanvasElementProps {
  element: {
    id: string
    type: string
    name: string
    properties: Record<string, any>
  }
  preview?: boolean
}

export function CanvasElement({ element, preview = false }: CanvasElementProps) {
  const { state, dispatch } = useBuilder()
  
  const handleSelect = () => {
    if (!preview) {
      dispatch({ type: 'SELECT_ELEMENT', payload: element.id })
    }
  }
  
  const isSelected = state.selectedElement === element.id
  
  const renderElement = () => {
    switch (element.type) {
      case 'heading':
        const HeadingTag = element.properties.level || 'h2'
        return (
          <HeadingTag
            style={{
              fontSize: element.properties.fontSize,
              fontWeight: element.properties.fontWeight,
              color: element.properties.color,
              textAlign: element.properties.textAlign,
              margin: 0
            }}
          >
            {element.properties.text}
          </HeadingTag>
        )
      
      case 'paragraph':
        return (
          <p
            style={{
              fontSize: element.properties.fontSize,
              lineHeight: element.properties.lineHeight,
              color: element.properties.color,
              textAlign: element.properties.textAlign,
              margin: 0
            }}
          >
            {element.properties.text}
          </p>
        )
      
      case 'image':
        return (
          <img
            src={element.properties.src}
            alt={element.properties.alt}
            style={{
              width: element.properties.width,
              height: element.properties.height,
              borderRadius: element.properties.borderRadius,
              objectFit: 'cover'
            }}
          />
        )
      
      case 'button':
        return (
          <button
            style={{
              backgroundColor: element.properties.backgroundColor,
              color: element.properties.color,
              padding: element.properties.padding,
              borderRadius: element.properties.borderRadius,
              fontSize: element.properties.fontSize,
              fontWeight: element.properties.fontWeight,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {element.properties.text}
          </button>
        )
      
      case 'container':
        return (
          <div
            style={{
              width: element.properties.width,
              padding: element.properties.padding,
              backgroundColor: element.properties.backgroundColor,
              borderRadius: element.properties.borderRadius,
              minHeight: '100px',
              border: preview ? 'none' : '2px dashed #e5e7eb'
            }}
          >
            {preview ? null : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-2xl mb-2">📦</div>
                <p className="text-sm">Container Element</p>
                <p className="text-xs">Drop elements here</p>
              </div>
            )}
          </div>
        )
      
      case 'section':
        return (
          <section
            style={{
              padding: element.properties.padding,
              backgroundColor: element.properties.backgroundColor,
              minHeight: element.properties.minHeight,
              border: preview ? 'none' : '2px dashed #e5e7eb'
            }}
          >
            {preview ? null : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-2xl mb-2">📄</div>
                <p className="text-sm">Section Element</p>
                <p className="text-xs">Add content here</p>
              </div>
            )}
          </section>
        )
      
      case 'module':
        return (
          <div className="border-2 border-dashed border-blue-300 bg-blue-50 p-4 rounded-lg">
            <div className="text-center text-blue-600">
              <div className="text-2xl mb-2">🧩</div>
              <p className="text-sm font-medium">Joomla Module</p>
              <p className="text-xs">Position: {element.properties.position}</p>
              {element.properties.showTitle && (
                <p className="text-xs mt-1">{element.properties.title}</p>
              )}
            </div>
          </div>
        )
      
      case 'article':
        return (
          <div className="border-2 border-dashed border-green-300 bg-green-50 p-4 rounded-lg">
            <div className="text-center text-green-600">
              <div className="text-2xl mb-2">📰</div>
              <p className="text-sm font-medium">Joomla Article</p>
              <p className="text-xs">Article ID: {element.properties.articleId || 'Not set'}</p>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="border-2 border-dashed border-gray-300 bg-gray-50 p-4 rounded-lg">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">❓</div>
              <p className="text-sm">Unknown Element</p>
              <p className="text-xs">{element.type}</p>
            </div>
          </div>
        )
    }
  }
  
  return (
    <div
      className={`yoo-element ${isSelected ? 'selected' : ''} ${preview ? '' : 'cursor-pointer'}`}
      onClick={handleSelect}
    >
      {renderElement()}
      {isSelected && !preview && (
        <div className="absolute -top-6 left-0 bg-yoo-primary text-white text-xs px-2 py-1 rounded">
          {element.name}
        </div>
      )}
    </div>
  )
}