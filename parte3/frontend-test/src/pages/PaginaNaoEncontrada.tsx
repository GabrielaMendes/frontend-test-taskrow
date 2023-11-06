import { useMoveBack } from "../hooks/useMoveBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WarningIcon from "@mui/icons-material/Warning";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <Paper
      elevation={2}
      sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
    >
      <Box
        padding={5}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WarningIcon color="error" sx={{ fontSize: 50, marginBottom: 2 }} />

        <Typography
          component="h1"
          variant="h5"
          fontWeight={500}
          color="var(--bluish-grey)"
          sx={{
            fontStyle: "italic",
            marginBottom: 3,
          }}
        >
          A página que você está procurando não existe
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={moveBack}
          size="large"
        >
          Voltar
        </Button>
      </Box>
    </Paper>
  );
}

export default PageNotFound;
