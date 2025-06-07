import React from 'react'
import { useBuilder } from '../../contexts/BuilderContext'

interface DraggableElementProps {
  type: string
  name: string
  icon: string
  description: string
}

export function DraggableElement({ type, name, icon, description }: DraggableElementProps) {
  const { dispatch } = useBuilder()
  
  const handleAddElement = () => {
    const newElement = {
      id: `${type}-${Date.now()}`,
      type,
      name,
      properties: getDefaultProperties(type),
      children: []
    }
    
    dispatch({ type: 'ADD_ELEMENT', payload: newElement })
  }
  
  return (
    <button
      onClick={handleAddElement}
      className="group p-3 bg-white border border-gray-200 rounded-lg hover:border-yoo-primary hover:shadow-md transition-all duration-200 text-left"
      title={description}
    >
      <div className="flex items-center space-x-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium text-gray-900 group-hover:text-yoo-primary">
          {name}
        </span>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">{description}</p>
    </button>
  )
}

function getDefaultProperties(type: string): Record<string, any> {
  const defaults: Record<string, Record<string, any>> = {
    container: {
      width: '100%',
      padding: '20px',
      backgroundColor: 'transparent',
      borderRadius: '0px'
    },
    section: {
      padding: '40px 20px',
      backgroundColor: '#ffffff',
      minHeight: '200px'
    },
    heading: {
      text: 'Your Heading Here',
      level: 'h2',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1f2937',
      textAlign: 'left'
    },
    paragraph: {
      text: 'Your paragraph text goes here. Edit this text to customize your content.',
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#4b5563',
      textAlign: 'left'
    },
    image: {
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Sample image',
      width: '100%',
      height: 'auto',
      borderRadius: '8px'
    },
    button: {
      text: 'Click Me',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '500'
    },
    video: {
      src: '',
      width: '100%',
      height: '400px',
      controls: true,
      autoplay: false
    },
    form: {
      method: 'POST',
      action: '',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px'
    },
    input: {
      type: 'text',
      placeholder: 'Enter text...',
      width: '100%',
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #d1d5db'
    },
    module: {
      position: 'sidebar-a',
      title: 'Module Title',
      showTitle: true,
      moduleClass: ''
    },
    article: {
      articleId: '',
      showTitle: true,
      showIntro: true,
      showReadmore: true
    },
    menu: {
      menuType: 'mainmenu',
      startLevel: 1,
      endLevel: 0,
      showAllChildren: false
    }
  }
  
  return defaults[type] || {}
}