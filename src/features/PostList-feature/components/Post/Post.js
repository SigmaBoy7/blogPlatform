import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { v4 as uuid4 } from 'uuid';

import { addFavorite, deleteFavorite } from '../../api/posts';

import styles from './Post.module.scss';

export default function Post({ data }) {
  const navigate = useNavigate();

  async function handleLikeClick(e) {
    e.preventDefault();
    if (data.favorited) {
      await deleteFavorite(data.slug);
      return navigate(0);
    }
    await addFavorite(data.slug);
    navigate(0);
  }

  const postOwnerImg = (
    <img style={{ height: '46px', width: '46px' }} className={styles.postOwnerImg} src={data.author.image}></img>
  );

  return (
    <article className={`${styles.post} ${styles.postSmall}`}>
      <div className={styles.postBody}>
        <header className={styles.postHeader}>
          <div className={styles.postInfo}>
            <div className={styles.postInfoTop}>
              <div className={styles.postTitle}>{data.title.trim() !== '' ? data.title : 'Нет тайтла'}</div>
              <button onClick={handleLikeClick} className={data.favorited ? styles.postLiked : styles.postLikes}>
                {data.favoritesCount}
              </button>{' '}
            </div>
            <div className={styles.postTags}>
              {data.tagList.map((item) => {
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
              <div className={styles.postOwner}>{data.author.username}</div>
              <div className={styles.postCreationDate}>{format(new Date(data.createdAt), 'MMMM dd, yyyy')}</div>
            </div>
            {postOwnerImg}
          </div>
        </header>
        <div className={styles.postDescription}>{data.description}</div>
      </div>
    </article>
  );
}
