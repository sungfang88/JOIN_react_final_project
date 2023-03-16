import React from 'react'
import ReactDOM from 'react-dom/client'
import './Public/css/style.css'
import './index.css'

import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  //index.js主要的工作是render(渲染)"app.js"這個元件
  //StrictMode為嚴格模式
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
