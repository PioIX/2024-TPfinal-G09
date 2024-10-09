"use client"

import clsx from "clsx"
import React from 'react';
import style from "@/components/userProfilePic.module.css"

export default function UserProfilePic({ imageUrl }) {

  return <img src={imageUrl} alt="Profile" className={style.profilePic}
  />;
}