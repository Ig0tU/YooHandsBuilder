import React from 'react'
import { ElementsPanel } from '../panels/ElementsPanel'
import { StructurePanel } from '../panels/StructurePanel'
import { SettingsPanel } from '../panels/SettingsPanel'
import { useBuilder } from '../../contexts/BuilderContext'

export function Sidebar() {
  const { state, dispatch } = useBuilder()
  
  const tabs = [
    { id: 'elements', label: 'Elements', icon: '🧩' },
    { id: 'structure', label: 'Structure', icon: '🏗️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ] as const
  
  if (state.ui.sidebarCollapsed) {
    return (
      <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })
              dispatch({ type: 'TOGGLE_SIDEBAR' })
            }}
            className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
              state.activeTab === tab.id
                ? 'bg-yoo-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={tab.label}
          >
            <span className="text-sm">{tab.icon}</span>
          </button>
        ))}
      </div>
    )
  }
  
  return (
    <div className="yoo-sidebar">
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_TAB', payload: tab.id })}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                state.activeTab === tab.id
                  ? 'text-yoo-primary border-b-2 border-yoo-primary bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {state.activeTab === 'elements' && <ElementsPanel />}
        {state.activeTab === 'structure' && <StructurePanel />}
        {state.activeTab === 'settings' && <SettingsPanel />}
      </div>
    </div>
  )
}