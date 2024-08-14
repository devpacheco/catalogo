import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'

import AuthProvider from './Contexts/AuthContext.tsx'
import { Toaster } from 'react-hot-toast'
import { register } from 'swiper/element/bundle'

register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: "#FFF",
            color: "#5b2614",
            fontWeight: "bold"
          }
        }}
      />
      <RouterProvider router={ router } />
    </AuthProvider>
  </StrictMode>,
)
