//Bibliotecas
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//Componentes
import Input from "../../components/Input";
import { Container } from "./styles";
import Button from "../../components/Button";

export default function Cadastro(){
  const schema = yup.object().shape({
    nome: yup.string()
      .required("Campo obrigatório."),
    
    email: yup.string()
      .required("Campo obrigatório.")
      .email("Email invalido"),
    
    cpf: yup.string()
      .required("Campo obrigatório.")
      .length(11, "Seu CPF deve conter 11 numeros!"),
    
    senha: yup.string()
      .required("Campo obrigatório.")
      .min(6, "Minimo de 6 caracteres."),

    confirmarSenha: yup.string()
      .required("Campo obrigatório.")
      .oneOf([yup.ref("senha"), null], "Senhas diferentes!")
  });

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const history = useHistory();

  async function handleFormSubmit(data){

    delete data.confirmarSenha;

    const response = await axios({
      method:"POST",
      data,
      url:"https://m3-capstone-api.herokuapp.com/users/signup",
      validateStatus: () => true
    });

    if(response.status >= 400) return toast.error(response.data.error);

    toast.success("Conta criada!");

    history.push("/");
  }

  return(
    <Container>
     
      <h2>Cadastrar</h2>

      <form onSubmit={handleSubmit(handleFormSubmit)}>

        <section>
          <Input 
            register={register("nome")}
            error={errors.nome?.message}
            placeholder="Come completo" 
            title="Nome completo:" 
          />
          <Input 
            error={errors.cpf?.message}
            register={register("cpf")}
            placeholder="cpf" 
            title="CPF:"
          />
          <Input 
            error={errors.email?.message}
            register={register("email")}
            placeholder="e-mail" 
            title="E-mail:"
            inputType="email"
          />
          <Input 
            error={errors.senha?.message}
            register={register("senha")}
            placeholder="senha"
            title="Senha:"
            inputType="password"
          />
          <Input 
            error={errors.confirmarSenha?.message}
            register={register("confirmarSenha")}
            placeholder="confirme a senha" 
            title="Confirme a senha:"
            inputType="password"
          />
        </section>

        <div className="cadastro--container-botoes">
          <Button
            bgColor={"orange"}
            height={"40px"}
            width={"100px"}
            type="submit"
          >
          CADASTRAR
          </Button>
          <Button
            height={"40px"}
            width={"100px"}
            type="button"
            onClick={() => history.goBack()}
          >
          Sair
          </Button>
        </div>
      </form>
    </Container>
  );
}