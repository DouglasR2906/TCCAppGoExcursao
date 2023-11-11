
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useGet from "Api/useGet";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import autenticacaoStore from "store/autenticacao.store";
import { Municipio } from "types/municipio";


interface Props {
  valor: string;
  setValor: React.Dispatch<React.SetStateAction<string>>;
}

function AutocompleteComponent({ valor, setValor }: Props) {
  const { usuario } = autenticacaoStore;
  const tokenUsuario = usuario.tokenUsuario;
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null);

  useEffect(() => {
    useGet<Municipio[]>({ url: "municipio" })
      .then((response) => {
        if (response.data) setMunicipios(response.data);
      })
      .catch(error =>
        console.error("Erro ao buscar municípios:", error));
  }, []);

  return (
    <Stack margin={"0 0.5rem"}>
      <InputLabel sx={{ opacity: 1 }}>Buscar Destino</InputLabel>
      <Autocomplete
        freeSolo
        disableClearable
        fullWidth
        size="small"
        value={valor}
        onChange={(event, newValue) => setValor(newValue)}
        options={municipios.map((option) => `${option.nomeMunicipio} ${option.ufMunicipio}`)}
        renderInput={(params) =>
          <TextField
            {...params}
            margin="dense"
            placeholder="Cidade de destino"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <FaLocationDot style={{ margin: "0 4", color: "#686665" }} />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        }
      />

    </Stack>
  );
}

export default AutocompleteComponent;