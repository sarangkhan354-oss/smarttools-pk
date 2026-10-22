import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>SmartTools PK</h1>
        <p style={{ marginTop: '10px', color: '#4b5563', fontSize: '1.1rem' }}>Your application is up and running successfully!</p>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
