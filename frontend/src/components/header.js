"use client";
import React, { useEffect, useState } from 'react';
import styles from './header.module.css';
import { getUserById } from "@/functions/fetch.js";
import ActualProfilePic from './actualProfilePic';

export default function Header({ username, profileImage, idUser, money }) {
  const [userData, setUserData] = useState(null);

  // Función para obtener los datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserById(idUser);
      setUserData(data); // Guardamos los datos del usuario
    };

    fetchUserData();
  }, [idUser]);

  async function menu() {
    window.location.href = `/menu?idUser=${idUser}`;
  }

  // Condicional para mostrar el dinero solo si userData es un objeto válido
  const shouldShowMoney = userData !== null && userData !== undefined;

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
