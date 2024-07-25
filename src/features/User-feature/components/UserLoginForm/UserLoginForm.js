import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { UserAuthContext } from '../../../../context/UserContext';

import styles from './UserLoginForm.module.scss';

export default function UserLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const context = useContext(UserAuthContext);
  const [isLoginFaild, setIsLoginFaild] = useState(false);
  const navigate = useNavigate();

  function toHome() {
    navigate('/');
  }

  const onSubmit = (data) => {
    async function login() {
      const user = await context.login(data);
      if (!user) {
        setIsLoginFaild(() => true);
      } else {
        return toHome();
      }
    }
    login();
  };

  const loginFaildWarning = isLoginFaild ? (
    <div className={styles.userFormWarning}>Пользователя с такими данными не существует!</div>
  ) : null;

  return (
    <div className={styles.userCreate}>
      <h1 className={styles.userFormTitle}>Sign In</h1>
      {loginFaildWarning}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.userCreateForm}>
        <label className={styles.userFormLabel} htmlFor="email">
          Email address
          <input
            {...register('email', {
              required: 'Это поле обязательна для заполнения',
            })}
            autoComplete="true"
            id="email"
            className={styles.userForm}
            type="email"
            placeholder="Email address"
          ></input>
          <p className={styles.formError}>{errors.password?.message ? errors.password?.message : null}</p>
        </label>

        <label className={styles.userFormLabel} htmlFor="password">
          Password
          <input
            autoComplete="true"
            {...register('password', {
              required: 'Это поле обязательна для заполнения',
              maxLength: {
                value: 40,
                message: 'Максимальная длинна пароля 40 символов',
              },
              minLength: {
                value: 6,
                message: 'Минимальная длинна пароля 6 сивола',
              },
            })}
            id="password"
            className={styles.userForm}
            type="password"
            placeholder="Password"
          ></input>
          <p className={styles.formError}>{errors.password?.message ? errors.password?.message : null}</p>
        </label>

        <Button htmlType="submit" type="primary" size="large" block>
          Login
        </Button>
        <div className={styles.login}>
          Don’t have an account?
          <Link to={'/sign-up'} className={styles.loginText}>
            Sign Up
          </Link>
          .
        </div>
      </form>
    </div>
  );
}
