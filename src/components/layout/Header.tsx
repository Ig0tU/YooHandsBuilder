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
  Monitor,
  PanelLeftClose,
  PanelRightClose,
  Layers
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
  
  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
    dispatch({ type: 'SET_DEVICE_VIEW', payload: device })
  }
  
  const handleUndo = () => {
    dispatch({ type: 'UNDO' })
  }
  
  const handleRedo = () => {
    dispatch({ type: 'REDO' })
  }
  
  const handleToggleGrid = () => {
    dispatch({ type: 'TOGGLE_GRID' })
  }
  
  const handleToggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }
  
  const handleToggleProperties = () => {
    dispatch({ type: 'TOGGLE_PROPERTIES' })
  }
  
  const canUndo = state.historyIndex > 0
  const canRedo = state.historyIndex < state.history.length - 1
  
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
          <button 
            onClick={handleUndo}
            disabled={!canUndo}
            className={`p-2 rounded-md transition-colors ${
              canUndo 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRedo}
            disabled={!canRedo}
            className={`p-2 rounded-md transition-colors ${
              canRedo 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => handleDeviceChange('desktop')}
            className={`p-2 rounded-md transition-colors ${
              state.deviceView === 'desktop' 
                ? 'bg-white shadow-sm text-yoo-primary' 
                : 'hover:bg-white text-gray-600'
            }`}
            title="Desktop View (1200px+)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDeviceChange('tablet')}
            className={`p-2 rounded-md transition-colors ${
              state.deviceView === 'tablet' 
                ? 'bg-white shadow-sm text-yoo-primary' 
                : 'hover:bg-white text-gray-600'
            }`}
            title="Tablet View (768px-1199px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDeviceChange('mobile')}
            className={`p-2 rounded-md transition-colors ${
              state.deviceView === 'mobile' 
                ? 'bg-white shadow-sm text-yoo-primary' 
                : 'hover:bg-white text-gray-600'
            }`}
            title="Mobile View (320px-767px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleToggleGrid}
            className={`p-2 rounded-md transition-colors ${
              state.ui.showGrid 
                ? 'bg-yoo-primary text-white' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
            title="Toggle Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handleToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Toggle Sidebar"
          >
            <PanelLeftClose className="w-4 h-4 text-gray-600" />
          </button>
          
          <button 
            onClick={handleToggleProperties}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Toggle Properties Panel"
          >
            <PanelRightClose className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleAIToggle}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-200 ${
            state.aiAssistant.isOpen 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span className="text-sm font-medium">AI Assistant</span>
          {state.aiAssistant.isOpen && (
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
        </button>
        
        <div className="h-6 w-px bg-gray-300" />
        
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Import Project">
          <Upload className="w-4 h-4 text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Export Project">
          <Download className="w-4 h-4 text-gray-600" />
        </button>
        
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors" title="Project Settings">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
        
        <button 
          onClick={handlePreviewToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
            state.previewMode 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-yoo-primary text-white hover:bg-yoo-primary/90 shadow-sm'
          }`}
        >
          {state.previewMode ? <Eye className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {state.previewMode ? 'Edit Mode' : 'Preview'}
          </span>
        </button>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-yoo-secondary text-white rounded-md hover:bg-yoo-secondary/90 transition-colors shadow-sm">
          <Save className="w-4 h-4" />
          <span className="text-sm font-medium">Save</span>
        </button>
      </div>
    </header>
  )
}