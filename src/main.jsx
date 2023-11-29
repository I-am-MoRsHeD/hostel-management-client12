import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Route/Router.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
import 'react-awesome-button/dist/styles.css';
import { HelmetProvider } from 'react-helmet-async';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
