
export function findXByID(id, vector) {
  for (let i = 0; i < vector.length; i++) {
      if (vector[i].id == id) {
          return i; // Devuelve la posición del cliente en el vector
      }
  }
  return -1; // Si no se encuentra el cliente, devuelve -1
}

export function setCards(cardModels, cards, user) {
  let result = [];

  // Recorremos el array de cards
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];

    // Buscamos el cardModel que coincida con el idModel del card
    for (let j = 0; j < cardModels.length; j++) {
      let model = cardModels[j];

      if (model.id === card.idModel) {
        // Creamos el objeto resultante combinando el modelo y el id del jugador
        let resultCard = {
          ...model,       // Copiamos las propiedades del cardModel
          playerId: card.idUser,  // Añadimos el id del jugador
          id: card.id,
          hand: card.hand,
          username: user.username
        };

        result.push(resultCard);  // Añadimos el resultado al array final
        break;  // Terminamos la búsqueda una vez encontrado el modelo
      }
    }
  }

  return result;
}

export function setGame(juego, winner, user, juegoXUser) {
  // Combina las propiedades de `juego`, `user`, y `juegoXUser` en un nuevo objeto `match`
  const match = { ...juego, ...winner, ...juegoXUser, nombre:user.name, pic:user.image};
  return match;
}

/*export function generarSobre(sobre, cardModels, cards){
  return[4,5,6,1,2]
  /*a esta funcion le ingresas el tipo de sobre, todos los modelos de cartas en general y todas cartas del usuario. Primero separa los cardModels en vectores
distintos de calidad, es decir, va a quedar un vector comun, otro raro, otro especial, otro raro, etc. Según
el tipo de calidad del sobre, el sobre dará primero una carta de su calidad, y luego ira dando cartas de calidades
menores, dependiendo de cada posición de las 5 del sobre tendrá una posibilidad de que dicha carta sea de una calidad
la primera será si o si de la calidad del nombre del sobre, en los sobres más básicos, puede ser que esta primera
carta sea de una calidad mayor, pero solo si tiene suerte. luego de determinar la calidad de las 5 posiciones del 
vector, pasa a una siguiente instancia donde a cada posicion del vector le reemplazará por un*/

export function generarSobre(sobre, cardModels, cards) {
  console.log("ingrese a generar sobre", sobre, cardModels, cards)
  // Paso 1: Clasificar cartas por calidad
  const cartasPorCalidad = clasificarCartasPorCalidad(cardModels);
  console.log("cartasXcalidad", cartasPorCalidad)
  // Paso 2: Probabilidades hardcodeadas para el tipo de sobre
  const probabilidadesPorPosicion = obtenerProbabilidadesPorPosicion(sobre.name);
  console.log("probabilidades por posición", probabilidadesPorPosicion)
  // Paso 3: Determinar calidades de las cartas para las posiciones del sobre
  const calidadesGeneradas = generarCalidadesPorPosicion(probabilidadesPorPosicion, cartasPorCalidad);
  console.log("calidades generadas", calidadesGeneradas)
  // Paso 4: Seleccionar cartas específicas por calidad
  const cartasGeneradas = [];
  for (const calidad of calidadesGeneradas) {
      const carta = seleccionarCarta(calidad, cartasPorCalidad, cards, cartasGeneradas);
      if (carta) cartasGeneradas.push(carta);
  }

  // Paso 5: Ordenar las cartas seleccionadas por calidad
  const calidadesOrdenadas = ["Común", "Especial", "Rara", "Épica", "Flashback", "Legendaria", "Icónica"];
  const vectorObjetos= ordenarCartasPorCalidad(cartasGeneradas, calidadesOrdenadas);
  const result=obtenerIds(vectorObjetos)
  console.log("resultado", result)
  return result
}

function obtenerIds(vectorObjetos) {
  return vectorObjetos.map(objeto => objeto.id);
}

function clasificarCartasPorCalidad(cardModels) {
  const calidades = ["Común", "Especial", "Rara", "Épica","Flashback", "Future Star", "Legendaria", "Icónica"];
  return calidades.reduce((acc, calidad) => {
      acc[calidad] = cardModels.filter(card => card.calidad === calidad);
      return acc;
  }, {});
}

function obtenerProbabilidadesPorPosicion(tipoSobre) {
  const probabilidades = {
    "Común": [
      [
        { calidad: "Común", probabilidad: 0.5 },
        { calidad: "Especial", probabilidad: 0.35 },
        { calidad: "Rara", probabilidad: 0.1 },
        { calidad: "Épica", probabilidad: 0.03 },
        { calidad: "Legendaria", probabilidad: 0.01 },
        { calidad: "Icónica", probabilidad: 0.01 },
      ],
      [
        { calidad: "Común", probabilidad: 0.55 },
        { calidad: "Especial", probabilidad: 0.3 },
        { calidad: "Rara", probabilidad: 0.05 },
        { calidad: "Flashback", probabilidad: 0.05 },
        { calidad: "Future Star", probabilidad: 0.05 },
      ],
      [
        { calidad: "Común", probabilidad: 0.55 },
        { calidad: "Especial", probabilidad: 0.4 },
        { calidad: "Rara", probabilidad: 0.05 },
      ],
      [
        { calidad: "Común", probabilidad: 1 },
      ],
      [
        { calidad: "Común", probabilidad: 1 },
      ],
    ],
    "Especial": [
      [
        { calidad: "Especial", probabilidad: 0.5 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Épica", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.025 },
        { calidad: "Icónica", probabilidad: 0.025 },
      ],
      [
        { calidad: "Especial", probabilidad: 0.9 },
        { calidad: "Flashback", probabilidad: 0.05 },
        { calidad: "Future Star", probabilidad: 0.05 },
      ],
      [
        { calidad: "Especial", probabilidad: 1 },
      ],
      [
        { calidad: "Especial", probabilidad: 0.7 },
        { calidad: "Común", probabilidad: 0.3 },
      ],
      [
        { calidad: "Especial", probabilidad: 0.7 },
        { calidad: "Común", probabilidad: 0.3 },
      ],
    ],
    "Rara": [
      [
        { calidad: "Rara", probabilidad: 0.4 },
        { calidad: "Épica", probabilidad: 0.425 },
        { calidad: "Legendaria", probabilidad: 0.05 },
        { calidad: "Icónica", probabilidad: 0.025 },
      ],
      [
        { calidad: "Rara", probabilidad: 0.9 },
        { calidad: "Flashback", probabilidad: 0.05 },
        { calidad: "Future Star", probabilidad: 0.05 },
      ],
      [
        { calidad: "Rara", probabilidad: 1 },
      ],
      [
        { calidad: "Rara", probabilidad: 0.5 },
        { calidad: "Especial", probabilidad: 0.4 },
        { calidad: "Común", probabilidad: 0.1 },
      ],
      [
        { calidad: "Rara", probabilidad: 0.5 },
        { calidad: "Especial", probabilidad: 0.4 },
        { calidad: "Común", probabilidad: 0.1 },
      ],
    ],
    "Épica": [
      [
        { calidad: "Épica", probabilidad: 0.75 },
        { calidad: "Legendaria", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.05 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.8 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.6 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Especial", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.6 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Especial", probabilidad: 0.1 },
      ],
    ],
    "Legendaria": [
      [
        { calidad: "Legendaria", probabilidad: 0.7 },
        { calidad: "Icónica", probabilidad: 0.3 },
      ],
      [
        { calidad: "Legendaria", probabilidad: 1 },
      ],
      [
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Flashback", probabilidad: 0.15 },
        { calidad: "Future Star", probabilidad: 0.15 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Rara", probabilidad: 0.25 },
        { calidad: "Especial", probabilidad: 0.15 },
      ],
      [
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Épica", probabilidad: 0.5 },
        { calidad: "Rara", probabilidad: 0.25 },
        { calidad: "Especial", probabilidad: 0.15 },
      ],
      [
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Épica", probabilidad: 0.5 },
        { calidad: "Rara", probabilidad: 0.25 },
        { calidad: "Especial", probabilidad: 0.15 },
      ],
    ],
    "Icónica": [
      [
        { calidad: "Icónica", probabilidad: 1 },
      ],
      [
        { calidad: "Legendaria", probabilidad: 0.3 },
        { calidad: "Épica", probabilidad: 0.4 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
      [
        { calidad: "Legendaria", probabilidad: 0.3 },
        { calidad: "Épica", probabilidad: 0.4 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.3 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Especial", probabilidad: 0.1 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Legendaria", probabilidad: 0.15 },
        { calidad: "Icónica", probabilidad: 0.05 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.3 },
        { calidad: "Rara", probabilidad: 0.1 },
        { calidad: "Especial", probabilidad: 0.05 },
        { calidad: "Flashback", probabilidad: 0.2 },
        { calidad: "Future Star", probabilidad: 0.2 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Icónica", probabilidad: 0.05 },
      ],
    ],
    "Aleatorio": [
      [
        { calidad: "Épica", probabilidad: 0.15 },
        { calidad: "Rara", probabilidad: 0.15 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.15 },
        { calidad: "Rara", probabilidad: 0.15 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.15 },
        { calidad: "Rara", probabilidad: 0.15 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.15 },
        { calidad: "Rara", probabilidad: 0.15 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.15 },
        { calidad: "Rara", probabilidad: 0.15 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Icónica", probabilidad: 0.1 },
      ],
    ],
    "Flashback": [
      [
        { calidad: "Flashback", probabilidad: 1 },
      ],
      [
        { calidad: "Flashback", probabilidad: 0.3 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.05 },
      ],
      [
        { calidad: "Flashback", probabilidad: 0.25 },
        { calidad: "Future Star", probabilidad: 0.1 },
        { calidad: "Épica", probabilidad: 0.25 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.05 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Flashback", probabilidad: 0.15 },
        { calidad: "Future Star", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.05 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Flashback", probabilidad: 0.15 },
        { calidad: "Future Star", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Común", probabilidad: 0.1 },
        { calidad: "Legendaria", probabilidad: 0.05 },
      ],
    ],
    "Future Star": [
      [
        { calidad: "Future Star", probabilidad: 1 },
      ],
      [
        { calidad: "Future Star", probabilidad: 0.3 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.05 },
      ],
      [
        { calidad: "Future Star", probabilidad: 0.25 },
        { calidad: "Flashback", probabilidad: 0.1 },
        { calidad: "Épica", probabilidad: 0.25 },
        { calidad: "Legendaria", probabilidad: 0.1 },
        { calidad: "Rara", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.05 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Future Star", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.1 },
        { calidad: "Común", probabilidad: 0.15 },
        { calidad: "Legendaria", probabilidad: 0.05 },
      ],
      [
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Rara", probabilidad: 0.3 },
        { calidad: "Future Star", probabilidad: 0.15 },
        { calidad: "Flashback", probabilidad: 0.05 },
        { calidad: "Especial", probabilidad: 0.15 },
        { calidad: "Común", probabilidad: 0.1 },
        { calidad: "Legendaria", probabilidad: 0.05 },
      ],
    ],
    "Gold": [
      [
        { calidad: "Future Star", probabilidad: 0.2 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Flashback", probabilidad: 0.2 },
        { calidad: "Legendaria", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.2 },
      ],
      [
        { calidad: "Future Star", probabilidad: 0.2 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Flashback", probabilidad: 0.2 },
        { calidad: "Legendaria", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.2 },
      ],
      [
        { calidad: "Future Star", probabilidad: 0.2 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Flashback", probabilidad: 0.2 },
        { calidad: "Legendaria", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.2 },
      ],
      [
        { calidad: "Future Star", probabilidad: 0.2 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Flashback", probabilidad: 0.2 },
        { calidad: "Legendaria", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.2 },
      ],
      [
        { calidad: "Future Star", probabilidad: 0.2 },
        { calidad: "Épica", probabilidad: 0.2 },
        { calidad: "Flashback", probabilidad: 0.2 },
        { calidad: "Legendaria", probabilidad: 0.2 },
        { calidad: "Icónica", probabilidad: 0.2 },
      ],
    ],
  };
  return probabilidades[tipoSobre];
}

function generarCalidadesPorPosicion(probabilidadesPorPosicion, cartasPorCalidad) {
  const calidadesGeneradas = [];
  for (let i = 0; i < probabilidadesPorPosicion.length; i++) {
      const calidad = determinarCalidad(probabilidadesPorPosicion[i], cartasPorCalidad);
      if (calidad) calidadesGeneradas.push(calidad);
  }
  return calidadesGeneradas;
}

function determinarCalidad(probabilidades, cartasPorCalidad) {
  const random = Math.random();
  let acumulado = 0;

  for (const { calidad, probabilidad } of probabilidades) {
      acumulado += probabilidad;
      if (random <= acumulado && cartasPorCalidad[calidad]?.length > 0) {
          return calidad;
      }
  }
  return null; // No hay cartas disponibles para ninguna calidad.
}

function seleccionarCarta(calidad, cartasPorCalidad, cardsUsuario, cartasGeneradas) {
  const disponibles = cartasPorCalidad[calidad].filter(
      card => !cardsUsuario.some(userCard => userCard.idModel === card.id) &&
              !cartasGeneradas.some(generatedCard => generatedCard.id === card.id)
  );

  if (disponibles.length === 0) return null; // No hay cartas disponibles.
  return disponibles[Math.floor(Math.random() * disponibles.length)];
}


function ordenarCartasPorCalidad(cartas, calidadesOrdenadas) {
  return cartas.sort(
      (a, b) => calidadesOrdenadas.indexOf(a.calidad) - calidadesOrdenadas.indexOf(b.calidad)
  );
}