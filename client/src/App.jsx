import { useContext } from "react";
import "./App.scss";
import Crud from "./Components/Crud/Crud";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from "react-router-dom";
import { GlobalContext } from "./Components/context/globalContext";
import Notes from "./Components/Notes/notes";

function App() {
  const { isLoggedIn } = useContext(GlobalContext);

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/crud" replace={true} /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              isLoggedIn ? <Navigate to="/crud" replace={true} /> : <Register />
            }
          />
          <Route
            path="/crud"
            element={isLoggedIn ? <Crud /> : <Navigate to="/" replace={true} />}
          />
          <Route path="/notes" 
          element={isLoggedIn ? <Notes />  : <Navigate to = "/"  remplace={true}/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
