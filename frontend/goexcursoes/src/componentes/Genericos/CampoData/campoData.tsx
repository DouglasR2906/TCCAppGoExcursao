import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker } from "@mui/x-date-pickers";
import { InputDataProps } from "../../../types/inputData";

function CampoData({ obrigatorio, label, valor, setData }: InputDataProps) {

  return (
    <Grid margin={"0.5rem 0.5rem"}>
      <InputLabel>{label}</InputLabel>
      <DatePicker slotProps={{ textField: { size: "small", margin: "dense", required: obrigatorio } }} value={valor} onChange={(valor) => setData(valor)} />
    </Grid>
  );
}

export default CampoData;