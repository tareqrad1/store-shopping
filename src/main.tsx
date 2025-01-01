import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import FilterContextProvider from './context/FilterContextProvider.tsx'
import CartContextProvider from './context/CartContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartContextProvider>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
    </CartContextProvider>
  </StrictMode>,
)
