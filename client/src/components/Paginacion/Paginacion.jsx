import React from "react";

const Paginacion = ({ pagina, maximo, setPagina }) => {
  const HandleRetroceder = () => {
    setPagina(pagina - 1);
  };

  const HandleAvanzar = () => {
    setPagina(pagina + 1);
  };

  return (
    <div>
      <button
        disabled={pagina === 1 || pagina < 0}
        onClick={() => HandleRetroceder()}
      >
        Retroceder
      </button>
      <button
        disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
        onClick={() => HandleAvanzar()}
      >
        Avanzar
      </button>
    </div>
  );
};

export default Paginacion;
