"use client"

import clsx from "clsx"
import React from 'react';
import style from "@/components/profilePic.module.css"

export default function ProfilePic({ imageUrl }) {

  return <img src={imageUrl} alt="Profile" className={style.profilePic}
  />;
}