import { useState } from "react";
import Botao from "../Botao/Botao";
import CampoTexto from "../CampoTexto/CampoTexto";
import "./Formulario.css";

const Formulario = (props) => {
  const [S, setS] = useState("");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [C, setC] = useState("");
  const [D, setD] = useState("");
  const [E, setE] = useState("");
  const [texto, setTexto] = useState("Salvar");
  const [disabled, setDisable] = useState(false);

  const aoSalvar = (evento) => {
    evento.preventDefault();
    props.aoRankedCadastrado({
      S,
      A,
      B,
      C,
      D,
      E,
    });
    setTexto(texto);
    setDisable(!disabled);
  };

  return (
    <div>
      <section className="formulario">
        <form onSubmit={aoSalvar}>
          <h2>Configure sua lista:</h2>
          <ul className="container__campotexto0">
            <li className="container__campotexto">
              <CampoTexto
                obrigadotorio={true}
                label="S"
                placeholder="Defina o nome"
                valor={S}
                disabled={disabled}
                aoAlterado={(valor) => setS(valor)}
              />
              <CampoTexto
                obrigadotorio={true}
                label="A"
                placeholder="Defina o nome"
                valor={A}
                disabled={disabled}
                aoAlterado={(valor) => setA(valor)}
              />
              <CampoTexto
                label="B"
                placeholder="Defina o nome"
                valor={B}
                disabled={disabled}
                aoAlterado={(valor) => setB(valor)}
              />
            </li>
            <li className="container__campotexto2">
              <CampoTexto
                label="C"
                placeholder="Defina o nome"
                valor={C}
                disabled={disabled}
                aoAlterado={(valor) => setC(valor)}
              />
              <CampoTexto
                label="D"
                placeholder="Defina o nome"
                valor={D}
                disabled={disabled}
                aoAlterado={(valor) => setD(valor)}
              />
              <CampoTexto
                label="E"
                placeholder="Defina o nome"
                valor={E}
                disabled={disabled}
                aoAlterado={(valor) => setE(valor)}
              />
            </li>
          </ul>
          <div className="container__botao">
            <Botao texto={disabled ? "Editar" : "Salvar"}></Botao>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Formulario;
