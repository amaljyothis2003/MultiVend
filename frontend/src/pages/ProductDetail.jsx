import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchJSON } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchJSON(`/products/${id}`);
        if (active) setProduct(data);
      } catch (e) {
        if (active) setError(e.message || 'Failed to load product');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [id]);

  const handleBuyNow = () => {
    console.log('Buy Now clicked! isAuthenticated:', isAuthenticated, 'product:', product);
    
    if (!isAuthenticated) {
      // Store the buy now intent and redirect to login
      localStorage.setItem('buyNowProduct', JSON.stringify({
        productId: id,
        product: product,
        quantity: 1,
        redirectTo: 'order-confirmation'
      }));
      navigate('/login', { state: { from: { pathname: `/products/${id}` } } });
      return;
    }
    
    if (product.stock <= 0) {
      alert('This product is out of stock!');
      return;
    }
    
    console.log('Navigating to order confirmation with product:', product);
    // Navigate to order confirmation page with product data
    navigate('/order-confirmation', { 
      state: { 
        product: product,
        productId: product._id,
        quantity: 1 // Default quantity, can be made customizable
      } 
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ padding: '4rem 2rem', backgroundColor: 'white', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: '#ef4444', marginBottom: '2rem' }}>Error: {error}</p>
          <Link to="/" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '600'
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: '4rem 2rem', backgroundColor: 'white', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>Product not found.</p>
          <Link to="/" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: '600'
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'white', minHeight: '60vh' }}>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/products" style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: '#3b82f6',
          textDecoration: 'none',
          fontWeight: '500',
          marginBottom: '2rem'
        }}>
          ← Back to Products
        </Link>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          <div>
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                style={{ 
                  width: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
            ) : (
              <div style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#f3f4f6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af',
                fontSize: '1.125rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                No Image Available
              </div>
            )}
          </div>

          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              {product.name}
            </h1>

            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '2rem'
            }}>
              {product.description || 'No description available.'}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#e5e7eb',
                color: '#374151',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                {product.category || 'General'}
              </span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '12px'
            }}>
              <div>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: '0 0 0.5rem 0'
                }}>
                  Price
                </p>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  margin: '0 0 0.5rem 0'
                }}>
                  Stock
                </p>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: product.stock > 0 ? '#10b981' : '#ef4444'
                }}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={handleBuyNow}
                style={{
                  flex: 1,
                  backgroundColor: product.stock > 0 ? '#ef4444' : '#9ca3af',
                  color: 'white',
                  padding: '1rem 2rem',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
                disabled={product.stock <= 0}
              >
                <i className="fas fa-shopping-cart"></i>
                {product.stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>

              <button style={{
                flex: 1,
                backgroundColor: product.stock > 0 ? '#3b82f6' : '#9ca3af',
                color: 'white',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                border: 'none',
                borderRadius: '8px',
                cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              disabled={product.stock <= 0}
              >
                <i className="fas fa-plus"></i>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
