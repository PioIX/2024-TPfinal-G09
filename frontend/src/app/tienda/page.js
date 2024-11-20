"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import styles from "@/app/tienda/page.module.css";
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
import Confirmation from "@/components/confirmation";
import SecretCode from "@/components/SecretCode";

export default function Home() {
  const searchParams = useSearchParams();
  const idUser = searchParams.get("idUser");
  const [user, setUser] = useState({});
  const [sobreSelect, setSobreSelect] = useState("");
  const [sobre, setSobre] = useState([]);
  const [sobres, setSobres] = useState([]);
  const [cardModels, setCardModels] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const [showGoldSobre, setShowGoldSobre] = useState(false); // Nuevo estado para mostrar el sobre Gold

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
      for (let x = 0; x < modelosCartas.length; x++) {
        const newCarta = {
          idUser: parseInt(idUser),
          hand: 0,
          idModel: modelosCartas[x],
        };
        await insertCard(newCarta);
      }

      const nuevoDinero = user.money - sobreSelect.price;
      const usuarioActualizado = { ...user, money: nuevoDinero };
      await fetchUpdateUserMoney(usuarioActualizado);

      const result = cardModels.filter(modelo => modelosCartas.includes(modelo.id));
      await loadCards();
      return result;
    } catch (error) {
      console.error("Error al procesar la compra de sobres:", error);
      return [];
    }
  }

  async function abrirSobre() {
    try {
      setIsLoading(true);
      const modelosCartas = generarSobre(sobreSelect, cardModels, cards);
      const cartasObtenidas = await postCartas(modelosCartas);
      setSobre(cartasObtenidas);
      setStatus(2);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al abrir el sobre:", error);
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setStatus(0);
  }

  function handleConfirm() {
    if (user.money - sobreSelect.price >= 0) {
      setStatus(2);
    } else {
      window.alert("Este artículo es demasiado caro");
    }
  }

  function handleCodeValid() {
    setShowGoldSobre(true); // Activar visibilidad del sobre gold
  }

  useEffect(() => {
    if (cont < 1) {
      setIsLoading(true);
      loadCards();
      cont++;
    }
  }, []);

  useEffect(() => {
    if (sobreSelect) {
      setStatus(1);
    }
  }, [sobreSelect]);

  useEffect(() => {
    if (status === 2) {
      abrirSobre();
    }
  }, [status]);

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            username={user.username}
            profileImage={user.image}
            idUser={user.id}
            money={user.money}
          />
          {status === 0 && (
            <div className={styles.avisoContainer}>
              <p className={styles.aviso}>
                AVISO LOS SOBRES DAN CARTAS SEGÚN SU RAREZA, SI YA OBTUVISTE TODAS
                LAS CARTAS DE ESA RAREZA NO OBTENDRÁS NINGUNA CARTA
              </p>
              <SecretCode onGoldSobreSelect={handleCodeValid} />
            </div>
          )}
          {(() => {
            switch (status) {
              case 0:
                return (
                  <>
                    <Sobres sobres={sobres} setSobreSelect={setSobreSelect} />
                    {showGoldSobre && (
                      <div className={styles.goldSobreContainer}>
                        <h3>¡Has desbloqueado el sobre Gold!</h3>
                        <Sobres
                          sobres={[{ name: "Gold", price: 0, id: 999 }]}
                          setSobreSelect={setSobreSelect}
                        />
                      </div>
                    )}
                  </>
                );
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
