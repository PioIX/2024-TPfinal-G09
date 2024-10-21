
export function FindXByID(id, vector) {
  for (let i = 0; i < vector.length; i++) {
      if (vector[i].id == id) {
          return i; // Devuelve la posición del cliente en el vector
      }
  }
  return -1; // Si no se encuentra el cliente, devuelve -1
}