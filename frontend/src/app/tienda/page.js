"use client";
import React, { useState, useEffect } from "react";
import Sobre from "@/components/sobres";
import ConfirmationModal from "@/components/ConfirmationModal"; // Import the modal
import styles from "@/app/tienda/page.module.css";
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const [sobres, setSobres] = useState([]);
  const [userMoney, setUserMoney] = useState(0);
  const [selectedSobre, setSelectedSobre] = useState(null); // State for the selected pack
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
        await fetch(`http://localhost:3001/purchaseSobre`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, sobreId: selectedSobre.id, price: selectedSobre.price }),
        });
        setUserMoney(userMoney - selectedSobre.price); // Update user money after purchase
        setSelectedSobre(null); // Close the modal
      } catch (error) {
        console.error("Failed to complete purchase:", error);
      }
    } else {
      alert("No tienes suficientes monedas para esta compra.");
    }
  };

  // Close the modal
  const cancelPurchase = () => {
    setSelectedSobre(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>TIENDA DE CARTAS</div>
      <div className={styles.userMoney}>Dinero: {userMoney} monedas</div>

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
        onCancel={cancelPurchase}
      />
    </div>
  );
}
