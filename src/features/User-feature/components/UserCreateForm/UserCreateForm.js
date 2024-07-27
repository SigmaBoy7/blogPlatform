import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Checkbox, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { userDataIsAlreadyTaken } from '../../errors/errors';
import { createUser } from '../../api/api';

import styles from './UserCreateForm.module.scss';

export default function UserCreateForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isUserExist, setIsUserExist] = useState(false);
  const [createError, setCreateError] = useState(false);
  const [errorText, setErrorText] = useState('');

  function toLogin() {
    navigate('/sign-in');
  }

  const onSubmit = (data) => {
    async function fetchCreateUser() {
      try {
        const user = await createUser(data);

        const token = user.token;
        localStorage.setItem('login', token);
        return toLogin();
      } catch (err) {
        if (err instanceof userDataIsAlreadyTaken) {
          setIsUserExist(() => true);
          return setErrorText(() => err.message);
        }
        setCreateError(() => true);
      }
    }

    fetchCreateUser();
  };

  const userExistWarning = isUserExist ? <div className={styles.userFormWarning}>{errorText}</div> : null;
  const createErrorWarning = createError ? (
    <div className={styles.userFormWarning}>Непредвиденная ошибка! Повторите позднее</div>
  ) : null;

  return (
    <div className={styles.userCreate}>
      <h1 className={styles.userFormTitle}>Create new account</h1>
      {userExistWarning}
      {createErrorWarning}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.userCreateForm}>
        <label className={styles.userFormLabel} htmlFor="username">
          Username
          <input
            {...register('username', {
              required: 'Это поле обязательно для заполнения',
              maxLength: {
                value: 20,
                message: 'Максимальная длинна ника 20 символов',
              },
              minLength: {
                value: 3,
                message: 'Минимальная длинна ника 3 сивола',
              },
            })}
            autoComplete="true"
            id="username"
            className={styles.userForm}
            type="text"
          ></input>
          <p className={styles.formError}>{errors.username?.message ? errors.username?.message : null}</p>
        </label>

        <label className={styles.userFormLabel} htmlFor="email">
          Email address
          <input
            {...register('email', {
              required: 'Это поле обязательно для заполнения',
            })}
            autoComplete="true"
            id="email"
            className={styles.userForm}
            type="email"
          ></input>
          <p className={styles.formError}>{errors.email?.message ? errors.email?.message : null}</p>
        </label>

        <label className={styles.userFormLabel} htmlFor="password">
          Password
          <input
            autoComplete="true"
            {...register('password', {
              required: 'Это поле обязательно для заполнения',
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
          ></input>
          <p className={styles.formError}>{errors.password?.message ? errors.password?.message : null}</p>
        </label>

        <label className={styles.userFormLabel} htmlFor="repeatPassword">
          Repeat Password
          <input
            autoComplete="true"
            {...register('repeatPassword', {
              required: 'Это поле обязательно для заполнения',
              validate: (val) => {
                if (watch('password') != val) {
                  return 'Пароли не совпадают';
                }
              },
              maxLength: {
                value: 40,
                message: 'Максимальная длинна пароля 40 символов',
              },
              minLength: {
                value: 6,
                message: 'Минимальная длинна пароля 6 сивола',
              },
            })}
            id="repeatPassword"
            className={styles.userForm}
            type="password"
          ></input>
          <p className={styles.formError}>{errors.repeatPassword?.message ? errors.repeatPassword?.message : null}</p>
        </label>

        <div className={styles.formCheckbox}>
          <Checkbox required={true} type="checkbox">
            I agree to the processing of my personal information
          </Checkbox>
        </div>
        <Button htmlType="submit" type="primary" size="large" block>
          Create
        </Button>
        <div className={styles.login}>
          Already have an account?{' '}
          <Link to={'/sign-in'} className={styles.loginText}>
            Sign In
          </Link>
          .
        </div>
      </form>
    </div>
  );
}
