import { useEffect } from 'react';
import { useProductStore } from '../../stores/products.store';
import ProductCard from '../../components/ProductCard';

import styles from './Products.module.css';

const Products = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className={styles.title}>Товары</h1>

      <div className={styles.wrapper}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} withControls />
        ))}
      </div>
    </div>
  );
};

export default Products;
