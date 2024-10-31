import React from 'react';
import styles from './sobres.module.css';

const Sobre = ({ imagenSrc, texto, subtitulo, rareza }) => {
    const rarityStyles = {
        Común: "var(--color-común)",
        Épica: "var(--color-épica)",
        Especial: "var(--color-especial)",
        Icónicas: "var(--color-icónicas)",
        Legendaria: "var(--color-legendaria)",
        Rara: "var(--color-rara)",
        Flashback: "var(--color-flashback)"
    };

    return (
        <div className={styles.sobre} style={{ borderImage: rarityStyles[rareza] }}>
            <div className={styles.contenido}>
                <img 
                    src={"/panini-logo.png"} 
                    alt="Logo de Panini" 
                    className={styles.logo} 
                />
                <div className={styles.texto}>{texto}</div>
                {subtitulo && <div className={styles.subtexto}>{subtitulo}</div>}
            </div>
        </div>
    );
};

export default Sobre;

