import React from 'react'
import { useBuilder } from '../../contexts/BuilderContext'

export function SettingsPanel() {
  const { state, dispatch } = useBuilder()
  
  const handleProjectUpdate = (updates: Partial<typeof state.project>) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: updates })
  }
  
  const handleSettingsUpdate = (updates: Partial<typeof state.project.settings>) => {
    dispatch({ type: 'UPDATE_PROJECT_SETTINGS', payload: updates })
  }
  
  return (
    <div className="p-4 space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Project Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={state.project.name}
              onChange={(e) => handleProjectUpdate({ name: e.target.value })}
              className="yoo-input"
              placeholder="Enter project name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              value={state.project.type}
              onChange={(e) => handleProjectUpdate({ type: e.target.value as 'joomla' | 'yootheme' })}
              className="yoo-input"
            >
              <option value="yootheme">YooTheme</option>
              <option value="joomla">Joomla</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Version
            </label>
            <input
              type="text"
              value={state.project.version}
              onChange={(e) => handleProjectUpdate({ version: e.target.value })}
              className="yoo-input"
              placeholder="1.0.0"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Canvas Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Canvas Width
            </label>
            <select 
              value={state.project.settings.canvasWidth}
              onChange={(e) => handleSettingsUpdate({ canvasWidth: e.target.value })}
              className="yoo-input"
            >
              <option value="auto">Auto</option>
              <option value="1200px">1200px</option>
              <option value="1400px">1400px</option>
              <option value="100%">100%</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                value={state.project.settings.backgroundColor}
                onChange={(e) => handleSettingsUpdate({ backgroundColor: e.target.value })}
                className="w-12 h-10 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={state.project.settings.backgroundColor}
                onChange={(e) => handleSettingsUpdate({ backgroundColor: e.target.value })}
                className="flex-1 yoo-input"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">UI Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={state.ui.showGrid}
                onChange={() => dispatch({ type: 'TOGGLE_GRID' })}
                className="rounded" 
              />
              <span className="text-sm text-gray-700">Show Grid</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={state.ui.snapToGrid}
                onChange={() => dispatch({ type: 'TOGGLE_SNAP_TO_GRID' })}
                className="rounded" 
              />
              <span className="text-sm text-gray-700">Snap to Grid</span>
            </label>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Export Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={state.project.settings.includeCss}
                onChange={(e) => handleSettingsUpdate({ includeCss: e.target.checked })}
                className="rounded" 
              />
              <span className="text-sm text-gray-700">Include CSS</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={state.project.settings.includeJs}
                onChange={(e) => handleSettingsUpdate({ includeJs: e.target.checked })}
                className="rounded" 
              />
              <span className="text-sm text-gray-700">Include JavaScript</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={state.project.settings.minifyOutput}
                onChange={(e) => handleSettingsUpdate({ minifyOutput: e.target.checked })}
                className="rounded" 
              />
              <span className="text-sm text-gray-700">Minify Output</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Keyboard Shortcuts</h4>
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Undo</span>
            <span className="font-mono">Ctrl+Z</span>
          </div>
          <div className="flex justify-between">
            <span>Redo</span>
            <span className="font-mono">Ctrl+Y</span>
          </div>
          <div className="flex justify-between">
            <span>Preview</span>
            <span className="font-mono">Ctrl+P</span>
          </div>
          <div className="flex justify-between">
            <span>Save</span>
            <span className="font-mono">Ctrl+S</span>
          </div>
        </div>
      </div>
    </div>
  )
}