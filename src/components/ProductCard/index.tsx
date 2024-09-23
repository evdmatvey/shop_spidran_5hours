import { toast } from 'react-toastify';
import { requester } from '../../shared/helpers/requester';
import { Product } from '../../stores/products.store';
import { useUserStore } from '../../stores/user.store';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  withControls?: boolean;
}

const ProductCard = ({ product, withControls }: ProductCardProps) => {
  const { user } = useUserStore();

  const addToWishlistHandler = () => {
    if (!user) toast.error('Войдите или зарегистрируйтесь!');
    requester
      .post(`/users/${user?.id}/wishlist`, { productId: product.id })
      .then(() => toast.success('Товар добавлен в wishlist!'));
  };

  const addToCartHandler = () => {
    if (!user) toast.error('Войдите или зарегистрируйтесь!');
    requester
      .post(`/users/${user?.id}/cart`, { productId: product.id, quantity: 1 })
      .then(() => toast.success('Товар добавлен в корзину!'));
  };

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <img className={styles.image} src={product.image} alt="img" />
        <div className={styles.content}>
          <h6>{product.title}</h6>
          <p>{product.desc}</p>
        </div>
      </div>
      {withControls && (
        <div className={styles.buttons}>
          <button onClick={addToCartHandler}>В корзину</button>
          <button onClick={addToWishlistHandler}>В wishlist</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
