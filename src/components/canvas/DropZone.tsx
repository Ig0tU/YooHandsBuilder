import React, { ReactNode } from 'react'

interface DropZoneProps {
  children: ReactNode
}

export function DropZone({ children }: DropZoneProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    // Handle drop logic here
  }
  
  return (
    <div
      className="min-h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}