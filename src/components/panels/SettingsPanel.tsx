import React from 'react'
import { useBuilder } from '../../contexts/BuilderContext'

export function SettingsPanel() {
  const { state, dispatch } = useBuilder()
  
  const handleProjectUpdate = (updates: Partial<typeof state.project>) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: updates })
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
            <select className="yoo-input">
              <option>Auto</option>
              <option>1200px</option>
              <option>1400px</option>
              <option>100%</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <div className="flex space-x-2">
              <input
                type="color"
                className="w-12 h-10 border border-gray-300 rounded-md"
                defaultValue="#ffffff"
              />
              <input
                type="text"
                className="flex-1 yoo-input"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Export Settings</h4>
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm text-gray-700">Include CSS</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" defaultChecked />
              <span className="text-sm text-gray-700">Include JavaScript</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-gray-700">Minify Output</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}