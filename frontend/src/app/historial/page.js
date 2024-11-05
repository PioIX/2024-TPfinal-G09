"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import styles from "@/app/user/page.module.css";

export default function UserGames() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [games, setGames] = useState([]);
  const baseURL = 'http://localhost:3001';

  async function loadUserGames() {
    try {
      // Fetch para obtener las relaciones de juegos del usuario desde la tabla JuegoXUser
      const responseJuegoXUser = await fetch(`${baseURL}/getJuegoXUsers`);
      const juegoXUserData = await responseJuegoXUser.json();

      if (!Array.isArray(juegoXUserData)) {
        throw new Error("Invalid data format from /getJuegoXUsers");
      }

      // Filtrar las partidas del usuario loggeado
      const userGameRelations = juegoXUserData.filter(game => String(game.idUser) === String(idUser));

      // Obtener detalles de cada partida en la tabla Juego
      const gameDetailsPromises = userGameRelations.map(async relation => {
        const responseJuego = await fetch(`${baseURL}/getJuegos`);
        const juegosData = await responseJuego.json();

        if (!Array.isArray(juegosData)) {
          throw new Error("Invalid data format from /getJuegos");
        }

        // Buscar la partida en la tabla juegos y devolverla
        return juegosData.find(game => game.id === relation.idJuego);
      });

      const detailedGames = await Promise.all(gameDetailsPromises);
      setGames(detailedGames.filter(game => game !== undefined)); // Filtrar resultados undefined
    } catch (error) {
      console.error("Error loading user games:", error);
      setGames([]); // Vaciar el estado en caso de error
    }
  }

  useEffect(() => {
    if (idUser) {
      loadUserGames();
    }
  }, [idUser]);

  function formatDate(dateString) {
    if (!dateString) return "Invalid Date";
  
    // Reemplazar el espacio por una 'T' para convertirlo a un formato ISO
    const formattedDateString = dateString.replace(' ', 'T');
    const date = new Date(formattedDateString);
  
    return !isNaN(date.getTime()) ? date.toLocaleDateString() : "Invalid Date";
  }

  return (
    <main>
      <div className="container mt-4">
        <h2>User Games</h2>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Winner</th>
              <th scope="col">Points</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 ? (
              games.map((game, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td
                      className={
                        game.winner === idUser
                          ? styles.winnerGreen
                          : styles.winnerRed
                      }
                    >
                      {game.winner === idUser ? "You" : "Opponent"}
                    </td>
                    <td>{game.points}</td>
                    <td>{formatDate(game.created_at)}</td> {/* Usar created_at */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No games available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
