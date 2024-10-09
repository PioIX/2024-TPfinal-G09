"use client";

import React from "react";
import styles from "@/components/input.module.css"; // Archivo CSS para personalizar los inputs

export default function Input({ label, type, name, value, onChange }) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}