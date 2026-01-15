import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { FirebaseContext } from './store/Context.jsx'
import { app, auth, db, storage } from './firebase/config.js'
import Context from './store/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ app, auth, db, storage }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider >
  </StrictMode>,
)
