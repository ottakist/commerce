import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './features/products/productsSlice';
import reactLogo from './assets/react.svg';
import { calculateTotals } from './features/cart/cartSlice';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import { Navbar, Sidebar,Footer } from './components';
import {
  Home,
  AuthWrapper,
  Error,
  PrivateRoute,
} from './pages';

function App() {
  const About = React.lazy(() => import('./pages/AboutPage'));
  const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
  const SingleProduct = React.lazy(() => import('./pages/SingleProductPage'));
  const Checkout = React.lazy(() => import('./pages/CheckoutPage'));
  const Cart = React.lazy(() => import('./pages/CartPage'));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(calculateTotals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<SingleProduct />} />
            <Route
              path='/checkout'
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
}

export default App;
