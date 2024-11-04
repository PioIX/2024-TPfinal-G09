"use client";
import { useEffect, useState } from "react";
import { getJuegos } from "@/functions/fetch.js";
import styles from "@/app/user/page.module.css";
import { useSearchParams } from 'next/navigation';

export default function UserGames() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [games, setGames] = useState([]);

  async function loadGames() {
    try {
      const response = await getJuegos();
      console.log("API response:", response); // Check the response structure
      console.log("idUser:", idUser); // Verify idUser is correct

      // Ensure response is an array and filter games by idUser
      
      const userGames = Array.isArray(response)
        ? response.filter(game => String(game.id) === String(idUser)) // Compare as strings for safety
        : [];
        console.log("API response:", userGames); // Check the response structure
      setGames(userGames);
    } catch (error) {
      console.error("Error loading games:", error);
      setGames([]); // Set to an empty array on error to prevent map errors
    }
  }

  useEffect(() => {
    loadGames();
  }, [idUser]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  return (
    <main>
      <div className={styles.division}>
        <h2>User Games</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Winner</th>
              <th>Points</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 ? (
              games.map((game, index) => (
                <tr key={index}>
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
                  <td>{formatDate(game.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No games available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
