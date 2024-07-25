import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import PostForm from '../PostForm/PostForm';
import { updateArticle } from '../../api/api';

import styles from './PostEditForm.module.scss';

export default function PostCreateForm() {
  const state = useLocation().state;
  const [tagList, setTagList] = useState([...state.tagList]);
  const [newTagInputValue, setNewTagInputValue] = useState('');
  const [isNewTagAlreadyExist, setIsNewTagAlreadyExist] = useState(false);
  const navigate = useNavigate();

  async function fetchUpdateArticle(newArticleData, slug) {
    try {
      const data = await updateArticle(newArticleData, slug);

      if (!data) {
        return null;
      }
      return data;
    } catch (err) {
      console.assert(err);
    }
  }

  async function onSubmit(data) {
    const newArticleData = { ...data, tags: tagList };
    const articleData = await fetchUpdateArticle(newArticleData, state.slug);
    navigate(`/posts/${articleData.article.slug}`);
  }
  function handleInputTag(e) {
    const value = e.target.value;
    setNewTagInputValue(value);
    setIsNewTagAlreadyExist(tagList.includes(value));
  }

  function handleCreateTag(e) {
    e.preventDefault();
    if (newTagInputValue && !isNewTagAlreadyExist) {
      setTagList((prevTagList) => [...prevTagList, newTagInputValue]);
      setNewTagInputValue('');
    }
  }

  function handleDeleteTag(tagToDelete) {
    setTagList((prevTagList) => prevTagList.filter((tag) => tag !== tagToDelete));
  }

  const tagInputs = tagList.map((tag, index) => (
    <div className={styles.newTagInput} key={index}>
      <input className={styles.postInput} defaultValue={tag}></input>
      <button onClick={() => handleDeleteTag(tag)} className={styles.postTagDelete}>
        Delete
      </button>
    </div>
  ));

  const newTagInput = (
    <div>
      {tagInputs}
      <div className={styles.newTagInput}>
        <input
          type="tag"
          id="tag"
          value={newTagInputValue}
          onChange={handleInputTag}
          className={styles.postInput}
        ></input>
        <button onClick={handleCreateTag} className={styles.postTagAdd}>
          Add tag
        </button>
        {isNewTagAlreadyExist ? <p className={styles.tagInputError}>Tag already exist</p> : null}
      </div>
    </div>
  );

  return (
    <div className={styles.postForm}>
      <div className={styles.postFormBody}>
        <h1 className={styles.postFormTitle}>Edit article</h1>
        <PostForm defaultValue={state} onSubmit={onSubmit}>
          {newTagInput}
        </PostForm>
      </div>
    </div>
  );
}
