import React from 'react';
import { useLoaderData, Link, useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Popconfirm } from 'antd';

import { getArticle, deleteArticle, addFavorite, deleteFavorite } from '../../api/api';

import styles from './Post.module.scss';

export default function FullPost() {
  const article = useLoaderData().article;
  const navigate = useNavigate();

  if (!article) {
    return <div>Такого поста нету</div>;
  }

  async function handleDelete() {
    await deleteArticle(article.slug);
    navigate('/');
  }

  async function handleLikeClick() {
    if (article.favorited) {
      await deleteFavorite(article.slug);
      return navigate(0);
    }
    await addFavorite(article.slug);
    navigate(0);
  }

  const postOwnerImg = (
    <img
      style={{ height: '46px', width: '46px' }}
      className={styles.postOwnerImg}
      src="https://masterpiecer-images.s3.yandex.net/02daa7a96cf811eeb1b0d659965eed18:upscaled"
    ></img>
  );

  const postBody = <ReactMarkdown>{article.body}</ReactMarkdown>;
  const postsButton = (
    <div className={styles.postButtons}>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <button to={'/'} className={styles.postButton}>
          Delete
        </button>
      </Popconfirm>
      <Link to={`/articles/${article.slug}/edit`} state={article} className={styles.postButton}>
        Edit
      </Link>
    </div>
  );

  return article ? (
    <div className="full-post-page" style={{ paddingTop: '26px' }}>
      <article className={`${styles.post} ${styles.postFull}`}>
        <div className={styles.postBody}>
          <header className={styles.postHeader}>
            <div className={styles.postInfo}>
              <div className={styles.postInfoTop}>
                <div className={styles.postTitle}>{article.title.trim() !== '' ? article.title : 'Нет тайтла'}</div>
                <button onClick={handleLikeClick} className={article.favorited ? styles.postLiked : styles.postLikes}>
                  {article.favoritesCount}
                </button>
              </div>
              <div className={styles.postTags}>
                {article.tagList.map((item) => {
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
                <div className={styles.postOwner}>{article.author.username}</div>
                <div className={styles.postCreationDate}>{format(new Date(article.createdAt), 'MMMM dd, yyyy')}</div>
              </div>
              {postOwnerImg}
            </div>
          </header>
          <div className={styles.postDescription}>
            {article.description}
            {postsButton}
          </div>
          <div className={styles.postMarkdown}> {postBody}</div>
        </div>
      </article>
    </div>
  ) : null;
}

const articleLoader = async ({ params }) => {
  const slug = params.slug;
  try {
    const article = await getArticle(slug);
    return article;
  } catch (err) {
    return {};
  }
};

export { articleLoader };
