import { Grid, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { IDadosPessoais, SexoUsuario } from "types/usuario";

interface Props {
  dadosPessoais: IDadosPessoais,
  setDadosPessoais: React.Dispatch<React.SetStateAction<IDadosPessoais>>
}

function DadosPessoais({ dadosPessoais, setDadosPessoais }: Props) {
  const [nome, setNome] = useState(dadosPessoais.nome);
  const [documento, setDocumento] = useState(dadosPessoais.documento);
  const [dataNascimento, setDataNascimento] = useState(dayjs(dadosPessoais.dataNascimento));
  const [cidade, setCidade] = useState(dadosPessoais.cidade);
  const [uf, setUf] = useState(dadosPessoais.uf);
  const [logradouro, setLogradouro] = useState(dadosPessoais.logradouro);
  const [numero, setNumero] = useState(dadosPessoais.numero);
  const [bairro, setBairro] = useState(dadosPessoais.bairro);
  const [cep, setCep] = useState(dadosPessoais.cep);
  const [telefone, setTelefone] = useState(dadosPessoais.telefone);
  const [sexo, setSexo] = useState(dadosPessoais.sexo);

  const genero: SexoUsuario[] = ["MASCULINO", "FEMININO", "OUTROS"];

  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, nome });
  }, [nome]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, documento });
  }, [documento]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, dataNascimento: dataNascimento.format("YYYY-MM-DD") });
  }, [dataNascimento]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, cidade });
  }, [cidade]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, uf });
  }, [uf]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, logradouro });
  }, [logradouro]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, numero });
  }, [numero]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, bairro });
  }, [bairro]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, cep });
  }, [cep]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, telefone });
  }, [telefone]);
  useEffect(() => {
    setDadosPessoais({ ...dadosPessoais, sexo });
  }, [sexo]);

  return (
    <Grid container >
      <Grid item xs={12} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={"0rem 1rem"}>
        <Typography sx={{ color: "#237871" }}>Nome Completo *</Typography>
        <OutlinedInput
          fullWidth
          type="text"
          size="small"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
        <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Documento *</Typography>
        <ReactInputMask
          mask="999.999.999-99"
          value={documento}
          onChange={(event) => setDocumento(event.target.value)}
        >
          <OutlinedInput
            fullWidth
            type="text"
            size="small"
            placeholder="000.000.000-00"
          />
        </ReactInputMask>
      </Grid>
      <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
        <Typography variant="body1" sx={{ color: "#237871" }} width={"100%"}>Data Nascimento *</Typography>
        <DatePicker sx={{ width: "100%" }}
          value={dataNascimento}
          slotProps={{ textField: { size: "small" } }}
          onChange={(event) => {
            const valor = event;
            if (valor) setDataNascimento(valor);
          }}
        />
      </Grid>
      <Grid item xs={12} md={10} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
        <Typography sx={{ color: "#237871" }}>Cidade *</Typography>
        <OutlinedInput
          fullWidth
          type="text"
          size="small"
          value={cidade}
          onChange={(event) => setCidade(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
        <Typography sx={{ color: "#237871" }}>UF *</Typography>
        <OutlinedInput
          fullWidth
          type="text"
          size="small"
          value={uf}
          onChange={(event) => setUf(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={10} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
        <Typography sx={{ color: "#237871" }}>Logradouro</Typography>
        <OutlinedInput
          fullWidth
          type="text"
          size="small"
          value={logradouro}
          onChange={(event) => setLogradouro(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
        <Typography sx={{ color: "#237871" }}>Numero</Typography>
        <OutlinedInput
          fullWidth
          type="text"
          size="small"
          value={numero}
          onChange={(event) => setNumero(Number(event.target.value))}
        />
      </Grid>
      <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 0.25rem 0rem 1rem" }}>
        <Typography sx={{ color: "#237871" }}>Bairro</Typography>
        <OutlinedInput
          fullWidth
          type="text"
          size="small"
          value={logradouro}
          onChange={(event) => setBairro(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={6} marginTop={1} flexBasis={"100%"} maxWidth={"100%"} padding={{ xs: "0rem 1rem", md: "0rem 1rem 0rem 0.25rem" }}>
        <Typography sx={{ color: "#237871" }}>CEP</Typography>
        <ReactInputMask
          mask="99999-999"
          value={cep}
          onChange={(event) => setCep(event.target.value)}
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
          value={telefone}
          onChange={(event) => setTelefone(event.target.value)}
        >
          <OutlinedInput
            fullWidth
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
          value={sexo}
          onChange={(evento) => {
            const valor = evento.target.value;
            setSexo(valor as SexoUsuario);
          }}>
          {genero.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
}

export default DadosPessoais;