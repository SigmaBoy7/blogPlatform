import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserAuthContext } from '../../context/UserContext';

import styles from './AppHeader.module.scss';

export default function AppHeader() {
  const context = useContext(UserAuthContext);
  const user = context.user;
  const navigate = useNavigate();

  function handleLogOutClick() {
    function toHome() {
      navigate('/sign-in');
    }
    context.logOut();
    toHome();
  }

  const userButtons = user ? (
    <div className={styles.headerRight}>
      <Link to={'/new-article'} className={styles.headerButtonUser}>
        Create article
      </Link>

      <Link to={'/profile'} className={`${styles.headerButtonUser} ${styles.userButton}`}>
        {user.username}
        <img style={{ height: '46px', width: '46px' }} className={styles.PostOwnerImg} src={user.image}></img>
      </Link>

      <a onClick={handleLogOutClick} className={styles.headerButtonUser}>
        Log out
      </a>
    </div>
  ) : (
    <div className={styles.headerRight}>
      <Link to={'/sign-in'} className={styles.headerButton}>
        Sign In
      </Link>

      <Link to={'/sign-up'} className={styles.headerButton}>
        Sign Up
      </Link>
    </div>
  );

  return (
    <header className={styles.header}>
      <div className={styles.headerBody}>
        <div className={styles.headerLeft}>
          <Link className={styles.homeButton} to={'/'}>
            <span>Realworld Blog</span>
          </Link>
        </div>
        {userButtons}
      </div>
    </header>
  );
}
