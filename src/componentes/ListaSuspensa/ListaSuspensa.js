import "./ListaSuspensa.css";

const ListaSuspensa = (itens) => {
  return (
    <div>
      <select name="jogo">
        <option value="0">selecione o jogo</option>
      </select>

      <select name="boss">
        <option value="0">selecione o boss's</option>
      </select>
    </div>
  );
};
export default ListaSuspensa;
