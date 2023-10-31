import { Box, Chip, Grid } from "@mui/material";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { TipoSnack } from "types/tipoSnack";
import BotaoUpload from "../Botoes/BataoUpload/botaoUpload";
import SnackALert from "../SnackAlert/snackAlert";

interface Props {
  imagens: File[],
  setImagens: React.Dispatch<React.SetStateAction<File[]>>
}

function UploadImagens({ imagens, setImagens }: Props) {
  const [mensagem, setMensagem] = useState("");
  const [tipoSnack, setTipoSnack] = useState<TipoSnack>("success");
  const [openSnack, setOpenSnack] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 5) {
      setTipoSnack("error");
      setMensagem("Quantidade máximade de arquivos excedida! Máximo: 5");
      setOpenSnack(true);
    } else if (fileRejections.length > 0) {
      setTipoSnack("error");
      setMensagem("Tipo de arquivo não suportado!");
      setOpenSnack(true);
    } else {
      if (acceptedFiles && acceptedFiles.length > 0) {
        acceptedFiles.map((arquivos) => {
          setImagens(imagensAntigas => [...imagensAntigas, arquivos]);
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
  });

  const RemoverImagem = (index: number) => {
    const novasImagens = [...imagens];
    novasImagens.splice(index, 1);
    setImagens(novasImagens);
  };


  return (
    <div {...getRootProps()} style={{ width: "100%" }}>
      <input {...getInputProps()} />
      <Grid container justifyContent={"space-between"}
        border={1}
        borderRadius={1}
        borderColor={"lightblue"}>
        <Grid item xs={3} >
          <BotaoUpload />
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
            height={"100%"}
            overflow={"auto"}
            padding={1}
          >
            {imagens.map((imagem, index) => (
              <Chip key={index} label={imagem.name} onDelete={() => RemoverImagem(index)} />
            ))}
          </Box>
        </Grid>
      </Grid>
      <SnackALert open={openSnack} setOpen={setOpenSnack} mensagem={mensagem} tipoSnack={tipoSnack} />
    </div>
  );
}

export default UploadImagens;