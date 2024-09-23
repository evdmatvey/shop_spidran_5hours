import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Registration.module.css';
import { requester } from '../../../shared/helpers/requester';
import { User, useUserStore } from '../../../stores/user.store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface RegistrationDto {
  login: string;
  password: string;
  age: number;
}

const Registration = () => {
  const { register, handleSubmit } = useForm<RegistrationDto>();
  const { setUser } = useUserStore();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegistrationDto> = async (data) => {
    const user = await requester.post<User>('/registration', { ...data, age: +data.age });
    setUser(user.data);
    toast.success(`Вы зарегистрировались как ${user.data.login}`);
    navigate('/');
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)}>
      <input {...register('login')} className={styles.input} placeholder="Login" />
      <input {...register('password')} className={styles.input} placeholder="Пароль" />
      <input {...register('age')} className={styles.input} placeholder="Возраст" />
      <button className={styles.button}>Регистрация</button>
    </form>
  );
};

export default Registration;
