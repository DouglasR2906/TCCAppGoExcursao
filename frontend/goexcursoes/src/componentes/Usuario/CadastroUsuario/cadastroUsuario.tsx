import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, CardContent, CardMedia, Container, Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import http from "http/http";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { TipoSnack } from "types/tipoSnack";
import { TipoUsuario } from "types/tipoUsuario";

function CadastroUsuario() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);


  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario | "">("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  const tiposUsuario: TipoUsuario[] = ["Cliente", "Organizador"];

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const efetuarLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    http.post("login", { login: login, senha: senha })
      .then(resposta => {
        autenticacaoStore.login(resposta.data);
        setMensagem("Login Efetuado com sucesso!");
        setTipoSnack("success");
        setOpenSnack(true);
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      })
      .catch(erro => {
        setMensagem("Erro ao efetuar login! Usuário ou senha inválido.");
        setTipoSnack("error");
        setOpenSnack(true);
        console.log(erro);
      });

  };

  return (
    <Container maxWidth="xl"
      sx={{
        backgroundColor: "aliceblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        margin: 0
      }}
    >
      <Grid container
        spacing={1}
        bgcolor="white"
        display="flex"
        flexDirection="row"
        width={{ xs: "100%", md: "60%" }}
        height="100%"
        alignContent="flex-start"
        margin={0}
        padding={0}
      >
        {/* <Grid item xs={12} textAlign={"end"}>
          <Button variant="text" onClick={() => navigate(-1)} sx={{ marginLeft: "auto", margintop: 2 }}>
            <GrClose size={20} />
          </Button>
        </Grid> */}
        <Grid item xs={12} textAlign={"center"} marginTop={2} padding={"0rem 0rem 1rem 0rem"}>
          <CardMedia
            component="img"
            sx={{ borderRadius: 0, width: "7rem", height: "3rem", margin: "0 auto", justifyItems: "center" }}
            src="/imagens/logo.png"
            alt="logo-cabeçalho"
          />
        </Grid>
        <Grid item xs={12} textAlign={"center"} padding={"1rem 0rem 1rem 0rem"} >
          <Typography variant="h5" color="initial">Que tal embarcar nessa viagem? Crie sua conta</Typography>
        </Grid>
        <Grid item xs={12} >
          <Grid container justifyContent={"center"} alignItems={"center"} padding={{ xs: "0rem", md: "0rem 5rem" }}>
            <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
              <Typography sx={{ color: "#237871" }}>Nome</Typography>
              <OutlinedInput
                fullWidth
                type="text"
                size="small"
                placeholder="João"
                value={nome}
                onChange={(event) => setSenha(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
              <Typography sx={{ color: "#237871" }}>Sobrenome</Typography>
              <OutlinedInput
                fullWidth
                type="text"
                size="small"
                placeholder="Da Silva"
                value={sobrenome}
                onChange={(event) => setConfirmaSenha(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
              <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Login</Typography>
              <OutlinedInput
                fullWidth
                type="email"
                size="small"
                placeholder="email@mail.com"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
              <Typography sx={{ color: "#237871" }}>Senha</Typography>
              <OutlinedInput
                fullWidth
                type={showPassword ? "text" : "password"}
                size="small"
                placeholder="Senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                }
                endAdornment={
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
            <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
              <Typography sx={{ color: "#237871" }}>Confirma Senha</Typography>
              <OutlinedInput
                fullWidth
                type={showPassword ? "text" : "password"}
                size="small"
                placeholder="Senha"
                value={confirmaSenha}
                onChange={(event) => setConfirmaSenha(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                }
                endAdornment={
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
            <Grid item xs={12} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
              <Typography sx={{ color: "#237871" }}>Tipo Usuário</Typography>
              <Select
                fullWidth
                size="small"
                id="selectCategoria"
                required
                value={tipoUsuario}
                onChange={(evento) => {
                  const valor = evento.target.value;
                  setTipoUsuario(valor as TipoUsuario);
                }}>
                {tiposUsuario.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={6} margin={2} textAlign={"center"}>
              <Button variant="contained" color="primary" type="submit" onClick={(event) => efetuarLogin(event)}>
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs textAlign={"center"}>
          <CardContent >
            <Typography variant="body1" color="initial">
              Já possui um conta? <Button variant="text" color="primary" onClick={() => navigate("/login", { replace: true })}>Efetuar Login</Button>
            </Typography>
          </CardContent>
          <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
        </Grid >
      </Grid>
    </Container >
  );
}

export default CadastroUsuario;
