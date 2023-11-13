
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useGet from "Api/useGet";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Municipio } from "types/municipio";


interface Props {
  valor: string;
  setValor: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  placeholder: string;
  exibirLabel: boolean;
}

function AutocompleteComponent({ valor, setValor, label, placeholder, exibirLabel }: Props) {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  useEffect(() => {
    useGet<Municipio[]>({ url: "municipio" })
      .then((response) => {
        if (response.data) setMunicipios(response.data);
      })
      .catch(error =>
        console.error("Erro ao buscar municípios:", error));
  }, []);

  return (
    <Stack >
      {label === "" && exibirLabel && <InputLabel sx={{ opacity: 1 }}>Buscar Destino</InputLabel>}
      <Autocomplete
        freeSolo
        disableClearable
        fullWidth
        size="small"
        value={valor}
        onChange={(event, newValue) => {
          if (newValue.length > 0) {
            setValor(newValue);
          } else {
            setValor("");
          }
        }
        }
        options={municipios.map((option) => (
          `${option.nomeMunicipio} ${option.ufMunicipio}`)
        )}
        renderInput={(params) =>
          <TextField
            {...params}
            margin="dense"
            required
            placeholder={placeholder}
            label={label !== "" ? label : ""}
            InputProps={{
              ...params.InputProps,
              type: "search",
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