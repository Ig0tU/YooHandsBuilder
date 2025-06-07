import React from 'react'
import { 
  Play, 
  Eye, 
  Save, 
  Settings, 
  Bot, 
  Download,
  Upload,
  Undo,
  Redo,
  Grid,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react'
import { useBuilder } from '../../contexts/BuilderContext'

export function Header() {
  const { state, dispatch } = useBuilder()
  
  const handlePreviewToggle = () => {
    dispatch({ type: 'TOGGLE_PREVIEW' })
  }
  
  const handleAIToggle = () => {
    dispatch({ type: 'TOGGLE_AI_ASSISTANT' })
  }
  
  return (
    <header className="yoo-toolbar bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yoo-primary to-yoo-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Y</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">YooHands Builder</h1>
            <p className="text-xs text-gray-500">{state.project.name}</p>
          </div>
        </div>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Undo">
            <Undo className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Redo">
            <Redo className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button className="p-2 hover:bg-white rounded-md transition-colors" title="Desktop View">
            <Monitor className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" title="Tablet View">
            <Tablet className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-white rounded-md transition-colors" title="Mobile View">
            <Smartphone className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleAIToggle}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
            state.aiAssistant.isOpen 
              ? 'bg-yoo-primary text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-sm font-medium">AI Assistant</span>
        </button>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Import">
          <Upload className="w-4 h-4 text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Export">
          <Download className="w-4 h-4 text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Settings">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
        
        <button 
          onClick={handlePreviewToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
            state.previewMode 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-yoo-primary text-white hover:bg-yoo-primary/90'
          }`}
        >
          {state.previewMode ? <Eye className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {state.previewMode ? 'Edit' : 'Preview'}
          </span>
        </button>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-yoo-secondary text-white rounded-md hover:bg-yoo-secondary/90 transition-colors">
          <Save className="w-4 h-4" />
          <span className="text-sm font-medium">Save</span>
        </button>
      </div>
    </header>
  )
}