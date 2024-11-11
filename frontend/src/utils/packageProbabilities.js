// src/utils/packageProbabilities.js

export const packageProbabilities = {
    comun: {
      guaranteedRarity: 'comun',
      probabilities: { comun: 50, especial: 35, rara: 10, epica: 0, legendaria: 2, iconico: 3, flashback: 0 },
    },
    especial: {
      guaranteedRarity: 'especial',
      probabilities: { comun: 30, especial: 50, rara: 15, epica: 0, legendaria: 2, iconico: 3, flashback: 0 },
    },
    rara: {
      guaranteedRarity: 'rara',
      probabilities: { comun: 25, especial: 35, rara: 20, epica: 10, legendaria: 2, iconico: 3, flashback: 0 },
    },
    epica: {
      guaranteedRarity: 'epica',
      probabilities: { comun: 25, especial: 20, rara: 15, epica: 30, legendaria: 5, iconico: 5, flashback: 0 },
    },
    legendaria: {
      guaranteedRarity: 'legendaria',
      probabilities: { comun: 0, especial: 15, rara: 25, epica: 40, legendaria: 20, iconico: 0, flashback: 0 },
    },
    iconico: {
      guaranteedRarity: 'iconico',
      probabilities: { comun: 0, especial: 15, rara: 25, epica: 40, legendaria: 0, iconico: 20, flashback: 0 },
    },
    aleatorio: {
      guaranteedRarity: 'aleatorio',
      probabilities: { comun: 20, especial: 20, rara: 20, epica: 20, legendaria: 10, iconico: 10, flashback: 0 },
    },
    flashback: {
      guaranteedRarity: 'flashback',
      probabilities: { comun: 0, especial: 0, rara: 0, epica: 0, legendaria: 0, iconico: 0, flashback: 100 },
    },
  };
  