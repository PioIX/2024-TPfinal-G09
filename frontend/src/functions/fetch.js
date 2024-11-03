// URL base para todas las peticiones
const baseURL = 'http://localhost:3001';

// Función para obtener los sobres
export async function getSobres() {
  try {
      const response = await fetch(`${baseURL}/getSobres`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener los sobres:", error);
  }
}

// Función para obtener los modelos de carta
export async function getCardModels() {
  try {
      const response = await fetch(`${baseURL}/getCardModels`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener los modelos de cartas:", error);
  }
}

// Función para obtener los usuarios
export async function getUsers() {
    try {
        
      console.log("user")
        const response = await fetch(`${baseURL}/getUsers`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
    }
}

export async function getUserById(idUser) {
  try {
      const response = await fetch(`${baseURL}/getUserById?idUser=${idUser}`);
      const data = await response.json();
      console.log(data)
      return data;
  } catch (error) {
      console.error("Error al obtener el user:", error);
  }
}
// Función para obtener los juegos
export async function getJuegos() {
  try {
      const response = await fetch(`${baseURL}/getJuegos`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener los juegos:", error);
  }
}

// Función para obtener los vinculos juego usuario
export async function getJuegoXUsers() {
  try {
      const response = await fetch(`${baseURL}/getJuegoXUsers`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener las relaciones de juegos y usuarios:", error);
  }
}

// Función para obtener las cartas
export async function getCards() {
  try {
      const response = await fetch(`${baseURL}/getCards`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al obtener las cartas:", error);
  }
}

//función para obtener cartas X usuario
export async function getCardsByUser(idUser) {
  try {
      const response = await fetch(`${baseURL}/getCardsByUser?idUser=${idUser}`);
      const data = await response.json();
      console.log(data)
      return data;
  } catch (error) {
      console.error("Error al obtener las cartas:", error);
  }
}

//función para obtener mazo X usuario
export async function getMazoByUser(idUser) {
  try {
      const response = await fetch(`${baseURL}/getMazoByUser?idUser=${idUser}`);
      const data = await response.json();
      console.log(data)
      return data;
  } catch (error) {
      console.error("Error al obtener las cartas:", error);
  }
}

//función para obtener mazo X usuario
export async function getGamesByUser(idUser) {
  try {
      const response = await fetch(`${baseURL}/getGamesByUser?idUser=${idUser}`);
      const data = await response.json();
      console.log(data)
      return data;
  } catch (error) {
      console.error("Error al obtener las cartas:", error);
  }
}

//función para registrar
export async function fetchRegister(newUser) {
    try {
      const response = await fetch(`${baseURL}/postUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }
  
      // Parseamos la respuesta
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en fetchRegister:', error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
  }

//función para actualizar el usuario
export async function fetchUpdateUser(user) {
    try {
        const response = await fetch(`${baseURL}/putUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result); // "Usuario actualizado con éxito."
        } else {
            console.error('Error al actualizar el usuario:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  }

//función para actualizar la plata del usuario
export async function fetchUpdateUserMoney(user) {
    try {
        const response = await fetch(`${baseURL}/putUser`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            const result = await response.text();
            console.log(result); // "Usuario actualizado con éxito."
        } else {
            console.error('Error al actualizar el usuario:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  }

//función para insertar juego
export async function insertJuego(newJuego) {
    try {
      const response = await fetch(`${baseURL}/postJuego`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJuego),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al registrar el juego');
      }
  
      // Parseamos la respuesta
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en insertJuego:', error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
  }

//función insertar juegoXUser
export async function insertJuegoXUser(newJuegoXUser) {
    try {
      const response = await fetch(`${baseURL}/postJuegoXUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJuegoXUser),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al registrar el JuegoXUser');
      }
  
      // Parseamos la respuesta
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en insertJuegoXUser:', error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
  }

//función insert card
export async function insertCard(newCard) {
    try {
      const response = await fetch(`${baseURL}/postCard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al registrar el Card');
      }
  
      // Parseamos la respuesta
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en insertCard:', error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
  }
