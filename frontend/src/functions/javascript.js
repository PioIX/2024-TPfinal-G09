
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

