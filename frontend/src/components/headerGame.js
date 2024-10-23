"use client";

import React from "react";

export default function GameHeader({ label, type, name, value, onChange }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );}