import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "../src/components/Home/Home";
import Inicial from "../src/components/Inicial/Inicial";
import Carta from "../src/components/Carta/Carta.jsx";
import Create from "../src/components/Create/Create.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path={"/home"} component={Home} />
        <Route exact path={"/"} component={Inicial} />
        <Route exact path={"/videogame/:Idvideogame"} component={Carta} />
        <Route exact Path={"/create"} element={<Create/>}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
