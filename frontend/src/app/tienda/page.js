"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import styles from "@/app/user/page.module.css";
import { 
  getUserById, 
  getCardModels, 
  getCardsByUser, 
  getSobres, 
  insertCard, 
  fetchUpdateUserMoney 
} from "@/functions/fetch";
import { generarSobre } from "@/functions/javascript";
import Loading from "@/components/loading";
import Header from "@/components/header";
import Sobres from "@/components/sobres";
import Cartas from "@/components/cartas";
import Button from "@/components/button";
import Confirmation from "@/components/Confirmation";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get('idUser');
  const [user, setUser] = useState({}); // Información del usuario
  const [sobreSelect, setSobreSelect] = useState(""); // Sobre seleccionado
  const [sobre, setSobre] = useState([]); // Cartas obtenidas al abrir el sobre
  const [sobres, setSobres] = useState([]); // Lista de sobres disponibles
  const [cardModels, setCardModels] = useState([]); // Modelos de cartas disponibles
  const [cards, setCards] = useState([]); // Cartas actuales del usuario
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [status, setStatus] = useState(0); // Controla el flujo de la página
  let cont = 0;

  // Cargar datos iniciales del usuario y los sobres
  async function loadCards() {
    try {
      const user = await getUserById(idUser);
      const cardModels = await getCardModels();
      const cards = await getCardsByUser(idUser);
      const sobres = await getSobres();
      
      setUser(user);
      setCardModels(cardModels);
      setCards(cards);
      setSobres(sobres);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar los datos iniciales:", error);
    }
  }

  // Postear las cartas obtenidas al abrir un sobre
async function postCartas(modelosCartas) {
  try {
    // Crear y guardar cada carta en la base de datos
    for (let x = 0; x < modelosCartas.length; x++) {
      const newCarta = {
        idUser: parseInt(idUser),
        hand: 0,
        idModel: modelosCartas[x],
      };
      console.log("carta a insertar", newCarta)
      await insertCard(newCarta); // Guardar la carta en la base de datos
    }

    // Actualizar el dinero del usuario
    const nuevoDinero = user.money - sobreSelect.price;
    const usuarioActualizado = { ...user, money: nuevoDinero };
    await fetchUpdateUserMoney(usuarioActualizado);

    // Crear el resultado filtrando los modelos de cartas obtenidos
    const result = [];
    for (let x = 0; x < cardModels.length; x++) {
      if (modelosCartas.includes(cardModels[x].id)) {
        result.push(cardModels[x]); // Agregar el objeto cardModel al resultado
      }
    }
    await loadCards()
    // Retornar los modelos de cartas obtenidos
    return result;
  } catch (error) {
    console.error("Error al procesar la compra de sobres:", error);
    return [];
  }
}


  // Abrir sobre y generar las cartas correspondientes
  async function abrirSobre() {
    try {
      setIsLoading(true);
      const modelosCartas = generarSobre(sobreSelect, cardModels, cards);
      const cartasObtenidas = await postCartas(modelosCartas);
      setSobre(cartasObtenidas);
      setStatus(2); // Cambiar a estado de mostrar las cartas obtenidas
      setIsLoading(false);
    } catch (error) {
      console.error("Error al abrir el sobre:", error);
      setIsLoading(false);
    }
  }

  function handleCancel(){
    setStatus(0)
  }

  function handleConfirm(){
    if(user.money-sobreSelect.price>=0){
    setStatus(2)}
    else{
      window.alert("Este artículo es demasiado caro")
    }
  }

  // Ejecutar solo en el primer renderizado para cargar los datos iniciales
  useEffect(() => {
    if (cont < 1) {
      setIsLoading(true);
      loadCards();
      cont++;
    }
  }, []);

  // Cambiar a estado de confirmación al seleccionar un sobre
  useEffect(() => {
    if (sobreSelect) {
      setStatus(1);
    }
  }, [sobreSelect]);

  // Ejecutar la lógica de abrir sobre cuando el estado cambia a 2
  useEffect(() => {
    console.log("status", status)
    if (status === 2) {
      abrirSobre();
    }
  }, [status]);



  // Renderizar los diferentes estados de la página
  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header username={user.username} profileImage={user.image} idUser={user.id} money={user.money} />
          {(() => {
            switch (status) {
              case 0:
                return <Sobres sobres={sobres} setSobreSelect={setSobreSelect} />;
              case 1:
                return (
                  <>
                  <Sobres sobres={sobres} setSobreSelect={setSobreSelect} />
                  <Confirmation 
                    sobre={sobreSelect} 
                    onConfirm={handleConfirm} 
                    onCancel={handleCancel} 
                  />
                  </>
                );
              case 2:
                return (
                  <>
                    <Cartas cards={sobre} sobre={true} />
                    <Button onClick={() => setStatus(0)}>Continuar</Button>
                  </>
                );
              default:
                return null;
            }
          })()}
        </>
      )}
    </main>
  );
}
