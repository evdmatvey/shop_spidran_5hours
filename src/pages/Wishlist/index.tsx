import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserStore } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';

import styles from './Wishlist.module.css';
import ProductCard from '../../components/ProductCard';
import { useWishlistStore } from '../../stores/wishlist.store';

const Wishlist = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { wishlistItems, fetchWishlistItems } = useWishlistStore();

  useEffect(() => {
    if (user === null) {
      navigate('/auth');
      toast.warn('Войдите в аккаунт');
    }

    fetchWishlistItems(user!.id);
  }, []);
  return (
    <div className="container">
      <h1 className={styles.title}>Wishlist</h1>
      <div className={styles.wrapper}>
        {wishlistItems.map((cartItem) => (
          <ProductCard key={cartItem.productId} product={cartItem.product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
