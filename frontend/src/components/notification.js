"use client";

import React from "react";
import styles from "@/components/notification.module.css";

export default function Notification({ count }) {
  if (count === 0) {
    return null; // No mostrar nada si la cuenta es 0
  }

  return (
    <div className={styles.notification}>
      {count}
    </div>
  );
}