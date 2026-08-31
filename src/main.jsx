import { createRoot } from 'react-dom/client'
import './styles/App.css'
import './styles/Fonts.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import DataContext from './Context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
    <DataContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DataContext>
)
