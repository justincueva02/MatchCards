import { useEffect, useContext, useState } from "react";

import { AuthContext as Context } from "../App";
import SortDecksInputs from "./SortDecksInputs";
import DecksContainer from "./DecksContainer";
import "../../styles/myDeckPage/myDecksPage.css";

const MyDecks = () => {
  const { authDispatch, authState } = useContext(Context);
  const [decksAreLoading, setDecksAreLoading] = useState<boolean>(false);
  const [currentSort, setCurrentSort] = useState<string>("most terms");
  const [searchStr, setSearchStr] = useState<string>("");

  const getDecks = async () => {
    // set loading
    setDecksAreLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setDecksAreLoading(false);
      return;
    }

    const response = await fetch(
      `https://match-cards-fc1b9-default-rtdb.firebaseio.com/${userId}.json`
    );
    const data = await response.json();
    // console.log(data);

    authDispatch({ type: "GOT_DECKS", payload: data });

    setDecksAreLoading(false);
  };

  useEffect(() => {
    getDecks();
  }, []);

  return (
    <div className="page max-w-80">
      <SortDecksInputs
        setCurrentSort={setCurrentSort}
        currentSort={currentSort}
        setSearchStr={setSearchStr}
        searchStr={searchStr}
      />
      <DecksContainer
        searchStr={searchStr}
        currentSort={currentSort}
        decksAreLoading={decksAreLoading}
        decks={authState.myDecks}
      />
    </div>
  );
};

export default MyDecks;
