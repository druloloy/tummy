import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import MainRouter from '@routers/MainRouter'
import AppProvider from '@providers/AppProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <RouterProvider router={MainRouter} />
    </AppProvider>
)
