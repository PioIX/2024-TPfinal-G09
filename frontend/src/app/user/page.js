"use client"
import Button from "@/components/button";
import { useEffect } from "react";
import Link from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getUsers, fetchRegister, fetchUpdateUser, FindXByID } from "@/app/javascript.js";
import InputEdit from "@/components/inputEdit"; // Importamos el componente Input
import styles from "@/app/user/page.module.css"; // Estilos para el formulario
import UserProfilePic from "@/components/userProfilePic";
import { useSearchParams } from 'next/navigation';


export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  
  async function cargarDeportistas() {
    try {
      const users = await getUsers();
      setUsers(users);
      const user = users[FindXByID(idUser, users)]
      console.log(user)
    // Establecemos los valores de user en las variables de estado
      setFirstName(user.nombre);
      setLastName(user.apellido);
      setUsername(user.username);
      setPassword(user.password);
      setEmail(user.mail);
      setImage(user.image);

    } catch (error) {
      console.error("Error cargando los deportistas:", error);
    } 
  }

  async function linkUpdate() {
    const user = {
      id: idUser,
      nombre: firstName,
      apellido: lastName,
      username: username,
      password: password,
      mail: email,
      image: image
  };
    fetchUpdateUser(user)
    window.location.href = '/deportistas';
  }
  
  useEffect(() => {
    cargarDeportistas();
  }, []);

  function linkBack() {
    window.location.href = '/deportistas';
  }


  return (
    <main>
      <div className={styles.division}>
      <UserProfilePic imageUrl={image}/>
      <div className={styles.container}>
      <h2>Editar perfil</h2>
      <br/>
      <div className={styles.division}>
        <div className={styles.lateral}>
          <InputEdit
            label="Nombre"
            type="text"
            name="firstName"
            value={firstName}
            placeholder={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputEdit
            label="Apellido"
            type="text"
            name="lastName"
            value={lastName}
            placeholder={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputEdit
            label="Usuario"
            type="text"
            name="username"
            value={username}
            placeholder={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.lateral}>
          <InputEdit
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputEdit
            label="Correo Electrónico"
            type="email"
            name="text"
            value={email}
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputEdit
            label="Imagen de perfil"
            type="text"
            name="image"
            value={image}
            placeholder={image}
            onChange={(e) => setImage(e.target.value)}
          />
          </div>
        </div>
        <Button  onClick={linkBack}>
          volver
        </Button>
        <Button  onClick={linkUpdate}>
          Guardar
        </Button>
      </div>
      </div>
    </main>
  );
}
