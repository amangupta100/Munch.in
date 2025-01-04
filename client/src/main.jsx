import { createRoot } from 'react-dom/client'
import {App} from './App.jsx'
import './index.css'
import {HashRouter} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(

<HashRouter>
  <Toaster/>
  <App />
  </HashRouter>

)
