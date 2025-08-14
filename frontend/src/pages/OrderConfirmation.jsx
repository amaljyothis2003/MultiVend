import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderAPI, productAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  console.log('OrderConfirmation component loaded with location.state:', location.state);

  // Get product info from location state or URL params
  const productFromState = location.state?.product;
  const productId = location.state?.productId || productFromState?._id || new URLSearchParams(location.search).get('productId');
  const initialQuantity = location.state?.quantity || 1;

  const loadProduct = useCallback(async () => {
    try {
      setLoading(true);
      // If we already have the product from state, use it
      if (productFromState) {
        setProduct(productFromState);
        setLoading(false);
        return;
      }
      // Otherwise, fetch it by ID
      const productData = await productAPI.getById(productId);
      setProduct(productData);
    } catch (e) {
      setError(e.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  }, [productId, productFromState]);

  useEffect(() => {
    if (!productId && !productFromState) {
      navigate('/products');
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    setQuantity(initialQuantity);
    loadProduct();
  }, [productId, productFromState, user, navigate, initialQuantity, loadProduct]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmOrder = async () => {
    if (!paymentConfirmed) {
      alert('Please confirm payment to proceed');
      return;
    }

    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      alert('Please fill in all shipping address fields');
      return;
    }

    if (product.stock < quantity) {
      alert('Insufficient stock available');
      return;
    }

    try {
      setLoading(true);
      
      const orderData = {
        items: [{
          productId: product._id,
          quantity: quantity
        }],
        shippingAddress: shippingAddress
      };

      const order = await orderAPI.create(orderData);
      
      // Process payment automatically since checkbox is confirmed
      await orderAPI.processPayment(order.order._id, { confirmed: true });
      
      // Update product stock after successful order
      try {
        const updatedStock = product.stock - quantity;
        await productAPI.update(product._id, {
          ...product,
          stock: updatedStock
        });
      } catch (stockError) {
        console.error('Error updating product stock:', stockError);
        // Don't fail the order if stock update fails, just log it
      }
      
      alert('Order placed successfully!');
      navigate('/orders');
      
    } catch (error) {
      console.error('Error creating order:', error);
      setError(error.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) return <LoadingSpinner />;

  if (error && !product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#ef4444' }}>Error: {error}</p>
        <button onClick={() => navigate('/products')} style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          cursor: 'pointer'
        }}>
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) return null;

  const totalAmount = product.price * quantity;

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0,
            textAlign: 'center'
          }}>
            Order Confirmation
          </h1>
          <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '0.5rem' }}>
            Review your order details and confirm payment
          </p>
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

        <div style={{ display: 'grid', gap: '2rem' }}>
          {/* Product Details */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Order Summary
            </h2>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              {/* Product Image */}
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <i className="fas fa-image" style={{ fontSize: '2rem', color: '#9ca3af' }}></i>
                )}
              </div>

              {/* Product Info */}
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.5rem'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  marginBottom: '1rem'
                }}>
                  {product.description}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1f2937'
                  }}>
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', color: '#374151' }}>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      style={{
                        width: '80px',
                        padding: '8px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  
                  <span style={{
                    fontSize: '0.875rem',
                    color: product.stock > 0 ? '#10b981' : '#ef4444'
                  }}>
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '2px solid #e5e7eb'
            }}>
              <span style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                Total Amount
              </span>
              <span style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Shipping Address
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="New York"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="NY"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingAddress.zipCode}
                  onChange={handleAddressChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                  placeholder="10001"
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Country
                </label>
                <select
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Confirmation */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem'
            }}>
              Payment Confirmation
            </h2>

            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="checkbox"
                  id="paymentConfirm"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  style={{ transform: 'scale(1.2)' }}
                />
                <label htmlFor="paymentConfirm" style={{
                  fontSize: '1rem',
                  color: '#374151',
                  cursor: 'pointer'
                }}>
                  I confirm that payment of <strong>${totalAmount.toFixed(2)}</strong> has been processed
                </label>
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '0.5rem',
                marginLeft: '2rem'
              }}>
                (This is a demo - no actual payment will be processed)
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => navigate('/products')}
                style={{
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={handleConfirmOrder}
                disabled={loading || !paymentConfirmed}
                style={{
                  backgroundColor: (loading || !paymentConfirmed) ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: (loading || !paymentConfirmed) ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {loading && <i className="fas fa-spinner fa-spin"></i>}
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
