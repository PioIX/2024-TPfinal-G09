"use client";
import React from 'react';
import styles from './header.module.css';
import ActualProfilePic from './actualProfilePic';

export default function Header({ username, profileImage, idUser, money }) {
  async function menu() {
    window.location.href = `/menu?idUser=${idUser}`;
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 onClick={menu}>
          <span className={styles.logoPrimary}>PIO</span>
          <span className={styles.logoSecondary}> CARDS</span>
        </h1>
      </div>

      {/* Mostrar el dinero del usuario */}
      <div className={styles.money}>
        <span className={styles.username}>Dinero: </span>
        <span className={styles.logoSecondary}>${money}</span>
      </div>

      <div className={styles.userInfo}>
        <span className={styles.username}>{username}</span>
        <ActualProfilePic imageUrl={profileImage} className={styles.profilePic} />
      </div>
    </header>
  );
}

