import React, { useState } from 'react';
import { format } from 'date-fns';
import { v4 as uuid4 } from 'uuid';

import { addFavorite, deleteFavorite } from '../../api/posts';

import styles from './Post.module.scss';

export default function Post({ data }) {
  const [post, setPost] = useState(data);
  async function handleLikeClick(e) {
    e.preventDefault();
    if (post.favorited) {
      setPost((prevData) => {
        const newLikesCount = prevData.favoritesCount - 1;
        return {
          ...prevData,
          favoritesCount: newLikesCount,
          favorited: false,
        };
      });
      return await deleteFavorite(post.slug);
    }
    await addFavorite(post.slug);
    setPost((prevData) => {
      const newLikesCount = prevData.favoritesCount++;
      return {
        ...prevData,
        favoritesCount: newLikesCount,
        favorited: true,
      };
    });
  }

  const postOwnerImg = (
    <img style={{ height: '46px', width: '46px' }} className={styles.postOwnerImg} src={post.author.image}></img>
  );

  return (
    <article className={`${styles.post} ${styles.postSmall}`}>
      <div className={styles.postBody}>
        <header className={styles.postHeader}>
          <div className={styles.postInfo}>
            <div className={styles.postInfoTop}>
              <div className={styles.postTitle}>{post.title.trim() !== '' ? post.title : 'Нет тайтла'}</div>
              <button onClick={handleLikeClick} className={post.favorited ? styles.postLiked : styles.postLikes}>
                {post.favoritesCount}
              </button>{' '}
            </div>
            <div className={styles.postTags}>
              {post.tagList.map((item) => {
                if (item && item.trim() !== '') {
                  return (
                    <div className={styles.postTag} key={uuid4()}>
                      {item}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className={styles.postOwnerInfo}>
            <div className={styles.postOwnerName}>
              <div className={styles.postOwner}>{post.author.username}</div>
              <div className={styles.postCreationDate}>{format(new Date(post.createdAt), 'MMMM dd, yyyy')}</div>
            </div>
            {postOwnerImg}
          </div>
        </header>
        <div className={styles.postDescription}>{post.description}</div>
      </div>
    </article>
  );
}
