import React from "react";
//import style from "./Cabecalho.module.scss";
import { Grid, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Cabecalho extends React.Component {
  render() {
    return (
      <Grid container spacing={3} style={{ padding: '5px' }}>
        <Grid item xs justifyContent={"flex-start"}>
          <img src="/imagens/logo.png" alt="logo-cabeçalho" style={{ height: '5rem' }} />
        </Grid>
        <Grid item xs={4} m={8}>
          <Grid container spacing={2}>
            <Grid item><a href="1">Excursões</a></Grid>
            <Grid item><a href="2">Passeios</a></Grid>
            <Grid item><a href="3">Eventos</a></Grid>
          </Grid>
        </Grid>
        <Grid item xs justifyContent={"flex-end"} alignItems="center" style={{padding:'2rem'}}>
          <IconButton size="large"><AccountCircleIcon /></IconButton>
        </Grid>
      </Grid >
    );
  }
};

export default Cabecalho;
