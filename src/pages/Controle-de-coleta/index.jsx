import Header from "../../components/Header";
import Button from "../../components/Button";
import CardItem from "../../components/CardItem";
import {LocationsContainer, Container} from "./styles";
import { useEffect, useState } from "react";

function ControleDeColeta(){

  const teste = [
    {
      name: "Limpeza"
    },
    {
      name: "Frutas"
    },
    {
      name: "Inlatados"
    },
    {
      name: "Limpeza"
    }
    ,{
      name: "Limpeza"
    }
    ,{
      name: "Limpeza"
    }
  ];

  function search(input){
    const result = teste.filter(item=>{
      return item.name === input;
    });
    setFilter(result);
  }

  function createCard(input){
    //implementa api
  }

  const [filter, setFilter] = useState(teste);
  const [input, setinput] = useState(false); 
  const [modal, setModal] = useState(false);

  return(
    <>
      <Header/>
      <Container>
        <div className="icon">
          <span>Acesse o maps:</span>
          <img src="/assets/maps.png" alt="icon"/>
        </div>
        <h2>Recebeu doação <span className="blue" onClick={()=>setModal(true)}>informe</span></h2>
        <section className="search">
          <input type="text" onChange={(evt)=>setinput(evt.target.value)} />
          <div className="buttons">
            <Button width={`${220}px`} height={`${50}px`} bgColor = {"orange"} onClick={()=>search(input)} >Pesquisa</Button>
            <Button width={`${220}px`} height={`${50}px`} bgColor = {"orange"} onClick={()=>createCard(input)} >Criar</Button>
          </div>
        </section>
        <h2>Gerenciar</h2>
        <LocationsContainer>
          <div className="locationsInnerContainer">
            {
              filter.map((item, index )=>{
                return <CardItem item={item} key={index}/>;    
              })
            }
          </div>
        </LocationsContainer>
      </Container>
    </>
  );
}
export default ControleDeColeta;