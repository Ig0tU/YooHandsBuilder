import React, { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, User, Sparkles, Code, Palette, Layout, Zap, Eye, Settings, Grid, Smartphone, Tablet, Monitor } from 'lucide-react'
import { useBuilder } from '../../contexts/BuilderContext'

export function AIAssistant() {
  const { state, dispatch } = useBuilder()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.aiAssistant.conversation])
  
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_AI_ASSISTANT' })
  }
  
  const handleSend = async () => {
    if (!input.trim()) return
    
    dispatch({ type: 'ADD_AI_MESSAGE', payload: { role: 'user', content: input } })
    dispatch({ type: 'SET_AI_PROCESSING', payload: true })
    
    // Process AI commands and actions
    await processAICommand(input)
    
    setInput('')
  }
  
  const processAICommand = async (command: string) => {
    const lowerCommand = command.toLowerCase()
    
    // Device view commands
    if (lowerCommand.includes('mobile') || lowerCommand.includes('phone')) {
      dispatch({ type: 'SET_DEVICE_VIEW', payload: 'mobile' })
      respondWithAction("Switched to mobile view 📱")
      return
    }
    
    if (lowerCommand.includes('tablet')) {
      dispatch({ type: 'SET_DEVICE_VIEW', payload: 'tablet' })
      respondWithAction("Switched to tablet view 📱")
      return
    }
    
    if (lowerCommand.includes('desktop')) {
      dispatch({ type: 'SET_DEVICE_VIEW', payload: 'desktop' })
      respondWithAction("Switched to desktop view 🖥️")
      return
    }
    
    // Preview mode commands
    if (lowerCommand.includes('preview') || lowerCommand.includes('show preview')) {
      dispatch({ type: 'TOGGLE_PREVIEW', payload: true })
      respondWithAction("Enabled preview mode 👁️")
      return
    }
    
    if (lowerCommand.includes('edit mode') || lowerCommand.includes('stop preview')) {
      dispatch({ type: 'TOGGLE_PREVIEW', payload: false })
      respondWithAction("Switched to edit mode ✏️")
      return
    }
    
    // Element creation commands
    if (lowerCommand.includes('add heading') || lowerCommand.includes('create heading')) {
      const newElement = {
        id: `heading-${Date.now()}`,
        type: 'heading',
        name: 'AI Generated Heading',
        properties: {
          text: 'AI Generated Heading',
          level: 'h2',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#1f2937',
          textAlign: 'left'
        }
      }
      dispatch({ type: 'ADD_ELEMENT', payload: newElement })
      respondWithAction("Added a new heading element! 📝")
      return
    }
    
    if (lowerCommand.includes('add button') || lowerCommand.includes('create button')) {
      const newElement = {
        id: `button-${Date.now()}`,
        type: 'button',
        name: 'AI Generated Button',
        properties: {
          text: 'Click Me',
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500'
        }
      }
      dispatch({ type: 'ADD_ELEMENT', payload: newElement })
      respondWithAction("Added a new button element! 🔘")
      return
    }
    
    if (lowerCommand.includes('add container') || lowerCommand.includes('create container')) {
      const newElement = {
        id: `container-${Date.now()}`,
        type: 'container',
        name: 'AI Generated Container',
        properties: {
          width: '100%',
          padding: '20px',
          backgroundColor: 'transparent',
          borderRadius: '0px'
        }
      }
      dispatch({ type: 'ADD_ELEMENT', payload: newElement })
      respondWithAction("Added a new container element! 📦")
      return
    }
    
    // Grid and layout commands
    if (lowerCommand.includes('show grid') || lowerCommand.includes('enable grid')) {
      dispatch({ type: 'TOGGLE_GRID' })
      respondWithAction("Toggled grid display ⚏")
      return
    }
    
    // Tab switching commands
    if (lowerCommand.includes('show elements') || lowerCommand.includes('elements tab')) {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: 'elements' })
      respondWithAction("Switched to Elements tab 🧩")
      return
    }
    
    if (lowerCommand.includes('show structure') || lowerCommand.includes('structure tab')) {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: 'structure' })
      respondWithAction("Switched to Structure tab 🏗️")
      return
    }
    
    if (lowerCommand.includes('show settings') || lowerCommand.includes('settings tab')) {
      dispatch({ type: 'SET_ACTIVE_TAB', payload: 'settings' })
      respondWithAction("Switched to Settings tab ⚙️")
      return
    }
    
    // Analysis commands
    if (lowerCommand.includes('analyze') || lowerCommand.includes('debug') || lowerCommand.includes('examine')) {
      analyzeCurrentPage()
      return
    }
    
    // Default AI response
    setTimeout(() => {
      const responses = [
        "I can help you build amazing layouts! Try asking me to 'add a heading' or 'switch to mobile view'.",
        "I have full control over the builder. I can add elements, change views, toggle preview mode, and much more!",
        "Want me to analyze your current page? Just ask me to 'analyze the page' or 'debug the layout'.",
        "I can switch device views, add elements, toggle grid, change tabs, and provide design suggestions.",
        "Try commands like 'add button', 'show mobile view', 'enable preview', or 'show structure tab'."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      dispatch({ type: 'ADD_AI_MESSAGE', payload: { role: 'assistant', content: randomResponse } })
      dispatch({ type: 'SET_AI_PROCESSING', payload: false })
    }, 1500)
  }
  
  const respondWithAction = (message: string) => {
    setTimeout(() => {
      dispatch({ type: 'ADD_AI_MESSAGE', payload: { role: 'assistant', content: message } })
      dispatch({ type: 'SET_AI_PROCESSING', payload: false })
    }, 800)
  }
  
  const analyzeCurrentPage = () => {
    setTimeout(() => {
      const elementCount = state.elements.length
      const elementTypes = [...new Set(state.elements.map(el => el.type))]
      const selectedElement = state.elements.find(el => el.id === state.selectedElement)
      
      let analysis = `📊 **Page Analysis:**\n\n`
      analysis += `• **Elements:** ${elementCount} total\n`
      analysis += `• **Types:** ${elementTypes.join(', ')}\n`
      analysis += `• **Device View:** ${state.deviceView}\n`
      analysis += `• **Preview Mode:** ${state.previewMode ? 'Enabled' : 'Disabled'}\n`
      
      if (selectedElement) {
        analysis += `• **Selected:** ${selectedElement.name} (${selectedElement.type})\n`
      }
      
      if (elementCount === 0) {
        analysis += `\n💡 **Suggestion:** Start by adding some basic elements like a container, heading, or button!`
      } else if (elementCount < 3) {
        analysis += `\n💡 **Suggestion:** Consider adding more content elements to build out your page structure.`
      } else {
        analysis += `\n✅ **Looking good!** Your page has a solid foundation. Consider testing different device views.`
      }
      
      dispatch({ type: 'ADD_AI_MESSAGE', payload: { role: 'assistant', content: analysis } })
      dispatch({ type: 'SET_AI_PROCESSING', payload: false })
    }, 1200)
  }
  
  const quickActions = [
    { 
      icon: Layout, 
      label: 'Add Container', 
      action: () => processAICommand('add container'),
      description: 'Create a new container element'
    },
    { 
      icon: Code, 
      label: 'Add Heading', 
      action: () => processAICommand('add heading'),
      description: 'Create a new heading element'
    },
    { 
      icon: Palette, 
      label: 'Add Button', 
      action: () => processAICommand('add button'),
      description: 'Create a new button element'
    },
    { 
      icon: Eye, 
      label: 'Toggle Preview', 
      action: () => dispatch({ type: 'TOGGLE_PREVIEW' }),
      description: 'Switch between edit and preview mode'
    },
    { 
      icon: Smartphone, 
      label: 'Mobile View', 
      action: () => dispatch({ type: 'SET_DEVICE_VIEW', payload: 'mobile' }),
      description: 'Switch to mobile viewport'
    },
    { 
      icon: Tablet, 
      label: 'Tablet View', 
      action: () => dispatch({ type: 'SET_DEVICE_VIEW', payload: 'tablet' }),
      description: 'Switch to tablet viewport'
    },
    { 
      icon: Monitor, 
      label: 'Desktop View', 
      action: () => dispatch({ type: 'SET_DEVICE_VIEW', payload: 'desktop' }),
      description: 'Switch to desktop viewport'
    },
    { 
      icon: Grid, 
      label: 'Toggle Grid', 
      action: () => dispatch({ type: 'TOGGLE_GRID' }),
      description: 'Show/hide layout grid'
    },
    { 
      icon: Zap, 
      label: 'Analyze Page', 
      action: () => analyzeCurrentPage(),
      description: 'Get insights about your page'
    }
  ]
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-600">Full builder control & intelligent assistance</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.aiAssistant.conversation.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Welcome to AI Assistant!
                  </h4>
                  <p className="text-gray-600 mb-6">
                    I have full control over the YooHands Builder. I can manipulate elements, change views, debug layouts, and much more!
                  </p>
                  
                  <div className="mb-6">
                    <h5 className="text-sm font-semibold text-gray-700 mb-3">My Capabilities:</h5>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {state.aiAssistant.capabilities.map((capability, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {state.aiAssistant.conversation.map((message, index) => (
                    <div
                      key={index}
                      className={`flex space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-yoo-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {state.aiAssistant.isProcessing && (
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me to add elements, change views, analyze the page..."
                  className="flex-1 yoo-input"
                  disabled={state.aiAssistant.isProcessing}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || state.aiAssistant.isProcessing}
                  className="px-4 py-2 bg-yoo-primary text-white rounded-md hover:bg-yoo-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="w-80 border-l border-gray-200 p-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h5>
            <div className="grid grid-cols-1 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  title={action.description}
                >
                  <action.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}