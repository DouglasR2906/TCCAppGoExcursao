import AccountCircle from "@mui/icons-material/AccountCircle";
import Key from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import useGet from "Api/useGet";
import usePut from "Api/usePut";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { TipoSnack } from "types/tipoSnack";
import { IDadosCadastro, IDadosLogin, IDadosPessoais, IUsuario, IUsuarioLogado, SexoUsuario, TipoUsuario } from "types/usuario";

export default function DadosCadastro() {
  const navigate = useNavigate();
  const usuarioLogado: IUsuarioLogado = autenticacaoStore.usuario;
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [alterarSenha, setAlterarSenha] = useState(false);
  const [loginUsuario, setLoginUsuario] = useState<IUsuario>({
    idUsuario: 0,
    loginUsuario: "",
    senhaUsuario: "",
    ativoUsuario: true,
    tipoUsuario: "CLIENTE"
  });
  const [dadosCadastro, setDadosCadastro] = useState<IDadosCadastro>({
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
    useGet({ url: `usuario/${usuarioLogado.idUsuario}`, token: usuarioLogado.tokenUsuario })
      .then((response) => {
        if (response.data) {
          setLoginUsuario(response.data as IUsuario);
          console.log(response.data as IUsuario);
        } else {
          setMensagem(`Ao buscar dados do usuario. St: ${response.status}`);
          setTipoSnack("error");
          setOpenSnack(true);
        }
      })
      .catch((error) => console.log("Erro dadosCadastrais:", error))
      .finally();
    useGet({ url: `dadosCadastrais/usuario/${usuarioLogado.idUsuario}`, token: usuarioLogado.tokenUsuario })
      .then((response) => {
        if (response.data) {
          setDadosCadastro(response.data as IDadosCadastro);
        } else {
          setMensagem(`Ao buscar dados do usuario. St: ${response.status}`);
          setTipoSnack("error");
          setOpenSnack(true);
        }
      })
      .catch((error) => console.log("Erro dadosCadastrais:", error))
      .finally();
  }, []);

  useEffect(() => {
    setDadosLogin({
      ...dadosLogin,
      login: loginUsuario.loginUsuario,
      senha: loginUsuario.senhaUsuario,
      confirmaSenha: loginUsuario.senhaUsuario,
      tipoUsuario: loginUsuario.tipoUsuario
    });
  }, [loginUsuario]);


  useEffect(() => {
    console.log("effect cadastro: ", dadosCadastro);
    setDadosPessoais({
      ...dadosPessoais,
      nome: dadosCadastro.nomeDadosCadastrais,
      documento: dadosCadastro.documentoDadosCadastrais,
      dataNascimento: dadosCadastro.dataNascimentoDadosCadastrais,
      cidade: dadosCadastro.cidadeDadosCadastrais,
      uf: dadosCadastro.ufDadosCadastrais,
      logradouro: dadosCadastro.logradouroDadosCadastrais,
      numero: dadosCadastro.numeroDadosCadastrais,
      bairro: dadosCadastro.bairroDadosCadastrais,
      cep: dadosCadastro.cepDadosCadastrais,
      telefone: dadosCadastro.telefoneDadosCadastrais,
      sexo: dadosCadastro.sexoDadosCadastrais
    });
  }, [dadosCadastro]);

  useEffect(() => {
    console.log("Dados Login:", dadosLogin);
    console.log("Dados Pessoais:", dadosPessoais);
  }, [dadosLogin, dadosPessoais]);

  const SalvarDadosCadastro = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dadosPessoais.nome || !dadosPessoais.documento
      || !dadosPessoais.dataNascimento || !dadosPessoais.telefone || !dadosPessoais.sexo
      || !dadosPessoais.cidade || !dadosPessoais.uf) {
      setMensagem("Por favor, preencha todos os campos obrigatórios.");
      setTipoSnack("error");
      setOpenSnack(true);
    } else {
      let newCadastroUsuario: IUsuario;
      if (alterarSenha && dadosLogin.senha !== "") {
        newCadastroUsuario = {
          idUsuario: loginUsuario.idUsuario,
          loginUsuario: dadosLogin.login,
          senhaUsuario: dadosLogin.senha,
          ativoUsuario: true,
          tipoUsuario: dadosLogin.tipoUsuario
        };
        usePut({ url: "usuario/atualizarSenha", dados: newCadastroUsuario, token: usuarioLogado.tokenUsuario })
          .then((response) => {
            if (response.data) {
              setLoginUsuario(response.data as IUsuario);
              setAlterarSenha(!alterarSenha);
              setShowPassword(false);
            } else {
              setMensagem("Erro ao atualizar Login.");
              setTipoSnack("error");
              setOpenSnack(true);
              console.log(response.error);
            }
          }).catch((erro) => {
            console.log("Erro: ", erro);
          }).finally();

      } else {
        newCadastroUsuario = {
          idUsuario: loginUsuario.idUsuario,
          loginUsuario: dadosLogin.login,
          ativoUsuario: true,
          tipoUsuario: dadosLogin.tipoUsuario
        };
      }
      usePut({ url: "usuario", dados: newCadastroUsuario, token: usuarioLogado.tokenUsuario })
        .then((response) => {
          if (response.data) {
            setLoginUsuario(response.data as IUsuario);
            autenticacaoStore.login({ ...usuarioLogado, tipoUsuario: response.data.tipoUsuario });
          } else {
            setMensagem("Erro ao atualizar Login.");
            setTipoSnack("error");
            setOpenSnack(true);
            console.log(response.error);
          }
        }).catch((erro) => {
          console.log("Erro: ", erro);
        }).finally();
      const newDadosCadastrais: IDadosCadastro = {
        idDadosCadastrais: dadosCadastro.idDadosCadastrais,
        idUsuarioDadosCadastrais: dadosCadastro.idUsuarioDadosCadastrais,
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
      usePut({ url: "dadosCadastrais", dados: newDadosCadastrais, token: usuarioLogado.tokenUsuario })
        .then((response) => {
          if (response.data) {
            setDadosCadastro(response.data as IDadosCadastro);
            setMensagem("Dados Atualizados com Sucesso.");
            setTipoSnack("success");
            setOpenSnack(true);
          } else {
            setMensagem("Erro ao atualizar cadastro.");
            setTipoSnack("error");
            setOpenSnack(true);
            console.log(response.error);
          }
        }).catch((erro) => {
          console.log("Erro: ", erro);
        }).finally();
    }
  };

  const genero: SexoUsuario[] = ["MASCULINO", "FEMININO", "OUTROS"];
  const tiposUsuario: TipoUsuario[] = ["CLIENTE", "ORGANIZADOR"];
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={(event) => SalvarDadosCadastro(event)}>
      <Typography variant="h6" color="initial">Dados Cadastrais:</Typography>
      <Grid container >
        <Grid item xs={12} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
          <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Login *</Typography>
          <OutlinedInput
            fullWidth
            required
            type="email"
            size="small"
            placeholder="email@mail.com"
            value={dadosLogin.login}
            onChange={(event) => setDadosLogin({ ...dadosLogin, login: event.target.value })}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item container alignItems={"center"} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} >
          <Grid item xs={10} md={4} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
            <Typography sx={{ color: "#237871" }}>Senha *</Typography>
            <OutlinedInput
              fullWidth
              required
              disabled={!alterarSenha}
              type={showPassword ? "text" : "password"}
              size="small"
              value={dadosLogin.senha}
              onChange={(event) => setDadosLogin({ ...dadosLogin, senha: event.target.value })}
              startAdornment={
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              }
              endAdornment={alterarSenha &&
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={2} alignSelf={"flex-end"} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 0rem" }}>
            <Button
              variant="text"
              onClick={() => {
                setDadosLogin({ ...dadosLogin, senha: "" });
                setAlterarSenha(!alterarSenha);
              }}
            >
              Alterar Senha
            </Button>

          </Grid>
          <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
            <Typography sx={{ color: "#237871" }}>Tipo Usuário *</Typography>
            <Select
              fullWidth
              aria-required
              size="small"
              id="selectCategoria"
              required
              value={dadosLogin.tipoUsuario}
              onChange={(evento) => {
                const valor = evento.target.value;
                setDadosLogin({ ...dadosLogin, tipoUsuario: valor as TipoUsuario });
              }}>
              {tiposUsuario.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid >
      <Grid container >
        <Grid item xs={12} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
          <Typography sx={{ color: "#237871" }}>Nome Completo *</Typography>
          <OutlinedInput
            fullWidth
            required
            type="text"
            size="small"
            value={dadosPessoais.nome}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, nome: event.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
          <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Documento *</Typography>
          <ReactInputMask
            mask="999.999.999-99"
            value={dadosPessoais.documento}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, documento: event.target.value })}
          >
            <OutlinedInput
              fullWidth
              required
              type="text"
              size="small"
              placeholder="000.000.000-00"
            />
          </ReactInputMask>
        </Grid>
        <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
          <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Data Nascimento *</Typography>
          <DatePicker sx={{ width: "100%" }}
            value={dayjs(dadosPessoais.dataNascimento)}
            slotProps={{ textField: { size: "small" } }}
            onChange={(event) => {
              const valor = event;
              if (valor) setDadosPessoais({ ...dadosPessoais, dataNascimento: valor.format("YYYY-MM-DD") });
            }}
          />
        </Grid>
        <Grid item xs={12} md={10} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
          <Typography sx={{ color: "#237871" }}>Cidade *</Typography>
          <OutlinedInput
            fullWidth
            required
            type="text"
            size="small"
            value={dadosPessoais.cidade}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, cidade: event.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={2} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
          <Typography sx={{ color: "#237871" }}>UF *</Typography>
          <OutlinedInput
            fullWidth
            required
            type="text"
            size="small"
            margin="dense"
            value={dadosPessoais.uf}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, uf: event.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={10} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
          <Typography sx={{ color: "#237871" }}>Logradouro</Typography>
          <OutlinedInput
            fullWidth
            type="text"
            size="small"
            value={dadosPessoais.logradouro}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, logradouro: event.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={2} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
          <Typography sx={{ color: "#237871" }}>Numero</Typography>
          <OutlinedInput
            fullWidth
            type="text"
            size="small"
            value={dadosPessoais.numero}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, numero: Number(event.target.value) })}
          />
        </Grid>
        <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
          <Typography sx={{ color: "#237871" }}>Bairro</Typography>
          <OutlinedInput
            fullWidth
            type="text"
            size="small"
            value={dadosPessoais.bairro}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, bairro: event.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
          <Typography sx={{ color: "#237871" }}>CEP</Typography>
          <ReactInputMask
            mask="99999-999"
            value={dadosPessoais.cep}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, cep: event.target.value })}
          >
            <OutlinedInput
              fullWidth
              type="text"
              size="small"
              placeholder="00000-000"
            />
          </ReactInputMask>
        </Grid>
        <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
          <Typography sx={{ color: "#237871" }}>Telefone *</Typography>
          <ReactInputMask
            mask="(99) 9 9999-9999"
            value={dadosPessoais.telefone}
            onChange={(event) => setDadosPessoais({ ...dadosPessoais, telefone: event.target.value })}
          >
            <OutlinedInput
              fullWidth
              required
              type="text"
              size="small"
              placeholder="(00) 0 0000-0000"
            />
          </ReactInputMask>
        </Grid>
        <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
          <Typography sx={{ color: "#237871" }}>Sexo *</Typography>
          <Select
            fullWidth
            aria-required
            size="small"
            id="selectCategoria"
            required
            value={dadosPessoais.sexo}
            onChange={(evento) => {
              const valor = evento.target.value;
              setDadosPessoais({ ...dadosPessoais, sexo: valor as SexoUsuario });
            }}>
            {genero.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid container display={"flex"} marginTop={1} >
        {/* <Grid item xs={2}>
          {excursao.idExcursao ?
            <Button fullWidth variant="outlined" type="button" onClick={ExcluirExcursao}>Excluir</Button> : ""
          }
        </Grid> */}
        <Grid item xs={2} margin={"0 auto"} padding={"0.25rem 1rem"} >
          <Button fullWidth variant="outlined" type="submit">Gravar</Button>
        </Grid>
      </Grid>
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </form >
  );
}