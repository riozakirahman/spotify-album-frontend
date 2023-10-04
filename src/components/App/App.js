import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
import Main from "../Main/Main";
import { useState, useEffect, useContext } from "react";
import { LoggedContext } from "../../contexts/LoggedContext";
import Preloader from "../Preloader/Preloader";
function App() {
  const { setLoggedIn } = useContext(LoggedContext);
  const [code, setCode] = useState("");
  const [token, setToken] = useState("");
  const [refresh_token, setRefToken] = useState("");
  const [isAbout, setIsAbout] = useState(false);
  const [isArtist, setIsArtist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header
                code={code}
                setCode={setCode}
                token={token}
                setToken={setToken}
                refresh_token={refresh_token}
                setRefToken={setRefToken}
                isAbout={isAbout}
              />
              <About setIsAbout={setIsAbout} />
              <Footer />
            </div>
          }
        ></Route>
        <Route
          path="/artist"
          element={
            <>
              <Header
                code={code}
                setCode={setCode}
                token={token}
                setToken={setToken}
                refresh_token={refresh_token}
                setRefToken={setRefToken}
                isArtist={isArtist}
              />
              {isLoading && <Preloader />}

              <Main
                code={code}
                setCode={setCode}
                token={token}
                setToken={setToken}
                refresh_token={refresh_token}
                setRefToken={setRefToken}
                setIsArtist={setIsArtist}
                setIsLoading={setIsLoading}
              />
              <Footer />
            </>
          }
        >
          {/* <Route path=":code" element={<Main />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
