import * as React from "react";
import { Alert, Snackbar } from "@mui/material";


interface Props {
  mensagem: string,
  open: boolean,
  tipoSnack: "error" | "info" | "success" | "warning";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function SnackALert({ open, setOpen, mensagem, tipoSnack }: Props) {

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Alert severity={tipoSnack} variant="filled" sx={{ width: "100%" }}>
        {mensagem}
      </Alert>
    </Snackbar>
  );
}

export default SnackALert;