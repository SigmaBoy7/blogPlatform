import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PostForm from '../PostForm/PostForm';
import { createArticle } from '../../api/api';

import styles from './PostCreateForm.module.scss';

export default function PostCreateForm() {
  const [tagList, setTagList] = useState([]);
  const [newTagInputValue, setNewTagInputValue] = useState('');
  const [isNewTagAlreadyExist, setIsNewTagAlreadyExist] = useState(false);
  const navigate = useNavigate();

  async function fetchCreateArticle(newArticleData) {
    try {
      const data = await createArticle(newArticleData);

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
    const articleData = await fetchCreateArticle(newArticleData);
    navigate(`/posts/${articleData.article.slug}`);
  }

  function handleInputTag(e) {
    if (tagList.includes(e.target.value)) {
      setIsNewTagAlreadyExist(() => true);
      return setNewTagInputValue(() => e.target.value);
    }
    setIsNewTagAlreadyExist(() => false);
    setNewTagInputValue(() => e.target.value);
  }

  function handleCreateTag(e) {
    e.preventDefault();

    if (newTagInputValue && !isNewTagAlreadyExist) {
      setTagList((prevValue) => {
        if (prevValue) {
          return [...prevValue, newTagInputValue];
        } else {
          return [newTagInputValue];
        }
      });
      setNewTagInputValue(() => '');
    }
  }

  function handleDeleteTag(e) {
    const tagForDelete = e.target.value;
    setTagList((prevValue) => {
      const newTagList = prevValue.filter((tag) => tag !== tagForDelete);
      return newTagList;
    });
  }

  const tagInputs = tagList
    ? tagList.map((tag) => {
        return (
          <div className={styles.newTagInput} key={tag}>
            <input className={styles.postInput} defaultValue={tag}></input>
            <button onClick={handleDeleteTag} value={tag} className={styles.postTagDelete}>
              Delete
            </button>
          </div>
        );
      })
    : null;

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
        <h1 className={styles.postFormTitle}>Create new article</h1>
        <PostForm onSubmit={onSubmit}>{newTagInput}</PostForm>
      </div>
    </div>
  );
}
