import React from "react";
import "../Paginacion/Paginacion.css";

const Paginacion = ({ pagina, maximo, setPagina }) => {
  
  const HandleRetroceder = () => {
    setPagina(pagina - 1);
  };

  const HandleAvanzar = () => {
    setPagina(pagina + 1);
  };

  return (
    <div className="paginacionConteiner">
      <button
        disabled={pagina === 1 || pagina < 0}
        onClick={() => HandleRetroceder()}
        className="paginacionretroceder"
      >
        Retroceder
      </button>
      <div className="numbersconteiner">
      <div className="numbers">
        {pagina}/{Math.ceil(maximo)}
      </div>
      </div>

      <button
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        onClick={() => HandleAvanzar()}
        className="paginacionavanzar"
      >
        Avanzar
      </button>
    </div>
  );
};

export default Paginacion;
