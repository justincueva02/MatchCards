import { useEffect, useContext } from "react";

import { AuthContext as Context } from "../App";
import SortDecksInputs from "./SortDecksInputs";
import DecksContainer from "./DecksContainer";
import "../../styles/myDecksPage.css";

const MyDecks = () => {
  const { authDispatch, authState } = useContext(Context);

  const getDecks = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const response = await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${userId}.json`
    );
    const data = await response.json();

    console.log(Object.values(data));

    authDispatch({ type: "GOT_DECKS", payload: Object.values(data) });
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div className="page max-w-80">
      <SortDecksInputs />
      <DecksContainer decks={authState.myDecks} />
    </div>
  );
};

export default MyDecks;
