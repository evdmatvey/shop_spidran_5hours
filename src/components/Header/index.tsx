import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useUserStore } from '../../stores/user.store';
import { toast } from 'react-toastify';

const Header = () => {
  const { user, setUser } = useUserStore();
  const isUserAuth = user !== null;

  const logoutHandler = () => {
    setUser(null);
    toast.success('Вы успешно вышли из системы!');
  };

  return (
    <header className={styles.root}>
      <div className="container">
        <div className={styles.wrapper}>
          <NavLink to="/" className={styles.logo}>
            Baier stop
          </NavLink>
          <div className={styles.inner}>
            <nav>
              <ul className={styles.menu}>
                <li>
                  <NavLink to="/wishlist">WishList</NavLink>
                </li>
                <li>
                  <NavLink to="/cart">Корзина</NavLink>
                </li>
              </ul>
            </nav>

            {isUserAuth ? (
              <button className={styles.exit} onClick={logoutHandler}>
                Выйти
              </button>
            ) : (
              <NavLink to="/auth" className={styles.login}>
                Войти
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
