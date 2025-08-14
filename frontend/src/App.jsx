import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppLoadingScreen from './components/AppLoadingScreen'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ManageProducts from './pages/ManageProducts'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import ProductDetail from './pages/ProductDetail'
import Orders from './pages/Orders'
import OrderConfirmation from './pages/OrderConfirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuth } from './contexts/AuthContext'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    // Simulate app initialization time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || authLoading) {
    return <AppLoadingScreen />;
  }

  return (
    <div style={{ 
      backgroundColor: 'white', 
      minHeight: '100vh', 
      width: '100%',
      display: 'flex', 
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      <Navbar />
      <main style={{ flex: 1, width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          
          {/* Authentication Routes - Only accessible when NOT logged in */}
          <Route path="/login" element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <ProtectedRoute requireAuth={false}>
              <Register />
            </ProtectedRoute>
          } />
          
          {/* Protected Routes - Only accessible when logged in */}
          <Route path="/manage-products" element={
            <ProtectedRoute requireAuth={true}>
              <ManageProducts />
            </ProtectedRoute>
          } />
          <Route path="/add-product" element={
            <ProtectedRoute requireAuth={true}>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/edit-product/:id" element={
            <ProtectedRoute requireAuth={true}>
              <EditProduct />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute requireAuth={true}>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/order-confirmation" element={
            <ProtectedRoute requireAuth={true}>
              <OrderConfirmation />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
