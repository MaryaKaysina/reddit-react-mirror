import React, { ChangeEvent, FormEvent } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import styles from './commentform.css';

interface ICommentForm {
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent) => void;
  register: UseFormRegister<FieldValues>;
  errors: any;
}

export function CommentForm({ value, onChange, onSubmit, placeholder, register, errors }: ICommentForm) {
  const errorMessage = 'Введите больше 3-х символов';

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        {...register("comment", { required: errorMessage, minLength: { value: 4, message: errorMessage } })}
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={errors.comment ? 'true' : undefined}
      />
      <ErrorMessage
        errors={errors}
        name="comment"
        render={({ message }) => <p>{message}</p>}
      />

      <button
        type='submit'
        className={styles.button}
      >
        Комментировать
      </button>
    </form>
  );
}
