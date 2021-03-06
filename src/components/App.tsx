import { createContext, useReducer, useEffect, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import authReducer, {
  defaultState as authDefaultState,
} from "../reducers/authReducer";
import Header from "./reusables/Header";
import Home from "./homePage/Home";
import MatchPage from "./matchPage/MatchPage";
import ConfigDeckPage from "./createPage/CreatePage";
import MyDecks from "./myDecksPage/MyDecks";
import AuthPage from "./authPage/AuthPage";
import DeleteDeckModal from "./myDecksPage/DeleteDeckModal";
import "../styles/app.css";

export const AuthContext = createContext<any>(null);

const App = () => {
  const [authState, authDispatch] = useReducer(authReducer, authDefaultState);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      authDispatch({ type: "LOGIN", payload: { userId: userId } });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ authState: authState, authDispatch: authDispatch }}
    >
      <div className="app">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home authState={authState} />} />
            <Route path="/create" element={<ConfigDeckPage />} />
            <Route path="/myDecks" element={<MyDecks />} />
            <Route path="/myDecks/match/:myDecksId" element={<MatchPage />} />
            <Route
              path="/myDecks/edit/:myDecksId"
              element={<ConfigDeckPage />}
            />
            <Route
              path="/myDecks/delete/:myDecksId"
              element={
                <Fragment>
                  <MyDecks />
                  <DeleteDeckModal />
                </Fragment>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
