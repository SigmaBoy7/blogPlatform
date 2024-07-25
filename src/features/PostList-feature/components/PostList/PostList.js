import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getPosts } from '../../api/posts';
import Post from '../Post';
import PostsPagination from '../PostsPagination';

import styles from './PostList.module.scss';

export default function PostList() {
  const [postsList, setPostsList] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoPosts, setIsNoPosts] = useState(false);

  async function fetchPosts(currentPage = 1) {
    setIsLoading(true);
    try {
      const posts = await getPosts(currentPage);
      setPostsList(() => {
        return posts.articles;
      });
      setTotalPostsCount(posts.articlesCount);
      setIsLoading(false);
      setIsNoPosts(false);
    } catch {
      setFetchError(true);
      setIsNoPosts(true);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const errorMessage = fetchError ? <div>Error</div> : null;
  const loading = isLoading ? (
    <div className={styles.loading}>
      <div className={styles.loader} />
    </div>
  ) : null;
  const noPostsError = isNoPosts ? <div>No Posts ...</div> : null;
  const postListBlock = postsList.map((post) => (
    <Link to={`/posts/${post.slug}`} state={post} className={styles.postCard} key={post.slug}>
      <Post className={styles.post} data={post} />
    </Link>
  ));
  return (
    <section className={styles.postList}>
      {loading}
      {noPostsError}
      {postListBlock}
      {errorMessage}
      <div className={styles.postsPagination}>
        <PostsPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPostsCount={totalPostsCount} />
      </div>
    </section>
  );
}
