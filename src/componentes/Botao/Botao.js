import "./Botao.css";

const Botao = (props) => {
  return (
    <button className="botao" {...props}>
      {props.texto}
    </button>
  );
};

export default Botao;
