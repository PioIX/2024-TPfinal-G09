// src/components/Sobre.js

import React from 'react';
import styles from './sobres.module.css';
import { packageProbabilities } from '@/utils/packageProbabilities';

// Función para seleccionar una carta según probabilidad
function selectCardByProbability(cards, probabilities) {
  const rand = Math.random() * 100;
  let cumulativeProbability = 0;
  let selectedRarity;

  for (const [rarity, probability] of Object.entries(probabilities)) {
    cumulativeProbability += probability;
    if (rand <= cumulativeProbability) {
      selectedRarity = rarity;
      break;
    }
  }

  const filteredCards = cards.filter((card) => card.calidad === selectedRarity);
  return filteredCards.length > 0
    ? filteredCards[Math.floor(Math.random() * filteredCards.length)]
    : cards[Math.floor(Math.random() * cards.length)];
}

// Componente Sobre
const Sobre = ({ imagenSrc, texto, subtitulo, rareza, onClick, allCards }) => {
  const rarityStyles = {
    común: "var(--color-Común)",
    especial: "var(--color-Especial)",
    rara: "var(--color-Rara)",
    épica: "var(--color-Épica)",
    legendaria: "var(--color-Legendaria)",
    icónica: "var(--color-Icónica)",
    flashback: "var(--color-Flashback)",
    aleatorio: "var(--color-Aleatorio)",
  };

  // Función para generar el paquete de cartas
  const generateCardPack = () => {
    const packConfig = packageProbabilities[rareza] || packageProbabilities.aleatorio;
    const { probabilities, guaranteedRarity } = packConfig;

    const generatedPack = [];
    for (let i = 0; i < 4; i++) {
      const selectedCard = selectCardByProbability(allCards, probabilities);
      if (selectedCard) {
        generatedPack.push(selectedCard);
      }
    }

    const guaranteedCards = allCards.filter((card) => card.calidad === guaranteedRarity);
    if (guaranteedCards.length > 0) {
      const guaranteedCard = guaranteedCards[Math.floor(Math.random() * guaranteedCards.length)];
      generatedPack.push(guaranteedCard);
    }

    return generatedPack;
  };

  const handleClick = () => {
    const generatedPack = generateCardPack();
    console.log("Generated Card Pack:", generatedPack);
    onClick(generatedPack); // Llamar a la función de callback con el paquete generado
  };

  return (
    <div className={styles.sobre} style={{ borderImage: rarityStyles[rareza] }} onClick={handleClick}>
      <div className={styles.contenido}>
        <img src="/panini-logo.png" alt="Logo de Panini" className={styles.logo} />
        <div className={styles.texto}>{texto}</div>
        {subtitulo && <div className={styles.subtexto}>{subtitulo}</div>}
      </div>
    </div>
  );
};

export default Sobre;
