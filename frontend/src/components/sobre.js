import React from 'react';
import styles from "@/components/sobre.module.css"

export default function Sobre({ sobre, setSobreSelect }) {
    const name=sobre.name
    const price=sobre.price

        const getClassByName = (name) => {
          switch (name) {
            case 'Común':
              return styles.comun;
            case 'Especial':
              return styles.especial;
            case 'Rara':
              return styles.rara;
            case 'Épica':
              return styles.epica;
            case 'Legendaria':
              return styles.legendaria;
            case 'Icónica':
              return styles.iconica;
            case 'Flashback':
              return styles.flashback;
            case 'Gold':
              return styles.gold;
            case 'Aleatorio':
                return styles.aleatorio;
            case 'Future Star':
                  return styles.future;
            default:
              return styles.default;
          }
        };
        
        return (
          <div className={`${styles.sobre} ${getClassByName(name)}`} onClick={() => setSobreSelect(sobre)}>
            <div className={styles.content}>
              <div className={styles.logo}>
                <span className={styles.pio}>Pio</span>
                <span className={styles.cards}>Cards</span>
              </div>
              <h3 className={styles.h3}>{name}</h3>
              <p className={styles.p}>Precio: ${price} </p>
              <img
                src="/panini-logo.png"
                alt="Logo Panini"
                className={styles.paniniLogo}
              />
            </div>
          </div>
        );
      }
  