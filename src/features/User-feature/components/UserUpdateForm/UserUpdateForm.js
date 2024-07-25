import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { UserAuthContext } from '../../../../context/UserContext';

import styles from './UserUpdateForm.module.scss';

export default function UserUpdateForm() {
  const [updateFaildMessage, setUpdateFaildMessage] = useState('');
  const context = useContext(UserAuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: context.user?.username,
      email: context.user?.email,
      avatarImage: context.user?.image,
    },
  });

  useEffect(() => {
    setValue('username', context.user?.username);
    setValue('email', context.user?.email);
    setValue('avatarImage', context.user?.image);
  }, [context.user, setValue]);

  const onSubmit = async (data) => {
    const changeStatus = await context.changeUser(data);

    if (changeStatus.status === false) {
      return setUpdateFaildMessage(() => changeStatus.message);
    }

    if (!changeStatus) {
      return context.setIsChangeFaild(() => true);
    }

    navigate('/');
  };

  const loginFaildWarning = context.isChangeFaild ? (
    <div className={styles.userFormWarning}>{updateFaildMessage}</div>
  ) : null;

  return (
    <div className={styles.userCreate}>
      <h1 className={styles.userFormTitle}>Edit Profile</h1>
      {loginFaildWarning}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.userCreateForm}>
        <label className={styles.userFormLabel} htmlFor="username">
          Username
          <input
            {...register('username', {
              required: 'Это поле обязательна для заполнения',
              maxLength: {
                value: 20,
                message: 'Максимальная длинна ника 20 символов',
              },
              minLength: {
                value: 3,
                message: 'Минимальная длинна ника 3 сивола',
              },
            })}
            defaultValue={context.user?.username}
            placeholder="Username"
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
              required: 'Это поле обязательна для заполнения',
            })}
            defaultValue={context.user?.email}
            autoComplete="true"
            id="email"
            className={styles.userForm}
            type="email"
            placeholder="Email address"
          ></input>
          <p className={styles.formError}>{errors.email?.message ? errors.email?.message : null}</p>
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

        <label className={styles.userFormLabel} htmlFor="avatarImage">
          Avatar image (url)
          <input
            autoComplete="true"
            {...register('avatarImage', {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'invalid URL',
              },
            })}
            defaultValue={context.user?.image}
            placeholder="Avatar image"
            id="avatarImage"
            className={styles.userForm}
            type="avatarImage"
          ></input>
          <p className={styles.formError}>{errors.avatarImage?.message ? errors.avatarImage?.message : null}</p>
        </label>

        <Button htmlType="submit" type="primary" size="large" block>
          Save
        </Button>
      </form>
    </div>
  );
}
