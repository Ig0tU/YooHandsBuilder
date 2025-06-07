import React, { createContext, useContext, useReducer, ReactNode } from 'react'

interface Element {
  id: string
  type: string
  name: string
  properties: Record<string, any>
  children?: Element[]
  parent?: string
}

interface BuilderState {
  elements: Element[]
  selectedElement: string | null
  activeTab: 'elements' | 'structure' | 'settings'
  previewMode: boolean
  aiAssistant: {
    isOpen: boolean
    conversation: Array<{ role: 'user' | 'assistant', content: string }>
    isProcessing: boolean
  }
  project: {
    name: string
    type: 'joomla' | 'yootheme'
    version: string
  }
}

type BuilderAction = 
  | { type: 'ADD_ELEMENT'; payload: Element }
  | { type: 'UPDATE_ELEMENT'; payload: { id: string; properties: Record<string, any> } }
  | { type: 'DELETE_ELEMENT'; payload: string }
  | { type: 'SELECT_ELEMENT'; payload: string | null }
  | { type: 'SET_ACTIVE_TAB'; payload: 'elements' | 'structure' | 'settings' }
  | { type: 'TOGGLE_PREVIEW'; payload?: boolean }
  | { type: 'TOGGLE_AI_ASSISTANT' }
  | { type: 'ADD_AI_MESSAGE'; payload: { role: 'user' | 'assistant', content: string } }
  | { type: 'SET_AI_PROCESSING'; payload: boolean }
  | { type: 'UPDATE_PROJECT'; payload: Partial<BuilderState['project']> }

const initialState: BuilderState = {
  elements: [],
  selectedElement: null,
  activeTab: 'elements',
  previewMode: false,
  aiAssistant: {
    isOpen: false,
    conversation: [],
    isProcessing: false
  },
  project: {
    name: 'New YooHands Project',
    type: 'yootheme',
    version: '1.0.0'
  }
}

function builderReducer(state: BuilderState, action: BuilderAction): BuilderState {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return {
        ...state,
        elements: [...state.elements, action.payload]
      }
    
    case 'UPDATE_ELEMENT':
      return {
        ...state,
        elements: state.elements.map(el => 
          el.id === action.payload.id 
            ? { ...el, properties: { ...el.properties, ...action.payload.properties } }
            : el
        )
      }
    
    case 'DELETE_ELEMENT':
      return {
        ...state,
        elements: state.elements.filter(el => el.id !== action.payload),
        selectedElement: state.selectedElement === action.payload ? null : state.selectedElement
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
          conversation: [...state.aiAssistant.conversation, action.payload]
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