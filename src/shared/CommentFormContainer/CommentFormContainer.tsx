import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateAnswer, updateComment } from '../../store/reducer';
import { CommentForm } from '../CommentForm';
import { useForm } from "react-hook-form";

interface ICommentFormContainer {
  name?: string;
  isReply?: boolean;
}

export function CommentFormContainer({ name, isReply }: ICommentFormContainer) {
  const { register, handleSubmit, setFocus, formState: { errors } } = useForm();

  const valueComment = useSelector<RootState, string>(state => state.commentText);
  const valueAnswer = useSelector<RootState, string>(state => state.answerText);
  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    if (isReply) {
      dispatch(updateAnswer(event.target.value));
    } else {
      dispatch(updateComment(event.target.value));
    }
  }

  const onSubmit = () => {
    alert('Комментарий отправлен!');

    if (isReply) {
      dispatch(updateAnswer(''));
    } else {
      dispatch(updateComment(''));
    }

    setFocus("comment");
  };

  useEffect(() => {
    setFocus("comment");
  }, [setFocus]);

  const placeholder = isReply ? `${name ? name : 'Аноним'}, ` : `${name ? name : 'Аноним'}, оставьте ваш комментарий`;

  const value = isReply ? valueAnswer : valueComment

  return (
    <CommentForm
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit(onSubmit)}
      placeholder={placeholder}
      errors={errors}
      register={register}
    />
  );
}
