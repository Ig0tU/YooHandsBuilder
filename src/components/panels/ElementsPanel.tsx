import React from 'react'
import { DraggableElement } from '../elements/DraggableElement'

const elementCategories = [
  {
    name: 'Layout',
    elements: [
      { type: 'container', name: 'Container', icon: '📦', description: 'Flexible container element' },
      { type: 'section', name: 'Section', icon: '📄', description: 'Page section wrapper' },
      { type: 'grid', name: 'Grid', icon: '⚏', description: 'CSS Grid layout' },
      { type: 'flexbox', name: 'Flexbox', icon: '📐', description: 'Flexible box layout' }
    ]
  },
  {
    name: 'Content',
    elements: [
      { type: 'heading', name: 'Heading', icon: '📝', description: 'Text heading (H1-H6)' },
      { type: 'paragraph', name: 'Paragraph', icon: '📄', description: 'Text paragraph' },
      { type: 'image', name: 'Image', icon: '🖼️', description: 'Image element' },
      { type: 'video', name: 'Video', icon: '🎥', description: 'Video player' },
      { type: 'button', name: 'Button', icon: '🔘', description: 'Interactive button' },
      { type: 'link', name: 'Link', icon: '🔗', description: 'Hyperlink element' }
    ]
  },
  {
    name: 'Forms',
    elements: [
      { type: 'form', name: 'Form', icon: '📋', description: 'Form container' },
      { type: 'input', name: 'Input', icon: '📝', description: 'Text input field' },
      { type: 'textarea', name: 'Textarea', icon: '📄', description: 'Multi-line text input' },
      { type: 'select', name: 'Select', icon: '📋', description: 'Dropdown selection' },
      { type: 'checkbox', name: 'Checkbox', icon: '☑️', description: 'Checkbox input' },
      { type: 'radio', name: 'Radio', icon: '🔘', description: 'Radio button input' }
    ]
  },
  {
    name: 'Joomla/YooTheme',
    elements: [
      { type: 'module', name: 'Module', icon: '🧩', description: 'Joomla module position' },
      { type: 'article', name: 'Article', icon: '📰', description: 'Joomla article content' },
      { type: 'menu', name: 'Menu', icon: '🍔', description: 'Navigation menu' },
      { type: 'slider', name: 'Slider', icon: '🎠', description: 'YooTheme slider element' },
      { type: 'gallery', name: 'Gallery', icon: '🖼️', description: 'Image gallery' },
      { type: 'accordion', name: 'Accordion', icon: '📁', description: 'Collapsible content' }
    ]
  }
]

export function ElementsPanel() {
  return (
    <div className="p-4 space-y-6">
      {elementCategories.map((category) => (
        <div key={category.name}>
          <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
            {category.name}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {category.elements.map((element) => (
              <DraggableElement
                key={element.type}
                type={element.type}
                name={element.name}
                icon={element.icon}
                description={element.description}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}