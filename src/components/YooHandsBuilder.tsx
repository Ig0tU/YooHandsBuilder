import React from 'react'
import { Header } from './layout/Header'
import { Sidebar } from './layout/Sidebar'
import { Canvas } from './layout/Canvas'
import { PropertiesPanel } from './layout/PropertiesPanel'
import { AIAssistant } from './ai/AIAssistant'
import { useBuilder } from '../contexts/BuilderContext'

export function YooHandsBuilder() {
  const { state } = useBuilder()
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
      
      {state.aiAssistant.isOpen && <AIAssistant />}
    </div>
  )
}