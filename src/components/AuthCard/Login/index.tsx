import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { requester } from '../../../shared/helpers/requester';
import { User, useUserStore } from '../../../stores/user.store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface LoginDto {
  login: string;
  pwd: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginDto>();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    const user = await requester.post<User>('/login', data);
    setUser(user.data);
    toast.success(`Вы вошли как ${user.data.login}`);
    navigate('/');
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('login')} className={styles.input} placeholder="Login" />
      <input {...register('pwd')} className={styles.input} placeholder="Пароль" />
      <button className={styles.button}>Войти</button>
    </form>
  );
};

export default Login;
