import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, CardContent, CardMedia, Container, Grid, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import SnackALert from "componentes/Genericos/SnackAlert/snackAlert";
import http from "http/http";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import autenticacaoStore from "store/autenticacao.store";
import { TipoSnack } from "types/tipoSnack";

function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const efetuarLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    http.post("login", { login: login, senha: senha })
      .then(resposta => {
        autenticacaoStore.login(resposta.data);
        setMensagem("Login Efetuado com sucesso!");
        setTipoSnack("success");
        setOpenSnack(true);
        setTimeout(() => {
          navigate(-1);
        }, 1000);
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
        boxSizing="border-box"
        bgcolor="white"
        display="flex"
        borderRadius="10px"
        flexDirection="row"
        width={{ xs: "100%", md: "60%" }}
        margin="2rem 0rem"
      >
        <Grid item xs={12} textAlign={"end"}>
          <Button variant="text" onClick={() => navigate("/")} sx={{ marginLeft: "auto", margintop: 2 }}>
            <GrClose size={20} />
          </Button>
        </Grid>
        <Grid item xs={12} textAlign={"center"}>
          <CardMedia
            component="img"
            sx={{ borderRadius: 0, width: "7rem", height: "3rem", margin: "0 auto", justifyItems: "center" }}
            src="/imagens/logo.png"
            alt="logo-cabeçalho"
          />
        </Grid>
        <Grid item xs={12} textAlign={"center"} height={"fit-content"}>
          <Typography variant="h5" color="initial">Faça login em sua conta</Typography>
        </Grid>
        <Grid item xs={12} >
          <form onSubmit={efetuarLogin}>
            <Grid container justifyContent={"center"} alignItems={"center"} >
              <Grid item xs={8} margin={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
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
              <Grid item xs={8} margin={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
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
              <Grid item xs={6} margin={1} textAlign={"center"}>
                <Button variant="contained" color="primary" type="submit">
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item xs textAlign={"center"}>
          <CardContent >
            <Typography variant="body1" color="initial">
              Não possui conta? <Button variant="text" color="primary" onClick={() => navigate("/cadastroUsuario", { replace: true })}>Criar Conta</Button>
            </Typography>
          </CardContent>
          <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
        </Grid >
      </Grid>
    </Container >
  );
}

export default Login;
