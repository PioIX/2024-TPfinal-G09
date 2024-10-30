// components/Sobre.jsx
import React from 'react';
import styles from './sobres.module.css';

const Sobre = ({ imagenSrc, texto, subtitulo }) => {
    return (
        <div className={styles.sobre}>
            <div className={styles.contenido}>
                <img src="/panini-logo.png" alt="Logo de Panini" className={styles.logo} />
                <img src="/pioix-logo.png" alt="Imagen del sobre" className={styles.imagen} />
                <div className={styles.texto}>{texto}</div>
                {subtitulo && <div className={styles.subtexto}>{subtitulo}</div>}
            </div>
        </div>
    );
};

export default Sobre;
