import AccountCircle from "@mui/icons-material/AccountCircle";
import Key from "@mui/icons-material/Key";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, InputAdornment, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IDadosLogin, TipoUsuario } from "types/usuario";

interface Props {
  dadosLogin: IDadosLogin
  setDadosLogin: React.Dispatch<React.SetStateAction<IDadosLogin>>
}

function DadosLogin({ dadosLogin, setDadosLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(dadosLogin.login);
  const [senha, setSenha] = useState(dadosLogin.senha);
  const [confirmaSenha, setConfirmaSenha] = useState(dadosLogin.confirmaSenha);
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>(dadosLogin.tipoUsuario);

  useEffect(() => {
    setDadosLogin({ ...dadosLogin, login });
  }, [login]);

  useEffect(() => {
    setDadosLogin({ ...dadosLogin, senha });
  }, [senha]);

  useEffect(() => {
    setDadosLogin({ ...dadosLogin, confirmaSenha });
  }, [confirmaSenha]);

  useEffect(() => {
    setDadosLogin({ ...dadosLogin, tipoUsuario });
  }, [tipoUsuario]);

  const tiposUsuario: TipoUsuario[] = ["CLIENTE", "ORGANIZADOR"];

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (

    <Grid container >
      <Grid item xs={12} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
        <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Login *</Typography>
        <OutlinedInput
          fullWidth
          required
          type="email"
          size="small"
          placeholder="email@mail.com"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
        <Typography sx={{ color: "#237871" }}>Senha *</Typography>
        <OutlinedInput
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          size="small"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Key />
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
        <Typography sx={{ color: "#237871" }}>Confirma Senha *</Typography>
        <OutlinedInput
          fullWidth
          required
          type={showPassword ? "text" : "password"}
          size="small"
          value={confirmaSenha}
          onChange={(event) => setConfirmaSenha(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Key />
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
        <Typography sx={{ color: "#237871" }}>Tipo Usuário *</Typography>
        <Select
          fullWidth
          aria-required
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
    </Grid >
  );
}

export default DadosLogin;