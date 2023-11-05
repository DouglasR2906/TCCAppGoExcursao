import { Button, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PassosCadastro from "./passosCadastro";

function CadastrarUsuario() {
  const navigate = useNavigate();

  const efetuarLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    // http.post("login", { login: login, senha: senha })
    //   .then(resposta => {
    //     autenticacaoStore.login(resposta.data);
    //     setMensagem("Login Efetuado com sucesso!");
    //     setTipoSnack("success");
    //     setOpenSnack(true);
    //     setTimeout(() => {
    //       navigate(-1);
    //     }, 2000);
    //   })
    //   .catch(erro => {
    //     setMensagem("Erro ao efetuar login! Usuário ou senha inválido.");
    //     setTipoSnack("error");
    //     setOpenSnack(true);
    //     console.log(erro);
    //   });
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
        <Grid item xs={12} textAlign={"center"} marginTop={2} padding={"0rem 0rem 1rem 0rem"}>
          <Button onClick={() => navigate("/")}>
            <CardMedia
              component="img"
              sx={{ borderRadius: 0, width: "7rem", height: "3rem", margin: "0 auto", justifyItems: "center" }}
              src="/imagens/logo.png"
              alt="logo-cabeçalho"
            />
          </Button>
        </Grid>
        <Grid item padding={"1rem 0rem 1rem 0rem"} >
          <PassosCadastro />
        </Grid>
        <Grid item xs textAlign={"center"}>
          <CardContent >
            <Typography variant="body1" color="initial">
              Já possui um conta? <Button variant="text" color="primary" onClick={() => navigate("/login", { replace: true })}>Efetuar Login</Button>
            </Typography>
          </CardContent>
        </Grid >
      </Grid>
    </Container >
  );
}

export default CadastrarUsuario;
