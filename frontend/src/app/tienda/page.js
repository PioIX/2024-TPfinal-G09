"use client";
import React, { useState, useEffect } from "react";
import Sobre from "@/components/sobres";
import ConfirmationModal from "@/components/confirmationModal";
import Carta from "@/components/carta";
import styles from "@/app/tienda/page.module.css";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [sobres, setSobres] = useState([]);
  const [userMoney, setUserMoney] = useState(0);
  const [selectedSobre, setSelectedSobre] = useState(null);
  const [packCartas, setPackCartas] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get('idUser');

  useEffect(() => {
    async function fetchSobres() {
      try {
        const res = await fetch('http://localhost:3001/getSobres');
        const data = await res.json();
        setSobres([...data, { id: "random", name: "Aleatorio", price: 100 }]);
      } catch (error) {
        console.error("Failed to fetch sobres:", error);
      }
    }

    async function fetchUserMoney() {
      if (userId) {
        try {
          const res = await fetch(`http://localhost:3001/getUserMoney?idUser=${userId}`);
          const data = await res.json();
          setUserMoney(data.money);
        } catch (error) {
          console.error("Failed to fetch user money:", error);
        }
      }
    }

    fetchSobres();
    fetchUserMoney();
  }, [userId]);

  // Function to open confirmation modal
  const handleSobreClick = (sobre) => {
    setSelectedSobre(sobre);
  };

  // Confirm purchase function
  const confirmPurchase = async () => {
    if (userMoney >= selectedSobre.price) {
      try {
        const res = await fetch(`http://localhost:3001/purchaseSobre`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idUser: userId, idSobre: selectedSobre.id }),
        });
  
        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error en la respuesta del servidor:", errorData);
          alert("Error al generar el paquete de cartas: " + errorData.message);
          setPackCartas([]);
          return;
        }
  
        const result = await res.json();
        if (!Array.isArray(result)) {
          console.error("Formato de datos inesperado:", result);
          alert("Error al generar el paquete de cartas: " + result.message);
          setPackCartas([]);
          return;
        }
  
        setPackCartas(result);
  
        // Llamar a la función para refrescar el dinero del usuario
        await fetchUserMoney();
  
        setSelectedSobre(null);
      } catch (error) {
        console.error("Error de red durante la compra:", error);
        alert("Ocurrió un error al realizar la compra. Intenta nuevamente.");
        setPackCartas([]);
      }
    } else {
      alert("No tienes suficientes monedas para esta compra.");
    }
  };
  
  // Close the modal
  const cancelPurchase = () => {
    setSelectedSobre(null);
  };
  function seleccionarCartaPorProbabilidad(cartas, probabilidades) {
    const rand = Math.random() * 100;
    let cumulativeProbability = 0;
    let filtro;
  
    // Determine the rarity based on cumulative probability ranges
    for (const [rarity, probability] of Object.entries(probabilidades)) {
      cumulativeProbability += probability;
      if (rand <= cumulativeProbability) {
        filtro = rarity;
        break;
      }
    }
  
    const cartasFiltradas = cartas.filter((carta) => carta.calidad === filtro);
  
    if (cartasFiltradas.length === 0) {
      console.warn(`No cards found for quality ${filtro}. Returning a random card as fallback.`);
      return cartas[Math.floor(Math.random() * cartas.length)];
    }
  
    return cartasFiltradas[Math.floor(Math.random() * cartasFiltradas.length)];
  }
  
  
// Function to generate a pack of cards for a user
async function generateCardPack(idUser, idSobre) {
  try {
    const packConfig = packageProbabilities[idSobre] || packageProbabilities.Aleatorio;
    if (!packConfig) throw new Error(`Configuración no encontrada para idSobre ${idSobre}`);
    
    const probabilities = packConfig.commonDraws;
    const guaranteedRarity = packConfig.guaranteedRarity;

    const allCards = await MySQL.realizarQuery("SELECT * FROM CardModels");
    if (!Array.isArray(allCards) || allCards.length === 0) {
      console.error("No se encontraron cartas en la tabla CardModels");
      throw new Error("La tabla de modelos de cartas está vacía o la consulta falló");
    }

    const generatedPack = [];
    // Log de inicio de generación
    console.log("Generando cartas basadas en probabilidades");

    for (let i = 0; i < 4; i++) {
      const selectedCard = seleccionarCartaPorProbabilidad(allCards, probabilities);
      if (selectedCard) {
        generatedPack.push(selectedCard);
      }
    }

    console.log("Cartas generadas:", generatedPack);

    const lastCardOptions = allCards.filter((carta) => carta.calidad === guaranteedRarity);
    if (lastCardOptions.length > 0) {
      const guaranteedCard = lastCardOptions[Math.floor(Math.random() * lastCardOptions.length)];
      generatedPack.push(guaranteedCard);
    } else {
      console.warn(`No hay cartas disponibles para la rareza garantizada ${guaranteedRarity}`);
    }

    return generatedPack;
  } catch (error) {
    console.error("Error en generateCardPack:", error);
    throw new Error("Error al generar el paquete de cartas");
  }
}




  return (
    <div className={styles.container}>
      <div className={styles.header}>TIENDA DE CARTAS</div>
      <div className={styles.userMoney}>{userMoney} monedas</div>

      <div className={styles.sobresContainer}>
        {sobres.map((sobre) => (
          <Sobre
            key={sobre.id}
            imagenSrc={`/images/${sobre.name.toLowerCase()}.png`}
            texto={sobre.name}
            subtitulo={`Precio: ${sobre.price} monedas`}
            rareza={sobre.name}
            onClick={() => handleSobreClick(sobre)} // Handle click
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        sobre={selectedSobre}
        onConfirm={confirmPurchase}
        onCancel={() => setSelectedSobre(null)}
      />
<div className={styles.packCartasContainer}>
  {Array.isArray(packCartas) && packCartas.map((carta, index) => (
    <Carta key={index} {...carta} />
  ))}
</div>

    </div>
  );
}
