import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  display: "none"
});

function BotaoUpload() {
  return (
    <label htmlFor="file-input">
      <Button variant="text" size="large" sx={{ height: "5rem", width: "100%" }} startIcon={<CloudUploadIcon />}>
        Carregar Imagens
      </Button>
      <VisuallyHiddenInput type="file" id="file-input" />
    </label>
  );
}

export default BotaoUpload;