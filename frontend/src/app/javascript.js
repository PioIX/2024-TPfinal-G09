// URL base para todas las peticiones
const baseURL = 'http://localhost:3001';

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

// Función para obtener los chats
export async function getChats() {
    try {
        console.log("chat")
        const response = await fetch(`${baseURL}/getChats`);
        const data = await response.json();
        //console.log("Chats:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener los chats:", error);
    }
}

// Función para obtener las relaciones entre usuarios y chatsv
export async function getChatXUser() {
    try {
        console.log("chatys")
        const response = await fetch(`${baseURL}/getChatXuser`);
        const data = await response.json();
        //console.log("Relaciones Usuario-Chats:", data);
        return data; 
    } catch (error) {
        console.error("Error al obtener los chats:", error);
    }
}

// Función para obtener los mensajes
export async function getMensajes() {
    try {
        console.log("msg")
        const response = await fetch(`${baseURL}/getMensajes`);
        const data = await response.json();
        //console.log("Mensajes:", data);
        return data;
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
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