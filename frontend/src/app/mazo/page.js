"use client";
import { useEffect, useState } from "react";
import { getCardModels, getCardsByUser, getUserById, fetchUpdateCardHand } from "@/functions/fetch.js";
import { setCards } from "@/functions/javascript";
import styles from "@/app/user/page.module.css";
import { useSearchParams } from 'next/navigation';
import Cartas from "@/components/cartas";
import Header from "@/components/header";
import Loading from "@/components/loading";
import Button from "@/components/button";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [cardsUser, setCardsUser] = useState([]);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función de selección para controlar qué cartas están en "hand"
  const toggleCardSelection = (id) => {
    
    console.log(cardsUser)
    setCardsUser((prevCards) => {
      const selectedCards = prevCards.filter(card => card.hand).length;

      return prevCards.map((card) => {
        if (card.id === id) {
          // Si la carta ya está seleccionada, la deseleccionamos
          if (card.hand) {
            return { ...card, hand: 0 };
          }
          // Si la carta no está seleccionada y hay menos de 5 seleccionadas, la seleccionamos
          if (!card.hand && selectedCards < 5) {
            return { ...card, hand: 1 };
          }
        }
        return card;
      });
    });
  };

  async function linkUpdate() {
    const selectedCards = cardsUser.filter(card => card.hand).length;
    if(selectedCards!=5){
        alert("necesitas seleccionar 5 cartas");
       return;
      }
    try {
      // Recorrer `cardsUser` y actualizar cada carta usando `putCardHand`
      setIsLoading(true)
      console.log("antes de ingresar:",cardsUser)
      const updatePromises = cardsUser.map((card) => 
        fetchUpdateCardHand(card)
      );
  
      // Esperar a que todas las actualizaciones se completen
      await Promise.all(updatePromises);
      setIsLoading(false)
      alert("Cartas actualizadas exitosamente!");
    } catch (error) {
      console.error("Error al actualizar cartas:", error);
      alert("Hubo un problema al intentar actualizar las cartas.");
    }
  }
  

  async function cargarCartas() {
    const user = await getUserById(idUser);
    const cardsU = await getCardsByUser(idUser);
    const cardsM = await getCardModels();
    const cardsD = setCards(cardsM, cardsU, user);
    setCardsUser(cardsD);
    setUser(user);
    setIsLoading(false);
  }

  useEffect(() => {
    cargarCartas();
  }, []);

  return (
    <main>
      {isLoading ? <Loading /> : (
        <>
          <Header username={user.username} profileImage={user.image} idUser={user.id} />
          <Cartas
            cards={cardsUser}
            setSelectCard={toggleCardSelection}
            seleccionable={true}  // Hacemos que las cartas sean seleccionables
          />
          <Button onClick={linkUpdate} className={styles.updateButton}>Guardar mazo</Button>
        </>
      )}
    </main>
  );
}
