import CheckIcon from "@mui/icons-material/Check";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import useGet from "Api/useGet";
import usePost from "Api/usePost";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TipoSnack } from "types/tipoSnack";
import { IDadosCadastro, IDadosLogin, IDadosPessoais, IUsuario } from "types/usuario";
import DadosLogin from "./dadosLoginUser";
import DadosPessoais from "./dadosPessoaisUser";

const passos = ["Dados Login", "Dados Pessoais"];

function PassosCadastro() {
  const navigate = useNavigate();
  const [passoAtivo, setPassoAtivo] = useState(0);
  const [labelPasso, setLabelPasso] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [cadastroUsuario, setCadastroUsuario] = useState<IUsuario>({
    idUsuario: 0,
    loginUsuario: "",
    senhaUsuario: "",
    ativoUsuario: true,
    tipoUsuario: "CLIENTE"
  });
  const [dadosCadatro, setDadosCadastro] = useState<IDadosCadastro>({
    idDadosCadastrais: 0,
    idUsuarioDadosCadastrais: 0,
    nomeDadosCadastrais: "",
    documentoDadosCadastrais: "",
    dataNascimentoDadosCadastrais: "",
    cidadeDadosCadastrais: "",
    ufDadosCadastrais: "",
    logradouroDadosCadastrais: "",
    numeroDadosCadastrais: 0,
    bairroDadosCadastrais: "",
    cepDadosCadastrais: "",
    telefoneDadosCadastrais: "",
    sexoDadosCadastrais: "MASCULINO",
  });

  const [dadosLogin, setDadosLogin] = useState<IDadosLogin>({
    login: "",
    senha: "",
    confirmaSenha: "",
    tipoUsuario: "CLIENTE",
  });

  const [dadosPessoais, setDadosPessoais] = useState<IDadosPessoais>({
    nome: "",
    documento: "",
    dataNascimento: dayjs().format("YYYY-MM-DD"),
    cidade: "",
    uf: "",
    logradouro: "",
    numero: 0,
    bairro: "",
    cep: "",
    telefone: "",
    sexo: "MASCULINO",
  });

  useEffect(() => {
    setLabelPasso(passos[passoAtivo]);
  }, [passoAtivo]);

  const totalPassos = () => {
    return passos.length;
  };

  const ultimoPasso = () => {
    return passoAtivo === totalPassos() - 1;
  };

  const proximo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dadosLogin.login || !dadosLogin.senha || !dadosLogin.confirmaSenha || !dadosLogin.tipoUsuario) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      setTipoSnack("error");
      setOpenSnack(true);
    } else if (dadosLogin.senha !== dadosLogin.confirmaSenha) {
      setMensagem("Senhas não conferem favor verificar.");
      setTipoSnack("error");
      setOpenSnack(true);
    } else if (dadosLogin.login) {
      const url = `usuario/login/${dadosLogin.login}`;
      const reposta = useGet({ url });
      reposta.then((response) => {
        if (response.status === 404) {
          console.log("Dados login:", dadosLogin);
          setPassoAtivo(passoAtivo + 1);
        } else {
          setMensagem(`Login já cadastrado.${response.error}`);
          setTipoSnack("error");
          setOpenSnack(true);
        }
      });
    } else {
      console.log("Dados login:", dadosLogin);
      setPassoAtivo(passoAtivo + 1);
    }
  };

  const voltar = () => {
    setPassoAtivo((prevpassoAtivo) => prevpassoAtivo - 1);
  };

  const handleStep = (step: number) => () => {
    if (!dadosLogin.login || !dadosLogin.senha || !dadosLogin.confirmaSenha || !dadosLogin.tipoUsuario) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      setTipoSnack("error");
      setOpenSnack(true);
    } else if (dadosLogin.senha !== dadosLogin.confirmaSenha) {
      setMensagem("Senhas não conferem favor verificar.");
      setTipoSnack("error");
      setOpenSnack(true);
    } else if (dadosLogin.login) {
      const url = `usuario/login/${dadosLogin.login}`;
      const reposta = useGet({ url });
      reposta.then((response) => {
        if (response.status === 404) {
          setPassoAtivo(passoAtivo + 1);
        } else {
          setMensagem("Login já cadastrado.");
          setTipoSnack("error");
          setOpenSnack(true);
        }
      });
    } else {
      setPassoAtivo(step);
    }
  };

  const efetuarCadastro = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dadosPessoais.nome || !dadosPessoais.documento
      || !dadosPessoais.dataNascimento || !dadosPessoais.telefone || !dadosPessoais.sexo
      || !dadosPessoais.cidade || !dadosPessoais.uf) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      setTipoSnack("error");
      setOpenSnack(true);
    } else {
      const newCadastroUsuario: IUsuario = {
        idUsuario: 0,
        loginUsuario: dadosLogin.login,
        senhaUsuario: dadosLogin.senha,
        ativoUsuario: true,
        tipoUsuario: dadosLogin.tipoUsuario
      };
      console.log("Novos Dados:", newCadastroUsuario);
      usePost<IUsuario>({ url: "usuario", dados: newCadastroUsuario })
        .then((response) => {
          if (response.data) {
            setCadastroUsuario(response.data as IUsuario);
            cadastrarDados(response.data.idUsuario);
          } else {
            setMensagem("Erro ao efetuar cadastro.");
            setTipoSnack("error");
            setOpenSnack(true);
            console.log(response.error);
          }
        }).catch((erro) => {
          console.log("Erro: ", erro);
        }).finally();
    }
  };

  const cadastrarDados = (idUsuario: number) => {
    const newDadosCadastrais: IDadosCadastro = {
      idDadosCadastrais: 0,
      idUsuarioDadosCadastrais: idUsuario,
      nomeDadosCadastrais: dadosPessoais.nome,
      documentoDadosCadastrais: dadosPessoais.documento.replace(/\D/g, ""),
      dataNascimentoDadosCadastrais: dadosPessoais.dataNascimento,
      cidadeDadosCadastrais: dadosPessoais.cidade,
      ufDadosCadastrais: dadosPessoais.uf,
      logradouroDadosCadastrais: dadosPessoais.logradouro,
      numeroDadosCadastrais: dadosPessoais.numero,
      bairroDadosCadastrais: dadosPessoais.bairro,
      cepDadosCadastrais: dadosPessoais.cep.replace(/\D/g, ""),
      telefoneDadosCadastrais: dadosPessoais.telefone.replace(/\D/g, ""),
      sexoDadosCadastrais: dadosPessoais.sexo,
    };
    usePost<IDadosCadastro>({ url: "dadosCadastrais", dados: newDadosCadastrais })
      .then((response) => {
        if (response.data) {
          setDadosCadastro(response.data as IDadosCadastro);
          navigate("/login", { replace: true });
        } else {
          setMensagem("Erro ao efetuar cadastro.");
          setTipoSnack("error");
          setOpenSnack(true);
          console.log(response.error);
        }
      }).catch((erro) => {
        console.log("Erro: ", erro);
      }).finally();
  };

  return (
    <Grid item container padding={{ xs: "0rem", md: "0rem 5rem" }
    }>
      <Grid container >
        <Grid item xs={12}>
          <Typography variant="h5" color="initial" textAlign={"center"}>{labelPasso}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stepper nonLinear activeStep={passoAtivo} sx={{ width: "50%", margin: "0 auto" }}>
            {passos.map((label, index) => (
              <Step key={label} completed={index < passoAtivo}>
                <StepButton color="inherit" onClick={handleStep(index)} />
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      <Grid item xs={12} >
        <Box>
          <form onSubmit={ultimoPasso() ? efetuarCadastro : proximo}>

            {ultimoPasso() ? (
              <DadosPessoais dadosPessoais={dadosPessoais} setDadosPessoais={setDadosPessoais} />
            )
              :
              <DadosLogin dadosLogin={dadosLogin} setDadosLogin={setDadosLogin} />
            }
            <Box sx={{ display: "flex", flexDirection: "row", padding: "1rem 1rem" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={passoAtivo === 0}
                onClick={voltar}
                sx={{ width: "8rem" }}
              >
                Voltar
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {ultimoPasso() ?
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  // onClick={efetuarCadastro}
                  sx={{ width: "8rem" }}
                >
                  <CheckIcon /> Concluir
                </Button>
                :
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={proximo}
                  type="submit"
                  sx={{ width: "8rem" }}
                >
                  Próximo
                </Button>
              }
            </Box>
          </form>
        </Box>
      </Grid>
      <Typography variant="subtitle2" color={"red"}>Campos com * são obrigatórios</Typography>
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </Grid>
  );
}

export default PassosCadastro;