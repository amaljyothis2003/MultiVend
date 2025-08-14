import { useState, useEffect, useCallback } from 'react';
import { fetchJSON, productAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ManageProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get current user ID from auth context
  const currentUserId = user?._id; // Use _id instead of id for MongoDB

  const loadUserProducts = useCallback(async () => {
    if (!currentUserId) return;
    
    try {
      setLoading(true);
      const allProducts = await fetchJSON('/products');
      // Filter products by current user (seller)
      const userProducts = allProducts.filter(product => product.seller === currentUserId);
      setProducts(userProducts);
    } catch (e) {
      setError(e.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    loadUserProducts();
  }, [loadUserProducts]);

  const handleDelete = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await productAPI.delete(productId);
      alert('Product deleted successfully!');
      loadUserProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '2rem 1rem', width: '100%' }}>
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            Manage Products
          </h1>
          
          <Link to="/add-product" style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}>
            <i className="fas fa-plus"></i>
            Add Product
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '2rem'
          }}>
            <p style={{ color: '#ef4444', margin: 0 }}>Error: {error}</p>
          </div>
        )}

        {/* Products List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Your Products ({products.length})
          </h2>

          {products.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#6b7280'
            }}>
              <i className="fas fa-box-open" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
              <h3 style={{ marginBottom: '0.5rem' }}>No products yet</h3>
              <p style={{ marginBottom: '1.5rem' }}>Start by adding your first product to the marketplace</p>
              <Link to="/add-product" style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <i className="fas fa-plus"></i>
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}
                >
                  {/* Product Image */}
                  <div style={{ position: 'relative', paddingBottom: '60%', overflow: 'hidden' }}>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af'
                      }}>
                        <i className="fas fa-image" style={{ fontSize: '2rem' }}></i>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '0.5rem'
                    }}>
                      {product.name}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '0.5rem',
                      textTransform: 'capitalize'
                    }}>
                      {product.category || 'Uncategorized'}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: '#1f2937'
                      }}>
                        ${product.price.toFixed(2)}
                      </span>
                      
                      <span style={{
                        fontSize: '0.875rem',
                        color: product.stock > 0 ? '#10b981' : '#ef4444',
                        fontWeight: '500'
                      }}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        to={`/edit-product/${product._id}`}
                        style={{
                          flex: 1,
                          backgroundColor: '#f3f4f6',
                          color: '#374151',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          textDecoration: 'none'
                        }}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        style={{
                          flex: 1,
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '8px 12px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <i className="fas fa-trash"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
