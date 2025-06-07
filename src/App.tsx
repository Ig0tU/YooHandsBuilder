import React from 'react'
import { YooHandsBuilder } from './components/YooHandsBuilder'
import { BuilderProvider } from './contexts/BuilderContext'

function App() {
  return (
    <BuilderProvider>
      <div className="h-screen bg-gray-50">
        <YooHandsBuilder />
      </div>
    </BuilderProvider>
  )
}

export default App