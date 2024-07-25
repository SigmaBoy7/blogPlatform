import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';

import styles from './PostForm.module.scss';

export default function PostForm({ onSubmit, defaultValue, children }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.postFormLabel} htmlFor="title">
        Title
        <input
          {...register('title', {
            required: 'Это поле обязательна для заполнения',
          })}
          defaultValue={defaultValue?.title}
          autoComplete="true"
          id="title"
          className={styles.postInput}
          type="title"
          placeholder="Title"
        ></input>
        <p className={styles.formError}>{errors.title?.message ? errors.title?.message : null}</p>
      </label>

      <label className={styles.postFormLabel} htmlFor="shortDescription">
        Short description
        <input
          {...register('shortDescription', {
            required: 'Это поле обязательна для заполнения',
          })}
          defaultValue={defaultValue?.description}
          autoComplete="true"
          id="shortDescription"
          className={styles.postInput}
          type="shortDescription"
          placeholder="Short description"
        ></input>
        <p className={styles.formError}>{errors.shortDescription?.message ? errors.shortDescription?.message : null}</p>
      </label>

      <label className={styles.postFormLabel} htmlFor="text">
        Text
        <textarea
          {...register('text', {
            required: 'Это поле обязательна для заполнения',
          })}
          defaultValue={defaultValue?.body}
          autoComplete="true"
          id="text"
          className={`${styles.postInput} ${styles.postInputText}`}
          type="text"
          placeholder="Text"
        ></textarea>
        <p className={styles.formError}>{errors.text?.message ? errors.text?.message : null}</p>
      </label>
      {children}
      <div className={styles.submitButton}>
        <Button htmlType="submit" type="primary" size="large" block>
          Send
        </Button>
      </div>
    </form>
  );
}
