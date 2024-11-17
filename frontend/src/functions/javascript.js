
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

export function generarSobre(sobre, cardModels, cards){
  return[4,5,6,1,2]
  /*a esta funcion le ingresas el tipo de sobre, todos los modelos de cartas en general y todas cartas del usuario. Primero separa los cardModels en vectores
distintos de calidad, es decir, va a quedar un vector comun, otro raro, otro especial, otro raro, etc. Según
el tipo de calidad del sobre, el sobre dará primero una carta de su calidad, y luego ira dando cartas de calidades
menores, dependiendo de cada posición de las 5 del sobre tendrá una posibilidad de que dicha carta sea de una calidad
la primera será si o si de la calidad del nombre del sobre, en los sobres más básicos, puede ser que esta primera
carta sea de una calidad mayor, pero solo si tiene suerte. luego de determinar la calidad de las 5 posiciones del 
vector, pasa a una siguiente instancia donde a cada posicion del vector le reemplazará por un*/
}

