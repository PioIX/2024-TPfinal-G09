"use client";

import React from "react";
import UserProfilePic from "./userProfilePic";

export default function Deportista({nombre, apellido, username, image}) {
  return (
    <div className={styles.chatContainer}>
      <h3>{username}</h3>      
      <p>{nombre}, {apellido}</p>
      <UserProfilePic imageUrl={image} />
    </div>
  );
}