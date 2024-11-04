import React from 'react';
import styles from './sobres.module.css';

const Sobre = ({ imagenSrc, texto, subtitulo, rareza, onClick }) => {
    const rarityStyles = {
        Común: "var(--color-común)",
        Épica: "var(--color-épica)",
        Especial: "var(--color-especial)",
        Icónica: "var(--color-icónica)",
        Legendaria: "var(--color-legendaria)",
        Rara: "var(--color-rara)",
        Flashback: "var(--color-flashback)",
        Aleatorio: "var(--color-aleatorio)" // Nuevo color rojo para aleatorio
    };

    return (
        <div className={styles.sobre} style={{ borderImage: rarityStyles[rareza] }} onClick={onClick}>
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

/*
todos los sobres garantizan que su ultima carta sea de la rareza del sobre
probabiliades de las cartas dentro de los sobres:
Común: 
    comun: 50,
    especial: 35,
    rara: 10,
    epica: 0,
    legendaria: 2,
    iconicas: 3,
    flashback: 0
Especial:
    comun: 30,
    especial: 50,
    rara: 15,
    epica: 0,
    legendaria: 2,
    iconicas: 3,
    flashback: 0
Rara: 
    comun: 25,
    especial: 35,
    rara: 20,
    epica: 10,
    legendaria: 2,
    iconicas: 3,
    flashback: 0
Épica: 
    comun: 25,
    especial: 20,
    rara: 15,
    epica: 30,
    legendaria: 5,
    iconicas: 5,
    flashback: 0
Legendaria:  
    comun: 0,
    especial: 15,
    rara: 25,
    epica: 40,
    legendaria: 20,
    iconicas: 0,
    flashback: 0
Icónicas: 
    comun: 0,
    especial: 15,
    rara: 25,
    epica: 40,
    legendaria: 0,
    iconicas: 20,
    flashback: 0

Flashback: 
    comun: 0,
    especial: 0,
    rara: 0,
    epica: 0,
    legendaria: 0,
    iconicas: 0,
    flashback: 100
Aleatorio:
    comun: 20,
    especial: 20,
    rara: 20,
    epica: 20,
    legendaria: 10,
    iconicas: 10,
    flashback: 0
*/