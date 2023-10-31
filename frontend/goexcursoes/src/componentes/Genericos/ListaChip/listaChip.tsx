import { Box, Chip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import http from "http/http";
import { useEffect, useState } from "react";
import { FormaPagamento } from "types/formaPagamento";
import { TipoSnack } from "types/tipoSnack";
import SnackALert from "../SnackAlert/snackAlert";

function getStyles(descricao: FormaPagamento, formasPagamento: readonly FormaPagamento[], theme: Theme) {
  return {
    fontWeight:
      formasPagamento.indexOf(descricao) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  valor: string[],
  setValor: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ListaChip({ valor, setValor }: Props) {
  const theme = useTheme();
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);
  const [formasPagamento, setFormasPagamento] = useState<FormaPagamento[]>([]);

  useEffect(() => {
    http.get("formaPagamento")
      .then((resposta) => {
        setFormasPagamento(resposta.data);
      })
      .catch(() => {
        setMensagem("Erro ao buscar formas de pagamento!");
        setTipoSnack("error");
        setOpenSnack(true);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof valor>) => {
    const selectedValue = event.target.value;

    if (Array.isArray(selectedValue)) {
      setValor(selectedValue);
    }
  };

  return (
    <FormControl margin="dense" fullWidth>
      <InputLabel id="labelLista">Formas de pagamento:</InputLabel>
      <Select
        size="small"
        labelId="labelLista"
        id="selectFormaPagto"
        multiple
        value={valor}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, width: "100%" }} border={"none"}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        <MenuItem><em>{""}</em></MenuItem>
        {formasPagamento.map((itens) => (
          <MenuItem
            key={itens.idFormaPagamento}
            value={itens.descricaoFormaPagamento}
            style={getStyles(itens, formasPagamento, theme)}
          >
            {itens.descricaoFormaPagamento}
          </MenuItem>
        ))}
      </Select>
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </FormControl>
  );
}
