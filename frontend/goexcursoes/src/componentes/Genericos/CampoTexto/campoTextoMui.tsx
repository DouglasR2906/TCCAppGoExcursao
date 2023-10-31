import TextField from "@mui/material/TextField";

interface Props {
  label: string,
  valor: string | number,
  setValor: React.Dispatch<React.SetStateAction<string | number>>
  tipoDeDado: "string" | "numerico",
}

function CampoTextoMui({ label, valor, tipoDeDado, setValor }: Props) {
  return (
    <TextField
      margin="dense" fullWidth
      size="small"
      label={label}
      value={valor.toString()}
      onChange={(event) => {
        if (tipoDeDado === "numerico") {
          const valor = parseInt(event.target.value);
          if (isNaN(valor)) {
            setValor(0);
          } else {
            setValor(valor);
          }
        } else {
          const valor = event.target.value;
          setValor(valor);
        }
      }}
    />
  );
}

export default CampoTextoMui;