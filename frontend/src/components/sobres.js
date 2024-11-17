import React from 'react';
import Sobre from "@/components/sobre"
import styles from './Sobres.module.css';
function Sobres({ sobres, setSobreSelect }) {
  return (
    <div className={styles.sobresContainer}>
      {sobres.map((sobre) => (
        <Sobre key={sobre.id} sobre={sobre} setSobreSelect={setSobreSelect} />
      ))}
    </div>
  );
}

export default Sobres;
