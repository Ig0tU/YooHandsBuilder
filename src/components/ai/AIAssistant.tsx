import React, { useState } from 'react'
import { X, Send, Bot, User, Sparkles, Code, Palette, Layout } from 'lucide-react'
import { useBuilder } from '../../contexts/BuilderContext'

export function AIAssistant() {
  const { state, dispatch } = useBuilder()
  const [input, setInput] = useState('')
  
  const handleClose = () => {
    dispatch({ type: 'TOGGLE_AI_ASSISTANT' })
  }
  
  const handleSend = async () => {
    if (!input.trim()) return
    
    dispatch({ type: 'ADD_AI_MESSAGE', payload: { role: 'user', content: input } })
    dispatch({ type: 'SET_AI_PROCESSING', payload: true })
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you create beautiful layouts! Try adding a container element and then placing a heading inside it.",
        "For better visual hierarchy, consider using different heading levels (H1-H6) and adjusting the font sizes.",
        "Would you like me to suggest some color combinations that work well with your current design?",
        "I notice you're building a Joomla site. Would you like me to help you set up some module positions?",
        "For responsive design, I recommend using percentage-based widths and flexible padding values."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      dispatch({ type: 'ADD_AI_MESSAGE', payload: { role: 'assistant', content: randomResponse } })
      dispatch({ type: 'SET_AI_PROCESSING', payload: false })
    }, 1500)
    
    setInput('')
  }
  
  const quickActions = [
    { icon: Layout, label: 'Create Layout', action: 'layout' },
    { icon: Palette, label: 'Color Scheme', action: 'colors' },
    { icon: Code, label: 'Add Code', action: 'code' },
    { icon: Sparkles, label: 'Optimize', action: 'optimize' }
  ]
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-3/4 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-sm text-gray-600">Your YooHands building companion</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
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
                I'm here to help you build amazing Joomla/YooTheme pages. Ask me anything!
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    onClick={() => setInput(`Help me with ${action.label.toLowerCase()}`)}
                  >
                    <action.icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            state.aiAssistant.conversation.map((message, index) => (
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
                  <p className="text-sm">{message.content}</p>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))
          )}
          
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
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about building your page..."
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
    </div>
  )
}