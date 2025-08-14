import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import { fetchJSON } from '../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchJSON('/products');
        if (active) setProducts(data);
      } catch (e) {
        if (active) setError(e.message || 'Failed to load products');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <HeroSection />
      <FeaturedProducts products={products} loading={loading} error={error} />
    </div>
  );
}
