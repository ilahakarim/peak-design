import { createRoot } from 'react-dom/client'
import './styles/App.css'
import './styles/Fonts.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'


createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <App />
</BrowserRouter>

)
