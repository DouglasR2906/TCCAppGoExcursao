import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        prefix="R$"
      />
    );
  },
);

interface Props {
  label: string,
  valor: { valor: string },
  setValor: React.Dispatch<React.SetStateAction<{ valor: string }>>
}

export default function CampoValor({ label, valor, setValor }: Props) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor({ ...valor, [event.target.name]: event.target.value });
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField fullWidth
        size="small"
        label={label}
        value={valor.valor}
        onChange={handleChange}
        name="valor"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as any,
        }}
        variant="outlined"
      />
    </Stack>
  );
}
