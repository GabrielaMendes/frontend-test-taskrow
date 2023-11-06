import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type AlertaSucessoProps = {
  open: boolean;
  onClose: () => void;
};

function AlertaSucesso({ open, onClose }: AlertaSucessoProps) {
  return (
    <Collapse in={open}>
      <Alert
        elevation={1}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        Cadastro realizado com sucesso!
      </Alert>
    </Collapse>
  );
}

export default AlertaSucesso;
