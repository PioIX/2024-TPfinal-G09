"use client";

import React from "react";
import styles from "@/components/inputEdit.module.css"; // Archivo CSS para personalizar los inputs

export default function InputEdit({ label, type, name, value, onChange, placeholder}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}