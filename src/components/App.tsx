import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useReducer, useEffect } from "react";

import authReducer, {
  defaultState as authDefaultState,
} from "../reducers/authReducer";
import Header from "./reusables/Header";
import Home from "./homePage/Home";
import CreatePage from "./createPage/CreatePage";
import MyDecks from "./myDecksPage/MyDecks";
import AuthPage from "./authPage/AuthPage";
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
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/myDecks" element={<MyDecks />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
