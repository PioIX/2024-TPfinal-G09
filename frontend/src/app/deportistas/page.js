"use client"
import Button from "@/components/button";
import Link from "next/router";
import { useRouter, router } from "next/router";
import React, { useState, useEffect } from "react";
import { getUsers, fetchRegister } from "@/app/javascript.js";
import Input from "@/components/input"; // Importamos el componente Input
import styles from "@/app/page.module.css"; // Estilos para el formulario
import Header from "@/components/header";
import Deportistas from "@/components/deportistas";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setId] = useState(-1)

  async function goUsers(){
    window.location.href = `/user?idUser=${userId}`
  }
  async function cargarDeportistas() {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Error cargando los deportistas:", error);
    } 
  }

  useEffect(() => {
    cargarDeportistas();
  }, []);

  return (
    <div>
     <Header/>
      <main>
        <div className={styles.container}>
        <h2>deportistas</h2>
      
          <Deportistas deportistas={users}
         />
        </div>
          <Input
            label="id User"
            type="number"
            name="number"
            value={userId}
            onChange={(e) => setId(e.target.value)}
          />
          <Button onClick={goUsers}>user</Button>
      </main>
    </div>
  );
}

