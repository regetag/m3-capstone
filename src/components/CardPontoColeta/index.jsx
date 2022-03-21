import { Content } from "./styles";
import { useState, useEffect } from "react";
import igreja from "../../assets/igreja.jpg";
import ProfilePicture from "../ProfilePicture";

function CardPontoColeta({ dados }) {
  const { nome, id, porcentagem } = dados;
  const [cor, setCor] = useState("var(--laranja)");

  useEffect(() => {
    if (porcentagem < 33.33) {
      setCor("var(--laranja)");
    } else if (porcentagem >= 33.33 && porcentagem < 66.66) {
      setCor("var(--amarelo)");
    } else {
      setCor("var(--verde-medio)");
    }
  }, []);

  return (
    <Content corDeFundo={cor}>
      <div className="CardPontoDecolete-Title__container">
        <h2>{nome}</h2>
        <button>Ver</button>
      </div>

      <ProfilePicture
        userName="Cantinho da Coleta"
        width="70px"
        height="55px"
      />
    </Content>
  );
}

export default CardPontoColeta;
