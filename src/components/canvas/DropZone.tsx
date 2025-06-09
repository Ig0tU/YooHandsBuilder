import React, { ReactNode, useState } from 'react'
import { useBuilder } from '../../contexts/BuilderContext'

interface DropZoneProps {
  children: ReactNode
}

export function DropZone({ children }: DropZoneProps) {
  const { state, dispatch } = useBuilder()
  const [isDragOver, setIsDragOver] = useState(false)
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setIsDragOver(true)
    dispatch({ type: 'SET_DROP_ZONE_ACTIVE', payload: true })
  }
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    dispatch({ type: 'SET_DROP_ZONE_ACTIVE', payload: false })
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    dispatch({ type: 'SET_DROP_ZONE_ACTIVE', payload: false })
    
    try {
      const elementData = e.dataTransfer.getData('application/json')
      if (elementData) {
        const element = JSON.parse(elementData)
        dispatch({ type: 'ADD_ELEMENT', payload: element })
        dispatch({ type: 'SELECT_ELEMENT', payload: element.id })
      }
    } catch (error) {
      console.error('Error parsing dropped element:', error)
    }
    
    dispatch({ type: 'END_DRAG' })
  }
  
  return (
    <div
      className={`min-h-full transition-all duration-200 ${
        isDragOver 
          ? 'bg-blue-50 border-2 border-dashed border-blue-300' 
          : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {isDragOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 z-10">
          <div className="text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-blue-700 mb-2">Drop Element Here</h3>
            <p className="text-blue-600">Release to add the element to your page</p>
          </div>
        </div>
      )}
    </div>
  )
}