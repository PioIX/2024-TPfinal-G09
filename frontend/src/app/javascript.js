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
        //console.log(data)
        return data;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
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

export async function fetchPostMensaje(newMensaje) {
    try {
      const response = await fetch(`${baseURL}/postMensaje`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMensaje),
      });
  
      // Verificamos si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error('Error al enviar el mensaje');
      }
  
      // Parseamos la respuesta
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error en fetchPostMensaje:', error);
      throw error; // Propagamos el error para manejarlo en el componente
    }
  }

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

  export function FindXByID(id, vector) {
    for (let i = 0; i < vector.length; i++) {
        if (vector[i].id == id) {
            return i; // Devuelve la posición del cliente en el vector
        }
    }
    return -1; // Si no se encuentra el cliente, devuelve -1
}