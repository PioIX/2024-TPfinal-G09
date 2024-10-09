"use client"
import styles from "@/components/button.module.css"; // Estilos CSS
//props
export default function Button(props) {
    
    return (
      <button className={styles.button} onClick={props.onClick}> {props.children} </button>
    );
  };
  