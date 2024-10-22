"use client"
import Button from "@/components/button";
import { useEffect } from "react";
import React, { useState } from "react";
import { getUsers, fetchUpdateUser} from "@/functions/fetch.js";
import { findXByID } from "@/functions/javascript";
import Input from "@/components/input"; // Importamos el componente Input
import styles from "@/app/user/page.module.css"; // Estilos para el formulario
import UserProfilePic from "@/components/userProfilePic";
import { useSearchParams } from 'next/navigation';


export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [name, setFirstName] = useState("");
  const [surname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setEmail] = useState("");
  const [image, setImage] = useState("");
  
  async function cargarUsuario() {
    try {
      const users = await getUsers();
      const user = users[findXByID(idUser, users)]
      console.log(user)
    // Establecemos los valores de user en las variables de estado
      setFirstName(user.name);
      setLastName(user.surname);
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
      name: name,
      surname: surname,
      username: username,
      password: password,
      mail: mail,
      image: image
  };
    fetchUpdateUser(user)
    window.location.href = `/menu?idUser=${idUser}`;
  }
  
  useEffect(() => {
    cargarUsuario();
  }, []);

  function linkBack() {
    window.location.href = `/menu?idUser=${idUser}`;
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
          <Input
            label="Nombre"
            type="text"
            name="firstName"
            value={name}
            placeholder={name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label="Apellido"
            type="text"
            name="lastName"
            value={surname}
            placeholder={surname}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="Usuario"
            type="text"
            name="username"
            value={username}
            placeholder={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.lateral}>
          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={password}
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Correo Electrónico"
            type="email"
            name="text"
            value={mail}
            placeholder={mail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
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
