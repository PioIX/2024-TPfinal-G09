"use client";
import { useEffect, useState } from "react";
import { getCardsByUser, getGamesByUser, getMazoByUser } from "@/functions/fetch.js";
import styles from "@/app/user/page.module.css"; 
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idUser = searchParams.get('idUser');
  
  const [userCards, setUserCards] = useState([]);
  const [mazo, setMazo] = useState([]);
  const [games, setGames] = useState([]);

  async function cargarPartidas() {
    try {
      const cards = await getCardsByUser(idUser);
      const mazoData = await getMazoByUser(idUser);
      const gamesData = await getGamesByUser(idUser);

      setUserCards(cards);
      setMazo(mazoData);
      if (Array.isArray(gamesData)) {
        setGames(gamesData);
      } else {
        console.error("Expected games data to be an array, but received:", gamesData);
        setGames([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setGames([]);
    }
  }
  
  useEffect(() => {
    cargarPartidas();
  }, [idUser]);

  function linkBack() {
    router.push('/'); 
  }

  return (
    <main>
      <div className={styles.division}>
        <button onClick={linkBack}>Back to Menu</button>
        <h2>User Games</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {games.length > 0 ? (
              games.map(game => (
                <tr key={game.id}>
                  <td>{game.date}</td>
                  <td>{game.winner}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No games found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>User Cards</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Card ID</th>
            </tr>
          </thead>
          <tbody>
            {userCards.map(card => (
              <tr key={card.id}>
                <td>{card.idModel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>User Mazo</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Card ID</th>
            </tr>
          </thead>
          <tbody>
            {mazo.map(card => (
              <tr key={card.id}>
                <td>{card.idModel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
