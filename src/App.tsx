import { BrowserRouter, Routes, Route } from 'react-router'
import NotFound from './pages/NotFound'
import React from 'react'
import Cart from './pages/Cart'
import InfoProducts from './components/InfoProducts'
const  ShoppingHome = React.lazy(() => import('./pages/ShoppingHome'));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<ShoppingHome />} />
        <Route path='/shopping' element={<React.Suspense fallback={<h1>Lazy Loading ....</h1>}>
          <ShoppingHome />
        </React.Suspense>} />
        <Route path='/cart' element={<Cart />} />
        <Route  path='/product/:id' element={<InfoProducts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App