import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import {legacy_createStore} from 'redux'
// import { Provider } from 'react-redux'
// import AppReducer from './Redux/AppReducer.jsx'
// const appStore = legacy_createStore(AppReducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Provider store={appStore}> */}
      <App />
      {/* </Provider> */}
    </BrowserRouter>
  </StrictMode>,
)
