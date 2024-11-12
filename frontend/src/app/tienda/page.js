"use client";
import React, { useState, useEffect } from "react";
import Sobre from "@/components/sobres";
import ConfirmationModal from "@/components/ConfirmationModal";
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

  // Abre el modal de confirmación de compra
  const handleSobreClick = (sobre) => {
    setSelectedSobre(sobre);
  };

  // Confirma la compra y genera las cartas si es exitosa
  const confirmPurchase = async () => {
    console.log(selectedSobre);
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
          alert("Error al realizar la compra: " + errorData.message);
          setPackCartas([]);
          return;
        }
  
        // Generar y mostrar el paquete de cartas
        const result = await res.json();
        setPackCartas(result);
  
        // Refresca el dinero del usuario después de la compra
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

  // Cierra el modal de confirmación sin comprar
  const cancelPurchase = () => {
    setSelectedSobre(null);
  };

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
            rareza={sobre.name.toLowerCase()}
            onClick={() => handleSobreClick(sobre)}
            allCards={[]} // Aquí iría la lista de cartas disponibles
          />
        ))}
      </div>

      {selectedSobre && (
        <ConfirmationModal
          sobre={selectedSobre}
          onConfirm={confirmPurchase}
          onCancel={cancelPurchase}
        />
      )}

      {packCartas.length > 0 && (
        <div className={styles.packCartasContainer}>
          {packCartas.map((carta, index) => <Carta key={index} {...carta} />)}
        </div>
      )}
    </div>
  );
}
