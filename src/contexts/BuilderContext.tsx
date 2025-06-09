import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface Element {
  id: string
  type: string
  name: string
  properties: Record<string, any>
  children?: Element[]
  parent?: string
  visible?: boolean
}

interface BuilderState {
  elements: Element[]
  selectedElement: string | null
  activeTab: 'elements' | 'structure' | 'settings'
  previewMode: boolean
  deviceView: 'desktop' | 'tablet' | 'mobile'
  draggedElement: Element | null
  dropZoneActive: boolean
  history: Element[][]
  historyIndex: number
  aiAssistant: {
    isOpen: boolean
    conversation: Array<{ role: 'user' | 'assistant', content: string, timestamp: number }>
    isProcessing: boolean
    capabilities: string[]
  }
  project: {
    name: string
    type: 'joomla' | 'yootheme'
    version: string
    settings: {
      canvasWidth: string
      backgroundColor: string
      includeCss: boolean
      includeJs: boolean
      minifyOutput: boolean
    }
  }
  ui: {
    sidebarCollapsed: boolean
    propertiesCollapsed: boolean
    showGrid: boolean
    snapToGrid: boolean
  }
}

type BuilderAction = 
  | { type: 'ADD_ELEMENT'; payload: Element }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; properties: Record<string, any> } }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: 'elements' | 'structure' | 'settings' }
  | { type: 'TOGGLE_PREVIEW'; payload?: boolean }
  | { type: 'SET_DEVICE_VIEW'; payload: 'desktop' | 'tablet' | 'mobile' }
  | { type: 'START_DRAG'; payload: Element }
  | { type: 'END_DRAG' }
  | { type: 'SET_DROP_ZONE_ACTIVE'; payload: boolean }
  | { type: 'TOGGLE_ELEMENT_VISIBILITY'; payload: string }
  | { type: 'MOVE_ELEMENT'; payload: { elementId: string; newIndex: number } }
  | { type: 'DUPLICATE_ELEMENT'; payload: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SAVE_HISTORY' }
  | { type: 'TOGGLE_AI_ASSISTANT' }
  | { type: 'ADD_AI_MESSAGE'; payload: { role: 'user' | 'assistant', content: string } }
  | { type: 'SET_AI_PROCESSING'; payload: boolean }
  | { type: 'UPDATE_PROJECT'; payload: Partial<BuilderState['project']> }
  | { type: 'UPDATE_PROJECT_SETTINGS'; payload: Partial<BuilderState['project']['settings']> }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_PROPERTIES' }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }

const initialState: BuilderState = {
  elements: [],
  selectedElement: null,
  activeTab: 'elements',
  previewMode: false,
  deviceView: 'desktop',
  draggedElement: null,
  dropZoneActive: false,
  history: [[]],
  historyIndex: 0,
  aiAssistant: {
    isOpen: false,
    conversation: [],
    isProcessing: false,
    capabilities: [
      'Element manipulation',
      'Layout suggestions',
      'Code generation',
      'Design optimization',
      'Responsive design',
      'Accessibility checks',
      'Performance analysis',
      'Joomla/YooTheme integration'
    ]
  },
  project: {
    name: 'New YooHands Project',
    type: 'yootheme',
    version: '1.0.0',
    settings: {
      canvasWidth: 'auto',
      backgroundColor: '#ffffff',
      includeCss: true,
      includeJs: true,
      minifyOutput: false
    }
  },
  ui: {
    sidebarCollapsed: false,
    propertiesCollapsed: false,
    showGrid: false,
    snapToGrid: true
  }
}

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const newState = {
        ...state,
        elements: [...state.elements, { ...action.payload, visible: true }]
      }
      return {
        ...newState,
        history: [...state.history.slice(0, state.historyIndex + 1), newState.elements],
        historyIndex: state.historyIndex + 1
      }
    
    case 'UPDATE_ELEMENT':
      const updatedState = {
        ...state,
        elements: state.elements.map(el => 
          el.id === action.payload.id 
            ? { ...el, properties: { ...el.properties, ...action.payload.properties } }
            : el
        )
      }
      return {
        ...updatedState,
        history: [...state.history.slice(0, state.historyIndex + 1), updatedState.elements],
        historyIndex: state.historyIndex + 1
      }
    
    case 'DELETE_ELEMENT':
      const deletedState = {
        ...state,
        elements: state.elements.filter(el => el.id !== action.payload),
        selectedElement: state.selectedElement === action.payload ? null : state.selectedElement
      }
      return {
        ...deletedState,
        history: [...state.history.slice(0, state.historyIndex + 1), deletedState.elements],
        historyIndex: state.historyIndex + 1
      }
    
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selectedElement: action.payload
      }
    
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload
      }
    
    case 'TOGGLE_PREVIEW':
      return {
        ...state,
        previewMode: action.payload !== undefined ? action.payload : !state.previewMode
      }
    
    case 'SET_DEVICE_VIEW':
      return {
        ...state,
        deviceView: action.payload
      }
    
    case 'START_DRAG':
      return {
        ...state,
        draggedElement: action.payload
      }
    
    case 'END_DRAG':
      return {
        ...state,
        draggedElement: null,
        dropZoneActive: false
      }
    
    case 'SET_DROP_ZONE_ACTIVE':
      return {
        ...state,
        dropZoneActive: action.payload
      }
    
    case 'TOGGLE_ELEMENT_VISIBILITY':
      return {
        ...state,
        elements: state.elements.map(el =>
          el.id === action.payload
            ? { ...el, visible: !el.visible }
            : el
        )
      }
    
    case 'MOVE_ELEMENT':
      const elements = [...state.elements]
      const elementIndex = elements.findIndex(el => el.id === action.payload.elementId)
      if (elementIndex !== -1) {
        const [element] = elements.splice(elementIndex, 1)
        elements.splice(action.payload.newIndex, 0, element)
      }
      return {
        ...state,
        elements
      }
    
    case 'DUPLICATE_ELEMENT':
      const elementToDuplicate = state.elements.find(el => el.id === action.payload)
      if (elementToDuplicate) {
        const duplicatedElement = {
          ...elementToDuplicate,
          id: `${elementToDuplicate.type}-${Date.now()}`,
          name: `${elementToDuplicate.name} Copy`
        }
        return {
          ...state,
          elements: [...state.elements, duplicatedElement]
        }
      }
      return state
    
    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          elements: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1
        }
      }
      return state
    
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          elements: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1
        }
      }
      return state
    
    case 'SAVE_HISTORY':
      return {
        ...state,
        history: [...state.history.slice(0, state.historyIndex + 1), state.elements],
        historyIndex: state.historyIndex + 1
      }
    
    case 'TOGGLE_AI_ASSISTANT':
      return {
        ...state,
        aiAssistant: {
          ...state.aiAssistant,
          isOpen: !state.aiAssistant.isOpen
        }
      }
    
    case 'ADD_AI_MESSAGE':
      return {
        ...state,
        aiAssistant: {
          ...state.aiAssistant,
          conversation: [...state.aiAssistant.conversation, {
            ...action.payload,
            timestamp: Date.now()
          }]
        }
      }
    
    case 'SET_AI_PROCESSING':
      return {
        ...state,
        aiAssistant: {
          ...state.aiAssistant,
          isProcessing: action.payload
        }
      }
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        project: { ...state.project, ...action.payload }
      }
    
    case 'UPDATE_PROJECT_SETTINGS':
      return {
        ...state,
        project: {
          ...state.project,
          settings: { ...state.project.settings, ...action.payload }
        }
      }
    
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: { ...state.ui, sidebarCollapsed: !state.ui.sidebarCollapsed }
      }
    
    case 'TOGGLE_PROPERTIES':
      return {
        ...state,
        ui: { ...state.ui, propertiesCollapsed: !state.ui.propertiesCollapsed }
      }
    
    case 'TOGGLE_GRID':
      return {
        ...state,
        ui: { ...state.ui, showGrid: !state.ui.showGrid }
      }
    
    case 'TOGGLE_SNAP_TO_GRID':
      return {
        ...state,
        ui: { ...state.ui, snapToGrid: !state.ui.snapToGrid }
      }
    
    default:
      return state
  }
}

const BuilderContext = createContext<{
  state: BuilderState
  dispatch: React.Dispatch<BuilderAction>
} | null>(null)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState)
  
  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider')
  }
  return context
}