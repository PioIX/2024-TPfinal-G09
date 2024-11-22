"use client";
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import ActualProfilePic from './actualProfilePic';

export default function Header({ username, profileImage, idUser, money }) {

  async function menu() {
    if(notLogin){
    window.location.href = `/menu?idUser=${idUser}`;
    }
  }

  // Condicional para mostrar el dinero solo si userData es un objeto válido
  const shouldShowMoney = money !== null && money !== undefined;
  const notLogin = username !== null && username !== undefined;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 onClick={menu}>
          <span className={styles.logoPrimary}>PIO</span>
          <span className={styles.logoSecondary}> CARDS</span>
        </h1>
      </div>

      {/* Solo mostrar el div de dinero si userData es un objeto válido */}
      {shouldShowMoney && (
        <div className={styles.money}>
          <span className={styles.username}>Dinero: </span>
          <span className={styles.logoSecondary}>${money}</span>
        </div>
      )}

      <div className={styles.userInfo}>
        <span className={styles.username}>{username}</span>
        <ActualProfilePic imageUrl={profileImage} className={styles.profilePic} />
      </div>
    </header>
  );
}
