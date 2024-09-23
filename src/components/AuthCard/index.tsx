import { useEffect, useState } from 'react';

import styles from './AuthCard.module.css';
import Login from './Login';
import Registration from './Registration';
import { useUserStore } from '../../stores/user.store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthCard = () => {
  const [authVariant, setAuthVariant] = useState<'login' | 'register'>('login');
  const { user } = useUserStore();
  const navigate = useNavigate();

  const loginTabClasses = `${styles.tab} ${authVariant === 'login' ? styles.active : ''}`;
  const registerTabClasses = `${styles.tab} ${authVariant === 'register' ? styles.active : ''}`;

  useEffect(() => {
    if (user !== null) {
      navigate('/');
      toast.warn('Вы уже вошли');
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.controls}>
          <button className={loginTabClasses} onClick={() => setAuthVariant('login')}>
            Вход
          </button>
          <button className={registerTabClasses} onClick={() => setAuthVariant('register')}>
            Регистрация
          </button>
        </div>
        {authVariant === 'login' ? <Login /> : <Registration />}
      </div>
    </div>
  );
};

export default AuthCard;
