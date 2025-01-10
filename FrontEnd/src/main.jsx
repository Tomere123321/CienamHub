import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {legacy_createStore} from 'redux'
import {Provider} from 'react-redux'
const appstore = legacy_createStore(AppReducer)
import AppReducer from "./Redux/AppReducer.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={appstore}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
