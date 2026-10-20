import Banner from "./componentes/Banner/Banner";
import ListaSouls from "./componentes/ListaSouls/ListaSouls";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import SobreMim from "./componentes/SobreMim/SobreMim";

function App() {
  return (
    <Router>
      <div className="header">
        {/* Banner à esquerda */}
        <Banner />

        {/* Botões à direita */}
        <div className="nav-buttons">
          <NavLink to="/" end className="nav-link">
            Home
          </NavLink>
          <NavLink to="/sobre" className="nav-link">
            Sobre Mim
          </NavLink>
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <ListaSouls />
            </div>
          }
        />
        <Route path="/sobre" element={<SobreMim />} />
        
      </Routes>
    </Router>
  );
}

export default App;
