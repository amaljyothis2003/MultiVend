import { useState, useEffect, useCallback } from 'react';
import { orderAPI, productAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState({});

  const loadOrders = useCallback(async () => {
    try {
      setLoading(true);
      const userOrders = await orderAPI.getAll();
      setOrders(userOrders);
    } catch (e) {
      setError(e.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCancelOrder = async (orderId) => {
    const order = orders.find(o => o._id === orderId);
    
    if (!canCancelOrder(order)) {
      alert('Cannot cancel this order. It may be delivered or outside the cancellation window.');
      return;
    }

    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancelling(prev => ({ ...prev, [orderId]: true }));
      await orderAPI.cancel(orderId);
      
      // Restore product stock after successful cancellation
      try {
        for (const item of order.items) {
          const product = await productAPI.getById(item.product);
          const restoredStock = product.stock + item.quantity;
          await productAPI.update(item.product, {
            ...product,
            stock: restoredStock
          });
        }
      } catch (stockError) {
        console.error('Error restoring product stock:', stockError);
        // Don't fail the cancellation if stock update fails, just log it
      }
      
      alert('Order cancelled successfully!');
      loadOrders(); // Reload orders
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Error cancelling order. Please try again.');
    } finally {
      setCancelling(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      confirmed: '#3b82f6',
      processing: '#8b5cf6',
      shipped: '#06b6d4',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: '#f59e0b',
      paid: '#10b981',
      failed: '#ef4444',
      refunded: '#8b5cf6'
    };
    return colors[status] || '#6b7280';
  };

  const canCancelOrder = (order) => {
    if (order.status === 'delivered' || order.status === 'cancelled') {
      return false;
    }
    
    const orderDate = new Date(order.createdAt);
    const deliveryDate = getDeliveryDate(orderDate);
    const now = new Date();
    
    // Can't cancel if it should already be delivered (2 days passed)
    return now < deliveryDate;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDeliveryDate = (orderDate) => {
    const delivery = new Date(orderDate);
    delivery.setDate(delivery.getDate() + 2);
    return delivery;
  };

  const getOrderStatusInfo = (order) => {
    const orderDate = new Date(order.createdAt);
    const deliveryDate = getDeliveryDate(orderDate);
    const now = new Date();
    
    if (order.status === 'delivered') {
      return { 
        message: 'Delivered', 
        color: '#10b981',
        canCancel: false 
      };
    }
    
    if (order.status === 'cancelled') {
      return { 
        message: 'Cancelled', 
        color: '#ef4444',
        canCancel: false 
      };
    }
    
    if (now >= deliveryDate) {
      return { 
        message: 'Should be delivered (auto-delivery after 2 days)', 
        color: '#10b981',
        canCancel: false 
      };
    }
    
    const timeLeft = deliveryDate - now;
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
    
    return { 
      message: `Expected delivery: ${formatDate(deliveryDate)} (${hoursLeft}h remaining)`, 
      color: '#3b82f6',
      canCancel: true 
    };
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
            My Orders
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '8px 16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <i className="fas fa-shopping-bag" style={{ color: '#6b7280' }}></i>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {orders.length} total orders
            </span>
          </div>
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

        {/* Orders List */}
        {orders.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <i className="fas fa-shopping-cart" style={{ 
              fontSize: '4rem', 
              color: '#d1d5db', 
              marginBottom: '1rem',
              display: 'block' 
            }}></i>
            <h2 style={{ 
              color: '#374151', 
              marginBottom: '0.5rem',
              fontSize: '1.5rem'
            }}>
              No orders yet
            </h2>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Start shopping to see your orders here
            </p>
            <a 
              href="/products" 
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fas fa-shopping-bag"></i>
              Browse Products
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                {/* Order Header */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '1.5rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 0.5rem 0'
                      }}>
                        Order #{order._id.slice(-8).toUpperCase()}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: 'white',
                          backgroundColor: getStatusColor(order.status),
                          marginBottom: '0.25rem'
                        }}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </div>
                        <div style={{
                          display: 'block',
                          fontSize: '0.75rem',
                          color: '#6b7280'
                        }}>
                          Payment: <span style={{ 
                            color: getPaymentStatusColor(order.paymentStatus),
                            fontWeight: '500'
                          }}>
                            {order.paymentStatus}
                          </span>
                        </div>
                        <div style={{
                          display: 'block',
                          fontSize: '0.75rem',
                          color: getOrderStatusInfo(order).color,
                          marginTop: '0.25rem'
                        }}>
                          {getOrderStatusInfo(order).message}
                        </div>
                      </div>
                      
                      {canCancelOrder(order) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancelling[order._id]}
                          style={{
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '8px 16px',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: cancelling[order._id] ? 'not-allowed' : 'pointer',
                            opacity: cancelling[order._id] ? 0.6 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          {cancelling[order._id] ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fas fa-times"></i>
                          )}
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '1rem'
                    }}>
                      Items ({order.items.length})
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem',
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            flexWrap: 'wrap',
                            gap: '1rem'
                          }}
                        >
                          <div style={{ flex: 1, minWidth: '200px' }}>
                            <h5 style={{
                              fontSize: '0.875rem',
                              fontWeight: '600',
                              color: '#1f2937',
                              margin: '0 0 0.25rem 0'
                            }}>
                              {item.productDetails.name}
                            </h5>
                            <p style={{
                              fontSize: '0.75rem',
                              color: '#6b7280',
                              margin: 0
                            }}>
                              ${item.productDetails.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          
                          <div style={{
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#1f2937'
                          }}>
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {order.shippingAddress && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                      }}>
                        Shipping Address
                      </h4>
                      <div style={{
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        {order.shippingAddress.street && <div>{order.shippingAddress.street}</div>}
                        {order.shippingAddress.city && order.shippingAddress.state && (
                          <div>{order.shippingAddress.city}, {order.shippingAddress.state}</div>
                        )}
                        {order.shippingAddress.zipCode && <div>{order.shippingAddress.zipCode}</div>}
                        {order.shippingAddress.country && <div>{order.shippingAddress.country}</div>}
                      </div>
                    </div>
                  )}

                  {/* Order Total */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '2px solid #e5e7eb'
                  }}>
                    <span style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      Total Amount
                    </span>
                    <span style={{
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: '#1f2937'
                    }}>
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
