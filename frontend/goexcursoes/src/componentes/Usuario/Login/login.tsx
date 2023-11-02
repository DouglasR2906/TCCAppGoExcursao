import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Card, CardContent, CardMedia, Grid, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmasenha, setCofirmaSenha] = useState("");

  const efetuarLogin = () => {
    console.log(email);
    console.log(senha);
  };

  return (
    <Grid container
      height="100vh"
      width="100vw"
      bgcolor={"white"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Card
        sx={{
          width: "50%", height: "70%",
          boxSizing: "border-box",
          boxShadow: "0px 0px 15px 5px rgb(0,0,0, 0.25)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{ borderRadius: 0, width: "7rem", height: "3rem", margin: "3rem 0rem 2rem" }}
          src="/imagens/logo.png"
          alt="logo-cabeçalho"
        />
        <CardContent sx={{ width: "60%" }}>
          <InputLabel>Login</InputLabel>
          <TextField
            required
            type="email"
            size="small"
            variant="standard"
            fullWidth
            placeholder="email@mail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
        </CardContent>
        <CardContent sx={{ width: "60%" }}>
          <InputLabel>Senha</InputLabel>
          <Input
            required
            type="password"
            size="small"
            fullWidth
            placeholder="Senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
        </CardContent>
        <CardContent>
          <Button variant="contained" color="primary" type="submit" onClick={efetuarLogin}>
            Login
          </Button>
        </CardContent>
        <CardContent>
          <Typography variant="body1" color="initial">
            Não possui conta? <Button variant="text" color="primary">Criar Conta</Button>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Login;
