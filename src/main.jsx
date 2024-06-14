import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.layer.css'
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import { NotificationProvider } from './components/Notification/NotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </NotificationProvider>
  </React.StrictMode>,
)
