import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUserStore } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';

import styles from './Cart.module.css';
import { useCartStore } from '../../stores/cart.store';
import ProductCard from '../../components/ProductCard';

const Cart = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { cartItems, fetchCartItems } = useCartStore();

  useEffect(() => {
    if (user === null) {
      navigate('/auth');
      toast.warn('Войдите в аккаунт');
    }

    fetchCartItems(user!.id);
  }, []);
  return (
    <div className="container">
      <h1 className={styles.title}>Корзина</h1>
      <div className={styles.wrapper}>
        {cartItems.map((cartItem) => (
          <ProductCard key={cartItem.productId} product={cartItem.product} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
