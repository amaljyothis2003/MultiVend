import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to MultiVend",
      subtitle: "Your one-stop marketplace for everything",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
    },
    {
      title: "Discover Amazing Products",
      subtitle: "From electronics to fashion, we have it all",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=400&fit=crop"
    },
    {
      title: "Shop with Confidence",
      subtitle: "Secure payments and fast delivery",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div style={{
      position: 'relative',
      height: '400px',
      overflow: 'hidden',
      backgroundColor: '#f9fafb'
    }}>
      {slides.map((slide, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}
        >
          <div style={{
            textAlign: 'center',
            color: 'white',
            maxWidth: '600px',
            padding: '0 2rem'
          }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              {slide.subtitle}
            </p>
            <Link to="/products" style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              Shop Now
            </Link>
          </div>
        </div>
      ))}
      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px'
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}
